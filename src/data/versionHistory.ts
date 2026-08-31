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
  currentVersion: 'v2.4.0',
  releaseDate: '31/08/2026',
  author: 'Nguyễn Hoàng Đăng',
  contactEmail: 'nguyenhoangdang25@gmail.com',
  repositoryUrl: 'https://github.com/nguyenhoangdang/ai-nhan-duyen',
  description: 'Nền tảng trí tuệ nhân tạo chuyên sâu về luận giải hòa hợp nhân duyên vợ chồng, tình yêu và gia đạo theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.',
  motto: 'Một người không phải chỉ là một cái tuổi • Kết Nối Tâm Duyên • Thấu Hiểu Yêu Thương',
};

export const VERSION_HISTORY: AppVersion[] = [
  {
    version: 'v2.4.0',
    releaseDate: '31/08/2026',
    codename: 'Tinh Gọn Tâm Duyên & Tối Ưu Trải Nghiệm',
    tagline: 'Lược bỏ chuyên mục Lập quẻ, tập trung toàn diện vào đàm đạo AI Chatbox tương tác và tra cứu Cẩm Nang Cổ Thư Bát Trạch',
    isLatest: true,
    highlights: [
      'Lược bỏ chuyên mục "Lập Quẻ Duyên Nợ" để tinh giản giao diện điều hướng, giúp người dùng tập trung tương tác tự nhiên với AI Chatbox và tra cứu kiến thức trong Cẩm Nang Cổ Thư.',
      'Toàn bộ năng lực luận giải tuổi vợ chồng theo 6 tầng Âm Dương Ngũ Hành được chuyển giao trọn vẹn vào Trợ Lý AI Chatbox (người dùng chỉ cần nhập năm sinh hoặc ngày giờ sinh của hai người).',
      'Chuẩn hóa thuật ngữ khoa học, loại bỏ các khái niệm "bàn quẻ" mang tính bói toán cơ học, kiên định với triết lý nhân văn: "Một người không phải chỉ là một cái tuổi".',
    ],
    changes: [
      {
        type: 'ui',
        title: 'Tinh giản thanh điều hướng (Navbar)',
        description: 'Loại bỏ tab "Lập Quẻ Duyên Nợ", tập trung điều hướng vào 3 chuyên mục chính: Trò Chuyện AI, Cẩm Nang Cổ Thư và Nguồn Gốc.',
      },
      {
        type: 'enhance',
        title: 'Tối ưu hóa trải nghiệm tương tác với AI Chatbox',
        description: 'Tự động phân tích và luận giải đa tầng trực tiếp khi người dùng cung cấp thông tin năm sinh qua khung trò chuyện.',
      },
      {
        type: 'philosophy',
        title: 'Chuẩn hóa thuật ngữ luận giải nhân duyên',
        description: 'Chuyển hóa toàn bộ ngôn ngữ giao diện theo hướng nhân văn, hướng dẫn đối thoại và hóa giải thay vì phán đoán quẻ cơ học.',
      },
    ],
  },
  {
    version: 'v2.3.0',
    releaseDate: '31/08/2026',
    codename: 'Bát Trạch Khai Hoa & Tri Thức Ưu Tiên',
    tagline: 'Bổ sung Bát Trạch Phong Thủy vào Cổ Thư và kích hoạt Chỉ Thị Tối Cao ưu tiên nguồn tri thức ứng dụng cho AI Chatbox',
    isLatest: false,
    highlights: [
      'Mở rộng Tàng Kinh Các Cổ Thư với phân mục "Cung Mệnh Bát Trạch": tra cứu trực tuyến cung phi theo năm sinh và giới tính, bảng 8 Cung Mệnh & 2 Nhóm Trạch, bảng số dư chia 9, và chi tiết 8 Hướng Du Niên (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh).',
      'Công cụ Tra cứu tương tác Bát Trạch với hiển thị trực quan lưới 8 hướng Cát / Hung cùng lời khuyên bố trí nhà cửa, phòng ngủ, phòng thờ và hướng bếp.',
      'Thiết lập "CHỈ THỊ TỐI CAO" trong System Prompt cho toàn bộ các mô hình AI: Bắt buộc ưu tiên sử dụng 100% hệ thống dữ liệu có sẵn trên ứng dụng (6 tầng luận giải, Bát Trạch, 60 Hoa Giáp, Tam Thế, Cao Ly) trước khi suy diễn tri thức bên ngoài.',
      'Nâng cấp Động cơ Cổ Thư Reasoner (Offline) và Chat Client hỗ trợ phân tích tra cứu Bát Trạch và cung mệnh trực tiếp, đảm bảo phản hồi tức thì và chính xác.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Bổ sung Chuyên mục Bát Trạch Toàn Thư vào Tàng Kinh Các',
        description: 'Tích hợp toàn bộ dữ liệu 8 Cung Mệnh Bát Trạch (Khảm, Chấn, Tốn, Ly, Càn, Khôn, Đoài, Cấn), 2 nhóm Đông/Tây Tứ Mệnh và ma trận 8 hướng Du Niên vào Cổ Thư.',
      },
      {
        type: 'ui',
        title: 'Công cụ Tra Cứu Cung Mệnh & 8 Hướng Phong Thủy Trực Tuyến',
        description: 'Giao diện tương tác tính toán số dư chia 9, hiển thị quái mệnh, phân loại trạch hướng hợp và lưới 8 hướng Du Niên phân màu Cát (xanh) / Hung (đỏ) rõ ràng.',
      },
      {
        type: 'philosophy',
        title: 'Chỉ Thị Tối Cao: Ưu Tiên Tri Thức Ứng Dụng Cho AI Chatbox',
        description: 'Cấu trúc lại System Prompt ép toàn bộ mô hình AI tuân thủ phương pháp luận 6 tầng và tri thức phong thủy Bát Trạch có sẵn trong ứng dụng.',
      },
      {
        type: 'enhance',
        title: 'Nâng cấp Offline Reasoner với tri thức Bát Trạch',
        description: 'Cho phép tra cứu cung mệnh, hướng nhà và hướng dẫn hóa giải ngay cả khi không có kết nối mạng hay hết quota API.',
      },
    ],
  },
  {
    version: 'v2.2.0',
    releaseDate: '31/08/2026',
    codename: 'Tự Động Luân Chuyển (Smart Auto-Fallback)',
    tagline: 'Chế độ tự động chọn mô hình AI tối ưu và tự động chuyển đổi khi hết hạn mức / gói miễn phí',
    isLatest: false,
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
