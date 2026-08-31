import { CoupleAnalysisResult, Message } from '../types';
import { generateMetaphysicsState } from '../data/metaphysicsData';
import { SYSTEM_INSTRUCTION_PROMPT } from '../data/knowledgeBasePrompt';
import { generateAncientWisdomResponse } from '../data/ancientReasoner';
import { getStoredOpenRouterKey } from '../components/ApiKeySettingsModal';

export interface StreamChatOptions {
  messages: Array<{ role: string; content: string }>;
  coupleContext?: CoupleAnalysisResult | null;
  model?: string;
  userApiKey?: string;
  onChunk: (accumulatedText: string) => void;
  onError?: (error: any) => void;
}

export async function streamAIChat({
  messages,
  coupleContext,
  model = 'google/gemini-2.5-flash',
  userApiKey,
  onChunk,
  onError,
}: StreamChatOptions): Promise<void> {
  const effectiveKey = (userApiKey || getStoredOpenRouterKey() || '').trim();
  const lastUserMsg = messages.filter((m) => m.role === 'user').slice(-1)[0]?.content || '';

  // Prepare system context
  const metaState = generateMetaphysicsState(new Date());
  let coupleSummary = 'Chưa có thông tin cặp đôi trong phiên làm việc hiện tại.';
  if (coupleContext) {
    coupleSummary = `
- Chồng: ${coupleContext.chong.fullName} (${coupleContext.chong.lunarYear}), Mạng: ${coupleContext.chong.menh} (${coupleContext.chong.nguHanh}).
- Vợ: ${coupleContext.vo.fullName} (${coupleContext.vo.lunarYear}), Mạng: ${coupleContext.vo.menh} (${coupleContext.vo.nguHanh}).
- Tương quan Ngũ Hành: ${coupleContext.tuongSinhMenh.quanHe} (${coupleContext.tuongSinhMenh.hop ? 'Hợp' : 'Khắc'}).
- Cao Ly Đầu Hình: ${coupleContext.caoly.tenDoHinh} (${coupleContext.caoly.danhGia}). Thơ: "${coupleContext.caoly.thoHanNom}". Chú giải: ${coupleContext.caoly.chuThich}.
- 12 Cung Trường Sanh: Chồng (${coupleContext.tamtheTruongSanh?.chuChong || 'Trường Sanh'}), Vợ (${coupleContext.tamtheTruongSanh?.chuVo || 'Trường Sanh'}).
- Hạn Cô Thần - Quả Tú: ${coupleContext.coThanQuaTu?.chiTiet || 'Không phạm'}.
- Điểm hòa hợp tổng quan: ${coupleContext.tongKetDuyenNo.diemSo}/100 (${coupleContext.tongKetDuyenNo.xepLoai}).
- Lời khuyên cổ nhân: ${coupleContext.tongKetDuyenNo.loiKhuyenHoaGiai}
`;
  }

  const systemPrompt = `${SYSTEM_INSTRUCTION_PROMPT}

### BÀN QUẺ & THỜI LỆNH ĐANG LƯU HÀNH (THỜI ĐIỂM HIỆN TẠI):
- 24 Tiết Khí: ${metaState.solarTerm.name} (${metaState.solarTerm.hanTu}) — Ngũ hành vượng: ${metaState.solarTerm.nguHanhVuong}, Tướng: ${metaState.solarTerm.nguHanhTuong}.
- Bát Tự Ngày Giờ: Năm ${metaState.batTuHienTai.nam} • Tháng ${metaState.batTuHienTai.thang} • Ngày ${metaState.batTuHienTai.ngay} • Giờ ${metaState.batTuHienTai.gio}.
- Kỳ Môn Độn Giáp: ${metaState.kyMonDonGiap.don} Cục ${metaState.kyMonDonGiap.cuc} • Trực Phù ${metaState.kyMonDonGiap.trucPhu} • Trực Sử ${metaState.kyMonDonGiap.trucSu}.
- Đại Lục Nhâm: Nguyệt Tướng ${metaState.lucNham.nguyetTuong} • Thời Địa: ${metaState.lucNham.thoiDia} • Tam Truyền: ${metaState.lucNham.tamTruyen.map((t) => `${t.so}: ${t.canChi} (${t.than})`).join(' ➔ ')}.

### THÔNG TIN CẶP ĐÔI ĐANG TRA CỨU:
${coupleSummary}
`;

  // Strategy 1: Direct OpenRouter call from client if user has an API Key (Works 100% on Vercel & GitHub)
  if (effectiveKey) {
    try {
      const openRouterMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveKey}`,
          'HTTP-Referer': window.location.origin || 'https://ai.studio',
          'X-Title': 'Nhan Duyen Tien Dinh Co Thuat',
        },
        body: JSON.stringify({
          model: model,
          messages: openRouterMessages,
          stream: true,
          temperature: 0.7,
          max_tokens: 2500,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.warn(`OpenRouter direct call failed (${response.status}):`, errorText);
        // If 401 or invalid key, notify and fallback
        if (response.status === 401 || response.status === 402) {
          throw new Error(`Khóa OpenRouter không hợp lệ hoặc đã hết hạn mức (Mã ${response.status}). Đang chuyển sang Động cơ Cổ Thư nội bộ.`);
        }
        throw new Error(`OpenRouter returned status ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              const dataStr = trimmed.slice(6);
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                const delta = parsed.choices?.[0]?.delta?.content || '';
                if (delta) {
                  accumulated += delta;
                  onChunk(accumulated);
                }
              } catch {
                // Ignore parse errors for partial chunks
              }
            }
          }
        }
      }

      if (accumulated.trim().length > 0) {
        return; // Success!
      }
    } catch (err: any) {
      console.warn('Direct OpenRouter call error, falling back:', err?.message || err);
      // If error occurred, proceed to fallback below
    }
  }

  // Strategy 2: Attempt Express Server-side Route (if running on a full-stack container)
  try {
    const serverResponse = await fetch('/api/openrouter/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        coupleContext,
        model,
        apiKey: effectiveKey,
      }),
    });

    if (serverResponse.ok) {
      const reader = serverResponse.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  accumulated += parsed.text;
                  onChunk(accumulated);
                }
              } catch {
                // Ignore
              }
            }
          }
        }
      }

      if (accumulated.trim().length > 0) {
        return; // Success!
      }
    }
  } catch {
    // Backend not reachable or returned 404 (e.g. static Vercel deployment)
  }

  // Strategy 3: Pure Client-Side Metaphysics Wisdom Engine (100% Offline, Zero-404 Guarantee)
  const staticWisdom = generateAncientWisdomResponse(lastUserMsg, coupleContext);
  
  // Simulate smooth streaming typewriter effect
  let currentOutput = '';
  const chunkSize = 6;
  for (let i = 0; i < staticWisdom.length; i += chunkSize) {
    currentOutput += staticWisdom.slice(i, i + chunkSize);
    onChunk(currentOutput);
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
}
