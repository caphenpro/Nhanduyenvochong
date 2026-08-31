import React, { useState } from 'react';
import { Search, BookOpen, Layers, Heart, Sparkles, ScrollText, Compass, Navigation, ShieldCheck, ShieldAlert, Home } from 'lucide-react';
import { CAO_LY_DATA } from '../data/caolyData';
import { TRUONG_SANH_DATA, THIEN_CAN, NGU_HANH_NAP_AM_60 } from '../data/tamtheData';
import {
  BAT_TRACH_8_CUNG_CHI_TIET,
  Y_NGHIA_8_DU_NIEN,
  BANG_SO_DU_BAT_TRACH,
  calculateBatTrachByYear,
  HuongDiaLy,
} from '../data/batTrachData';
import { CanName, CungPhi } from '../types';

export const AncientLibraryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'caoly' | 'truongsanh' | 'napam' | 'battrach' | 'phuocduc'>('caoly');
  const [selectedCan, setSelectedCan] = useState<CanName>('Giáp');
  const [searchQuery, setSearchQuery] = useState('');

  // State cho Bát Trạch Interactive Lookup
  const [batTrachYear, setBatTrachYear] = useState<number>(1990);
  const [batTrachGender, setBatTrachGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [selectedCungDetail, setSelectedCungDetail] = useState<CungPhi>('Khảm');

  const batTrachCalculation = calculateBatTrachByYear(batTrachYear, batTrachGender);
  const currentCungInfo = BAT_TRACH_8_CUNG_CHI_TIET[selectedCungDetail];

  const filteredCaoLy = CAO_LY_DATA.filter((item) => {
    const matchCan = selectedCan ? item.canChong === selectedCan : true;
    const matchQuery =
      searchQuery.trim() === '' ||
      item.tenDoHinh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chiVo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chuThich.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCan && matchQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Tàng Kinh Các Cổ Thư</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
          Cẩm Nang Tra Cứu Toàn Thư Cổ Bản
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Trích lục nguyên văn từ Cung Mệnh Bát Trạch, Diễn Cầm Tam Thế (1952) và Cao Ly Đầu Hình (NXB Hồng Dân).
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center border-b border-amber-200">
        <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('caoly')}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'caoly'
                ? 'border-amber-800 text-amber-900 bg-amber-100/60'
                : 'border-transparent text-stone-600 hover:text-amber-900'
            }`}
          >
            <ScrollText className="w-4 h-4 text-amber-700" />
            <span>100 Đồ Hình Cao Ly</span>
          </button>

          <button
            onClick={() => setActiveTab('battrach')}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'battrach'
                ? 'border-amber-800 text-amber-900 bg-amber-100/60'
                : 'border-transparent text-stone-600 hover:text-amber-900'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Cung Mệnh Bát Trạch</span>
          </button>

          <button
            onClick={() => setActiveTab('truongsanh')}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'truongsanh'
                ? 'border-amber-800 text-amber-900 bg-amber-100/60'
                : 'border-transparent text-stone-600 hover:text-amber-900'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-700" />
            <span>12 Cung Trường Sanh</span>
          </button>

          <button
            onClick={() => setActiveTab('napam')}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'napam'
                ? 'border-amber-800 text-amber-900 bg-amber-100/60'
                : 'border-transparent text-stone-600 hover:text-amber-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>60 Hoa Giáp & Nạp Âm</span>
          </button>

          <button
            onClick={() => setActiveTab('phuocduc')}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'phuocduc'
                ? 'border-amber-800 text-amber-900 bg-amber-100/60'
                : 'border-transparent text-stone-600 hover:text-amber-900'
            }`}
          >
            <Heart className="w-4 h-4 text-amber-700" />
            <span>Đức Năng Thắng Số</span>
          </button>
        </div>
      </div>


      {/* Tab 1: Cao Ly Dau Hinh */}
      {activeTab === 'caoly' && (
        <div className="space-y-5">
          {/* Can Selector & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-amber-900 shrink-0 mr-1">Can Chồng:</span>
              {THIEN_CAN.map((can) => (
                <button
                  key={can}
                  onClick={() => setSelectedCan(can)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedCan === can
                      ? 'bg-amber-900 text-amber-50 shadow-xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  Cang {can}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm quẻ, tuổi vợ, ý nghĩa..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCaoLy.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-amber-800 font-semibold">
                      Chồng Cang {item.canChong} &bull; Vợ tuổi {item.chiVo}
                    </span>
                    <h3 className="text-base font-serif font-bold text-amber-950">
                      {item.tenDoHinh}
                    </h3>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                      item.danhGia === 'Đại Cát'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : item.danhGia === 'Cát'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : item.danhGia === 'Hung'
                        ? 'bg-orange-100 text-orange-900 border-orange-300'
                        : item.danhGia === 'Đại Hung'
                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                        : 'bg-stone-100 text-stone-900 border-stone-300'
                    }`}
                  >
                    {item.danhGia}
                  </span>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs font-serif italic text-amber-900 leading-relaxed">
                  &ldquo;{item.thoHanNom}&rdquo;
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {item.chuThich}
                </p>

                <div className="pt-2 border-t border-amber-100 text-xs text-amber-900 font-medium">
                  <strong>Khuyên dạy:</strong> {item.khuyenNghi}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Bát Trạch Toàn Thư */}
      {activeTab === 'battrach' && (
        <div className="space-y-6">
          {/* Interactive Bát Trạch Calculator */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-300 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide">
                  <Compass className="w-4 h-4 text-amber-700" />
                  <span>Công Cụ Tra Cứu Trực Tuyến</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                  Tra Cứu Cung Mệnh & 8 Hướng Phong Thủy
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Dựa theo thuật toán số dư năm sinh âm lịch chia 9 và giới tính chuẩn cổ thư.
                </p>
              </div>

              {/* Quick Input Form */}
              <div className="flex flex-wrap items-center gap-3 bg-white/90 p-3 rounded-2xl border border-amber-200 shadow-xs">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Năm sinh Âm lịch</label>
                  <input
                    type="number"
                    min={1930}
                    max={2040}
                    value={batTrachYear}
                    onChange={(e) => setBatTrachYear(Number(e.target.value) || 1990)}
                    className="w-24 px-2.5 py-1 text-sm font-bold text-amber-950 bg-amber-50/50 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Giới tính</label>
                  <div className="flex space-x-1 bg-amber-50 p-0.5 rounded-lg border border-amber-200">
                    {(['Nam', 'Nữ'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setBatTrachGender(g)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                          batTrachGender === g
                            ? 'bg-amber-900 text-white shadow-xs'
                            : 'text-stone-600 hover:text-amber-900'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tra Cứu Result Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Kết Quả Mệnh Quái</span>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="text-3xl font-serif font-black text-amber-950">
                      Cung {batTrachCalculation.cung}
                    </span>
                    <span className="text-sm font-bold text-amber-800">
                      ({batTrachCalculation.nguHanh})
                    </span>
                  </div>
                  <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <span>{batTrachCalculation.nhom}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-1.5 text-stone-700">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Thuật toán chia 9:</span>
                    <span className="font-mono font-bold text-amber-950">
                      Tổng = {batTrachCalculation.tongChuSo} &rarr; Dư {batTrachCalculation.soDu}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Trạch hướng hợp:</span>
                    <span className="font-bold text-amber-900">
                      {batTrachCalculation.nhom === 'Đông Tứ Mệnh' ? 'Đông Tứ Trạch' : 'Tây Tứ Trạch'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 pt-1 italic">
                    {batTrachCalculation.nhom === 'Đông Tứ Mệnh'
                      ? 'Hợp các hướng: Đông, Đông Nam, Nam, Bắc'
                      : 'Hợp các hướng: Tây, Tây Bắc, Tây Nam, Đông Bắc'}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCungDetail(batTrachCalculation.cung)}
                  className="w-full py-2 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Xem Chi Tiết 8 Hướng Cung {batTrachCalculation.cung}</span>
                </button>
              </div>

              {/* 8 Directions Grid of calculated person */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    8 Hướng Du Niên Cho {batTrachGender} ({batTrachYear} — Cung {batTrachCalculation.cung})
                  </span>
                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="inline-flex items-center text-emerald-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1" /> 4 Hướng Cát
                    </span>
                    <span className="inline-flex items-center text-rose-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500 mr-1" /> 4 Hướng Hung
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(BAT_TRACH_8_CUNG_CHI_TIET[batTrachCalculation.cung].huongDetail).map(
                    ([huong, detail]) => {
                      const isCat = detail.loai === 'Cát';
                      return (
                        <div
                          key={huong}
                          className={`p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                            isCat
                              ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400'
                              : 'bg-rose-50/60 border-rose-200 hover:border-rose-400'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900">{huong}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                  isCat ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                                }`}
                              >
                                {detail.duNien}
                              </span>
                            </div>
                            <div className={`text-[11px] font-semibold mt-1 ${isCat ? 'text-emerald-800' : 'text-rose-800'}`}>
                              {detail.nguHanhDuNien} khí &bull; {isCat ? 'Cát Khí' : 'Hung Khí'}
                            </div>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-2 line-clamp-2" title={detail.yNghia}>
                            {detail.yNghia}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: 8 Cung Mệnh và 2 Nhóm Trạch */}
          <div className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>1. Bảng 8 Cung Mệnh & Hai Nhóm Trạch</span>
            </h3>
            <p className="text-xs text-stone-600">
              8 Cung Mệnh Bát Trạch được phân định thành 2 nhóm trường khí Đông Tứ Mệnh và Tây Tứ Mệnh:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-950 text-sm">🌿 Nhóm Đông Tứ Mệnh</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-semibold">
                    Đông Tứ Trạch
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1">
                  <div><strong>Gồm các cung:</strong> Khảm (Thủy), Ly (Hỏa), Chấn (Mộc), Tốn (Mộc).</div>
                  <div><strong>Hướng hợp (Đông Tứ Trạch):</strong> <span className="font-semibold text-emerald-800">Đông, Đông Nam, Nam, Bắc.</span></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-950 text-sm">🏔️ Nhóm Tây Tứ Mệnh</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-200/80 text-amber-900 font-semibold">
                    Tây Tứ Trạch
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1">
                  <div><strong>Gồm các cung:</strong> Càn (Kim), Đoài (Kim), Cấn (Thổ), Khôn (Thổ).</div>
                  <div><strong>Hướng hợp (Tây Tứ Trạch):</strong> <span className="font-semibold text-emerald-800">Tây, Tây Bắc, Tây Nam, Đông Bắc.</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bảng Tra Cứu Số Dư Năm Sinh Chia 9 */}
          <div className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center space-x-2">
              <ScrollText className="w-5 h-5 text-amber-700" />
              <span>2. Bảng Tra Cứu Số Dư Năm Sinh Âm Lịch (Chia 9)</span>
            </h3>
            <p className="text-xs text-stone-600">
              Cộng tất cả chữ số năm sinh âm lịch lại rồi chia cho 9 lấy số dư (nếu chia hết lấy số dư là 9 hoặc 0):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-amber-100/70 text-amber-950 font-bold border-b border-amber-200">
                    <th className="p-2.5 rounded-l-lg">Số Dư</th>
                    <th className="p-2.5">Nam Mạng</th>
                    <th className="p-2.5">Nhóm Nam</th>
                    <th className="p-2.5">Nữ Mạng</th>
                    <th className="p-2.5 rounded-r-lg">Nhóm Nữ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-stone-700">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 0].map((soDu) => {
                    const row = BANG_SO_DU_BAT_TRACH[soDu];
                    const dongTu: CungPhi[] = ['Khảm', 'Ly', 'Chấn', 'Tốn'];
                    const nhomNam = dongTu.includes(row.nam.cung) ? 'Đông Tứ' : 'Tây Tứ';
                    const nhomNu = dongTu.includes(row.nu.cung) ? 'Đông Tứ' : 'Tây Tứ';
                    return (
                      <tr key={soDu} className="hover:bg-amber-50/60 transition-colors">
                        <td className="p-2.5 font-bold font-mono text-amber-900">
                          {soDu === 0 ? '0 / 9' : soDu}
                        </td>
                        <td className="p-2.5 font-semibold text-amber-950">
                          {row.nam.cung} ({row.nam.hanh})
                        </td>
                        <td className="p-2.5 text-stone-600">{nhomNam} Mệnh</td>
                        <td className="p-2.5 font-semibold text-amber-950">
                          {row.nu.cung} ({row.nu.hanh})
                        </td>
                        <td className="p-2.5 text-stone-600">{nhomNu} Mệnh</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Ý Nghĩa 8 Du Niên Trong Bát Trạch */}
          <div className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <span>3. Ý Nghĩa 8 Hướng Du Niên (4 Cát &bull; 4 Hung)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 4 Cát */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>4 Hướng Tốt (Cát Khí)</span>
                </div>
                {(['Sinh Khí', 'Thiên Y', 'Diên Niên', 'Phục Vị'] as const).map((dn) => {
                  const info = Y_NGHIA_8_DU_NIEN[dn];
                  return (
                    <div key={dn} className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-emerald-950">
                        <span>{dn}</span>
                        <span className="text-[11px] text-emerald-800 font-semibold">{info.tieuDe}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{info.yNghia}</p>
                      <p className="text-[11px] text-emerald-900 font-medium pt-1">
                        <strong>Ứng dụng:</strong> {info.phongThuy}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* 4 Hung */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>4 Hướng Xấu (Hung Khí)</span>
                </div>
                {(['Họa Hại', 'Lục Sát', 'Ngũ Quỷ', 'Tuyệt Mệnh'] as const).map((dn) => {
                  const info = Y_NGHIA_8_DU_NIEN[dn];
                  return (
                    <div key={dn} className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-rose-950">
                        <span>{dn}</span>
                        <span className="text-[11px] text-rose-800 font-semibold">{info.tieuDe}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{info.yNghia}</p>
                      <p className="text-[11px] text-rose-900 font-medium pt-1">
                        <strong>Hóa giải:</strong> {info.phongThuy}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Ma Trận Chi Tiết 8 Cung Mệnh Phối 8 Hướng */}
          <div className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center space-x-2">
                  <Home className="w-5 h-5 text-amber-700" />
                  <span>4. Chi Tiết Ma Trận 8 Cung Mệnh Phối 8 Hướng Địa Lý</span>
                </h3>
                <p className="text-xs text-stone-600">
                  Nhấp vào từng Cung để tra cứu toàn bộ 8 hướng địa lý và tên gọi Du Niên tương ứng:
                </p>
              </div>

              {/* Cung Switcher */}
              <div className="flex flex-wrap gap-1">
                {(['Khảm', 'Chấn', 'Tốn', 'Ly', 'Càn', 'Khôn', 'Đoài', 'Cấn'] as CungPhi[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCungDetail(c)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedCungDetail === c
                        ? 'bg-amber-900 text-amber-50 shadow-xs'
                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Cung Detail Panel */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-serif font-bold text-amber-950">
                    Cung {currentCungInfo.cung} ({currentCungInfo.nguHanh})
                  </span>
                  <span className="text-xs font-semibold text-amber-800">
                    &bull; {currentCungInfo.nhom}
                  </span>
                </div>
                <div className="text-xs text-stone-600">
                  <strong>Hướng Hợp:</strong> {currentCungInfo.huongHop.join(' • ')}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(currentCungInfo.huongDetail).map(([huong, detail]) => {
                  const isCat = detail.loai === 'Cát';
                  return (
                    <div
                      key={huong}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        isCat ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50/80 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-stone-900">Hướng {huong}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isCat ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                          {detail.duNien}
                        </span>
                      </div>
                      <div className={`text-[11px] font-medium ${isCat ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {detail.nguHanhDuNien} khí &bull; {detail.loai}
                      </div>
                      <p className="text-[11px] text-stone-600 pt-0.5 leading-snug">
                        {detail.yNghia}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 12 Chữ Trường Sanh */}
      {activeTab === 'truongsanh' && (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
            <strong>Phép Căn Duyên Tiền Định (Diễn Cầm Tam Thế):</strong> Dựa theo Mạng Ngũ Hành của người và Tháng Sinh Âm Lịch để tầm ra 1 trong 12 chữ Trường Sanh. Người xưa dùng 8 câu thơ lục bát này để đoán việc hôn nhân, hợp tan, con cái và sự nghiệp.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(TRUONG_SANH_DATA).map(([key, item]) => (
              <div
                key={key}
                className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-amber-950">
                      Chữ {item.chu}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
                      {item.danhGia}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 italic">
                    {item.yNghia}
                  </p>
                </div>

                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs font-serif text-amber-950 whitespace-pre-line leading-relaxed">
                  {item.baiTho}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 60 Hoa Giap & Nap Am */}
      {activeTab === 'napam' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="text-xs text-stone-600">
            Bảng tra cứu 60 Hoa Giáp, Can Chi, Con Giáp và Mạng Ngũ Hành nạp âm trích từ trang 11-12 sách Diễn Cầm Tam Thế:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {Object.entries(NGU_HANH_NAP_AM_60).map(([year, val]) => (
              <div
                key={year}
                className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs space-y-1 hover:bg-amber-100/70 transition-colors"
              >
                <div className="flex items-center justify-between font-bold text-amber-950">
                  <span>{year}</span>
                  <span className="text-stone-500">{val.tuoiCon}</span>
                </div>
                <div className="font-serif font-bold text-amber-900">
                  {val.can} {val.chi}
                </div>
                <div className="text-[11px] text-stone-600 truncate" title={val.menh}>
                  {val.menh}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Triết lý Đức Năng Thắng Số */}
      {activeTab === 'phuocduc' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-amber-100 pb-4 text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold text-amber-950">
              Lời Cổ Nhân: &ldquo;Đức Năng Thắng Số &bull; Giải Giác Hồng Trần&rdquo;
            </h2>
            <p className="text-xs text-amber-800 italic">
              Trích lục từ chương 34 sách Diễn Cầm Tam Thế Diễn Nghĩa (Dương Công Hầu, 1952)
            </p>
          </div>

          <div className="prose prose-amber max-w-none text-sm sm:text-base leading-relaxed text-stone-800 space-y-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 font-serif italic text-amber-950 text-center">
              &ldquo;Tích xưa hồi đời Tam Quốc, có lời của Đức Quan Đế Thánh Quân. Ngài nói rằng: &lsquo;Hữu phước thì Hữu Điền, Vô Phước thì Vô Điền&rsquo;, bởi chữ phước có chữ điền... Sách có câu nói rằng: &lsquo;Phước Đức Năng Thắng Số&rsquo;. Dẫu số có điền mà không có đức, giữ gìn cũng không đặng; muốn có điền thì trước phải bồi công tích đức mới đặng.&rdquo;
            </div>

            <h3 className="text-lg font-serif font-bold text-amber-950 pt-2">
              1. Nhân Quả & Sự Hòa Hợp Của Vợ Chồng
            </h3>
            <p>
              Cổ thư ghi rõ: vợ chồng gặp nhau đời này là do nhân duyên từ nhiều kiếp trước kết tụ lại. Có duyên lành thì tâm đầu ý hiệp, có duyên nợ thì gặp trắc trở, xung khắc khẩu thiệt. Người xưa xem số không phải để bi quan, thoái thác hay ruồng bỏ bạn đời, mà để <strong>thấu hiểu căn nghiệp</strong> để cùng nhau sửa đổi.
            </p>

            <h3 className="text-lg font-serif font-bold text-amber-950 pt-2">
              2. Phương Pháp Hóa Giải Nghiệp Duyên Xấu
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Tu tâm dưỡng tánh:</strong> Giảm bớt lòng kiêu hãnh, bớt lời khi cãi cọ (&ldquo;Chồng giận thì vợ bớt lời, cơm sôi bớt lửa chẳng đời nào khê&rdquo;).
              </li>
              <li>
                <strong>Hành thiện bố thí:</strong> Giúp đỡ kẻ nghèo khó, cứu trợ người hoạn nạn, phóng sanh cứu vật để tăng thêm phước báo che chở cho gia đạo.
              </li>
              <li>
                <strong>Tha hương lập nghiệp:</strong> Đối với các quẻ phạm ly biệt hoặc khó cầm của ở quê hương cũ, người xưa khuyên nên rời xứ đi xa làm ăn, tránh thị phi và tạo dựng cơ nghiệp mới.
              </li>
              <li>
                <strong>Chăm lo hiếu đạo:</strong> Phụng dưỡng cha mẹ hai bên chu tất, thờ cúng tổ tiên thành tâm là nguồn gốc sâu rễ tạo nên phước báu cho con cháu.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
