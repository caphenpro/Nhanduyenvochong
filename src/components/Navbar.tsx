import React from 'react';
import { MessageSquare, Sparkles, BookOpen, Info, HeartHandshake, Compass, Key } from 'lucide-react';
import { getStoredOpenRouterKey } from './ApiKeySettingsModal';

export type TabType = 'chat' | 'lookup' | 'library' | 'about';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAIChat?: () => void;
  onOpenApiKeySettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAIChat,
  onOpenApiKeySettings,
}) => {
  const hasCustomKey = Boolean(getStoredOpenRouterKey());

  return (
    <header className="border-b border-amber-200 bg-amber-50/90 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Title */}
          <div 
            onClick={() => setActiveTab('chat')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-700 to-amber-900 flex items-center justify-center text-amber-100 shadow-md ring-2 ring-amber-400/40 group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-amber-950 font-serif">
                  Nhân Duyên Tiền Định
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-amber-200/70 text-amber-900 border border-amber-300">
                  Cổ Thư AI
                </span>
              </div>
              <p className="text-xs text-amber-800/80 hidden sm:block">
                Diễn Cầm Tam Thế (1952) &bull; Cao Ly Đầu Hình &bull; Kỳ Môn &bull; Lục Nhâm
              </p>
            </div>
          </div>

          {/* Nav Tabs & Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <button
                id="nav-tab-chat"
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Trò Chuyện AI</span>
                <span className="sm:hidden">Hỏi AI</span>
              </button>

              <button
                id="nav-tab-lookup"
                onClick={() => setActiveTab('lookup')}
                className={`flex items-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'lookup'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Lập Quẻ Duyên Nợ</span>
                <span className="sm:hidden">Lập Quẻ</span>
              </button>

              <button
                id="nav-tab-library"
                onClick={() => setActiveTab('library')}
                className={`flex items-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'library'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Cẩm Nang Cổ Thư</span>
                <span className="md:hidden">Cổ Thư</span>
              </button>

              <button
                id="nav-tab-about"
                onClick={() => setActiveTab('about')}
                className={`flex items-center space-x-1.5 px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'about'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-amber-900 hover:bg-amber-100/80 hover:text-amber-950'
                }`}
                title="Về tác giả và sách cổ"
              >
                <Info className="w-4 h-4" />
                <span className="hidden lg:inline">Nguồn Gốc</span>
              </button>
            </nav>

            {/* API Key Settings Button */}
            {onOpenApiKeySettings && (
              <button
                id="nav-open-api-settings"
                onClick={onOpenApiKeySettings}
                className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  hasCustomKey
                    ? 'bg-emerald-100/80 hover:bg-emerald-200/90 text-emerald-950 border-emerald-300'
                    : 'bg-amber-100/80 hover:bg-amber-200/90 text-amber-950 border-amber-300'
                }`}
                title="Cài đặt Khóa API OpenRouter & Bảo Mật"
              >
                <Key className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden md:inline">
                  {hasCustomKey ? 'API Key: Đã Lưu' : 'Nhập API Key'}
                </span>
              </button>
            )}

            {/* Quick Open AI Metaphysics Floating Window */}
            {onOpenAIChat && (
              <button
                id="nav-open-ai-modal"
                onClick={onOpenAIChat}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-linear-to-r from-amber-700 to-amber-900 text-amber-100 text-xs font-semibold hover:from-amber-800 hover:to-amber-950 shadow-xs ring-1 ring-amber-400/50 hover:ring-amber-300 transition-all cursor-pointer"
                title="Mở cửa sổ Trợ Lý Cổ Thuật AI"
              >
                <Compass className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span className="hidden md:inline">Cửa Sổ AI</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
