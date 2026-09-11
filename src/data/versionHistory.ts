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
  currentVersion: 'v2.9.2',
  releaseDate: '12/09/2026',
  author: 'Nguyễn Hoàng Đăng',
  contactEmail: 'nguyenhoangdang25@gmail.com',
  repositoryUrl: 'https://github.com/nguyenhoangdang/ai-nhan-duyen',
  description: 'Nền tảng trí tuệ nhân tạo chuyên sâu về luận giải hòa hợp nhân duyên vợ chồng, tình yêu và gia đạo theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.',
  motto: 'Một người không phải chỉ là một cái tuổi • Kết Nối Tâm Duyên • Thấu Hiểu Yêu Thương',
};

export const VERSION_HISTORY: AppVersion[] = [
  {
    version: 'v2.9.2',
    releaseDate: '12/09/2026',
    codename: 'Rút Gọn Lời Chào Ban Đầu & Tinh Giản Phản Hồi AI',
    tagline: 'Rút ngắn tin nhắn tự giới thiệu ban đầu của assistant xuống 1 câu đơn giản và loại bỏ quy định tự giới thiệu trong System Prompt để AI không lặp lại lời chào',
    isLatest: true,
    highlights: [
      'Rút ngắn tin nhắn mở đầu (initial/welcome message) của assistant trong toàn bộ giao diện Chat xuống chỉ còn 1 câu đơn giản: "Xin chào! Bạn cần tư vấn về nhân duyên, cung mệnh hay xem tuổi vợ chồng?".',
      'Đồng bộ hóa lời chào tinh gọn khi người dùng xóa lịch sử cuộc trò chuyện (reset chat).',
      'Loại bỏ các đoạn tự giới thiệu bản thân dông dài trong System Prompt và cổ thư suy luận, yêu cầu AI không xưng danh bản thân hay lặp lại câu chào hỏi mỗi khi phản hồi.',
      'Giữ nguyên vẹn cơ chế nạp dữ liệu nội bộ ưu tiên, triết lý 6 tầng luận giải và nhận diện thương hiệu logo.',
    ],
    changes: [
      {
        type: 'ui',
        title: 'Rút ngắn tin nhắn chào ban đầu trong Chat',
        description: 'Thay thế đoạn tin nhắn chào dài nhiều phần bằng 1 câu ngắn gọn, thân thiện: "Xin chào! Bạn cần tư vấn về nhân duyên, cung mệnh hay xem tuổi vợ chồng?".',
      },
      {
        type: 'enhance',
        title: 'Tinh giản System Prompt chống lặp lời chào',
        description: 'Bổ sung ràng buộc nghiêm ngặt trong lời nhắc hệ thống yêu cầu AI không xưng danh tên AI hay tự giới thiệu lại bản thân ở mỗi phản hồi.',
      },
      {
        type: 'fix',
        title: 'Lược bỏ tự giới thiệu trong công cụ suy luận cổ thư',
        description: 'Xóa câu chào xưng danh mở đầu trong ancientReasoner.ts để đi thẳng vào nội dung tư vấn.',
      },
    ],
  },
  {
    version: 'v2.9.1',
    releaseDate: '12/09/2026',
    codename: 'System Prompt Chuẩn Hóa & Hạ Nhiệt Độ 0.2',
    tagline: 'Cập nhật System Instruction ưu tiên dữ liệu nội bộ và hạ tham số temperature xuống 0.2 giúp câu trả lời bám sát tài liệu chuẩn xác',
    isLatest: false,
    highlights: [
      'Cập nhật cấu trúc System Instruction mới: "Bạn là trợ lý tư vấn Nhân Duyên Vợ Chồng. Dưới đây là DỮ LIỆU KIẾN THỨC NỘI BỘ: {dữ liệu_nội_bộ}. Hãy ưu tiên tuyệt đối dữ liệu nội bộ này để trả lời. Chỉ khi dữ liệu nội bộ không có hoặc chưa đủ, bạn mới bổ sung bằng kiến thức bên ngoài nhưng không được mâu thuẫn với dữ liệu nội bộ. Đi thẳng vào câu trả lời, không chào hỏi dài dòng."',
      'Hạ tham số nhiệt độ (temperature) từ 0.7 xuống 0.2 trên cả Gemini SDK và OpenRouter, giúp AI phản hồi chuẩn xác, bám sát dữ liệu và hạn chế tối đa ảo giác.',
      'Yêu cầu AI đi thẳng vào nội dung trọng tâm trả lời, loại bỏ các lời chào hỏi hình thức dài dòng.',
      'Đồng bộ hóa nhất quán cơ chế nạp dữ liệu nội bộ cho System Prompt trên cả Máy chủ Express và Trình duyệt.',
    ],
    changes: [
      {
        type: 'enhance',
        title: 'Cập nhật System Instruction ưu tiên dữ liệu nội bộ',
        description: 'Tái cấu trúc prompt hệ thống đặt dữ liệu nội bộ làm trọng tâm chuẩn mực cao nhất, chỉ mở rộng khi thiếu thông tin và không mâu thuẫn dữ liệu gốc.',
      },
      {
        type: 'enhance',
        title: 'Hạ tham số nhiệt độ temperature xuống 0.2',
        description: 'Thiết lập temperature = 0.2 cho toàn bộ các API gọi mô hình Gemini và OpenRouter để câu trả lời bám sát dữ liệu chuyên sâu.',
      },
      {
        type: 'philosophy',
        title: 'Đi thẳng vào câu trả lời, tinh gọn phong cách',
        description: 'Chỉ định rõ trong prompt hệ thống không chào hỏi rườm rà, tập trung phân tích luận giải trực tiếp cho người dùng.',
      },
    ],
  },
  {
    version: 'v2.9.0',
    releaseDate: '12/09/2026',
    codename: 'Tối Ưu Co Giãn Giao Diện & Tinh Gọn Nút Trợ Lý',
    tagline: 'Tối ưu giao diện co giãn linh hoạt (Responsive) cho cả Máy tính & Điện thoại; tinh gọn thanh điều hướng và lược bỏ nút chatbox nổi ở góc màn hình',
    isLatest: false,
    highlights: [
      'Tối ưu hóa toàn diện giao diện đáp ứng linh hoạt (Responsive co-giãn) tương thích hoàn hảo cho cả Máy tính (Desktop) và Điện thoại di động (Mobile/Tablet).',
      'Tinh gọn thanh điều hướng Navbar tự động co giãn theo kích thước màn hình, bảo đảm chữ và biểu tượng không bị vỡ dòng hay tràn lề.',
      'Lược bỏ nút chatbox nổi góc dưới màn hình (floating chat button) theo yêu cầu, tạo không gian hiển thị rộng rãi, sạch đẹp trên thiết bị di động.',
      'Cải thiện khả năng cuộn và hiển thị co giãn cho các bảng tra cứu Cung Mệnh Bát Trạch, Vòng Trường Sinh 10 Thiên Can và Ma trận 100 Đồ hình Cao Ly.',
    ],
    changes: [
      {
        type: 'ui',
        title: 'Tối ưu hóa co giãn linh hoạt (Responsive Layout)',
        description: 'Tự động co giãn bố cục Navbar, ChatbotView, Cẩm nang Cổ Thư và các Modal cài đặt vừa vặn với mọi độ phân giải từ di động đến máy tính.',
      },
      {
        type: 'ui',
        title: 'Lược bỏ nút chatbox nổi góc dưới phải',
        description: 'Loại bỏ nút floating chat trigger ở góc dưới màn hình, tinh gọn trải nghiệm người dùng trên thiết bị di động.',
      },
      {
        type: 'enhance',
        title: 'Cải tiến độ co giãn và cuộn mượt cho các bảng dữ liệu',
        description: 'Đảm bảo các bảng tra cứu Bát Trạch, Vòng Trường Sinh 10 Can và 100 Đồ hình Cao Ly cuộn ngang và hiển thị đẹp mắt.',
      },
    ],
  },
  {
    version: 'v2.8.0',
    releaseDate: '10/09/2026',
    codename: 'Tam Nguyên Tắc Tri Thức & Minh Bạch Nguồn Gốc',
    tagline: 'Quy chuẩn 3 nguyên tắc vận hành: Ưu tiên tuyệt đối Ground Truth, Mở rộng tương đồng khi cần, và Minh bạch nguồn gốc thông qua ghi chú chuẩn mực',
    isLatest: false,
    highlights: [
      'Xác lập Bộ 3 Nguyên Tắc Cốt Lõi điều phối tri thức cho AI Chatbox khi tương tác với Kho Tri Thức Nội Bộ (/src/data/knowledge_base/).',
      'Nguyên tắc 1 — Ưu Tiên Tuyệt Đối (Ground Truth): Tài liệu nội bộ là chân lý chuẩn mực tối cao; bắt buộc tuân theo tài liệu khi xảy ra bất kỳ xung đột nào.',
      'Nguyên tắc 2 — Nguyên Tắc Mở Rộng: Cho phép tự mở rộng bằng tri thức chuyên môn khi tài liệu chưa đề cập đủ, nhưng bắt buộc phải dựa trên logic, văn phong và hệ thống lý luận tương đồng.',
      'Nguyên tắc 3 — Minh Bạch Nguồn Gốc: Phân định rõ thông tin có sẵn (khẳng định trực tiếp) và thông tin mở rộng (kèm ghi chú nhẹ "Lưu ý: Phần [Nội dung X] dựa trên kiến thức mở rộng bổ trợ cho tài liệu gốc...").',
      'Nâng cấp giao diện KnowledgeBaseModal với 2 tab chuyển đổi: 3 Nguyên tắc vận hành & Duyệt tệp tri thức chi tiết.',
      'Đồng bộ hóa 3 nguyên tắc vào cả System Prompt trực tuyến và Bộ suy luận ngoại tuyến ancientReasoner.ts.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Tích hợp 3 Nguyên Tắc Tri Thức vào System Prompt & Offline Reasoner',
        description: 'Định nghĩa KNOWLEDGE_BASE_RULES và nhúng tự động vào compileKnowledgeBaseForSystemPrompt() cũng như ancientReasoner.ts.',
      },
      {
        type: 'ui',
        title: 'Nâng cấp KnowledgeBaseModal với Tab 3 Nguyên Tắc Vận Hành',
        description: 'Bổ sung thẻ hiển thị trực quan 3 nguyên tắc kèm ví dụ mẫu minh họa và câu hỏi thực hành nhanh cho người dùng.',
      },
      {
        type: 'enhance',
        title: 'Chuẩn Hóa Mẫu Ghi Chú Minh Bạch Nguồn Gốc',
        description: 'Tự động đính kèm ghi chú nguồn mở rộng chuẩn mực vào các câu trả lời và báo cáo phân tích cặp đôi.',
      },
    ],
  },
  {
    version: 'v2.7.0',
    releaseDate: '10/09/2026',
    codename: 'Kho Tri Thức Ưu Tiên & Hồ Sơ Bát Trạch 1989 Kỷ Tỵ',
    tagline: 'Thiết lập thư mục tri thức nội bộ /src/data/knowledge_base/ làm nguồn Ground Truth ưu tiên số 1 cho AI Chatbox; tích hợp hồ sơ 1989 Kỷ Tỵ & ma trận Bát Trạch 8x8',
    isLatest: false,
    highlights: [
      'Thiết lập thư mục tri thức nội bộ chuẩn mực tại `/src/data/knowledge_base/` làm nguồn Ground Truth ưu tiên số 1 (Priority-1) cho AI Chatbox trước khi sử dụng kiến thức bên ngoài.',
      'Tích hợp Tệp Tri Thức Số 01: Hồ sơ 1989 Kỷ Tỵ Nam (Nạp âm Đại Lâm Mộc, Can Kỷ Thổ, Chi Tỵ Hỏa, Cung mệnh Khôn - Tây Tứ Mệnh).',
      'Chuẩn hóa Bảng 1: Xác định Cung Mệnh theo tuổi qua số dư chia 9 chuẩn mực cho cả Nam và Nữ.',
      'Chuẩn hóa Bảng 2: Ma trận phối Cung Mệnh vợ chồng 8x8 (Càn, Khôn, Cấn, Đoài, Khảm, Ly, Chấn, Tốn) tạo 8 Biến Cung Cát/Hung.',
      'Chuẩn hóa Bảng 3: Giải nghĩa bản chất ngũ hành, mức độ ảnh hưởng của 8 Cung (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh).',
      'Tích hợp Giao diện Tra Cứu Kho Tri Thức Ưu Tiên (KnowledgeBaseModal) và kết nối trực tiếp vào System Prompt của AI.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Xây dựng Thư Mục Tri Thức Ưu Tiên /src/data/knowledge_base/',
        description: 'Tạo cấu trúc lưu trữ tri thức dài hạn có registry index.ts, tài liệu chuẩn và hàm biên soạn compileKnowledgeBaseForSystemPrompt() tự động nhúng vào hệ thống.',
      },
      {
        type: 'feat',
        title: 'Nạp Tệp Tri Thức Số 01: Hồ Sơ Kỷ Tỵ 1989 & Ma Trận Bát Trạch 8x8',
        description: 'Mã hóa chi tiết hồ sơ tuổi Kỷ Tỵ 1989 Nam mạng, bảng số dư chia 9, ma trận phối cung vợ chồng 8x8 và bảng giải nghĩa 8 biến cung.',
      },
      {
        type: 'ui',
        title: 'Thêm Modal Tra Cứu Kho Tri Thức Ưu Tiên Trên Chatbot',
        description: 'Tích hợp KnowledgeBaseModal.tsx cho phép người dùng xem trực tiếp tài liệu chuẩn, kiểm tra trạng thái ưu tiên nội bộ và gửi câu hỏi mẫu tra cứu.',
      },
      {
        type: 'enhance',
        title: 'Đồng Bộ Hóa Kiến Thức Vào Cả Bộ Luận Giải Trực Tuyến & Ngoại Tuyến',
        description: 'Cập nhật System Prompt cho OpenRouter/Gemini SDK và bổ sung bộ suy luận ngoại tuyến ancientReasoner.ts ưu tiên trích xuất dữ liệu nội bộ.',
      },
    ],
  },
  {
    version: 'v2.6.0',
    releaseDate: '03/09/2026',
    codename: 'Bát Tự Quy Chuẩn & Cấu Trúc Báo Cáo 5 Phần',
    tagline: 'Xác lập chuẩn mực Vai trò & Nhiệm vụ Chuyên gia Tư vấn Hôn nhân Bát Tự, phân cấp thông tin đầu vào và chuẩn hóa Cấu trúc Luận giải 5 Phần',
    isLatest: false,
    highlights: [
      'Xác lập chính thức Vai Trò & Nhiệm Vụ cốt lõi của Chatbox AI Nhân Duyên: Chuyên gia Tư vấn Nhân duyên & Hôn nhân Bát Tự - Mệnh Lý theo định hướng tích cực, xây dựng.',
      'Phân định 2 cấp độ thu thập thông tin đầu vào (Input Requirements): Bắt buộc (Giới tính & Năm sinh) và Ưu tiên (Giờ/Ngày/Tháng sinh & Nơi sinh để lập Bát Tự Tứ Trụ).',
      'Chuẩn hóa Cấu Trúc Phân Tích & Báo Cáo 5 Phần (Output Framework): Phần 1 (Thông tin bản mệnh), Phần 2 (Phân tích các tầng tương tác), Phần 3 (Đánh giá tính cách & lối sống), Phần 4 (Dự đoán & thời điểm lưu ý), Phần 5 (Lời khuyên & phương pháp hóa giải).',
      'Tích hợp Modal Tra Cứu Quy Chuẩn & Bộ Phím Tắt Mẫu Biểu Luận Giải tiện dụng ngay trên giao diện Chatbot và Modal Nổi.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Tích hợp Modal Tra Cứu Quy Chuẩn Vai Trò & Cấu Trúc Báo Cáo 5 Phần',
        description: 'Xây dựng RoleTaskStandardModal.tsx cho phép người dùng tra cứu toàn văn quy chuẩn vai trò, nhiệm vụ, yêu cầu dữ liệu và gửi mẫu biểu tự động vào chat.',
      },
      {
        type: 'enhance',
        title: 'Cập nhật System Prompt & Bộ Luận Giải Cổ Thuật Ngoại Tuyến',
        description: 'Chuẩn hóa SYSTEM_INSTRUCTION_PROMPT và ancientReasoner.ts định dạng báo cáo cặp đôi xuất ra chuẩn mực 5 phần.',
      },
      {
        type: 'philosophy',
        title: 'Củng cố Nguyên Tắc Luận Giải Khách Quan & Xây Dựng',
        description: 'Kiên định triết lý cân bằng học thuật mệnh lý và tâm lý thực tế, nghiêm cấm từ ngữ cực đoan đe dọa, luôn hướng tới bồi đắp đức hạnh gia đình.',
      },
    ],
  },
  {
    version: 'v2.5.0',
    releaseDate: '03/09/2026',
    codename: 'Trường Sinh Đáo Xứ (10 Can Trường Sinh & Dương Thuận Âm Nghịch)',
    tagline: 'Bổ sung trọn vẹn học thuyết Vòng Trường Sinh 10 Thiên Can, Bảng ma trận 12 cung, công cụ tra cứu tương tác và mẹo nhớ thần tốc',
    isLatest: false,
    highlights: [
      'Bổ sung chuyên sâu nguyên lý Vòng Trường Sinh 10 Thiên Can dựa trên học thuyết cốt lõi Dương Sinh Âm Tử và quy luật Tam Hợp Cục vào mục 12 Cung Trường Sanh trong Cẩm Nang Cổ Thư.',
      'Bộ Tra Cứu Tương Tác 10 Thiên Can: Chọn bất kỳ Can nào để xem chiều đếm Thuận/Nghịch, cung khởi, ý nghĩa 12 Địa Chi và công cụ tra cứu nhanh một Can phối Chi ra trạng thái cát hung kèm lời khuyên gia đạo.',
      'Bảng Ma Trận Tổng Hợp 10 Thiên Can x 12 Cung Trường Sinh, chi tiết tiến trình vận hành của 4 cặp Can (Mộc, Hỏa & Thổ, Kim, Thủy) và 4 Mẹo nhớ nhanh của tiền nhân.',
      'Cập nhật Chỉ Thị Trí Tuệ Tối Cao của AI Chatbox để nắm vững toàn bộ quy tắc Vòng Trường Sinh 10 Thiên Can khi đàm đạo với người dùng.',
    ],
    changes: [
      {
        type: 'feat',
        title: 'Tích hợp Vòng Trường Sinh 10 Thiên Can & Bộ Tra Cứu Tương Tác',
        description: 'Xây dựng dữ liệu vongTruongSinhData.ts với đầy đủ 10 Thiên Can, 12 Địa Chi, phân loại Vượng/Bình/Suy và công cụ tra cứu tức thì trạng thái Trường Sinh.',
      },
      {
        type: 'enhance',
        title: 'Nâng cấp toàn diện chuyên mục 12 Cung Trường Sanh trong Cổ Thư',
        description: 'Bổ sung Bảng Ma Trận 10 Can x 12 Cung, 4 khối Tam Hợp Cục, chuỗi tiến trình 4 cặp Can Chi và 4 mẹo ghi nhớ nhanh của cổ nhân.',
      },
      {
        type: 'philosophy',
        title: 'Đồng bộ tri thức Vòng Trường Sinh vào AI Chatbox',
        description: 'Cập nhật hệ thống tri thức chuẩn mực về Dương Sinh Âm Tử và Tam Hợp Cục vào prompt Chatbot AI Nhân Duyên.',
      },
    ],
  },
  {
    version: 'v2.4.2',
    releaseDate: '31/08/2026',
    codename: 'Hoàn Thiện Tàng Kinh Các (Ancient Library Scroll Fix)',
    tagline: 'Khắc phục hoàn toàn lỗi ẩn/mất tab và nội dung trong Cẩm Nang Cổ Thư trên điện thoại di động',
    isLatest: false,
    highlights: [
      'Khắc phục lỗi căn giữa (justify-center) trong thanh tab khiến các chuyên mục "100 Đồ Hình Cao Ly" và "Cung Mệnh Bát Trạch" bị tràn sang tọa độ âm trên smartphone.',
      'Chuẩn hóa thanh chuyển tab Cổ Thư với chế độ cuộn tự nhiên từ trái sang phải, đảm bảo hiển thị đầy đủ và dễ dàng chạm chuyển qua lại giữa 5 pho thư tịch cổ.',
      'Tối ưu hóa các thẻ Du Niên 8 hướng và bảng tra số dư chia 9, loại bỏ hiện tượng ngắt dòng khó nhìn và chống che khuất bởi nút trợ lý AI nổi.',
    ],
    changes: [
      {
        type: 'fix',
        title: 'Sửa lỗi mất tab Cổ Thư trên di động',
        description: 'Chuyển thanh tab switcher từ flex justify-center sang justify-start kèm thanh cuộn mượt, cho phép người dùng lướt và xem trọn vẹn cả 5 tab sách cổ.',
      },
      {
        type: 'ui',
        title: 'Tối ưu độ phản hồi Cổ Thư trên Mobile',
        description: 'Tăng khoảng đệm chân trang (pb-28) chống bị nút tròn AI che khuất, bỏ line-clamp cắt chữ Du Niên và hoàn thiện bố cục Can Chồng selector.',
      },
    ],
  },
  {
    version: 'v2.4.1',
    releaseDate: '31/08/2026',
    codename: 'Tương Thích Toàn Diện Di Động (Mobile Perfect Flow)',
    tagline: 'Khắc phục triệt để hiện tượng mất cân đối hiển thị trên thiết bị di động, tối ưu hóa thanh điều hướng và khung đàm đạo',
    isLatest: false,
    highlights: [
      'Khắc phục hoàn toàn lỗi tràn ngang (horizontal overflow) làm giao diện bị co sang một bên trên màn hình điện thoại thông minh.',
      'Tối ưu hóa thanh điều hướng Navbar với kích thước touch-target chuẩn mực, tiêu đề không bị ngắt dòng và các icon chức năng thu gọn tinh tế.',
      'Căn chỉnh tỷ lệ khung đàm đạo Chatbox và thanh công cụ trạng thái tiết khí, mô hình AI hiển thị trọn vẹn 100% chiều rộng màn hình di động.',
    ],
    changes: [
      {
        type: 'fix',
        title: 'Khắc phục tràn ngang trên màn hình di động',
        description: 'Bổ sung cơ chế overflow-x-hidden và max-w-full tại index.css, App.tsx, Navbar và ChatbotView để bảo đảm bố cục luôn cân đối 100% viewport.',
      },
      {
        type: 'ui',
        title: 'Tối ưu hóa Navbar trên Smartphone',
        description: 'Thu gọn padding các nút điều hướng, chống ngắt dòng tiêu đề "AI Nhân Duyên", hiển thị icon thông minh cho Key và Cửa sổ AI.',
      },
      {
        type: 'enhance',
        title: 'Tinh chỉnh thanh công cụ Chatbot',
        description: 'Tối ưu độ rộng nhãn mô hình AI, nút Tiết Khí và bubble chat để đọc văn bản mượt mà, thoải mái trên mọi kích thước màn hình.',
      },
    ],
  },
  {
    version: 'v2.4.0',
    releaseDate: '31/08/2026',
    codename: 'Tinh Gọn Tâm Duyên & Tối Ưu Trải Nghiệm',
    tagline: 'Lược bỏ chuyên mục Lập quẻ, tập trung toàn diện vào đàm đạo AI Chatbox tương tác và tra cứu Cẩm Nang Cổ Thư Bát Trạch',
    isLatest: false,
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
