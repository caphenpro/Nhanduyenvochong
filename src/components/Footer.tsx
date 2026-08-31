import React from 'react';
import { Heart, Compass, ShieldCheck, History, Github, Mail } from 'lucide-react';
import { APP_INFO } from '../data/versionHistory';

interface FooterProps {
  onOpenVersionModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVersionModal }) => {
  return (
    <footer className="bg-amber-950 text-amber-200/80 border-t border-amber-900 mt-12 py-8 px-4 text-xs font-serif">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-100 font-bold text-sm">
            <img src="/logo.png" alt="AI Nhân Duyên" className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400/60" />
            <span>{APP_INFO.name} &bull; Kết Nối Tâm Duyên, Thấu Hiểu Yêu Thương</span>
            {onOpenVersionModal && (
              <button
                onClick={onOpenVersionModal}
                className="text-[10px] px-2 py-0.5 rounded-full font-sans font-bold bg-amber-900 hover:bg-amber-800 text-amber-200 border border-amber-700 transition-colors cursor-pointer"
                title="Xem lịch sử cập nhật"
              >
                {APP_INFO.currentVersion}
              </button>
            )}
          </div>
          <p className="text-[11px] text-amber-300/70 font-sans">
            Phát triển bởi <strong>{APP_INFO.author}</strong> ({APP_INFO.contactEmail}) &bull; Hệ thống luận giải đa tầng Âm Dương Ngũ Hành
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 font-sans text-[11px] text-amber-300/90">
          {onOpenVersionModal && (
            <button
              onClick={onOpenVersionModal}
              className="flex items-center space-x-1 hover:text-amber-100 underline underline-offset-2 transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>Lịch Sử Phiên Bản &amp; Changelog</span>
            </button>
          )}
          <span className="hidden sm:inline">&bull;</span>
          <div className="flex items-center space-x-1">
            <span>&ldquo;Một người không phải chỉ là một cái tuổi&rdquo;</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
