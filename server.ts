import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION_PROMPT } from './src/data/knowledgeBasePrompt';
import { getCanChiByYear, checkNguHanhRelation, getTruongSanhChu, TRUONG_SANH_DATA, CO_THAN_QUA_TU } from './src/data/tamtheData';
import { getCaoLyGiaiDoan } from './src/data/caolyData';
import { generateAncientWisdomResponse } from './src/data/ancientReasoner';
import { generateMetaphysicsState, buildComprehensiveMetaphysicsContext } from './src/data/metaphysicsData';

// OpenRouter Config
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SERVER_OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

// Initialize GoogleGenAI SDK server-side lazily
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

// Helper to stream text smoothly if using fallback engine
async function streamFallbackText(res: express.Response, text: string) {
  const words = text.split(' ');
  const chunkSize = 4;
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(' ') + (i + chunkSize < words.length ? ' ' : '');
    res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  res.write('data: [DONE]\n\n');
  res.end();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
  });

  // Calculate compatibility between couple
  app.post('/api/analyze-couple', (req, res) => {
    try {
      const { chongNamSinh, voNamSinh, chongThangSanh = 1, voThangSanh = 1 } = req.body;
      
      if (!chongNamSinh || !voNamSinh) {
        return res.status(400).json({ error: 'Vui lòng cung cấp năm sinh của vợ và chồng.' });
      }

      const chongInfo = getCanChiByYear(Number(chongNamSinh));
      const voInfo = getCanChiByYear(Number(voNamSinh));

      const tuongSinh = checkNguHanhRelation(chongInfo.nguHanh, voInfo.nguHanh);
      const caoly = getCaoLyGiaiDoan(chongInfo.can, voInfo.chi);

      // Truong sanh
      const chuChong = getTruongSanhChu(chongInfo.nguHanh, Number(chongThangSanh));
      const chuVo = getTruongSanhChu(voInfo.nguHanh, Number(voThangSanh));
      const giaiDoanChong = TRUONG_SANH_DATA[chuChong];
      const giaiDoanVo = TRUONG_SANH_DATA[chuVo];

      // Co Than - Qua Tu
      const coThanCheck = CO_THAN_QUA_TU[chongInfo.chi];
      const quaTuCheck = CO_THAN_QUA_TU[voInfo.chi];
      const chongPhamCoThan = coThanCheck ? coThanCheck.traiPham.includes(Number(chongThangSanh)) : false;
      const voPhamQuaTu = quaTuCheck ? quaTuCheck.gaiPham.includes(Number(voThangSanh)) : false;

      let coThanQuaTuChiTiet = 'Không phạm tháng Cô Thần hay Quả Tú.';
      if (chongPhamCoThan && voPhamQuaTu) {
        coThanQuaTuChiTiet = `Chồng sinh tháng ${chongThangSanh} phạm Cô Thần; Vợ sinh tháng ${voThangSanh} phạm Quả Tú. Vợ chồng dễ lận đận buổi đầu, cần nhẫn nại hóa giải.`;
      } else if (chongPhamCoThan) {
        coThanQuaTuChiTiet = `Chồng sinh tháng ${chongThangSanh} phạm Cô Thần. Đàn ông số dễ chịu cảnh bôn ba chậm duyên, về sau mới đặng yên ấm.`;
      } else if (voPhamQuaTu) {
        coThanQuaTuChiTiet = `Vợ sinh tháng ${voThangSanh} phạm Quả Tú. Người vợ số phòng loan quạnh quẽ, nên tu tâm dưỡng tính để gia đạo ấm êm.`;
      }

      // Calculate overall score (0 - 100)
      let score = 70;
      if (tuongSinh.hop) score += 15;
      else score -= 15;

      if (caoly.danhGia === 'Đại Cát') score += 15;
      else if (caoly.danhGia === 'Cát') score += 10;
      else if (caoly.danhGia === 'Hung') score -= 15;
      else if (caoly.danhGia === 'Đại Hung') score -= 25;

      if (chongPhamCoThan || voPhamQuaTu) score -= 8;
      score = Math.max(20, Math.min(98, score));

      let xepLoai: any = 'Cát Duyên';
      if (score >= 85) xepLoai = 'Thượng Cát';
      else if (score >= 70) xepLoai = 'Cát Duyên';
      else if (score >= 55) xepLoai = 'Bình Duyên';
      else if (score >= 40) xepLoai = 'Tiền Khổ Hậu Cam';
      else xepLoai = 'Nhiều Thử Thách';

      let loiKhuyenHoaGiai = 'Vợ chồng lấy đạo nghĩa làm trọng, "Đức Năng Thắng Số", tương kính như tân, cùng nhau tích thiện bồi đức để hưởng phúc bền lâu.';
      if (score < 60) {
        loiKhuyenHoaGiai = 'Cặp đôi có một số nét xung khắc tiền duyên. Cổ nhân khuyên nên: Đi làm ăn xa quê hương (tha hương lập nghiệp), học cách dằn bớt nóng giận khẩu thiệt, làm nhiều việc thiện phóng sanh, chia sẻ tài lộc để chuyển họa thành phúc.';
      }

      res.json({
        chong: chongInfo,
        vo: voInfo,
        tuongSinhMenh: tuongSinh,
        caoly,
        tamtheTruongSanh: {
          chuChong,
          chuVo,
          giaiDoanChong,
          giaiDoanVo,
        },
        coThanQuaTu: {
          chongPham: chongPhamCoThan,
          voPham: voPhamQuaTu,
          chiTiet: coThanQuaTuChiTiet,
        },
        tongKetDuyenNo: {
          diemSo: score,
          xepLoai,
          loiKhuyenHoaGiai,
        },
      });
    } catch (err: any) {
      console.error('Error analyzing couple:', err);
      res.status(500).json({ error: 'Lỗi trong quá trình phân tích tuổi vợ chồng.' });
    }
  });

  // Get real-time Metaphysics Board State (24 Tiết Khí, Bát Tự, Kỳ Môn Độn Giáp, Lục Nhâm)
  app.get('/api/metaphysics/state', (req, res) => {
    try {
      const state = generateMetaphysicsState(new Date());
      res.json(state);
    } catch (err: any) {
      res.status(500).json({ error: 'Không thể lấy dữ liệu tiết khí & cổ thuật.' });
    }
  });

  // Get list of supported OpenRouter models
  app.get('/api/openrouter/models', (req, res) => {
    res.json({
      defaultModel: 'google/gemini-2.5-flash',
      models: [
        {
          id: 'google/gemini-2.5-flash',
          name: 'Gemini 2.5 Flash',
          desc: 'Tốc độ nhanh, giải đoán sắc bén, hỗ trợ toàn diện (Khuyên dùng)',
          badge: 'Mặc định',
        },
        {
          id: 'google/gemini-2.5-pro',
          name: 'Gemini 2.5 Pro',
          desc: 'Tối ưu cho luận giải Bát tự, Tiết khí, Kỳ Môn Độn Giáp, Lục Nhâm',
          badge: 'Chuyên sâu',
        },
        {
          id: 'anthropic/claude-3.5-sonnet',
          name: 'Claude 3.5 Sonnet',
          desc: 'Văn phong cổ thi trau chuốt, thấu cảm sâu sắc',
          badge: 'Văn phong',
        },
        {
          id: 'deepseek/deepseek-chat',
          name: 'DeepSeek Chat V3',
          desc: 'Lý giải thuật số, nạp âm, tuần không chi tiết',
          badge: 'Thuật số',
        },
      ],
    });
  });

  // Get OpenRouter & Gemini configuration status
  app.get('/api/openrouter/config-status', (req, res) => {
    res.json({
      hasServerOpenRouterKey: Boolean(SERVER_OPENROUTER_API_KEY),
      hasServerGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Test custom user OpenRouter API Key
  app.post('/api/openrouter/test-key', async (req, res) => {
    const { apiKey } = req.body;
    const testKey = (apiKey || SERVER_OPENROUTER_API_KEY || '').toString().trim();

    if (!testKey) {
      return res.status(400).json({ success: false, error: 'Vui lòng cung cấp OpenRouter API Key để kiểm tra.' });
    }

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${testKey}`,
          'HTTP-Referer': 'https://ai.studio',
          'X-Title': 'Can Duyen Tien Dinh Key Test',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [{ role: 'user', content: 'Xin chào, trả lời ngắn 1 từ: OK' }],
          max_tokens: 10,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'OK';
        return res.json({ success: true, message: 'Khóa OpenRouter hợp lệ và kết nối thành công!', sampleReply: reply });
      } else {
        const errText = await response.text();
        let errMsg = `Lỗi từ OpenRouter (Mã ${response.status})`;
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error?.message) errMsg = errJson.error.message;
        } catch {
          // Ignore
        }
        return res.status(response.status).json({ success: false, error: errMsg });
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, error: `Không thể kết nối đến OpenRouter: ${err.message}` });
    }
  });

  // Handler function for OpenRouter Chat with Streaming
  async function handleOpenRouterChat(req: express.Request, res: express.Response) {
    // Stream response using SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const { messages, coupleContext, model = 'google/gemini-2.5-flash', apiKey } = req.body;
    const clientKey = (apiKey || req.headers['x-openrouter-key'] || '').toString().trim();
    const effectiveOpenRouterKey = clientKey || SERVER_OPENROUTER_API_KEY;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return streamFallbackText(res, 'Dạ thưa quý bạn, xin vui lòng gửi nội dung câu hỏi về tuổi, tiết khí hoặc nhân duyên để ta giải đáp.');
    }

    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // Build rich system instruction with current metaphysics state & couple context
    const metaphysicsContext = buildComprehensiveMetaphysicsContext(coupleContext, new Date());
    const fullSystemPrompt = `${SYSTEM_INSTRUCTION_PROMPT}\n\n${metaphysicsContext}`;

    // Format messages for OpenRouter / OpenAI compatible API
    const openRouterMessages = [
      { role: 'system', content: fullSystemPrompt },
      ...messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    ];

    try {
      if (effectiveOpenRouterKey) {
        const response = await fetch(OPENROUTER_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${effectiveOpenRouterKey}`,
            'HTTP-Referer': 'https://ai.studio',
            'X-Title': 'Can Duyen Tien Dinh & Co Thuat Metaphysics',
          },
          body: JSON.stringify({
            model: model || 'google/gemini-2.5-flash',
            messages: openRouterMessages,
            stream: true,
            temperature: 0.7,
            max_tokens: 2500,
          }),
        });

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';
          let hasStreamedData = false;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith(':')) continue;
              if (trimmed === 'data: [DONE]') {
                res.write('data: [DONE]\n\n');
                res.end();
                return;
              }
              if (trimmed.startsWith('data: ')) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const textChunk = json.choices?.[0]?.delta?.content || '';
                  if (textChunk) {
                    hasStreamedData = true;
                    res.write(`data: ${JSON.stringify({ text: textChunk })}\n\n`);
                  }
                } catch {
                  // Ignore JSON parse chunk errors
                }
              }
            }
          }

          if (hasStreamedData) {
            res.write('data: [DONE]\n\n');
            res.end();
            return;
          }
        } else {
          console.warn('OpenRouter API returned error status:', response.status, await response.text().catch(() => ''));
        }
      }
    } catch (openRouterErr: any) {
      console.warn('OpenRouter request failed, attempting Gemini SDK / Ancient Reasoner fallback:', openRouterErr.message);
    }

    // Secondary Fallback: Try Gemini SDK if key exists
    try {
      const ai = getGeminiClient();
      if (ai) {
        const conversationContents = messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

        const responseStream = await ai.models.generateContentStream({
          model: 'gemini-2.5-flash',
          contents: conversationContents,
          config: {
            systemInstruction: fullSystemPrompt,
            temperature: 0.7,
          },
        });

        let hasSentData = false;
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            hasSentData = true;
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        }

        if (hasSentData) {
          res.write('data: [DONE]\n\n');
          res.end();
          return;
        }
      }
    } catch (geminiErr: any) {
      console.warn('Gemini SDK fallback also failed:', geminiErr.message);
    }

    // Final Fallback: Ancient Wisdom Reasoner Engine
    const fallbackText = generateAncientWisdomResponse(lastUserMessage, coupleContext);
    return await streamFallbackText(res, fallbackText);
  }

  // AI Chat Endpoints
  app.post('/api/chat', handleOpenRouterChat);
  app.post('/api/openrouter/chat', handleOpenRouterChat);

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
