import React, { useState } from 'react';
import { Search, BookOpen, Layers, Heart, Sparkles, ScrollText, ShieldAlert, Award } from 'lucide-react';
import { CAO_LY_DATA } from '../data/caolyData';
import { TRUONG_SANH_DATA, THIEN_CAN, NGU_HANH_NAP_AM_60 } from '../data/tamtheData';
import { CanName } from '../types';

export const AncientLibraryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'caoly' | 'truongsanh' | 'napam' | 'phuocduc'>('caoly');
  const [selectedCan, setSelectedCan] = useState<CanName>('Giáp');
  const [searchQuery, setSearchQuery] = useState('');

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
          Trích lục nguyên văn từ Diễn Cầm Tam Thế (1952) và Cao Ly Đầu Hình (NXB Hồng Dân).
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center border-b border-amber-200">
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('caoly')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 ${
              activeTab === 'caoly'
                ? 'border-amber-800 text-amber-900 bg-amber-100/60'
                : 'border-transparent text-stone-600 hover:text-amber-900'
            }`}
          >
            <ScrollText className="w-4 h-4 text-amber-700" />
            <span>100 Đồ Hình Cao Ly</span>
          </button>

          <button
            onClick={() => setActiveTab('truongsanh')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 ${
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
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 ${
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
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 ${
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
