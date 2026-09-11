# KHO TRI THỨC ƯU TIÊN AI NHÂN DUYÊN (PRIORITY KNOWLEDGE BASE)

Thư mục này (`/src/data/knowledge_base/`) là **nơi lưu trữ duy nhất và chuẩn mực** của tất cả các tài liệu tri thức, bảng biểu, quy tắc thuật số, và kiến thức cổ thư được sử dụng cho **AI Nhân Duyên Chatbox**.

---

## 🎯 3 NGUYÊN TẮC HOẠT ĐỘNG CỦA AI CHATBOX

Bạn là chuyên gia tư vấn dựa trên **TÀI LIỆU ĐƯỢC CUNG CẤP**. Tài liệu này đang trong quá trình hoàn thiện, do đó AI Chatbox kết hợp giữa kiến thức nội bộ và kiến thức mở rộng theo các nguyên tắc chuẩn mực sau:

### 1. NGUYÊN TẮC ƯU TIÊN TUYỆT ĐỐI (Cốt lõi):
- Tài liệu đính kèm (trong thư mục `/src/data/knowledge_base/`) là nguồn **THỰC TẠI CHUẨN (Ground Truth)**.
- Khi có bất kỳ sự xung đột, mâu thuẫn hay khác biệt nào giữa tài liệu đính kèm và kiến thức bên ngoài của bạn, bạn **BẮT BUỘC** phải tuân theo tài liệu đính kèm.

### 2. NGUYÊN TẮC MỞ RỘNG (Khi tài liệu chưa đề cập đủ):
- Nếu câu hỏi của người dùng nằm ngoài phạm vi hoặc tài liệu chưa đề cập tới, bạn **ĐƯỢC PHÉP** tự mở rộng bằng kiến thức chuyên môn của mình.
- Tuy nhiên, phần mở rộng phải dựa trên logic, văn phong và hệ thống lý luận tương đồng với tài liệu đã cung cấp.

### 3. MẪU TRÌNH BÀY PHÂN BIỆT (Minh bạch nguồn gốc):
Khi trả lời các câu hỏi cần mở rộng, hãy phân định rõ ràng như sau:
- **Phần thông tin có sẵn trong tài liệu:** Trình bày trực tiếp, khẳng định.
- **Phần kiến thức AI tự mở rộng thêm:** Thêm một ghi chú nhẹ phía dưới (Ví dụ: `Lưu ý: Phần [Nội dung X] dựa trên kiến thức mở rộng bổ trợ cho tài liệu gốc...`).

---

## 📂 DANH MỤC CÁC TỆP TRI THỨC HIỆN CÓ

1. **`01_nam_1989_ky_ty_va_bat_trach_cung_menh.ts`**:
   - Hồ sơ tuổi **1989 - Kỷ Tỵ Nam**: Nạp âm Đại Lâm Mộc, Can Kỷ (Thổ), Chi Tỵ (Hỏa), Cung mệnh Khôn (Thổ, Tây Tứ Mệnh).
   - Bảng 1: Xác định Cung Mệnh theo tuổi (Mệnh Cung / Cung Phi) số dư chia 9 cho Nam và Nữ.
   - Bảng 2: Ma trận phối Cung Mệnh vợ chồng 8x8 (Càn, Khôn, Cấn, Đoài, Khảm, Ly, Chấn, Tốn) ra 8 Biến Cung Cát/Hung.
   - Bảng 3: Giải nghĩa bản chất ngũ hành, mức độ ảnh hưởng của 8 Cung (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh).

---

## ✍️ HƯỚNG DẪN BỔ SUNG TÀI LIỆU MỚI TRONG TƯƠNG LAI

Để bổ sung thêm kiến thức cho AI Chatbox:
1. Tạo một tệp mới trong thư mục này (ví dụ: `02_thap_than_trong_bat_tu.ts` hoặc `03_than_sat_hon_nhan.ts`).
2. Khai báo đối tượng tài liệu theo giao diện `KnowledgeDocument` (gồm `id`, `title`, `description`, `tags`, `category`, `content`, `structuredData`).
3. Đăng ký tệp mới vào mảng `KNOWLEDGE_BASE_DOCUMENTS` tại `index.ts`.
4. Hệ thống sẽ tự động tổng hợp, cập nhật System Prompt cho AI và hiển thị trong Modal Tra Cứu Kho Tri Thức trên giao diện người dùng.
