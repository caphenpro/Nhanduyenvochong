import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, HelpCircle, ShieldCheck, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleAnalysisResult } from '../types';

interface CoupleLookupViewProps {
  onSelectCoupleForChat: (result: CoupleAnalysisResult) => void;
  savedResult: CoupleAnalysisResult | null;
}

export const CoupleLookupView: React.FC<CoupleLookupViewProps> = ({
  onSelectCoupleForChat,
  savedResult,
}) => {
  const [chongYear, setChongYear] = useState<number>(1995);
  const [chongMonth, setChongMonth] = useState<number>(1);
  const [voYear, setVoYear] = useState<number>(1998);
  const [voMonth, setVoMonth] = useState<number>(6);

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CoupleAnalysisResult | null>(savedResult);

  const performAnalysis = async (cYear: number, cMonth: number, vYear: number, vMonth: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-couple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chongNamSinh: cYear,
          chongThangSanh: cMonth,
          voNamSinh: vYear,
          voThangSanh: vMonth,
        }),
      });

      if (res.ok) {
        const data: CoupleAnalysisResult = await res.json();
        setResult(data);
        if (data.tongKetDuyenNo.diemSo >= 75) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#d97706', '#b45309', '#f59e0b'],
          });
        }
      }
    } catch (err) {
      console.error('Error analyzing:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!result) {
      performAnalysis(chongYear, chongMonth, voYear, voMonth);
    }
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    performAnalysis(chongYear, chongMonth, voYear, voMonth);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    if (score >= 65) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (score >= 50) return 'bg-yellow-100 text-yellow-900 border-yellow-300';
    return 'bg-rose-100 text-rose-900 border-rose-300';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Thuật Số Căn Duyên Tiền Định &bull; Cao Ly Đầu Hình</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
          Lập Quẻ Luận Đoán Nhân Duyên Vợ Chồng
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Tra cứu Can Chi, Ngũ Hành nạp âm, 100 Đồ Hình Cao Ly, 12 Cung Trường Sanh và hạn Cô Thần - Quả Tú.
        </p>
      </div>

      {/* Input Form Card */}
      <form
        onSubmit={handleCalculate}
        className="bg-white border-2 border-amber-300/80 rounded-2xl p-5 sm:p-7 shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Heart icon in center on large screens */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-amber-100 border border-amber-300 items-center justify-center text-amber-700 z-10 shadow-xs">
            <Heart className="w-5 h-5 fill-amber-300" />
          </div>

          {/* Husband Column */}
          <div className="space-y-4 bg-amber-50/50 p-4 sm:p-5 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-2 border-b border-amber-200 pb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-xs">
                ♂
              </div>
              <h2 className="font-serif font-bold text-amber-950 text-base">Thông Tin Người Chồng</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Năm sinh Dương lịch / Âm lịch (1940 - 2030):
                </label>
                <input
                  type="number"
                  min="1940"
                  max="2030"
                  value={chongYear}
                  onChange={(e) => setChongYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-stone-900 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tháng sinh (Tháng Âm Lịch):
                </label>
                <select
                  value={chongMonth}
                  onChange={(e) => setChongMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m === 1 ? 'Giêng (1)' : m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Wife Column */}
          <div className="space-y-4 bg-amber-50/50 p-4 sm:p-5 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-2 border-b border-amber-200 pb-2">
              <div className="w-7 h-7 rounded-lg bg-rose-800 text-rose-100 flex items-center justify-center font-bold text-xs">
                ♀
              </div>
              <h2 className="font-serif font-bold text-rose-950 text-base">Thông Tin Người Vợ</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Năm sinh Dương lịch / Âm lịch (1940 - 2030):
                </label>
                <input
                  type="number"
                  min="1940"
                  max="2030"
                  value={voYear}
                  onChange={(e) => setVoYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-stone-900 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tháng sinh (Tháng Âm Lịch):
                </label>
                <select
                  value={voMonth}
                  onChange={(e) => setVoMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m === 1 ? 'Giêng (1)' : m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            id="btn-calculate-couple"
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-linear-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-bold text-base shadow-md hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{loading ? 'Đang Lập Quẻ...' : 'Lập Quẻ Xem Duyên Nợ'}</span>
          </button>
        </div>
      </form>

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Header Score & Classification */}
          <div className="bg-linear-to-br from-amber-900 to-amber-950 text-amber-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-700 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-medium">
                    Tổng Luận Căn Duyên
                  </span>
                  <span className="text-xs text-amber-200">
                    Chồng {result.chong.fullName} &hearts; Vợ {result.vo.fullName}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                  Xếp Loại: {result.tongKetDuyenNo.xepLoai}
                </h3>
                <p className="text-sm text-amber-200/90 max-w-2xl leading-relaxed">
                  {result.tongKetDuyenNo.loiKhuyenHoaGiai}
                </p>
              </div>

              {/* Score circle */}
              <div className="flex flex-col items-center justify-center p-4 bg-amber-800/60 backdrop-blur-xs border border-amber-600/40 rounded-2xl shrink-0 w-32 h-32 text-center">
                <span className="text-3xl font-black font-serif text-amber-200">
                  {result.tongKetDuyenNo.diemSo}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-medium">
                  Điểm Hòa Hợp / 100
                </span>
              </div>
            </div>

            {/* Quick Action to Ask AI */}
            <div className="mt-6 pt-5 border-t border-amber-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-amber-300/80 italic">
                Cổ nhân có câu: &ldquo;Phước Đức Năng Thắng Số&rdquo; &bull; Tâm lành phước trổ
              </p>
              <button
                id="btn-ask-ai-detail"
                onClick={() => onSelectCoupleForChat(result)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-amber-300 text-amber-950 hover:bg-amber-200 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Hỏi Cụ Căn Duyên AI Luận Giải Chi Tiết</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Cao Ly Đầu Hình Card */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-amber-700" />
                  <h4 className="font-serif font-bold text-amber-950 text-lg">
                    Phép Cao Ly Đầu Hình
                  </h4>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${getScoreBadge(result.caoly.danhGia === 'Đại Cát' ? 90 : result.caoly.danhGia === 'Cát' ? 75 : 50)}`}>
                  {result.caoly.danhGia}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                    Đồ hình:
                  </span>
                  <p className="text-base font-serif font-bold text-amber-950">
                    {result.caoly.tenDoHinh}
                  </p>
                </div>

                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs sm:text-sm font-serif italic text-amber-950 leading-relaxed">
                  &ldquo;{result.caoly.thoHanNom}&rdquo;
                </div>

                <div>
                  <span className="text-xs font-semibold text-stone-600 block mb-1">
                    Chú thích cổ thư dịch nghĩa:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                    {result.caoly.chuThich}
                  </p>
                </div>

                <div className="p-3 bg-amber-100/60 rounded-xl text-xs text-amber-900 border border-amber-200/80">
                  <strong>Khuyên dạy:</strong> {result.caoly.khuyenNghi}
                </div>
              </div>
            </div>

            {/* 2. Mạng Ngũ Hành & 12 Cung Trường Sanh */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <h4 className="font-serif font-bold text-amber-950 text-lg">
                    Mạng & Cung Trường Sanh
                  </h4>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${result.tuongSinhMenh.hop ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-100 text-rose-900 border-rose-300'}`}>
                  {result.tuongSinhMenh.quanHe}
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {/* Menh details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-stone-500 block">Chồng ({result.chong.fullName}):</span>
                    <span className="font-bold text-amber-900">{result.chong.menh}</span>
                  </div>
                  <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                    <span className="text-stone-500 block">Vợ ({result.vo.fullName}):</span>
                    <span className="font-bold text-rose-900">{result.vo.menh}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {result.tuongSinhMenh.chiTiet}
                </p>

                {/* Truong Sanh detail */}
                {result.tamtheTruongSanh && (
                  <div className="pt-2 border-t border-amber-100 space-y-2">
                    <span className="font-bold text-amber-950 block text-xs uppercase tracking-wider">
                      Cung Trường Sanh (Diễn Cầm Tam Thế):
                    </span>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span>Chồng sanh tháng {chongMonth}: <strong className="text-amber-900">{result.tamtheTruongSanh.chuChong}</strong></span>
                        <span className="font-semibold text-stone-600">({result.tamtheTruongSanh.giaiDoanChong?.danhGia})</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Vợ sanh tháng {voMonth}: <strong className="text-rose-900">{result.tamtheTruongSanh.chuVo}</strong></span>
                        <span className="font-semibold text-stone-600">({result.tamtheTruongSanh.giaiDoanVo?.danhGia})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Co Than Qua Tu */}
                {result.coThanQuaTu && (
                  <div className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${
                    result.coThanQuaTu.chongPham || result.coThanQuaTu.voPham
                      ? 'bg-amber-50/90 border-amber-300 text-amber-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{result.coThanQuaTu.chiTiet}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
