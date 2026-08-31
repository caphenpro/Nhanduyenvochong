import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ShieldCheck, ArrowRight, BookOpen, Layers, CheckCircle2, AlertTriangle, Info, Compass, CompassIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleAnalysisResult } from '../types';
import { analyzeCoupleMultiLayer } from '../services/coupleAnalysis';

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

  const performAnalysis = (cYear: number, cMonth: number, vYear: number, vMonth: number) => {
    setLoading(true);
    try {
      const data = analyzeCoupleMultiLayer(cYear, cMonth, vYear, vMonth);
      setResult(data);
      if (data.cauTrucTongHop.diemThuan.length >= 2) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#e11d48', '#f59e0b', '#fb7185'],
        });
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          <img src="/logo.png" alt="Logo" className="w-4 h-4 rounded-full object-cover" />
          <span>AI Nhân Duyên &bull; Hệ Thống Luận Giải Đa Tầng Khoa Học</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-amber-950">
          Khảo Sát Hòa Hợp Nhân Duyên & Hôn Nhân
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Đánh giá đa chiều dựa trên <strong>Thiên Can (Khí)</strong>, <strong>Địa Chi (Động)</strong>, <strong>Ngũ Hành</strong>, <strong>Nạp Âm Lục Thập Hoa Giáp</strong> và <strong>Cung Mệnh Bát Trạch</strong>.
        </p>
      </div>

      {/* Input Form Card */}
      <form
        onSubmit={handleCalculate}
        className="bg-white border-2 border-rose-200/80 rounded-2xl p-5 sm:p-7 shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Heart icon in center on large screens */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rose-100 border border-rose-300 items-center justify-center text-rose-600 z-10 shadow-xs">
            <Heart className="w-5 h-5 fill-rose-300" />
          </div>

          {/* Husband Column */}
          <div className="space-y-4 bg-amber-50/60 p-4 sm:p-5 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-2 border-b border-amber-200 pb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-xs">
                ♂
              </div>
              <h2 className="font-serif font-bold text-amber-950 text-base">Thông Tin Người Chồng (Nam)</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Năm Sinh Dương Lịch (1940 - 2035):
                </label>
                <input
                  id="chong-year-input"
                  type="number"
                  min="1940"
                  max="2035"
                  value={chongYear}
                  onChange={(e) => setChongYear(parseInt(e.target.value) || 1990)}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-sm font-semibold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tháng Sinh Âm Lịch (1 - 12):
                </label>
                <select
                  id="chong-month-select"
                  value={chongMonth}
                  onChange={(e) => setChongMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Tháng {i + 1} Âm Lịch
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Wife Column */}
          <div className="space-y-4 bg-rose-50/60 p-4 sm:p-5 rounded-xl border border-rose-200">
            <div className="flex items-center space-x-2 border-b border-rose-200 pb-2">
              <div className="w-7 h-7 rounded-lg bg-rose-800 text-rose-100 flex items-center justify-center font-bold text-xs">
                ♀
              </div>
              <h2 className="font-serif font-bold text-rose-950 text-base">Thông Tin Người Vợ (Nữ)</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Năm Sinh Dương Lịch (1940 - 2035):
                </label>
                <input
                  id="vo-year-input"
                  type="number"
                  min="1940"
                  max="2035"
                  value={voYear}
                  onChange={(e) => setVoYear(parseInt(e.target.value) || 1990)}
                  className="w-full px-3 py-2 bg-white border border-rose-300 rounded-lg text-sm font-semibold text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tháng Sinh Âm Lịch (1 - 12):
                </label>
                <select
                  id="vo-month-select"
                  value={voMonth}
                  onChange={(e) => setVoMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-rose-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Tháng {i + 1} Âm Lịch
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-6 flex justify-center">
          <button
            id="btn-calculate-couple"
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-linear-to-r from-rose-700 to-amber-900 hover:from-rose-800 hover:to-amber-950 text-white font-bold text-base shadow-md hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-rose-200" />
            <span>{loading ? 'Đang Phân Tích Đa Tầng...' : 'Phân Tích Hòa Hợp Nhân Duyên'}</span>
          </button>
        </div>
      </form>

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Header Summary Banner */}
          <div className="bg-linear-to-br from-stone-900 via-rose-950 to-amber-950 text-amber-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-rose-800/60 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40 font-medium">
                    Cấu Trúc Hòa Hợp Đa Tầng
                  </span>
                  <span className="text-xs text-amber-200">
                    Chồng {result.chong.fullName} ({result.chong.lunarYear}) &hearts; Vợ {result.vo.fullName} ({result.vo.lunarYear})
                  </span>
                </div>
                <div className="text-xs text-stone-300">
                  Cung Bát Trạch: <strong className="text-amber-200">{result.tang5CungMenh.ketQuaBatTrach}</strong>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-100">
                  Thông Điệp Cốt Lõi: &ldquo;{result.cauTrucTongHop.thongDiepCotLoi}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
                  {result.cauTrucTongHop.amDuongCheHoa}
                </p>
              </div>

              {/* Quick Action to Ask AI */}
              <div className="pt-4 border-t border-rose-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-rose-200/80 italic">
                  &ldquo;Một người không phải chỉ là một cái tuổi &bull; Đạo đức và sự thấu hiểu quyết định hôn nhân&rdquo;
                </p>
                <button
                  id="btn-ask-ai-detail"
                  onClick={() => onSelectCoupleForChat(result)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-rose-200 hover:bg-rose-100 text-rose-950 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <img src="/logo.png" alt="AI" className="w-4 h-4 rounded-full object-cover" />
                  <span>Đàm Đạo Với AI Nhân Duyên Về Cặp Đôi Này</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 6 Layers Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tầng 1: Thiên Can */}
            <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-serif font-bold text-amber-950 text-base">
                    Tầng 1: Thiên Can (Tầng Khí)
                  </h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {result.tang1ThienCan.quanHe}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Khảo sát:</strong> Chồng Can <strong>{result.tang1ThienCan.canChong}</strong> ({result.chong.canNguHanh}) &times; Vợ Can <strong>{result.tang1ThienCan.canVo}</strong> ({result.vo.canNguHanh}).
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">
                {result.tang1ThienCan.chiTiet}
              </p>
              <div className="p-2.5 bg-amber-50/70 rounded-xl text-xs text-amber-900 border border-amber-200">
                <strong>Ý nghĩa Khí:</strong> {result.tang1ThienCan.yNghiaKhi}
              </div>
            </div>

            {/* Tầng 2: Địa Chi */}
            <div className="bg-white border border-rose-200/80 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="font-serif font-bold text-rose-950 text-base">
                    Tầng 2: Địa Chi (Tầng Động)
                  </h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-900 border border-rose-300">
                  {result.tang2DiaChi.tamHop ? 'Tam Hợp' : result.tang2DiaChi.lucHop ? 'Lục Hợp' : result.tang2DiaChi.lucXung ? 'Lục Xung' : result.tang2DiaChi.lucHai ? 'Lục Hại' : 'Bình Hòa'}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Khảo sát:</strong> Chi Chồng <strong>{result.chong.chi}</strong> ({result.chong.tuoiCon}) &times; Chi Vợ <strong>{result.vo.chi}</strong> ({result.vo.tuoiCon}).
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">
                {result.tang2DiaChi.chiTietDong}
              </p>
              <div className="p-2.5 bg-rose-50/70 rounded-xl text-xs text-rose-900 border border-rose-200">
                <strong>Phạm vi:</strong> Địa Chi đại diện cho hoàn cảnh cụ thể, nếp sinh hoạt và sự chuyển động hàng ngày.
              </div>
            </div>

            {/* Tầng 3 & 4: Ngũ Hành & Nạp Âm Lục Thập Hoa Giáp */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-900 flex items-center justify-center font-bold text-xs">
                    3-4
                  </div>
                  <h4 className="font-serif font-bold text-stone-950 text-base">
                    Tầng 3 & 4: Ngũ Hành & Nạp Âm
                  </h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-stone-100 text-stone-800 border border-stone-300">
                  {result.tang4NapAm.quanHe}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Nạp Âm Chồng:</span>
                  <strong className="text-stone-900">{result.tang4NapAm.napAmChong}</strong> ({result.tang4NapAm.nguHanhChong})
                </div>
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Nạp Âm Vợ:</span>
                  <strong className="text-stone-900">{result.tang4NapAm.napAmVo}</strong> ({result.tang4NapAm.nguHanhVo})
                </div>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {result.tang3NguHanh.chiTiet}
              </p>
              <div className="p-2.5 bg-stone-50 rounded-xl text-xs text-stone-700 border border-stone-200">
                <strong>Quy chiếu:</strong> {result.tang4NapAm.phanBietRoRang}
              </div>
            </div>

            {/* Tầng 5: Cung Mệnh Bát Trạch */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-900 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <h4 className="font-serif font-bold text-stone-950 text-base">
                    Tầng 5: Cung Mệnh Bát Trạch
                  </h4>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  result.tang5CungMenh.nhomBatTrach === 'Cát' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {result.tang5CungMenh.ketQuaBatTrach}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Phối Cung:</strong> Chồng cung <strong>{result.tang5CungMenh.cungChong}</strong> ({result.tang5CungMenh.dongTayChong}) &times; Vợ cung <strong>{result.tang5CungMenh.cungVo}</strong> ({result.tang5CungMenh.dongTayVo}) &rarr; Cung <strong>{result.tang5CungMenh.ketQuaBatTrach}</strong> (Nhóm {result.tang5CungMenh.nhomBatTrach}).
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">
                {result.tang5CungMenh.yNghia}
              </p>
              <div className="p-2.5 bg-stone-50 rounded-xl text-xs text-stone-700 border border-stone-200">
                <strong>Bát Trạch trong hôn nhân:</strong> Dùng tham khảo hướng nhà, trạch vị gia đạo và phong cách tương tác không gian.
              </div>
            </div>
          </div>

          {/* Tầng 6: Cấu Trúc Tổng Hợp Thuận / Nghịch / Lưu Ý */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
              <Layers className="w-5 h-5 text-rose-700" />
              <h4 className="font-serif font-bold text-stone-950 text-lg">
                Tầng 6: Tổng Hợp Cấu Trúc & Khuyến Nghị Thực Tế
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Điểm Thuận */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Điểm Thuận</span>
                </div>
                <ul className="space-y-1 text-emerald-950">
                  {result.cauTrucTongHop.diemThuan.length > 0 ? (
                    result.cauTrucTongHop.diemThuan.map((dt, idx) => (
                      <li key={idx} className="list-disc ml-4">{dt}</li>
                    ))
                  ) : (
                    <li className="italic text-stone-500">Giữ thế tự nhiên, không có tương sinh lớn.</li>
                  )}
                </ul>
              </div>

              {/* Điểm Nghịch */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Điểm Nghịch / Khác Biệt</span>
                </div>
                <ul className="space-y-1 text-amber-950">
                  {result.cauTrucTongHop.diemNghich.length > 0 ? (
                    result.cauTrucTongHop.diemNghich.map((dn, idx) => (
                      <li key={idx} className="list-disc ml-4">{dn}</li>
                    ))
                  ) : (
                    <li className="italic text-stone-500">Không có quan hệ xung phá lớn.</li>
                  )}
                </ul>
              </div>

              {/* Điểm Cần Lưu Ý */}
              <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-rose-900">
                  <Info className="w-4 h-4 text-rose-600" />
                  <span>Điểm Cần Lưu Ý</span>
                </div>
                <ul className="space-y-1 text-rose-950">
                  {result.cauTrucTongHop.diemLuuY.map((dl, idx) => (
                    <li key={idx} className="list-disc ml-4">{dl}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
