import { CoupleAnalysisResult, Message } from '../types';
import { generateAncientWisdomResponse } from '../data/ancientReasoner';
import { getStoredOpenRouterKey } from '../components/ApiKeySettingsModal';

export const AUTO_MODEL_ID = 'auto';

export const AI_MODELS_LIST = [
  {
    id: AUTO_MODEL_ID,
    name: '⚡ Tự Động Chọn Tối Ưu',
    badge: 'Khuyên dùng',
    desc: 'Tự động luân chuyển mô hình khi hết gói miễn phí hoặc quá tải',
    isAuto: true,
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    badge: 'Nhanh & Chuẩn',
    desc: 'Tốc độ cao, phân tích đa tầng toàn diện',
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek Chat V3',
    badge: 'Thuật số',
    desc: 'Lý giải thuật số, nạp âm và phân tích lý tính',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B (Free)',
    badge: 'Miễn phí',
    desc: 'Mô hình mã nguồn mở mạnh mẽ, dự phòng tin cậy',
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct:free',
    name: 'Qwen 2.5 72B (Free)',
    badge: 'Miễn phí',
    desc: 'Khả năng tiếng Việt vượt trội, hỗ trợ thuật thư',
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash (Free)',
    badge: 'Miễn phí',
    desc: 'Bản thử nghiệm miễn phí từ Google',
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    badge: 'Văn phong',
    desc: 'Văn phong cổ thi trau chuốt, sâu sắc',
  },
];

// Danh sách các mô hình trong chuỗi tự động fallback khi hết quota hoặc lỗi
export const AUTO_FALLBACK_CHAIN = [
  'google/gemini-2.5-flash',
  'deepseek/deepseek-chat',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-small-24b-instruct-2501:free',
];

export interface StreamChatOptions {
  messages: Array<{ role: string; content: string }>;
  coupleContext?: CoupleAnalysisResult | null;
  model?: string;
  userApiKey?: string;
  onChunk: (accumulatedText: string) => void;
  onModelResolved?: (modelName: string) => void;
  onError?: (error: any) => void;
}

export async function streamAIChat({
  messages,
  coupleContext,
  model = AUTO_MODEL_ID,
  userApiKey,
  onChunk,
  onModelResolved,
  onError,
}: StreamChatOptions): Promise<void> {
  const effectiveKey = (userApiKey || getStoredOpenRouterKey() || '').trim();
  const lastUserMsg = messages.filter((m) => m.role === 'user').slice(-1)[0]?.content || '';

  let onlineError: any = null;

  // Route every online request through the server gateway first. This keeps the
  // OpenRouter credential out of browser-to-provider requests and centralizes
  // rate-limit handling and model fallback.
  try {
    const serverResponse = await fetch('/api/openrouter/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(effectiveKey ? { 'x-openrouter-key': effectiveKey } : {}),
      },
      body: JSON.stringify({ messages, coupleContext, model }),
    });

    if (!serverResponse.ok) {
      const errorBody = await serverResponse.text().catch(() => '');
      throw new Error(`Máy chủ AI trả về HTTP ${serverResponse.status}: ${errorBody.slice(0, 300)}`);
    }

    const reader = serverResponse.body?.getReader();
    if (reader) {
      onModelResolved?.(serverResponse.headers.get('X-AI-Model') || 'Động cơ AI qua máy chủ');
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let accumulated = '';
      let finished = false;

      const processLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) return;
        const dataStr = trimmed.slice(5).trim();
        if (dataStr === '[DONE]') {
          finished = true;
          return;
        }
        try {
          const parsed = JSON.parse(dataStr);
          const textChunk = parsed.text || parsed.choices?.[0]?.delta?.content || '';
          if (textChunk) {
            accumulated += textChunk;
            onChunk(accumulated);
          }
        } catch {
          // Ignore malformed or incomplete SSE frames; the remaining buffer is retained.
        }
      };

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() || '';
        for (const line of lines) {
          processLine(line);
          if (finished) break;
        }
      }

      buffer += decoder.decode();
      if (!finished && buffer.trim()) processLine(buffer);
      if (accumulated.trim()) return;
      throw new Error('Máy chủ AI kết thúc luồng nhưng không trả về nội dung.');
    }
    throw new Error('Máy chủ AI không trả về luồng dữ liệu.');
  } catch (err: any) {
    console.warn('[AI Gateway] Không thể hoàn tất yêu cầu qua máy chủ:', err?.message || err);
    onlineError = err;
  }

  // Static SPA deployments may not expose the Express gateway. In that case,
  // retain a direct OpenRouter fallback for the user's own browser-stored key.
  if (effectiveKey) {
    const candidateModels = model === AUTO_MODEL_ID || !model
      ? AUTO_FALLBACK_CHAIN
      : [model, ...AUTO_FALLBACK_CHAIN.filter((candidate) => candidate !== model)];
    const shouldUseWebSearch =
      /nguồn|trích dẫn|tham khảo|đối chiếu|kiểm chứng|xác minh|mới nhất|hiện nay|hiện tại|hôm nay|gần đây|tin tức|tìm trên mạng|web search|website|đường dẫn|link|giá hiện tại|quy định mới/i.test(lastUserMsg);

    for (const candidate of candidateModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${effectiveKey}`,
            'HTTP-Referer': window.location.origin || 'https://ai.studio',
            'X-Title': 'Nhan Duyen Tien Dinh Co Thuat',
          },
          body: JSON.stringify({
            model: candidate,
            messages: [
              { role: 'system', content: 'Hãy trả lời bằng tiếng Việt, lập luận rõ ràng, phân biệt dữ liệu cổ thư với nhận định hiện đại và nêu giới hạn khi thiếu căn cứ.' },
              ...messages.map((message) => ({ role: message.role, content: message.content })),
            ],
            stream: true,
            temperature: 0.4,
            max_tokens: 2200,
            ...(shouldUseWebSearch ? { plugins: [{ id: 'web' }] } : {}),
          }),
        });

        if (!response.ok) {
          if ([401, 402, 403].includes(response.status)) break;
          const retryAfter = response.headers.get('retry-after');
          if (response.status === 429 && retryAfter) {
            const seconds = Number(retryAfter);
            const delay = Number.isFinite(seconds) ? seconds * 1000 : Math.max(0, Date.parse(retryAfter) - Date.now());
            if (delay > 0) await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 2000)));
          }
          continue;
        }

        const reader = response.body?.getReader();
        if (!reader) continue;
        const resolved = AI_MODELS_LIST.find((item) => item.id === candidate);
        onModelResolved?.(resolved ? resolved.name : candidate);
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let accumulated = '';
        let finished = false;
        const processLine = (line: string) => {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) return;
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') { finished = true; return; }
          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) { accumulated += delta; onChunk(accumulated); }
          } catch { /* Ignore incomplete SSE frames. */ }
        };
        while (!finished) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\\r?\\n/);
          buffer = lines.pop() || '';
          for (const line of lines) { processLine(line); if (finished) break; }
        }
        buffer += decoder.decode();
        if (!finished && buffer.trim()) processLine(buffer);
        if (accumulated.trim()) return;
      } catch (err: any) {
        onlineError = err;
      }
    }
  }

  if (onlineError) onError?.(onlineError);

  // Final offline fallback: preserve the app's local reasoning capability.
  onModelResolved?.('Cổ Thư Reasoner (Offline Độc Lập)');
  const staticWisdom = generateAncientWisdomResponse(lastUserMsg, coupleContext);
  let currentOutput = '';
  const chunkSize = 6;
  for (let i = 0; i < staticWisdom.length; i += chunkSize) {
    currentOutput += staticWisdom.slice(i, i + chunkSize);
    onChunk(currentOutput);
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
}
