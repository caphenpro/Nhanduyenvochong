import React from 'react';
import { MessageSquare, BookOpen, Info, Compass, Key } from 'lucide-react';
import { getStoredOpenRouterKey } from './ApiKeySettingsModal';
import { APP_INFO } from '../data/versionHistory';

export type TabType = 'chat' | 'library' | 'about';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAIChat?: () => void;
  onOpenApiKeySettings?: () => void;
  onOpenVersionModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAIChat,
  onOpenApiKeySettings,
  onOpenVersionModal,
}) => {
  const hasCustomKey = Boolean(getStoredOpenRouterKey());

  return (
    <header className="border-b border-amber-200/90 bg-amber-50/95 backdrop-blur-md sticky top-0 z-40 shadow-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18">
          {/* Logo & Title */}
          <div 
            onClick={() => setActiveTab('chat')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs ring-1.5 ring-rose-300/70 group-hover:scale-105 transition-transform duration-200 bg-white shrink-0">
              <img src="/logo.png" alt="AI Nhân Duyên Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-base sm:text-xl font-bold tracking-tight text-amber-950 font-serif whitespace-nowrap">
                  AI Nhân Duyên
                </span>
                <span className="hidden xs:inline-block text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.2 rounded-full font-medium bg-rose-100 text-rose-800 border border-rose-200 whitespace-nowrap">
                  Chatbox
                </span>
                {onOpenVersionModal && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenVersionModal();
                    }}
                    className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-200/90 hover:bg-amber-300 text-amber-900 border border-amber-400/60 transition-colors flex items-center space-x-0.5 cursor-pointer whitespace-nowrap"
                    title="Xem Lịch Sử Phiên Bản"
                  >
                    <span>{APP_INFO.currentVersion}</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-amber-800/80 hidden md:block truncate max-w-xs lg:max-w-md">
                Kết Nối Tâm Duyên &bull; Thấu Hiểu Yêu Thương &bull; Luận Giải Đa Tầng
              </p>
            </div>
          </div>

          {/* Nav Tabs & Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <nav className="flex items-center space-x-1 sm:space-x-1.5">
              <button
                id="nav-tab-chat"
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">Trò Chuyện AI</span>
                <span className="sm:hidden">Hỏi AI</span>
              </button>

              <button
                id="nav-tab-library"
                onClick={() => setActiveTab('library')}
                className={`flex items-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'library'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden md:inline">Cẩm Nang Cổ Thư</span>
                <span className="md:hidden">Cổ Thư</span>
              </button>

              <button
                id="nav-tab-about"
                onClick={() => setActiveTab('about')}
                className={`flex items-center space-x-1 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'about'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
                title="Về tác giả và sách cổ"
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden lg:inline">Nguồn Gốc</span>
              </button>
            </nav>

            {/* API Key Settings Button */}
            {onOpenApiKeySettings && (
              <button
                id="nav-open-api-settings"
                onClick={onOpenApiKeySettings}
                className={`flex items-center justify-center p-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  hasCustomKey
                    ? 'bg-emerald-100/80 hover:bg-emerald-200/90 text-emerald-950 border-emerald-300'
                    : 'bg-amber-100/80 hover:bg-amber-200/90 text-amber-950 border-amber-300'
                }`}
                title={hasCustomKey ? 'API Key OpenRouter: Đã Lưu' : 'Cài đặt Khóa API OpenRouter'}
              >
                <div className="relative">
                  <Key className="w-3.5 h-3.5 text-amber-800" />
                  {hasCustomKey && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                  )}
                </div>
                <span className="hidden lg:inline ml-1.5">
                  {hasCustomKey ? 'API Key: Đã Lưu' : 'Nhập API Key'}
                </span>
              </button>
            )}

            {/* Quick Open AI Metaphysics Floating Window */}
            {onOpenAIChat && (
              <button
                id="nav-open-ai-modal"
                onClick={onOpenAIChat}
                className="flex items-center justify-center p-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-linear-to-r from-amber-700 to-amber-900 text-amber-100 text-xs font-semibold hover:from-amber-800 hover:to-amber-950 shadow-xs ring-1 ring-amber-400/50 hover:ring-amber-300 transition-all cursor-pointer"
                title="Mở cửa sổ Trợ Lý Cổ Thuật AI"
              >
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span className="hidden lg:inline ml-1.5">Cửa Sổ AI</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

