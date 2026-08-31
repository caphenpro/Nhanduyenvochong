import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Flame,
  Sun,
  Moon,
  Info,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, CoupleAnalysisResult } from '../types';
import { getCurrentSolarTerm, generateMetaphysicsState, SolarTermInfo, MetaphysicsBoardState } from '../data/metaphysicsData';
import { ApiKeySettingsModal, getStoredOpenRouterKey } from './ApiKeySettingsModal';
import { streamAIChat, AI_MODELS_LIST, AUTO_MODEL_ID } from '../services/aiChatClient';
import { Key, Zap } from 'lucide-react';

interface AIChatbotModalProps {
  currentCoupleResult?: CoupleAnalysisResult | null;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const METAPHYSICS_QUICK_PROMPTS = [
  'Luận giải 6 tầng Âm Dương Ngũ Hành cho cặp tuổi này?',
  'Phân biệt Ngũ Hành Nạp Âm với Thiên Can, Địa Chi như thế nào?',
  'Nguyên tắc: "Xung không đồng nghĩa với ly hôn, Hợp không đồng nghĩa với tốt tuyệt đối"?',
  'Quan hệ Bát Trạch (Sinh Khí, Diên Niên, Tuyệt Mệnh, Ngũ Quỷ) trong gia đạo?',
  'Cơ chế Sinh – Khắc – Chế – Hóa và triết lý "Một người không phải chỉ là một cái tuổi"?',
];

const STORAGE_KEY = 'canduyen_chat_history_v2';

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({
  currentCoupleResult,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpen: controlledOnOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (open) {
      controlledOnOpen ? controlledOnOpen() : setInternalIsOpen(true);
    } else {
      controlledOnClose ? controlledOnClose() : setInternalIsOpen(false);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [showDataDrawer, setShowDataDrawer] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(AUTO_MODEL_ID);
  const [resolvedModelName, setResolvedModelName] = useState<string | null>(null);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [metaState, setMetaState] = useState<MetaphysicsBoardState>(() => generateMetaphysicsState(new Date()));
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [userKey, setUserKey] = useState<string>(() => getStoredOpenRouterKey());

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize messages from LocalStorage or Default
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore
    }
    return [
      {
        id: 'welcome-modal-msg',
        role: 'assistant',
        content: `Kính chào quý bạn! Ta là **AI Nhân Duyên** — Cố Vấn Luận Giải Hòa Hợp & Nhân Duyên.\n\nTa đã kết nối hệ thống phân tích toàn diện với **Kỳ Môn Độn Giáp**, **Đại Lục Nhâm**, **24 Tiết Khí**, **Bát Trạch Phong Thủy** và kho tàng **Cổ Thư Diễn Cầm Tam Thế / Cao Ly Đầu Hình** qua động cơ AI Tự Động Luân Chuyển (*Auto-Fallback chống gián đoạn*).\n\nQuý bạn muốn tầm khảo về căn duyên vợ chồng, 6 tầng hòa hợp Âm Dương Ngũ Hành, hay phương hướng phong thủy Bát Trạch? Hãy nhập câu hỏi hoặc chọn gợi ý bên dưới!`,
        timestamp: Date.now(),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  // Update Metaphysics State periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setMetaState(generateMetaphysicsState(new Date()));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking && speakingMsgId === id) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setSpeakingMsgId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#`_~[\]()]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMsgId(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingMsgId(null);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setSpeakingMsgId(id);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Quý bạn có chắc muốn xóa lịch sử cuộc trò chuyện này?')) {
      const resetMsg: Message = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Cuộc đàm đạo mới đã được khởi tạo. Mời quý bạn đặt câu hỏi về tuổi vợ chồng, Bát Tự, Kỳ Môn hay 24 Tiết Khí!`,
        timestamp: Date.now(),
      };
      setMessages([resetMsg]);
      localStorage.removeItem(STORAGE_KEY);
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
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

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setMessages([...updatedMessages, assistantMessage]);

    try {
      await streamAIChat({
        messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        coupleContext: currentCoupleResult,
        model: selectedModel,
        userApiKey: userKey || getStoredOpenRouterKey(),
        onModelResolved: (modelName) => {
          setResolvedModelName(modelName);
        },
        onChunk: (accumulated) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg))
          );
        },
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  'Dạ thưa quý bạn, xin mời bạn gửi câu hỏi hoặc năm sinh để ta tra cứu cổ thư Diễn Cầm Tam Thế và Cao Ly Đầu Hình nhé.',
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

  const currentModelObj = AI_MODELS_LIST.find((m) => m.id === selectedModel) || AI_MODELS_LIST[0];

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
          <button
            id="floating-chat-trigger"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-3 px-4 py-3.5 rounded-full bg-linear-to-r from-amber-800 via-amber-900 to-amber-950 text-amber-100 shadow-xl shadow-amber-950/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-2 ring-amber-400/50 hover:ring-amber-300"
            title="Trò chuyện cùng Trợ lý Cổ Thuật AI"
          >
            {/* Pulsing Aura */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
            </span>

            <div className="w-8 h-8 rounded-full bg-amber-700/80 flex items-center justify-center text-amber-200 group-hover:rotate-12 transition-transform duration-300">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold font-serif text-amber-100 flex items-center space-x-1.5">
                <span>Trợ Lý Cổ Thuật AI</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 border border-amber-500/40">
                  OpenRouter
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80">
                Kỳ Môn &bull; Lục Nhâm &bull; Tiết Khí
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Chatbot Modal / Panel Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-stone-900 border border-amber-700/40 shadow-2xl rounded-2xl overflow-hidden font-sans text-stone-100 backdrop-blur-xl ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-10'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[460px] md:w-[500px] h-[640px] max-h-[88vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-amber-950 via-stone-900 to-amber-950 px-4 py-3.5 border-b border-amber-800/40 flex items-center justify-between select-none">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white ring-2 ring-rose-400/60 shadow-md">
                  <img src="/logo.png" alt="AI Nhân Duyên" className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-stone-900 rounded-full" title="Sẵn sàng luận giải" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-amber-100 text-sm sm:text-base font-serif">
                    AI Nhân Duyên
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    AI Chatbox
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-amber-300/80">
                  <span>Kết Nối Tâm Duyên</span>
                  <span>&bull;</span>
                  <span>Thấu Hiểu Yêu Thương</span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 text-stone-400">
              {/* Toggle Context Drawer */}
              <button
                id="chat-toggle-context"
                onClick={() => setShowDataDrawer(!showDataDrawer)}
                className={`p-1.5 rounded-lg hover:text-amber-200 hover:bg-stone-800/80 transition-colors ${
                  showDataDrawer ? 'text-amber-400 bg-amber-950/60 ring-1 ring-amber-500/40' : ''
                }`}
                title="Xem Bàn Quẻ & Dữ liệu Bát Tự hiện tại"
              >
                <Layers className="w-4 h-4" />
              </button>

              {/* Clear History */}
              <button
                id="chat-clear-history"
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg hover:text-rose-300 hover:bg-stone-800/80 transition-colors"
                title="Xóa lịch sử hội thoại"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Expand / Minimize */}
              <button
                id="chat-expand-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-amber-200 hover:bg-stone-800/80 transition-colors hidden sm:inline-flex"
                title={isExpanded ? 'Thu nhỏ' : 'Mở rộng toàn màn hình'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                id="chat-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-amber-200 hover:bg-stone-800/80 transition-colors"
                title="Đóng cửa sổ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Selector Bar */}
          <div className="px-3.5 py-2 bg-stone-950/80 border-b border-amber-900/30 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-500/30" />
              <span className="text-stone-400 text-[11px]">Động cơ:</span>
              <div className="relative">
                <button
                  id="model-selector-btn"
                  onClick={() => setShowModelMenu(!showModelMenu)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-stone-800/90 text-amber-200 border border-amber-700/40 hover:bg-stone-800 transition-colors font-medium text-[11px]"
                  title="Chọn mô hình hoặc để Tự Động luân chuyển khi hết gói miễn phí"
                >
                  <span>
                    {selectedModel === AUTO_MODEL_ID
                      ? (resolvedModelName ? `⚡ ${resolvedModelName}` : '⚡ Tự Động (Auto-Fallback)')
                      : (AI_MODELS_LIST.find((m) => m.id === selectedModel)?.name || selectedModel)}
                  </span>
                  <ChevronDown className="w-3 h-3 text-amber-400" />
                </button>

                {/* Model Dropdown Menu */}
                {showModelMenu && (
                  <div className="absolute left-0 top-full mt-1.5 w-72 bg-stone-900 border border-amber-700/50 rounded-xl shadow-2xl z-50 p-1.5 space-y-1">
                    <div className="px-2 py-1 text-[11px] font-semibold text-amber-200 border-b border-stone-800 flex items-center justify-between">
                      <span>Chế độ & Mô hình AI</span>
                      <span className="text-[10px] text-emerald-400 font-normal">Tự luân chuyển khi hết quota</span>
                    </div>
                    {AI_MODELS_LIST.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setShowModelMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex flex-col space-y-0.5 ${
                          selectedModel === model.id
                            ? 'bg-amber-950 text-amber-200 border border-amber-600/50'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-amber-100'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-amber-100">{model.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                            model.id === AUTO_MODEL_ID ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'
                          }`}>
                            {model.badge}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-400 font-normal">{model.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* API Key Settings Button */}
              <button
                id="modal-open-api-key-btn"
                onClick={() => setIsApiKeyModalOpen(true)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                  userKey
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/80'
                    : 'bg-amber-950/80 text-amber-300 border-amber-700/60 hover:bg-amber-900/80'
                }`}
                title="Cài đặt khóa OpenRouter API Key"
              >
                <Key className="w-3 h-3 text-amber-400" />
                <span>{userKey ? 'API Key: Đã lưu' : 'Nhập API Key'}</span>
              </button>

              {/* Active Couple Status Pill */}
              {currentCoupleResult ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/40">
                  Đã nạp: {currentCoupleResult.chong.can} {currentCoupleResult.chong.chi} &times; {currentCoupleResult.vo.can} {currentCoupleResult.vo.chi}
                </span>
              ) : (
                <span className="text-[10px] text-stone-500 italic hidden sm:inline">
                  (Chưa nạp tuổi)
                </span>
              )}
            </div>
          </div>

          {/* Metaphysics Live Context Drawer (Collapsible) */}
          {showDataDrawer && (
            <div className="bg-stone-950 border-b border-amber-900/40 p-3 text-xs max-h-48 overflow-y-auto space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between text-amber-300 font-semibold pb-1 border-b border-amber-900/30">
                <span className="flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Trạng Thái Cổ Thuật & 24 Tiết Khí Hiện Tại</span>
                </span>
                <span className="text-[10px] text-stone-400">{metaState.currentDateStr}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                  <div className="text-amber-400 font-medium mb-1">🌿 24 Tiết Khí & Ngũ Hành</div>
                  <div className="text-stone-300">Tiết: <strong className="text-amber-200">{metaState.solarTerm.name}</strong> ({metaState.solarTerm.season})</div>
                  <div className="text-stone-400 text-[10px]">Vượng: {metaState.solarTerm.nguHanhVuong} &bull; Tướng: {metaState.solarTerm.nguHanhTuong}</div>
                </div>

                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                  <div className="text-amber-400 font-medium mb-1">⚡ Kỳ Môn Độn Giáp</div>
                  <div className="text-stone-300">Cục: <strong className="text-amber-200">{metaState.kyMonDonGiap.don} ({metaState.kyMonDonGiap.cuc} Cục)</strong></div>
                  <div className="text-stone-400 text-[10px]">Trực Sử: {metaState.kyMonDonGiap.trucSu}</div>
                </div>

                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                  <div className="text-amber-400 font-medium mb-1">📜 Đại Lục Nhâm</div>
                  <div className="text-stone-300">Nguyệt Tướng: <strong className="text-amber-200">{metaState.lucNham.nguyetTuong}</strong></div>
                  <div className="text-stone-400 text-[10px]">Sơ Truyền: {metaState.lucNham.tamTruyen[0]?.canChi} ({metaState.lucNham.tamTruyen[0]?.than})</div>
                </div>

                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                  <div className="text-amber-400 font-medium mb-1">🏛️ Bát Tự Giờ Hiện Tại</div>
                  <div className="text-stone-300">Giờ {metaState.batTuHienTai.gio} &bull; Ngày {metaState.batTuHienTai.ngay}</div>
                  <div className="text-stone-400 text-[10px]">Tháng {metaState.batTuHienTai.thang} &bull; Năm {metaState.batTuHienTai.nam}</div>
                </div>
              </div>

              {currentCoupleResult && (
                <div className="bg-amber-950/30 p-2 rounded-lg border border-amber-700/30 text-[11px] text-amber-200">
                  <strong>Cặp đôi đang chọn:</strong> Chồng {currentCoupleResult.chong.fullName} ({currentCoupleResult.chong.menh}) &times; Vợ {currentCoupleResult.vo.fullName} ({currentCoupleResult.vo.menh}) &rarr; Đồ hình: <em>{currentCoupleResult.caoly.tenDoHinh}</em> ({currentCoupleResult.tongKetDuyenNo.diemSo}đ)
                </div>
              )}
            </div>
          )}

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-stone-900/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 sm:space-x-3 ${
                  msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.role === 'user'
                      ? 'bg-amber-700 text-amber-100 ring-1 ring-amber-400/40'
                      : 'bg-white ring-1 ring-rose-400/60 shadow-xs'
                  }`}
                >
                  {msg.role === 'user' ? (
                    'Bạn'
                  ) : (
                    <img src="/logo.png" alt="AI" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-700 text-amber-50 rounded-tr-xs shadow-md'
                      : 'bg-stone-800/90 text-stone-200 border border-stone-700/60 rounded-tl-xs shadow-md'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="markdown-content prose prose-invert prose-amber max-w-none text-xs sm:text-sm [&_p]:my-1.5 [&_ul]:my-1.5 [&_li]:my-0.5 [&_blockquote]:border-l-amber-500 [&_blockquote]:text-amber-200/90 [&_blockquote]:bg-amber-950/40 [&_blockquote]:py-1 [&_blockquote]:px-2.5 [&_blockquote]:rounded-r-lg [&_h3]:text-amber-300 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mt-2 [&_h3]:mb-1 [&_h4]:text-amber-200 [&_h4]:text-xs [&_h4]:font-semibold [&_h4]:mt-1.5 [&_strong]:text-amber-100">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}

                  {/* Assistant Footer Buttons (Copy / TTS) */}
                  {msg.role === 'assistant' && msg.content && (
                    <div className="mt-2.5 pt-1.5 border-t border-stone-700/40 flex items-center justify-between text-[11px] text-stone-400">
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-amber-300 transition-colors flex items-center space-x-1"
                          title="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedId === msg.id ? 'Đã chép' : 'Chép'}</span>
                        </button>

                        <button
                          onClick={() => handleSpeak(msg.id, msg.content)}
                          className="hover:text-amber-300 transition-colors flex items-center space-x-1"
                          title="Đọc bằng giọng nói"
                        >
                          {isSpeaking && speakingMsgId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-amber-400 animate-pulse" />
                              <span className="text-amber-400">Dừng đọc</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>Đọc</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-950 text-amber-300 border border-amber-700/60 flex items-center justify-center shrink-0 text-xs font-bold">
                  Cụ
                </div>
                <div className="bg-stone-800/90 border border-stone-700/60 rounded-2xl rounded-tl-xs px-4 py-3 text-xs sm:text-sm text-stone-300 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-amber-300/90 text-xs italic">
                    Cụ Căn Duyên đang an quẻ Kỳ Môn & đối chiếu cổ thư...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-1.5 bg-stone-950/90 border-t border-amber-900/30 overflow-x-auto flex space-x-1.5 no-scrollbar">
            {METAPHYSICS_QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-amber-950 text-stone-300 hover:text-amber-200 border border-stone-700/60 hover:border-amber-600/50 transition-colors disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-stone-950 border-t border-amber-900/40">
            <div className="relative flex items-center">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về tuổi vợ chồng, Kỳ Môn Độn Giáp, Tiết Khí, Lục Nhâm..."
                rows={1}
                disabled={isLoading}
                className="w-full pl-3.5 pr-12 py-2.5 rounded-xl bg-stone-900 border border-amber-700/40 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none max-h-24"
              />

              <button
                id="chat-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold disabled:opacity-40 disabled:hover:bg-amber-600 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                title="Gửi câu hỏi"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-[10px] text-stone-500 px-1">
              <span>Nhấn <strong>Enter</strong> để gửi &bull; <strong>Shift + Enter</strong> xuống dòng</span>
              <span>Triết lý: <em>"Đức Năng Thắng Số"</em></span>
            </div>
          </div>
        </div>
      )}

      {/* API Key Settings Modal */}
      <ApiKeySettingsModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={(k) => setUserKey(k)}
      />
    </>
  );
};
