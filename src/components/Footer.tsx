import React from 'react';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-950 text-amber-200/80 border-t border-amber-900 mt-12 py-8 px-4 text-xs font-serif">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-100 font-bold text-sm">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Nhân Duyên Tiền Định &bull; AI Chatbot Hôn Nhân Cổ Thư</span>
          </div>
          <p className="text-[11px] text-amber-300/70 font-sans">
            Cơ sở tri thức số hóa từ Diễn Cầm Tam Thế (1952) &amp; Cao Ly Đầu Hình
          </p>
        </div>

        <div className="flex items-center space-x-1 text-amber-300/90 font-sans">
          <span>&ldquo;Phước Đức Năng Thắng Số &bull; Thuận Hòa Vạn Sự An&rdquo;</span>
          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </div>
      </div>
    </footer>
  );
};
