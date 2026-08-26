import React from 'react';
import { MessageSquare, Sparkles, BookOpen, Info, HeartHandshake } from 'lucide-react';

export type TabType = 'chat' | 'lookup' | 'library' | 'about';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
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
                Diễn Cầm Tam Thế (1952) &bull; Cao Ly Đầu Hình (Đoàn Văn Đâu)
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
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
        </div>
      </div>
    </header>
  );
};
