import { GoogleGenAI } from '@google/genai';
import { buildSystemInstruction } from '../../src/data/knowledgeBasePrompt';
import { buildComprehensiveMetaphysicsContext } from '../../src/data/metaphysicsData';
import { compileRAGContextForPrompt } from '../../src/data/ancientRAG';
import { generateAncientWisdomResponse } from '../../src/data/ancientReasoner';

type VercelRequest = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
};
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  write: (chunk: string) => void;
  end: () => void;
};

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const AUTO_FALLBACK_MODELS = [
  'openrouter/free',
  'google/gemma-4-26b-a4b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
];

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) geminiClient = new GoogleGenAI({ apiKey });
  return geminiClient;
}

function writeText(res: VercelResponse, text: string) {
  if (text) res.write(`data: ${JSON.stringify({ text })}\\n\\n`);
}

function finish(res: VercelResponse) {
  res.write('data: [DONE]\\n\\n');
  res.end();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
  }

  const { messages, coupleContext, model = 'auto' } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Vui lòng cung cấp nội dung hội thoại.' });
  }

  const lastUserMessage = [...messages].reverse().find((message: any) => message?.role === 'user')?.content || '';
  const clientHeader = req.headers?.['x-openrouter-key'];
  const clientKey = Array.isArray(clientHeader) ? clientHeader[0] : clientHeader;
  const apiKey = (clientKey || process.env.OPENROUTER_API_KEY || '').trim();

  const ragContext = compileRAGContextForPrompt(lastUserMessage, coupleContext);
  const metaphysicsContext = buildComprehensiveMetaphysicsContext(coupleContext, new Date());
  const systemPrompt = buildSystemInstruction(`${metaphysicsContext}\\n\\n${ragContext}`);
  const openRouterMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((message: any) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: String(message.content ?? ''),
    })),
  ];

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const requestedModel = String(model || 'auto');
  const candidates = requestedModel === 'auto'
    ? AUTO_FALLBACK_MODELS
    : [requestedModel, ...AUTO_FALLBACK_MODELS.filter((item) => item !== requestedModel)];
  const shouldUseWebSearch =
    /nguồn|trích dẫn|tham khảo|đối chiếu|kiểm chứng|xác minh|mới nhất|hiện nay|hiện tại|hôm nay|gần đây|tin tức|tìm trên mạng|web search|website|đường dẫn|link|giá hiện tại|quy định mới/i.test(lastUserMessage);

  if (apiKey) {
    for (const candidate of candidates) {
      try {
        const response = await fetch(OPENROUTER_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.APP_URL || 'https://nhanduyenvochong.vercel.app',
            'X-Title': 'AI Nhan Duyen',
          },
          body: JSON.stringify({
            model: candidate,
            messages: openRouterMessages,
            stream: true,
            temperature: 0.4,
            max_tokens: 2200,
            ...(shouldUseWebSearch ? { plugins: [{ id: 'web' }] } : {}),
          }),
          signal: AbortSignal.timeout(45000),
        });

        if (!response.ok) {
          const status = response.status;
          if ([401, 402, 403].includes(status)) break;
          const retryAfter = response.headers.get('retry-after');
          if (status === 429 && retryAfter) {
            const seconds = Number(retryAfter);
            const delayMs = Number.isFinite(seconds) ? seconds * 1000 : Math.max(0, Date.parse(retryAfter) - Date.now());
            if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, Math.min(delayMs, 3000)));
          } else if (status >= 500) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
          continue;
        }

        if (!response.body) continue;
        res.setHeader('X-AI-Model', candidate);
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let streamed = false;
        let done = false;

        const processLine = (line: string) => {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) return;
          const payload = trimmed.slice(5).trim();
          if (payload === '[DONE]') { done = true; return; }
          try {
            const parsed = JSON.parse(payload);
            const text = parsed.choices?.[0]?.delta?.content || '';
            if (text) { streamed = true; writeText(res, text); }
          } catch {
            // Ignore malformed or incomplete SSE frames.
          }
        };

        while (!done) {
          const { value, done: streamEnded } = await reader.read();
          if (streamEnded) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\\r?\\n/);
          buffer = lines.pop() || '';
          for (const line of lines) { processLine(line); if (done) break; }
        }
        buffer += decoder.decode();
        if (!done && buffer.trim()) processLine(buffer);
        if (streamed) { finish(res); return; }
      } catch (error: any) {
        console.warn(`[Vercel OpenRouter] ${candidate} failed: ${error?.message || error}`);
      }
    }
  }

  try {
    const ai = getGeminiClient();
    if (ai) {
      res.setHeader('X-AI-Model', 'Gemini 2.5 Flash (Gemini API)');
      const contents = messages.map((message: any) => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(message.content ?? '') }],
      }));
      const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents,
        config: { systemInstruction: systemPrompt, temperature: 0.2 },
      });
      let streamed = false;
      for await (const chunk of stream) {
        if (chunk.text) { streamed = true; writeText(res, chunk.text); }
      }
      if (streamed) { finish(res); return; }
    }
  } catch (error: any) {
    console.warn('[Vercel Gemini] fallback failed:', error?.message || error);
  }

  res.setHeader('X-AI-Model', 'Cổ Thư Reasoner (Server Offline)');
  const fallbackText = generateAncientWisdomResponse(lastUserMessage, coupleContext);
  const words = fallbackText.split(' ');
  for (let index = 0; index < words.length; index += 4) {
    writeText(res, words.slice(index, index + 4).join(' ') + (index + 4 < words.length ? ' ' : ''));
  }
  finish(res);
}
