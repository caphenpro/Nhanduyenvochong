import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION_PROMPT } from './src/data/knowledgeBasePrompt';
import { getCanChiByYear, checkNguHanhRelation, getTruongSanhChu, TRUONG_SANH_DATA, CO_THAN_QUA_TU } from './src/data/tamtheData';
import { getCaoLyGiaiDoan } from './src/data/caolyData';

// Initialize GoogleGenAI SDK server-side
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Warning: GEMINI_API_KEY is not set. Chat AI features may return fallback responses.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'dummy-key',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
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

  // AI Chat Endpoint with Streaming
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, coupleContext } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm khóa API trong phần Settings > Secrets.',
        });
      }

      const ai = getGeminiClient();

      // Format conversation history for Gemini
      const conversationContents = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      // Add couple context if provided
      let systemInstruction = SYSTEM_INSTRUCTION_PROMPT;
      if (coupleContext) {
        systemInstruction += `\n\n--- DỮ LIỆU ĐANG TRA CỨU HIỆN TẠI CỦA NGƯỜI DÙNG ---\n${JSON.stringify(coupleContext, null, 2)}\nHãy tham chiếu chặt chẽ dữ liệu này khi trả lời nếu người dùng hỏi về cặp tuổi này.`;
      }

      // Stream response using SSE
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.7-flash',
        contents: conversationContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || 'Lỗi xử lý phản hồi từ AI.' });
      } else {
        res.write(`data: ${JSON.stringify({ error: err.message || 'Lỗi trong lúc truyền tin' })}\n\n`);
        res.end();
      }
    }
  });

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
