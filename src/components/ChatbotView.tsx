import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Volume2, VolumeX, Copy, Check, BookOpen, Compass, Cpu, Layers, ChevronDown, Key } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, CoupleAnalysisResult } from '../types';
import { generateMetaphysicsState, MetaphysicsBoardState } from '../data/metaphysicsData';
import { ApiKeySettingsModal, getStoredOpenRouterKey } from './ApiKeySettingsModal';

interface ChatbotViewProps {
  currentCoupleResult: CoupleAnalysisResult | null;
  onNavigateToLookup: () => void;
  onOpenApiKeySettings?: () => void;
}

const SAMPLE_PROMPTS = [
  'Chồng tuổi Bính Tý (1996) lấy vợ tuổi Đinh Sửu (1997) theo sách cổ hạp khắc ra sao?',
  'Phép xem duyên nợ theo Cao Ly Đầu Hình (Can chồng phối Chi vợ) tính thế nào?',
  'Phân tích Kỳ Môn Độn Giáp & 24 Tiết Khí hiện tại ảnh hưởng gì đến căn duyên?',
  'Đại Lục Nhâm: Tứ Khóa & Tam Truyền luận về tình cảm vợ chồng thế nào?',
  'Nếu tuổi vợ chồng phạm Cô Thần, Quả Tú hoặc Tuyệt Mạng thì hóa giải bằng cách nào?',
  'Ý nghĩa của 12 chữ Trường Sanh trong việc xem số vợ chồng ở Diễn Cầm Tam Thế?',
  'Cổ nhân dạy thế nào về triết lý "Đức Năng Thắng Số" trong hôn nhân?',
];

const AVAILABLE_MODELS = [
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', badge: 'Mặc định' },
  { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', badge: 'Chuyên sâu' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', badge: 'Văn phong' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat V3', badge: 'Thuật số' },
];

export const ChatbotView: React.FC<ChatbotViewProps> = ({ currentCoupleResult, onNavigateToLookup, onOpenApiKeySettings }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Kính chào quý bạn! Ta là **Cụ Căn Duyên**, được đúc kết từ hai bộ cổ thư trứ danh:\n\n* 📜 **Diễn Cầm Tam Thế Diễn Nghĩa** *(soạn giả Dương Công Hầu - hiệu Khương Đức, 1952)*\n* 📖 **Cao Ly Đầu Hình** *(soạn giả Đoàn Văn Đâu, bản dịch NXB Hồng Dân Sài Gòn)*\n* ⚡ **Kỳ Môn Độn Giáp, Đại Lục Nhâm & 24 Tiết Khí** thời lệnh cổ truyền\n\nQuý bạn muốn tầm khảo về **nhân duyên vợ chồng, căn số tiền định, hòa hợp Can Chi - Mạng Ngũ Hành, 12 cung Trường Sanh, hào con cái hay phương pháp tu tâm hóa giải xung khắc**? Hãy cho ta biết năm sinh (hoặc Can Chi) của hai bạn nhé!`,
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedModel, setSelectedModel] = useState('google/gemini-2.5-flash');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showMetaphysicsBoard, setShowMetaphysicsBoard] = useState(false);
  const [metaState] = useState<MetaphysicsBoardState>(() => generateMetaphysicsState(new Date()));
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [userKey, setUserKey] = useState<string>(() => getStoredOpenRouterKey());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#`_~[\]()]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || isLoading) return;

    if (!customPrompt) setInput('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setMessages([...newMessages, assistantMessage]);

    try {
      const response = await fetch('/api/openrouter/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          coupleContext: currentCoupleResult,
          model: selectedModel,
          apiKey: userKey || getStoredOpenRouterKey(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              if (dataStr === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId ? { ...msg, content: accumulatedText } : msg
                    )
                  );
                } else if (parsed.error) {
                  accumulatedText += `\n\n*(Thông báo: ${parsed.error})*`;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId ? { ...msg, content: accumulatedText } : msg
                    )
                  );
                }
              } catch {
                // non-JSON chunk
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  msg.content ||
                  `Dạ thưa quý bạn, hiện tại đường truyền đang gián đoạn (${err.message || 'Lỗi kết nối'}). Quý bạn vui lòng kiểm tra lại hoặc thử lại sau giây lát.`,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Quý bạn có chắc muốn bắt đầu lại cuộc đàm đạo mới không?')) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'assistant',
          content: `Kính chào quý bạn! Ta đã sẵn sàng lắng nghe mọi câu hỏi về nhân duyên, số mệnh vợ chồng, con cái theo sách cổ. Xin mời quý bạn đưa ra câu hỏi.`,
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const currentModelName = AVAILABLE_MODELS.find((m) => m.id === selectedModel)?.name || 'Gemini 2.5 Flash';

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-5xl mx-auto w-full px-2 sm:px-4 py-3">
      {/* Top Bar: Model Switcher & Metaphysics Live Indicator */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl shadow-2xs text-xs">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowModelMenu(!showModelMenu)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-medium transition-colors border border-amber-300"
            >
              <Cpu className="w-3.5 h-3.5 text-amber-800" />
              <span>{currentModelName}</span>
              <ChevronDown className="w-3 h-3 text-amber-800" />
            </button>

            {showModelMenu && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-amber-300 rounded-xl shadow-xl z-50 p-1 space-y-1">
                {AVAILABLE_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setShowModelMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                      selectedModel === model.id ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-amber-50 text-stone-700'
                    }`}
                  >
                    <span>{model.name}</span>
                    <span className="text-[10px] text-amber-700 font-normal">{model.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowMetaphysicsBoard(!showMetaphysicsBoard)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-colors ${
              showMetaphysicsBoard
                ? 'bg-amber-900 text-amber-100 border-amber-900'
                : 'bg-white hover:bg-amber-100/60 text-amber-900 border-amber-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Tiết: {metaState.solarTerm.name} &bull; Kỳ Môn {metaState.kyMonDonGiap.don}</span>
          </button>

          <button
            id="chat-open-api-settings-btn"
            onClick={() => (onOpenApiKeySettings ? onOpenApiKeySettings() : setIsApiKeyModalOpen(true))}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-colors ${
              userKey
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-950 border-amber-300'
            }`}
            title="Cài đặt API Key OpenRouter"
          >
            <Key className="w-3.5 h-3.5 text-amber-700" />
            <span>{userKey ? 'Khóa API: Đã Lưu' : 'Nhập API Key'}</span>
          </button>
        </div>

        <div className="text-[11px] text-amber-800 hidden sm:block">
          Ngũ hành lệnh: <strong className="text-amber-950">{metaState.solarTerm.nguHanhVuong}</strong> vượng, <strong>{metaState.solarTerm.nguHanhTuong}</strong> tướng
        </div>
      </div>

      {/* Metaphysics Board Context View (Collapsible) */}
      {showMetaphysicsBoard && (
        <div className="mb-3 p-3 bg-amber-900 text-amber-50 rounded-xl text-xs space-y-2 animate-fadeIn border border-amber-700 shadow-md">
          <div className="flex items-center justify-between font-bold border-b border-amber-700/60 pb-1">
            <span className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>Bàn Quẻ Cổ Thuật Thời Lệnh (Kỳ Môn & Đại Lục Nhâm)</span>
            </span>
            <span className="text-[10px] text-amber-300">{metaState.currentDateStr}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="bg-amber-950/60 p-2 rounded-lg border border-amber-800">
              <div className="text-amber-300 font-semibold mb-0.5">24 Tiết Khí</div>
              <div>Tiết: <strong>{metaState.solarTerm.name}</strong> ({metaState.solarTerm.hanTu})</div>
              <div>Vượng: {metaState.solarTerm.nguHanhVuong} - Tướng: {metaState.solarTerm.nguHanhTuong}</div>
            </div>

            <div className="bg-amber-950/60 p-2 rounded-lg border border-amber-800">
              <div className="text-amber-300 font-semibold mb-0.5">Kỳ Môn Độn Giáp</div>
              <div>Cục: <strong>{metaState.kyMonDonGiap.don} {metaState.kyMonDonGiap.cuc} Cục</strong></div>
              <div>Trực Sử: {metaState.kyMonDonGiap.trucSu}</div>
            </div>

            <div className="bg-amber-950/60 p-2 rounded-lg border border-amber-800">
              <div className="text-amber-300 font-semibold mb-0.5">Đại Lục Nhâm</div>
              <div>Nguyệt Tướng: <strong>{metaState.lucNham.nguyetTuong}</strong></div>
              <div>Sơ Truyền: {metaState.lucNham.tamTruyen[0]?.canChi} ({metaState.lucNham.tamTruyen[0]?.than})</div>
            </div>
          </div>
        </div>
      )}

      {/* Context Banner if a couple was analyzed */}
      {currentCoupleResult && (
        <div className="mb-3 p-3 bg-amber-100/90 border border-amber-300 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-amber-950 font-medium truncate">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="truncate">
              Đang gắn ngữ cảnh quẻ:{' '}
              <strong className="text-amber-900">
                Chồng {currentCoupleResult.chong.fullName} ({currentCoupleResult.chong.lunarYear}) &bull; Vợ {currentCoupleResult.vo.fullName} ({currentCoupleResult.vo.lunarYear})
              </strong>{' '}
              — {currentCoupleResult.caoly.tenDoHinh} ({currentCoupleResult.tongKetDuyenNo.xepLoai})
            </span>
          </div>
          <button
            onClick={() =>
              handleSend(
                `Xin Cụ Căn Duyên luận giải chi tiết và thấu đáo quẻ hôn nhân của Chồng tuổi ${currentCoupleResult.chong.fullName} (${currentCoupleResult.chong.menh}) và Vợ tuổi ${currentCoupleResult.vo.fullName} (${currentCoupleResult.vo.menh}) theo cả Cao Ly Đầu Hình và Diễn Cầm Tam Thế!`
              )
            }
            className="ml-2 px-2.5 py-1 text-xs font-semibold bg-amber-800 text-amber-50 rounded-lg hover:bg-amber-900 transition-colors shrink-0 shadow-xs"
          >
            Hỏi luận giải ngay
          </button>
        </div>
      )}

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 rounded-2xl bg-amber-50/50 p-3 sm:p-5 border border-amber-200/70 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            id={`msg-${msg.id}`}
            className={`flex items-start space-x-2.5 sm:space-x-3.5 ${
              msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs font-serif ${
                msg.role === 'user'
                  ? 'bg-amber-900 text-amber-100'
                  : 'bg-linear-to-br from-amber-700 to-amber-900 text-amber-100 ring-2 ring-amber-400/40'
              }`}
            >
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-amber-200" />}
            </div>

            {/* Content Bubble */}
            <div
              className={`relative max-w-[86%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                msg.role === 'user'
                  ? 'bg-amber-800 text-amber-50 rounded-tr-xs'
                  : 'bg-white border border-amber-200/80 text-stone-800 rounded-tl-xs'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between border-b border-amber-100 pb-2 mb-2.5 text-xs text-amber-900/70">
                  <div className="flex items-center space-x-1.5 font-serif font-bold text-amber-900">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>Cụ Căn Duyên &bull; Diễn Cầm Tam Thế &bull; Cổ Thuật</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className="p-1 hover:bg-amber-100 rounded-md text-amber-800 transition-colors"
                      title="Đọc bằng giọng nói"
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="p-1 hover:bg-amber-100 rounded-md text-amber-800 transition-colors"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Message Markdown Body */}
              <div className={`prose prose-stone max-w-none text-sm sm:text-base leading-relaxed ${msg.role === 'user' ? 'prose-invert' : 'prose-amber'}`}>
                {msg.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                ) : (
                  <div className="flex items-center space-x-2 text-amber-800/80 py-1 italic font-serif">
                    <Sparkles className="w-4 h-4 animate-spin text-amber-600" />
                    <span>Đang tầm tra cổ thư và gieo quẻ luận giải...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (horizontal scroll) */}
      <div className="mt-2.5 mb-1.5 flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-amber-900/70 shrink-0 font-medium flex items-center">
          <BookOpen className="w-3 h-3 mr-1" /> Gợi ý:
        </span>
        {SAMPLE_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-amber-100/90 text-amber-900 hover:bg-amber-200/90 border border-amber-300/80 transition-colors font-medium cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-1 relative bg-white border border-amber-300/80 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-amber-500/40 p-2 sm:p-2.5">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi về tuổi chồng vợ, Can Chi, nạp âm, 12 cung Trường Sanh, Kỳ Môn, Tiết Khí..."
          rows={2}
          className="w-full resize-none text-sm sm:text-base text-stone-800 placeholder-stone-400 bg-transparent border-0 focus:ring-0 focus:outline-none px-2 py-1"
        />

        <div className="flex items-center justify-between pt-1 border-t border-amber-100/80 mt-1">
          <div className="flex items-center space-x-2 text-xs text-amber-800/70">
            <button
              onClick={handleClearHistory}
              className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-amber-100 transition-colors"
              title="Làm mới cuộc trò chuyện"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Làm mới</span>
            </button>
            <button
              onClick={onNavigateToLookup}
              className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-amber-100 transition-colors font-medium text-amber-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Tra cứu tuổi nhanh &rarr;</span>
            </button>
          </div>

          <button
            id="btn-send-message"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs ${
              input.trim() && !isLoading
                ? 'bg-amber-800 text-amber-50 hover:bg-amber-900 hover:scale-[1.02] cursor-pointer'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>Gửi hỏi</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* API Key Settings Modal */}
      <ApiKeySettingsModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={(newKey) => setUserKey(newKey)}
      />
    </div>
  );
};

