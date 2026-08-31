import { CoupleAnalysisResult, Message } from '../types';
import { generateMetaphysicsState } from '../data/metaphysicsData';
import { SYSTEM_INSTRUCTION_PROMPT } from '../data/knowledgeBasePrompt';
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

  // Prepare system context
  const metaState = generateMetaphysicsState(new Date());
  let coupleSummary = 'Chưa có thông tin cặp đôi trong phiên làm việc hiện tại.';
  if (coupleContext) {
    coupleSummary = `
- Chồng: ${coupleContext.chong.fullName} (${coupleContext.chong.lunarYear}), Can: ${coupleContext.chong.can} (${coupleContext.chong.canNguHanh}), Chi: ${coupleContext.chong.chi} (${coupleContext.chong.chiNguHanh}), Mạng Nạp Âm: ${coupleContext.chong.menh} (${coupleContext.chong.nguHanh}), Cung Phi: ${coupleContext.chong.cungPhi} (${coupleContext.chong.dongTayMenh}).
- Vợ: ${coupleContext.vo.fullName} (${coupleContext.vo.lunarYear}), Can: ${coupleContext.vo.can} (${coupleContext.vo.canNguHanh}), Chi: ${coupleContext.vo.chi} (${coupleContext.vo.chiNguHanh}), Mạng Nạp Âm: ${coupleContext.vo.menh} (${coupleContext.vo.nguHanh}), Cung Phi: ${coupleContext.vo.cungPhi} (${coupleContext.vo.dongTayMenh}).
- Tầng 1 Thiên Can: ${coupleContext.tang1ThienCan.quanHe} (${coupleContext.tang1ThienCan.chiTiet}).
- Tầng 2 Địa Chi: ${coupleContext.tang2DiaChi.chiTietDong}.
- Tầng 3 Ngũ Hành: ${coupleContext.tang3NguHanh.chiTiet}.
- Tầng 4 Nạp Âm: ${coupleContext.tang4NapAm.quanHe} (${coupleContext.tang4NapAm.phanBietRoRang}).
- Tầng 5 Bát Trạch: ${coupleContext.tang5CungMenh.ketQuaBatTrach} (${coupleContext.tang5CungMenh.nhomBatTrach}) - ${coupleContext.tang5CungMenh.yNghia}.
- Cấu Trúc Tổng Hợp:
  + Điểm thuận: ${coupleContext.cauTrucTongHop.diemThuan.join('; ')}.
  + Điểm nghịch: ${coupleContext.cauTrucTongHop.diemNghich.join('; ')}.
  + Điểm lưu ý: ${coupleContext.cauTrucTongHop.diemLuuY.join('; ')}.
  + Thông điệp cốt lõi: "${coupleContext.cauTrucTongHop.thongDiepCotLoi}".
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

  // Determine the sequence of models to try
  const candidateModels: string[] =
    model === AUTO_MODEL_ID || !model
      ? AUTO_FALLBACK_CHAIN
      : [model, ...AUTO_FALLBACK_CHAIN.filter((m) => m !== model)];

  // Strategy 1: Direct OpenRouter call with Auto-Fallback across candidate models
  if (effectiveKey) {
    for (const currentCandidate of candidateModels) {
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
            model: currentCandidate,
            messages: openRouterMessages,
            stream: true,
            temperature: 0.7,
            max_tokens: 2500,
          }),
        });

        // If rate limited (429), quota exceeded (402), or model unavailable (404/503), try next model
        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          console.warn(`[Auto-Fallback] Model ${currentCandidate} returned ${response.status}: ${errText}. Đang tự động chuyển sang mô hình tiếp theo...`);
          continue; // Try next model in fallback chain
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulated = '';

        if (reader) {
          if (onModelResolved) {
            const foundObj = AI_MODELS_LIST.find((m) => m.id === currentCandidate);
            onModelResolved(foundObj ? foundObj.name : currentCandidate);
          }

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
          return; // Successfully completed streaming!
        }
      } catch (err: any) {
        console.warn(`[Auto-Fallback] Error with model ${currentCandidate}:`, err?.message || err);
        // Continue to next candidate model
      }
    }
  }

  // Strategy 2: Attempt Express Server-side Route (Supports internal Auto-Fallback across keys & models)
  try {
    const serverResponse = await fetch('/api/openrouter/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        coupleContext,
        model: model,
        apiKey: effectiveKey,
      }),
    });

    if (serverResponse.ok) {
      const reader = serverResponse.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      if (reader) {
        if (onModelResolved) {
          onModelResolved('Động cơ AI Tự Động (Máy chủ)');
        }

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

  // Strategy 3: Pure Client-Side Metaphysics Wisdom Engine (100% Offline, Zero-Error Guarantee)
  if (onModelResolved) {
    onModelResolved('Cổ Thư Reasoner (Offline Độc Lập)');
  }
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
