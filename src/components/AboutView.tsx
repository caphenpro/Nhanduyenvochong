import React, { useState } from 'react';
import { BookOpen, History, Layers, Sparkles, Heart, ShieldAlert, CheckCircle2, User, Mail, Github, Tag, Calendar, ChevronRight } from 'lucide-react';
import { APP_INFO, VERSION_HISTORY, AppVersion } from '../data/versionHistory';

interface AboutViewProps {
  onOpenVersionModal?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenVersionModal }) => {
  const [selectedVer, setSelectedVer] = useState<AppVersion>(VERSION_HISTORY[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          <img src="/logo.png" alt="AI Nhân Duyên" className="w-4 h-4 rounded-full object-cover" />
          <span>{APP_INFO.fullName} &bull; Phiên bản {APP_INFO.currentVersion}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-amber-950">
          Giới Thiệu Ứng Dụng &amp; Hệ Thống Phương Pháp Luận
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Nền tảng trí tuệ nhân tạo chuyên sâu về nhân duyên vợ chồng, tình yêu và gia đạo theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.
        </p>
      </div>

      {/* Sứ Mệnh & Giới Thiệu Tổng Quan */}
      <div className="bg-white border-2 border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-amber-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-950">
              Tổng Quan &amp; Sứ Mệnh Ứng Dụng
            </h2>
            <p className="text-xs text-amber-800 font-medium">
              Kết Nối Tâm Duyên &bull; Thấu Hiểu Yêu Thương &bull; Chuyển Hóa Gia Đạo
            </p>
          </div>
        </div>

        <div className="prose text-xs sm:text-sm text-stone-700 leading-relaxed space-y-4">
          <p>
            <strong>AI Nhân Duyên</strong> được phát triển nhằm mục đích mang lại cái nhìn <strong>khoa học, sâu sắc và nhân văn</strong> về mối quan hệ vợ chồng và hôn nhân. Thay vì những lời phán đoán nông cạn, gây hoang mang hay sợ hãi như <em>&ldquo;phạm tuyệt mệnh là phải bỏ nhau&rdquo;</em>, hệ thống giúp người xem hiểu rõ <strong>căn nguyên năng lượng, sự tương tác tính cách và cách chuyển hóa khác biệt</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
              <span className="font-bold text-amber-950 block text-sm">1. Khách Quan &amp; Đa Chiều</span>
              <p className="text-xs text-stone-600">
                Khảo sát đồng thời qua 6 tầng: Thiên Can (Khí), Địa Chi (Động), Ngũ Hành, Nạp Âm, Cung Mệnh và Cấu Trúc Tổng Hợp.
              </p>
            </div>
            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
              <span className="font-bold text-rose-950 block text-sm">2. Hóa Giải Thực Tế</span>
              <p className="text-xs text-stone-600">
                Tập trung vào cơ chế Sinh – Khắc – Chế – Hóa, phong thủy thực hành và cải thiện giao tiếp, cảm thông trong hôn nhân.
              </p>
            </div>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
              <span className="font-bold text-emerald-950 block text-sm">3. Trợ Lý AI Đa Mô Hình</span>
              <p className="text-xs text-stone-600">
                Tích hợp mô hình AI ngôn ngữ lớn (Gemini, Claude, GPT, DeepSeek) kết hợp bộ suy luận Cổ Thư Reasoner chuyên sâu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Tầng Luận Giải Chuẩn Mực */}
      <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center space-x-3 border-b border-rose-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-700 text-rose-100 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-rose-950">
              Quy Trình Luận Giải 6 Tầng Chuẩn Mực
            </h2>
            <p className="text-xs text-rose-800 font-medium">
              Không dùng 1 yếu tố đơn lẻ để kết luận toàn bộ mối quan hệ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <strong className="text-amber-950 block">Tầng 1 — Thiên Can (Tầng Khí):</strong>
            <span>Khảo sát tầng quan hệ Khí: Hợp – Sinh – Khắc – Bình hòa giữa Thiên Can của hai người.</span>
          </div>
          <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
            <strong className="text-rose-950 block">Tầng 2 — Địa Chi (Tầng Động):</strong>
            <span>Khảo sát chuyển động sinh hoạt: Tam Hợp, Lục Hợp, Lục Xung, Lục Hại, Lục Phá, Hình.</span>
          </div>
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <strong className="text-stone-950 block">Tầng 3 — Ngũ Hành Nội Tại:</strong>
            <span>Phân tích Ngũ Hành bản thể của Thiên Can và Địa Chi trong mối tương quan.</span>
          </div>
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <strong className="text-stone-950 block">Tầng 4 — Nạp Âm Lục Thập Hoa Giáp:</strong>
            <span>Quy chiếu 60 Hoa Giáp, phân biệt rõ ràng Nạp Âm với Can và Chi.</span>
          </div>
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <strong className="text-emerald-950 block">Tầng 5 — Cung Mệnh Bát Trạch:</strong>
            <span>Phối cung phi (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Tuyệt Mệnh, Họa Hại, Lục Sát, Ngũ Quỷ).</span>
          </div>
          <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
            <strong className="text-rose-950 block">Tầng 6 — Cấu Trúc Tổng Hợp:</strong>
            <span>Đưa ra Điểm Thuận, Điểm Nghịch, Điểm Cần Lưu Ý theo cơ chế Sinh – Khắc – Chế – Hóa.</span>
          </div>
        </div>
      </div>

      {/* Triết Lý Cốt Lõi */}
      <div className="bg-linear-to-br from-stone-900 to-rose-950 text-rose-50 rounded-2xl p-6 sm:p-8 shadow-md border border-rose-800 space-y-4">
        <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Triết Lý Cốt Lõi</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
          &ldquo;Một người không phải chỉ là một cái tuổi&rdquo;
        </h3>
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
          Huyền học là hệ thống tham khảo nhận diện khuynh hướng; còn chất lượng hôn nhân thực tế phụ thuộc vào tính cách, giao tiếp, trách nhiệm, đạo đức và cách hai người cùng nhau xử lý khác biệt. <strong>Xung không đồng nghĩa với ly hôn</strong>, và <strong>Hợp không đồng nghĩa với tốt tuyệt đối</strong>.
        </p>
      </div>

      {/* Thông Tin Tác Giả & Phát Triển */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-3 border-b border-stone-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-stone-800 text-stone-100 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-950">
              Tác Giả &amp; Bản Quyền Ứng Dụng
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Thông tin phát triển và đóng góp dự án
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-amber-700" />
              <span>Tác giả &amp; Nhà sáng lập: <strong>{APP_INFO.author}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-700" />
              <span>Email liên hệ: <a href={`mailto:${APP_INFO.contactEmail}`} className="text-rose-700 hover:underline">{APP_INFO.contactEmail}</a></span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-amber-700" />
              <span>Phiên bản hiện hành: <strong className="text-rose-700">{APP_INFO.currentVersion}</strong> ({APP_INFO.releaseDate})</span>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900">Cam Kết Chất Lượng:</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mọi cập nhật tính năng và thuật toán đều được ghi nhận vào hệ thống phiên bản và tài liệu mã nguồn (README.md) nhằm đảm bảo tính minh bạch, nhất quán và liên tục tối ưu trải nghiệm người dùng.
            </p>
          </div>
        </div>
      </div>

      {/* Lịch Sử Phiên Bản & Changelog Timeline */}
      <div className="bg-white border-2 border-amber-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-950">
                Lịch Sử Phiên Bản &amp; Nhật Ký Cập Nhật (Changelog)
              </h2>
              <p className="text-xs text-amber-800 font-medium">
                Ghi nhận chi tiết từng mốc phát triển của dự án
              </p>
            </div>
          </div>

          {onOpenVersionModal && (
            <button
              onClick={onOpenVersionModal}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold rounded-xl border border-amber-300 transition-colors cursor-pointer"
            >
              <span>Xem Cửa Sổ Changelog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Interactive Version Selector */}
        <div className="flex flex-wrap gap-2">
          {VERSION_HISTORY.map((ver) => (
            <button
              key={ver.version}
              onClick={() => setSelectedVer(ver)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedVer.version === ver.version
                  ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
              }`}
            >
              <span>{ver.version}</span>
              {ver.isLatest && <span className="ml-1.5 text-[10px] text-rose-300">★ Mới</span>}
            </button>
          ))}
        </div>

        {/* Selected Version Detail Card */}
        <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-2.5">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-lg text-amber-950">
                  {selectedVer.version} — {selectedVer.codename}
                </h3>
                {selectedVer.isLatest && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    Bản Mới Nhất
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 italic mt-0.5">{selectedVer.tagline}</p>
            </div>
            <div className="flex items-center space-x-1 text-xs text-stone-500 font-sans">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{selectedVer.releaseDate}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Điểm Nổi Bật:
            </h4>
            <div className="space-y-1.5">
              {selectedVer.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Changes list */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Chi Tiết Cập Nhật:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedVer.changes.map((ch, idx) => (
                <div key={idx} className="p-3 bg-white border border-amber-200/80 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-amber-950 font-semibold">{ch.title}</strong>
                    <span className="text-[10px] px-1.5 py-0.2 bg-stone-100 rounded text-stone-600">
                      {ch.type}
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{ch.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
