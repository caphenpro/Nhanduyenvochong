# AGENTS.md — Quy Tắc Phát Triển & Ghi Nhớ Cập Nhật Dự Án "AI Nhân Duyên"

Tài liệu này chứa các chỉ dẫn bất biến dành cho AI Coding Agent khi bảo trì, phát triển và cập nhật ứng dụng **AI Nhân Duyên**.

---

## 🎯 1. Quy Định Quản Lý Phiên Bản & Ghi Nhớ Lịch Sử Cập Nhật (BẮT BUỘC)

Mỗi khi người dùng yêu cầu thay đổi, sửa lỗi, thêm tính năng, hoặc tái cấu trúc mã nguồn, Agent **BẮT BUỘC** phải thực hiện các bước sau trước khi kết thúc phiên:

1. **Tăng số phiên bản theo chuẩn Semantic Versioning (`SemVer`)**:
   - `MAJOR` (ví dụ `v3.0.0`): Khi có sự thay đổi lớn về kiến trúc hoặc phương pháp luận cốt lõi.
   - `MINOR` (ví dụ `v2.2.0`): Khi thêm tính năng mới, màn hình mới, hoặc tích hợp API mới.
   - `PATCH` (ví dụ `v2.1.1`): Khi sửa lỗi, tối ưu hiệu năng, tinh chỉnh giao diện nhỏ hoặc sửa nội dung.

2. **Đồng bộ hóa phiên bản & ghi nhận nhật ký thay đổi vào 4 vị trí**:
   - **`src/data/versionHistory.ts`**:
     - Cập nhật `APP_INFO.currentVersion` và `APP_INFO.releaseDate`.
     - Thêm một đối tượng phiên bản mới vào đầu mảng `VERSION_HISTORY` với đầy đủ `version`, `releaseDate`, `codename`, `tagline`, `isLatest: true`, `highlights`, và danh sách các `changes` (`feat`, `enhance`, `fix`, `ui`, `philosophy`).
   - **`package.json`**: Cập nhật trường `"version": "X.Y.Z"`.
   - **`README.md`**:
     - Cập nhật badge phiên bản `https://img.shields.io/badge/Phiên_Bản-vX.Y.Z-...`.
     - Thêm dòng mới vào bảng `## 📜 Lịch Sử Phiên Bản (Changelog)`.
   - **`metadata.json`**: Đảm bảo `description` phản ánh chính xác các tính năng mới nhất nếu có thay đổi lớn.

---

## 🌸 2. Phương Pháp Luận & Triết Lý Bất Biến

1. **Hệ Thống 6 Tầng Luận Giải**:
   - **Tầng 1 — Thiên Can (Khí)**: Khảo sát tầng quan hệ Khí (Hợp – Sinh – Khắc – Tỷ hòa).
   - **Tầng 2 — Địa Chi (Động)**: Khảo sát tầng quan hệ chuyển động sinh hoạt (Tam Hợp, Lục Hợp, Lục Xung, Hại, Phá, Hình).
   - **Tầng 3 — Ngũ Hành Nội Tại**: Phân tích Ngũ Hành bản thể của Thiên Can và Địa Chi.
   - **Tầng 4 — Nạp Âm Lục Thập Hoa Giáp**: Phân biệt rõ Nạp Âm với Can và Chi.
   - **Tầng 5 — Cung Mệnh Bát Trạch**: Phối Cung Phi (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Tuyệt Mệnh, Họa Hại, Lục Sát, Ngũ Quỷ).
   - **Tầng 6 — Cấu Trúc Tổng Hợp**: Điểm Thuận (+), Điểm Nghịch (-), Điểm Cần Lưu Ý theo cơ chế Sinh – Khắc – Chế – Hóa.

2. **Triết Lý Cốt Lõi**:
   - **"Một người không phải chỉ là một cái tuổi."**
   - **"Xung không đồng nghĩa với ly hôn; Hợp không đồng nghĩa với tốt tuyệt đối."**
   - Không đưa ra kết luận mê tín cực đoan gây hoang mang, mà luôn hướng dẫn cách lắng nghe, đối thoại, hóa giải phong thủy và bồi đắp đức hạnh gia đình.

---

## 🖼️ 3. Nhận Diện Thương Hiệu & Logo

- Tên ứng dụng: **AI Nhân Duyên**
- Khẩu hiệu: **Kết Nối Tâm Duyên • Thấu Hiểu Yêu Thương • Luận Giải Đa Tầng**
- Logo thương hiệu: `/logo.png`
- Luôn giữ logo tại:
  - Header & Navbar điều hướng
  - Khung Chatbot & Modal AI Avatar
  - Favicon & Apple Touch Icon (`index.html`)
  - OpenGraph Meta Tags (`og:image`, `twitter:image`)
