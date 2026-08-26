import React from 'react';
import { BookOpen, History, Award, Scroll, Heart } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold">
          <History className="w-3.5 h-3.5 text-amber-700" />
          <span>Lịch Sử & Xuất Xứ Cổ Thư</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
          Nguồn Gốc Cổ Bản & Tác Giả
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Các tài liệu cổ học quý giá được số hóa và xây dựng thành cơ sở tri thức cho Trợ Lý AI.
        </p>
      </div>

      {/* Book 1: Dien Cam Tam The */}
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-3 border-b border-amber-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center font-bold">
            <Scroll className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-950">
              Sách Số: Diễn Cầm Tam Thế Diễn Nghĩa (1952)
            </h2>
            <p className="text-xs text-amber-800 font-medium">
              Soạn giả: Dương Công Hầu (Hiệu: Khương Đức) &bull; NXB Đuốc Sáng
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
          <p>
            Theo Lời Hồi Sơ của tác giả: <em>&ldquo;Người soạn giả: Danh từ Dương Công Hầu, Sư Hiệu Khương Đức, Sanh năm 1928 quê hương ở làng Khánh Bình, Quận Cà Mau, Tỉnh Bạc Liêu. Thân sinh Tôi là nhà nho học lưu truyền, lại thêm chuyên luyện khoa học, một bản Sách Số này nhiều năm kinh nghiệm thạo thông, để lưu truyền cho tử tôn kế nghiệp...&rdquo;</em>
          </p>
          <p>
            Bộ sách này đúc kết phương pháp chiêm nghiệm vận mạng, cung Trường Sanh, mạng ngũ hành nạp âm, xem số vợ chồng <strong>Căn Duyên Tiền Định</strong>, hào con cái, điền sản nhà cửa, 30 câu thơ giải đoán vận mạng từng tuổi cùng phép cầu an, hóa giải nghiệp chướng.
          </p>
        </div>
      </div>

      {/* Book 2: Cao Ly Dau Hinh */}
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-3 border-b border-amber-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-950">
              Sách: Cao Ly Đầu Hình (Đã sửa chữa và bổ túc)
            </h2>
            <p className="text-xs text-amber-800 font-medium">
              Soạn giả: Đoàn Văn Đâu &bull; Dịch giả: Ng. Kim Lan và Đoàn Văn Tố &bull; NXB Hồng Dân Sài Gòn
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
          <p>
            Theo Lời Tựa sách: <em>&ldquo;Trong đời không gì khó khăn quan hệ bằng sự lựa chọn người bạn trăm năm, người cùng mình sẽ sớt chia cơn đau khổ cũng như cộng hưởng phú quí giàu sang. Cao Ly Đầu Hình là một chìa khóa mở muôn cửa bí mật về hôn nhơn giá thú...&rdquo;</em>
          </p>
          <p>
            Sách cung cấp 100 Đồ Hình chuẩn xác phối hợp giữa 10 Thiên Can của người Chồng (Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý) với 12 Địa Chi của người Vợ (Tý, Sửu, Dần, Mẹo, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi), kèm các bức họa đồ hình, thơ âm Hán Nôm và lời chú thích luận giải tường tận.
          </p>
        </div>
      </div>

      {/* Ethics & Meaning */}
      <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-6 text-xs sm:text-sm text-amber-950 space-y-2">
        <div className="flex items-center space-x-2 font-bold font-serif text-base text-amber-900">
          <Heart className="w-5 h-5 text-amber-700" />
          <span>Tâm Niệm Ứng Dụng Trong Đời Sống Hiện Đại</span>
        </div>
        <p className="leading-relaxed">
          Ứng dụng web AI này ra đời với mục đích bảo tồn giá trị văn hóa cổ truyền của tiền nhân, giúp quý độc giả tra cứu nhanh chóng và dễ dàng. Số mệnh là tấm gương soi để ta tu dưỡng tâm tánh; sự thấu hiểu, lòng bao dung, nhẫn nại và phước đức tích lũy mới là nền tảng vững bền nhất cho hạnh phúc lứa đôi.
        </p>
      </div>
    </div>
  );
};
