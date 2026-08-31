export interface VersionChangeItem {
  type: 'feat' | 'enhance' | 'fix' | 'philosophy' | 'ui';
  title: string;
  description: string;
}

export interface AppVersion {
  version: string;
  releaseDate: string;
  codename: string;
  tagline: string;
  isLatest?: boolean;
  highlights: string[];
  changes: VersionChangeItem[];
}

export const APP_INFO = {
  name: 'AI Nhân Duyên',
  fullName: 'AI Nhân Duyên — Kết Nối Tâm Duyên, Thấu Hiểu Yêu Thương',
  currentVersion: 'v2.2.0',
  releaseDate: '31/08/2026',
  author: 'Nguyễn Hoàng Đăng',
  contactEmail: 'nguyenhoangdang25@gmail.com',
  repositoryUrl: 'https://github.com/nguyenhoangdang/ai-nhan-duyen',
  description: 'Nền tảng trí tuệ nhân tạo chuyên sâu về luận giải hòa hợp nhân duyên vợ chồng, tình yêu và gia đạo theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.',
  motto: 'Một người không phải chỉ là một cái tuổi • Kết Nối Tâm Duyên • Thấu Hiểu Yêu Thương',
};

export const VERSION_HISTORY: AppVersion[] = [
  {
    version: 'v2.2.0',
    releaseDate: '31/08/2026',
    codename: 'Tự Động Luân Chuyển (Smart Auto-Fallback)',
    tagline: 'Chế độ tự động chọn mô hình AI tối ưu và tự động chuyển đổi khi hết hạn mức / gói miễn phí',
    isLatest: true,
    highlights: [
      'Chuyển chế độ mặc định sang "⚡ Tự Động Chọn Mô Hình (Auto-Fallback)" thay vì bắt buộc người dùng chọn thủ công.',
      'Tích hợp chuỗi xoay vòng dự phòng đa mô hình: Gemini 2.5 Flash ➔ DeepSeek Chat ➔ Llama 3.3 70B (Free) ➔ Qwen 2.5 72B (Free) ➔ Gemini Flash Free ➔ Server SDK ➔ Offline Reasoner.',
      'Tự động bắt lỗi hết hạn mức (HTTP 429 / 402 / 503) và tiếp tục trả lời ngay lập tức qua mô hình tiếp theo mà không làm gián đoạn người dùng.',
      'Cập nhật giao diện thanh điều khiển hiển thị trực tiếp trạng thái mô hình đang phản hồi và hướng dẫn chi tiết trong cửa sổ API Key.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Chế độ Tự Động Chọn & Luân Chuyển Mô Hình (Smart Auto-Fallback)',
        description: 'Hệ thống tự động kích hoạt chuỗi dự phòng các mô hình miễn phí và chất lượng cao trên OpenRouter khi mô hình chính hết lượt hoặc bị giới hạn tốc độ.',
      },
      {
        type: 'enhance',
        title: 'Bổ sung danh sách mô hình miễn phí OpenRouter',
        description: 'Tích hợp thêm Llama 3.3 70B Instruct Free, Qwen 2.5 72B Free và Gemini 2.0 Flash Exp Free vào danh mục dự phòng.',
      },
      {
        type: 'ui',
        title: 'Tối ưu trải nghiệm chuyển đổi mô hình',
        description: 'Thanh điều khiển mô hình thông minh với biểu tượng tia chớp ⚡, hiển thị tên mô hình đang đáp ứng tự động và thông báo trạng thái tức thì.',
      },
      {
        type: 'enhance',
        title: 'Đồng bộ hóa Fallback cả Client & Server',
        description: 'Cơ chế luân chuyển mô hình được kích hoạt đồng thời ở cả client fetch và Express backend API.',
      },
    ],
  },
  {
    version: 'v2.1.0',
    releaseDate: '31/08/2026',
    codename: 'Tâm Duyên Toàn Bích',
    tagline: 'Chuẩn hóa nhận diện thương hiệu Logo, số hóa lịch sử phiên bản và tài liệu GitHub README',
    isLatest: false,
    highlights: [
      'Tích hợp Logo AI Nhân Duyên chính thức vào Navbar, Avatar Chatbox, Modal và OpenGraph Meta Tags.',
      'Bổ sung hệ thống quản lý lịch sử phiên bản (Changelog) và quy chế ghi nhớ cập nhật liên tục.',
      'Tạo file README.md chuẩn GitHub Markdown với hướng dẫn triển khai và kiến trúc hệ thống chi tiết.',
      'Hoàn thiện giao diện Giới thiệu & Lịch sử phiên bản tương tác trực tiếp trên ứng dụng.',
    ],
    changes: [
      {
        type: 'ui',
        title: 'Tích hợp Logo chính thức',
        description: 'Cập nhật logo 3 vị trí trọng yếu: Navbar điều hướng, Khung chat AI (Avatar & Header), và Favicon / Meta Tags chia sẻ.',
      },
      {
        type: 'feat',
        title: 'Module Lịch Sử Phiên Bản & Changelog',
        description: 'Tạo cơ chế lưu trữ lịch sử cập nhật có cấu trúc, modal tra cứu phiên bản và hiển thị số phiên bản v2.1.0 trên toàn giao diện.',
      },
      {
        type: 'feat',
        title: 'Tài liệu GitHub README.md',
        description: 'Xây dựng tài liệu dự án hoàn chỉnh gồm tổng quan, 6 tầng luận giải, cài đặt, cấu hình API và giấy phép mã nguồn mở.',
      },
      {
        type: 'enhance',
        title: 'Cơ chế ghi nhớ quy tắc phát triển (AGENTS.md)',
        description: 'Thiết lập chỉ dẫn hệ thống đảm bảo mỗi lần cập nhật mã nguồn đều tự động đồng bộ số phiên bản và lịch sử thay đổi.',
      },
    ],
  },
  {
    version: 'v2.0.0',
    releaseDate: '30/08/2026',
    codename: 'Đa Tầng Âm Dương',
    tagline: 'Chuyển đổi toàn diện phương pháp luận sang 6 Tầng Luận Giải Khoa Học',
    highlights: [
      'Xóa bỏ cách chấm điểm cơ học đơn lẻ, chuyển sang 6 tầng phân tích: Thiên Can (Khí), Địa Chi (Động), Ngũ Hành, Nạp Âm Lục Thập Hoa Giáp, Cung Mệnh Bát Trạch và Cấu Trúc Quan Hệ.',
      'Thiết lập triết lý cốt lõi: Xung không đồng nghĩa với ly hôn, Hợp không đồng nghĩa với tốt tuyệt đối.',
      'Cập nhật Prompt System AI Engine và Cổ Thư Reasoner theo chuẩn tài liệu chuyên sâu mới.',
      'Bổ sung cảnh báo giới hạn năm sinh và định hướng luận giải Tứ Trụ (Năm, Tháng, Ngày, Giờ).',
    ],
    changes: [
      {
        type: 'philosophy',
        title: 'Cải cách triết lý luận giải',
        description: 'Nhấn mạnh một người không phải chỉ là một cái tuổi; chất lượng hôn nhân phụ thuộc vào tính cách, trách nhiệm, đạo đức và sự thấu hiểu.',
      },
      {
        type: 'feat',
        title: 'Công cụ Phân Tích Đa Tầng (Multi-Layer Analysis)',
        description: 'Phân định rõ ràng quan hệ Sinh – Khắc – Chế – Hóa giữa các tầng năng lượng thay vì chỉ so sánh mệnh ngũ hành.',
      },
      {
        type: 'enhance',
        title: 'Đồng bộ Tri Thức AI Chatbox',
        description: 'Cập nhật tri thức trợ lý AI phản hồi chi tiết theo cấu trúc Điểm Thuận, Điểm Nghịch, Điểm Cần Lưu Ý và Lời Khuyên Thực Tế.',
      },
    ],
  },
  {
    version: 'v1.5.0',
    releaseDate: '25/08/2026',
    codename: 'Đa Trí Tuệ Mở',
    tagline: 'Hỗ trợ đa mô hình AI qua OpenRouter (Gemini, Claude, GPT, DeepSeek, Qwen) và quản lý API Key',
    highlights: [
      'Cho phép người dùng tự nhập và bảo mật OpenRouter API Key tại LocalStorage trình duyệt.',
      'Hỗ trợ chuyển đổi linh hoạt giữa các dòng mô hình AI hàng đầu thế giới.',
      'Cơ chế Fallback tự động sang Offline Ancient Reasoner khi không có internet hoặc hết quota API.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Hệ thống Quản lý Khóa API Cá Nhân',
        description: 'Cửa sổ cài đặt khóa API an toàn, lưu mã hóa trong bộ nhớ trình duyệt, không gửi về máy chủ bên thứ ba.',
      },
      {
        type: 'enhance',
        title: 'Bộ Chọn Mô Hình AI (Model Selector)',
        description: 'Tùy chọn mô hình AI yêu thích trực tiếp ngay trong giao diện trò chuyện.',
      },
    ],
  },
  {
    version: 'v1.0.0',
    releaseDate: '15/08/2026',
    codename: 'Khởi Sinh Duyên Định',
    tagline: 'Ra mắt nền tảng số hóa cổ thư Diễn Cầm Tam Thế và Cao Ly Đầu Hình',
    highlights: [
      'Số hóa 60 Hoa Giáp, 12 Cung Trường Sanh và Thập Cán Phối Thập Nhị Chi.',
      'Xây dựng giao diện tra cứu hòa hợp nam nữ và cẩm nang cổ thư truyền thống.',
      'Tích hợp trợ lý AI đàm đạo về nhân duyên, gia đạo và hóa giải xung khắc.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Khởi tạo ứng dụng',
        description: 'Triển khai dự án Fullstack React + Vite + Tailwind CSS + Express Backend.',
      },
      {
        type: 'feat',
        title: 'Tra cứu Cổ Thư & Lập Quẻ Duyên Nợ',
        description: 'Tra cứu nhanh tuổi chồng vợ theo Diễn Cầm Tam Thế và Cao Ly Đầu Hình.',
      },
    ],
  },
];
