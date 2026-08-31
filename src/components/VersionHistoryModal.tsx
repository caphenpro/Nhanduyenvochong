import React, { useState } from 'react';
import { X, History, Sparkles, CheckCircle2, AlertCircle, Bookmark, Layers, Heart, Code2, ExternalLink, Calendar, Tag } from 'lucide-react';
import { VERSION_HISTORY, APP_INFO, AppVersion } from '../data/versionHistory';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<AppVersion>(VERSION_HISTORY[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border-2 border-amber-300/80 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-stone-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="version-modal-title"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-amber-950 via-stone-900 to-amber-950 px-5 py-4 border-b border-amber-800/40 flex items-center justify-between text-amber-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white ring-2 ring-rose-400/60 shadow-md">
              <img src="/logo.png" alt="AI Nhân Duyên" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 id="version-modal-title" className="font-serif font-bold text-lg text-amber-100">
                  Lịch Sử Phiên Bản & Bản Phát Hành
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-rose-600/80 text-rose-100 border border-rose-400/50">
                  {APP_INFO.currentVersion}
                </span>
              </div>
              <p className="text-xs text-amber-300/80">
                {APP_INFO.fullName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-300 hover:text-white hover:bg-amber-800/50 transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left sidebar (version list) + Right content (details) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Version Selector */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-amber-200 bg-amber-50/50 p-3 overflow-y-auto space-y-2 max-h-48 md:max-h-none">
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>Danh Sách Bản Cập Nhật</span>
              <History className="w-3.5 h-3.5 text-amber-700" />
            </div>
            {VERSION_HISTORY.map((ver) => {
              const isSelected = selectedVersion.version === ver.version;
              return (
                <button
                  key={ver.version}
                  onClick={() => setSelectedVersion(ver)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-xs'
                      : 'bg-white hover:bg-amber-100/80 text-stone-800 border-amber-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-bold font-serif text-sm">
                      <span>{ver.version}</span>
                      {ver.isLatest && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-semibold ${
                          isSelected ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          Mới nhất
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                      {ver.releaseDate}
                    </span>
                  </div>
                  <div className={`text-xs mt-1 truncate ${isSelected ? 'text-amber-200' : 'text-stone-600'}`}>
                    {ver.codename}: {ver.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Version Details */}
          <div className="md:col-span-8 p-5 overflow-y-auto space-y-5 bg-white">
            {/* Version Title Header */}
            <div className="border-b border-stone-200 pb-3 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xl font-bold font-serif text-amber-950">
                    Bản phát hành {selectedVersion.version}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-100 text-amber-900 border border-amber-300">
                    Mật danh: {selectedVersion.codename}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Ngày phát hành: {selectedVersion.releaseDate}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic">
                &ldquo;{selectedVersion.tagline}&rdquo;
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-amber-900 text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Điểm Nổi Bật Chính</span>
              </div>
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
                {selectedVersion.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Changes */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-stone-900 text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-rose-600" />
                <span>Chi Tiết Các Thay Đổi & Nâng Cấp</span>
              </div>
              <div className="space-y-2.5">
                {selectedVersion.changes.map((change, idx) => {
                  let badgeColor = 'bg-stone-100 text-stone-800 border-stone-300';
                  let label = 'Cập nhật';
                  if (change.type === 'feat') {
                    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                    label = 'Tính năng mới';
                  } else if (change.type === 'enhance') {
                    badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
                    label = 'Cải tiến';
                  } else if (change.type === 'ui') {
                    badgeColor = 'bg-purple-100 text-purple-900 border-purple-300';
                    label = 'Giao diện & Logo';
                  } else if (change.type === 'philosophy') {
                    badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
                    label = 'Triết lý & Lý luận';
                  }

                  return (
                    <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-stone-900 text-sm font-semibold">{change.title}</strong>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${badgeColor}`}>
                          {label}
                        </span>
                      </div>
                      <p className="text-stone-600 leading-relaxed">{change.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Author & Contribution */}
            <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <div className="flex items-center space-x-1">
                <span>Tác giả & Phát triển:</span>
                <strong className="text-stone-800">{APP_INFO.author}</strong>
              </div>
              <div className="flex items-center space-x-1 text-rose-800 font-medium">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{APP_INFO.motto.split('•')[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-500">
            Hệ thống luôn tự động ghi nhận và đồng bộ lịch sử cập nhật sau mỗi phiên bản.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold rounded-xl transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
