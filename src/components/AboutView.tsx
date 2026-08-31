import React from 'react';
import { BookOpen, History, Layers, Sparkles, Heart, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          <img src="/logo.png" alt="AI Nhân Duyên" className="w-4 h-4 rounded-full object-cover" />
          <span>Hệ Thống Lý Luận & Phương Pháp Luận</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
          Về AI Nhân Duyên — Kết Nối Tâm Duyên, Thấu Hiểu Yêu Thương
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Nền tảng trí tuệ nhân tạo chuyên sâu về nhân duyên vợ chồng, tình yêu và gia đạo theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.
        </p>
      </div>

      {/* Core Principles */}
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

      {/* Philosophical Foundation */}
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
    </div>
  );
};
