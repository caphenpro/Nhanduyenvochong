/**
 * TÀI LIỆU TRI THỨC ƯU TIÊN SỐ 01 (PRIORITY KNOWLEDGE DOC 01)
 * -----------------------------------------------------------
 * Chủ đề: Hồ sơ tuổi 1989 (Kỷ Tỵ Nam) và Hệ thống Bát Trạch Cung Mệnh
 * Nguồn: Tài liệu chuẩn mực lưu tại thư mục Tri thức Nội bộ
 */

export interface KnowledgeDocument {
  id: string;
  order: number;
  title: string;
  category: 'Hồ Sơ Bản Mệnh' | 'Bát Trạch Cung Phi' | 'Phối Ngẫu Hôn Nhân' | 'Bát Tự Tứ Trụ' | 'Cổ Thư Thuật Số';
  dateAdded: string;
  author: string;
  summary: string;
  rawText: string;
  markdownDoc: string;
  structuredData: Record<string, any>;
}

export const DOC_01_KY_TY_1989_BAT_TRACH: KnowledgeDocument = {
  id: 'doc-01-ky-ty-1989-bat-trach',
  order: 1,
  title: 'Hồ sơ 1989 (Kỷ Tỵ Nam) & Quy chuẩn Bát Trạch Cung Mệnh Phối Ngẫu',
  category: 'Bát Trạch Cung Phi',
  dateAdded: '10/09/2026',
  author: 'Nguyễn Hoàng Đăng',
  summary: 'Hồ sơ bản mệnh tuổi Kỷ Tỵ 1989 Nam mạng; Bảng số dư tính Cung Mệnh; Ma trận 8x8 phối cung vợ chồng và Bảng giải nghĩa bản chất 8 Cung.',
  rawText: `Năm sinh 1989 - Kỷ Tỵ Nam
Nạp âm: Đại Lâm Mộc
Hành can: Kỷ - Thổ
Hành chi : Tỵ - Hoả
Cung mệnh Nam : Khôn
1. Bảng xác định Cung Mệnh theo tuổi (Mệnh Cung / Cung Phi)
Cung mệnh phụ thuộc vào năm sinh âm lịch và giới tính (tính theo số dư khi lấy [Tổng các chữ số năm sinh] chia cho 9, hoặc lấy [Năm sinh] chia 9 lấy số dư):
Số dư | Cung mệnh Nam | Cung mệnh Nữ | Thuộc Bát Trạch
1 | Khảm | Cấn | Khảm (Đông Tứ) / Cấn (Tây Tứ)
2 | Ly | Càn | Ly (Đông Tứ) / Càn (Tây Tứ)
3 | Cấn | Đoài | Cấn (Tây Tứ) / Đoài (Tây Tứ)
4 | Đoài | Cấn | Đoài (Tây Tứ) / Cấn (Tây Tứ)
5 | Càn | Ly | Càn (Tây Tứ) / Ly (Đông Tứ)
6 | Khôn | Khảm | Khôn (Tây Tứ) / Khảm (Đông Tứ)
7 | Tốn | Khôn | Tốn (Đông Tứ) / Khôn (Tây Tứ)
8 | Chấn | Chấn | Chấn (Đông Tứ) / Chấn (Đông Tứ)
0 (chia hết) | Khôn | Tốn | Khôn (Tây Tứ) / Tốn (Đông Tứ)
Ghi chú nhóm trạch:
* Đông Tứ Trạch (Đông Tứ Mệnh): Khảm, Li (Ly), Chấn, Tốn.
* Tây Tứ Trạch (Tây Tứ Mệnh): Càn, Khôn, Cấn, Đoài.

2. Bảng kết hợp Cung Mệnh vợ chồng và Cung kết quả (Cát / Hung)
Khi hai cung mệnh của Nam và Nữ kết hợp với nhau sẽ tạo thành 8 Biến Cung (4 Cung Cát - Tốt và 4 Cung Hung - Xấu):
- Càn phối: Càn = Phục Vị (Cát); Khôn = Diên Niên (Cát); Cấn = Thiên Y (Cát); Đoài = Sinh Khí (Cát); Khảm = Lục Sát (Hung); Ly = Tuyệt Mệnh (Hung); Chấn = Ngũ Quỷ (Hung); Tốn = Họa Hại (Hung).
- Khôn phối: Càn = Diên Niên (Cát); Khôn = Phục Vị (Cát); Cấn = Sinh Khí (Cát); Đoài = Thiên Y (Cát); Khảm = Tuyệt Mệnh (Hung); Ly = Lục Sát (Hung); Chấn = Họa Hại (Hung); Tốn = Ngũ Quỷ (Hung).
- Cấn phối: Càn = Thiên Y (Cát); Khôn = Sinh Khí (Cát); Cấn = Phục Vị (Cát); Đoài = Diên Niên (Cát); Khảm = Ngũ Quỷ (Hung); Ly = Họa Hại (Hung); Chấn = Lục Sát (Hung); Tốn = Tuyệt Mệnh (Hung).
- Đoài phối: Càn = Sinh Khí (Cát); Khôn = Thiên Y (Cát); Cấn = Diên Niên (Cát); Đoài = Phục Vị (Cát); Khảm = Họa Hại (Hung); Ly = Ngũ Quỷ (Hung); Chấn = Tuyệt Mệnh (Hung); Tốn = Lục Sát (Hung).
- Khảm phối: Càn = Lục Sát (Hung); Khôn = Tuyệt Mệnh (Hung); Cấn = Ngũ Quỷ (Hung); Đoài = Họa Hại (Hung); Khảm = Phục Vị (Cát); Ly = Diên Niên (Cát); Chấn = Thiên Y (Cát); Tốn = Sinh Khí (Cát).
- Ly phối: Càn = Tuyệt Mệnh (Hung); Khôn = Lục Sát (Hung); Cấn = Họa Hại (Hung); Đoài = Ngũ Quỷ (Hung); Khảm = Diên Niên (Cát); Ly = Phục Vị (Cát); Chấn = Sinh Khí (Cát); Tốn = Thiên Y (Cát).
- Chấn phối: Càn = Ngũ Quỷ (Hung); Khôn = Họa Hại (Hung); Cấn = Lục Sát (Hung); Đoài = Tuyệt Mệnh (Hung); Khảm = Thiên Y (Cát); Ly = Sinh Khí (Cát); Chấn = Phục Vị (Cát); Tốn = Diên Niên (Cát).
- Tốn phối: Càn = Họa Hại (Hung); Khôn = Ngũ Quỷ (Hung); Cấn = Tuyệt Mệnh (Hung); Đoài = Lục Sát (Hung); Khảm = Sinh Khí (Cát); Ly = Thiên Y (Cát); Chấn = Diên Niên (Cát); Tốn = Phục Vị (Cát).

3. Bảng giải nghĩa bản chất 8 Cung khi kết hợp
- Sinh Khí | Hành: Mộc | Mức độ: Thượng cát. Ý nghĩa: Vợ chồng gia đạo sum vầy, sự nghiệp vượng phát, con cái ngoan hiền, tài lộc dồi dào.
- Thiên Y | Hành: Thổ | Mức độ: Thượng cát. Ý nghĩa: Sức khỏe dồi dào, bệnh tật tiêu trừ, gặp may mắn về quý nhân hỗ trợ, tuổi thọ cao.
- Diên Niên (Phước Đức) | Hành: Kim | Mức độ: Thứ cát. Ý nghĩa: Tình cảm vợ chồng bền chặt, hòa thuận, ngoại giao tốt, tài chính ổn định dài lâu.
- Phục Vị | Hành: Thủy | Mức độ: Tiểu cát. Ý nghĩa: Cuộc sống bình yên, ít sóng gió, tinh thần vững vàng, tình cảm chân thành.
- Họa Hại | Hành: Thổ | Mức độ: Thứ hung. Ý nghĩa: Dễ vướng vào thị phi, cãi vã nhỏ nhặt, hao tốn tài sản nhỏ, bất hòa sinh hoạt.
- Lục Sát | Hành: Thủy | Mức độ: Thứ hung. Ý nghĩa: Gia đạo hay bất an, tình cảm dễ rạn nứt, tranh chấp, rủi ro về pháp lý hoặc tai tiếng.
- Ngũ Quỷ | Hành: Hỏa | Mức độ: Đại hung. Ý nghĩa: Dễ tai bay họa gió, mất mát tài sản, mâu thuẫn bộc phát dữ dội, công danh trắc trở.
- Tuyệt Mệnh | Hành: Kim | Mức độ: Đại hung. Ý nghĩa: Cung xấu nhất, ảnh hưởng lớn đến sức khỏe, dễ chia phôi, công danh tài lộc gặp trở lực nặng.`,
  markdownDoc: `### 📑 TÀI LIỆU KHO KIẾN THỨC NỘI BỘ #01
#### HỒ SƠ 1989 KỶ TỴ (NAM MẠNG) & QUY CHUẨN BÁT TRẠCH CUNG PHI

---

### I. HỒ SƠ BẢN MỆNH: NĂM SINH 1989 — KỶ TỴ (NAM)
- **Năm sinh:** 1989 (Kỷ Tỵ)
- **Giới tính:** Nam
- **Nạp âm:** Đại Lâm Mộc (Gỗ rừng già)
- **Hành Thiên Can:** Kỷ — **Thổ** (Âm Thổ)
- **Hành Địa Chi:** Tỵ — **Hỏa** (Âm Hỏa, ẩn tàng Bính, Mậu, Canh)
- **Cung Mệnh (Cung Phi):** **Khôn** (Hành Thổ, thuộc nhóm **Tây Tứ Mệnh / Tây Tứ Trạch**)

---

### II. BẢNG XÁC ĐỊNH CUNG MỆNH THEO TUỔI (MỆNH CUNG / CUNG PHI)
*Quy tắc tính:* Tính theo số dư khi lấy **Tổng các chữ số năm sinh chia cho 9** (hoặc lấy Năm sinh chia cho 9 lấy số dư):

| Số Dư (Chia 9) | Cung Mệnh Nam | Cung Mệnh Nữ | Phân Loại Nhóm Bát Trạch |
| :---: | :---: | :---: | :--- |
| **1** | **Khảm** | **Cấn** | Khảm (Đông Tứ) / Cấn (Tây Tứ) |
| **2** | **Ly** | **Càn** | Ly (Đông Tứ) / Càn (Tây Tứ) |
| **3** | **Cấn** | **Đoài** | Cấn (Tây Tứ) / Đoài (Tây Tứ) |
| **4** | **Đoài** | **Cấn** | Đoài (Tây Tứ) / Cấn (Tây Tứ) |
| **5** | **Càn** | **Ly** | Càn (Tây Tứ) / Ly (Đông Tứ) |
| **6** | **Khôn** | **Khảm** | Khôn (Tây Tứ) / Khảm (Đông Tứ) |
| **7** | **Tốn** | **Khôn** | Tốn (Đông Tứ) / Khôn (Tây Tứ) |
| **8** | **Chấn** | **Chấn** | Chấn (Đông Tứ) / Chấn (Đông Tứ) |
| **0 (chia hết)** | **Khôn** | **Tốn** | Khôn (Tây Tứ) / Tốn (Đông Tứ) |

**Ghi chú nhóm trạch:**
- **Đông Tứ Trạch (Đông Tứ Mệnh):** Gồm 4 cung **Khảm, Ly, Chấn, Tốn**.
- **Tây Tứ Trạch (Tây Tứ Mệnh):** Gồm 4 cung **Càn, Khôn, Cấn, Đoài**.

---

### III. BẢNG KẾT HỢP CUNG MỆNH VỢ CHỒNG & CUNG KẾT QUẢ (CÁT / HUNG)
Khi hai cung mệnh của Nam và Nữ kết hợp với nhau sẽ tạo thành **8 Biến Cung** (4 Cung Cát - Tốt và 4 Cung Hung - Xấu):

| Cung Nam \\ Cung Nữ | Càn | Khôn | Cấn | Đoài | Khảm | Ly | Chấn | Tốn |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Càn** | **Phục Vị** *(Cát)* | **Diên Niên** *(Cát)* | **Thiên Y** *(Cát)* | **Sinh Khí** *(Cát)* | **Lục Sát** *(Hung)* | **Tuyệt Mệnh** *(Hung)* | **Ngũ Quỷ** *(Hung)* | **Họa Hại** *(Hung)* |
| **Khôn** | **Diên Niên** *(Cát)* | **Phục Vị** *(Cát)* | **Sinh Khí** *(Cát)* | **Thiên Y** *(Cát)* | **Tuyệt Mệnh** *(Hung)* | **Lục Sát** *(Hung)* | **Họa Hại** *(Hung)* | **Ngũ Quỷ** *(Hung)* |
| **Cấn** | **Thiên Y** *(Cát)* | **Sinh Khí** *(Cát)* | **Phục Vị** *(Cát)* | **Diên Niên** *(Cát)* | **Ngũ Quỷ** *(Hung)* | **Họa Hại** *(Hung)* | **Lục Sát** *(Hung)* | **Tuyệt Mệnh** *(Hung)* |
| **Đoài** | **Sinh Khí** *(Cát)* | **Thiên Y** *(Cát)* | **Diên Niên** *(Cát)* | **Phục Vị** *(Cát)* | **Họa Hại** *(Hung)* | **Ngũ Quỷ** *(Hung)* | **Tuyệt Mệnh** *(Hung)* | **Lục Sát** *(Hung)* |
| **Khảm** | **Lục Sát** *(Hung)* | **Tuyệt Mệnh** *(Hung)* | **Ngũ Quỷ** *(Hung)* | **Họa Hại** *(Hung)* | **Phục Vị** *(Cát)* | **Diên Niên** *(Cát)* | **Thiên Y** *(Cát)* | **Sinh Khí** *(Cát)* |
| **Ly** | **Tuyệt Mệnh** *(Hung)* | **Lục Sát** *(Hung)* | **Họa Hại** *(Hung)* | **Ngũ Quỷ** *(Hung)* | **Diên Niên** *(Cát)* | **Phục Vị** *(Cát)* | **Sinh Khí** *(Cát)* | **Thiên Y** *(Cát)* |
| **Chấn** | **Ngũ Quỷ** *(Hung)* | **Họa Hại** *(Hung)* | **Lục Sát** *(Hung)* | **Tuyệt Mệnh** *(Hung)* | **Thiên Y** *(Cát)* | **Sinh Khí** *(Cát)* | **Phục Vị** *(Cát)* | **Diên Niên** *(Cát)* |
| **Tốn** | **Họa Hại** *(Hung)* | **Ngũ Quỷ** *(Hung)* | **Tuyệt Mệnh** *(Hung)* | **Lục Sát** *(Hung)* | **Sinh Khí** *(Cát)* | **Thiên Y** *(Cát)* | **Diên Niên** *(Cát)* | **Phục Vị** *(Cát)* |

---

### IV. BẢNG GIẢI NGHĨA BẢN CHẤT 8 CUNG KHI KẾT HỢP
| Nhóm Cung | Tên Cung | Hành Cung | Mức Độ | Ý Nghĩa Chi Tiết & Ảnh Hưởng Gia Đạo |
| :--- | :--- | :---: | :---: | :--- |
| **Cát (Tốt)** | **Sinh Khí** | **Mộc** | **Thượng cát** | Vợ chồng gia đạo sum vầy, sự nghiệp vượng phát, con cái ngoan hiền, tài lộc dồi dào. |
| **Cát (Tốt)** | **Thiên Y** | **Thổ** | **Thượng cát** | Sức khỏe dồi dào, bệnh tật tiêu trừ, gặp may mắn về quý nhân hỗ trợ, tuổi thọ cao. |
| **Cát (Tốt)** | **Diên Niên (Phước Đức)** | **Kim** | **Thứ cát** | Tình cảm vợ chồng bền chặt, hòa thuận, ngoại giao tốt, tài chính ổn định dài lâu. |
| **Cát (Tốt)** | **Phục Vị** | **Thủy** | **Tiểu cát** | Cuộc sống bình yên, ít sóng gió, tinh thần vững vàng, tình cảm chân thành. |
| **Hung (Xấu)** | **Họa Hại** | **Thổ** | **Thứ hung** | Dễ vướng vào thị phi, cãi vã nhỏ nhặt, hao tốn tài sản nhỏ, bất hòa sinh hoạt. |
| **Hung (Xấu)** | **Lục Sát** | **Thủy** | **Thứ hung** | Gia đạo hay bất an, tình cảm dễ rạn nứt, tranh chấp, rủi ro về pháp lý hoặc tai tiếng. |
| **Hung (Xấu)** | **Ngũ Quỷ** | **Hỏa** | **Đại hung** | Dễ tai bay họa gió, mất mát tài sản, mâu thuẫn bộc phát dữ dội, công danh trắc trở. |
| **Hung (Xấu)** | **Tuyệt Mệnh** | **Kim** | **Đại hung** | Cung xấu nhất, ảnh hưởng lớn đến sức khỏe, dễ chia phôi, công danh tài lộc gặp trở lực nặng. |`,
  structuredData: {
    profile1989Nam: {
      year: 1989,
      gender: 'Nam',
      canChi: 'Kỷ Tỵ',
      napAm: 'Đại Lâm Mộc',
      can: { name: 'Kỷ', hanh: 'Thổ' },
      chi: { name: 'Tỵ', hanh: 'Hỏa' },
      cungMenh: 'Khôn',
      cungPhiHanh: 'Thổ',
      nhomTrach: 'Tây Tứ Mệnh (Tây Tứ Trạch)',
    },
    cungMenhByRemainder: {
      1: { nam: 'Khảm', nu: 'Cấn', nhomNam: 'Đông Tứ', nhomNu: 'Tây Tứ' },
      2: { nam: 'Ly', nu: 'Càn', nhomNam: 'Đông Tứ', nhomNu: 'Tây Tứ' },
      3: { nam: 'Cấn', nu: 'Đoài', nhomNam: 'Tây Tứ', nhomNu: 'Tây Tứ' },
      4: { nam: 'Đoài', nu: 'Cấn', nhomNam: 'Tây Tứ', nhomNu: 'Tây Tứ' },
      5: { nam: 'Càn', nu: 'Ly', nhomNam: 'Tây Tứ', nhomNu: 'Đông Tứ' },
      6: { nam: 'Khôn', nu: 'Khảm', nhomNam: 'Tây Tứ', nhomNu: 'Đông Tứ' },
      7: { nam: 'Tốn', nu: 'Khôn', nhomNam: 'Đông Tứ', nhomNu: 'Tây Tứ' },
      8: { nam: 'Chấn', nu: 'Chấn', nhomNam: 'Đông Tứ', nhomNu: 'Đông Tứ' },
      0: { nam: 'Khôn', nu: 'Tốn', nhomNam: 'Tây Tứ', nhomNu: 'Đông Tứ' },
    },
    cungMatrix: {
      Càn: { Càn: 'Phục Vị', Khôn: 'Diên Niên', Cấn: 'Thiên Y', Đoài: 'Sinh Khí', Khảm: 'Lục Sát', Ly: 'Tuyệt Mệnh', Chấn: 'Ngũ Quỷ', Tốn: 'Họa Hại' },
      Khôn: { Càn: 'Diên Niên', Khôn: 'Phục Vị', Cấn: 'Sinh Khí', Đoài: 'Thiên Y', Khảm: 'Tuyệt Mệnh', Ly: 'Lục Sát', Chấn: 'Họa Hại', Tốn: 'Ngũ Quỷ' },
      Cấn: { Càn: 'Thiên Y', Khôn: 'Sinh Khí', Cấn: 'Phục Vị', Đoài: 'Diên Niên', Khảm: 'Ngũ Quỷ', Ly: 'Họa Hại', Chấn: 'Lục Sát', Tốn: 'Tuyệt Mệnh' },
      Đoài: { Càn: 'Sinh Khí', Khôn: 'Thiên Y', Cấn: 'Diên Niên', Đoài: 'Phục Vị', Khảm: 'Họa Hại', Ly: 'Ngũ Quỷ', Chấn: 'Tuyệt Mệnh', Tốn: 'Lục Sát' },
      Khảm: { Càn: 'Lục Sát', Khôn: 'Tuyệt Mệnh', Cấn: 'Ngũ Quỷ', Đoài: 'Họa Hại', Khảm: 'Phục Vị', Ly: 'Diên Niên', Chấn: 'Thiên Y', Tốn: 'Sinh Khí' },
      Ly: { Càn: 'Tuyệt Mệnh', Khôn: 'Lục Sát', Cấn: 'Họa Hại', Đoài: 'Ngũ Quỷ', Khảm: 'Diên Niên', Ly: 'Phục Vị', Chấn: 'Sinh Khí', Tốn: 'Thiên Y' },
      Chấn: { Càn: 'Ngũ Quỷ', Khôn: 'Họa Hại', Cấn: 'Lục Sát', Đoài: 'Tuyệt Mệnh', Khảm: 'Thiên Y', Ly: 'Sinh Khí', Chấn: 'Phục Vị', Tốn: 'Diên Niên' },
      Tốn: { Càn: 'Họa Hại', Khôn: 'Ngũ Quỷ', Cấn: 'Tuyệt Mệnh', Đoài: 'Lục Sát', Khảm: 'Sinh Khí', Ly: 'Thiên Y', Chấn: 'Diên Niên', Tốn: 'Phục Vị' },
    },
    batCungMeaning: {
      'Sinh Khí': { nhom: 'Cát (Tốt)', hanh: 'Mộc', mucDo: 'Thượng cát', yNghia: 'Vợ chồng gia đạo sum vầy, sự nghiệp vượng phát, con cái ngoan hiền, tài lộc dồi dào.' },
      'Thiên Y': { nhom: 'Cát (Tốt)', hanh: 'Thổ', mucDo: 'Thượng cát', yNghia: 'Sức khỏe dồi dào, bệnh tật tiêu trừ, gặp may mắn về quý nhân hỗ trợ, tuổi thọ cao.' },
      'Diên Niên': { nhom: 'Cát (Tốt)', hanh: 'Kim', mucDo: 'Thứ cát', alias: 'Phước Đức', yNghia: 'Tình cảm vợ chồng bền chặt, hòa thuận, ngoại giao tốt, tài chính ổn định dài lâu.' },
      'Phục Vị': { nhom: 'Cát (Tốt)', hanh: 'Thủy', mucDo: 'Tiểu cát', yNghia: 'Cuộc sống bình yên, ít sóng gió, tinh thần vững vàng, tình cảm chân thành.' },
      'Họa Hại': { nhom: 'Hung (Xấu)', hanh: 'Thổ', mucDo: 'Thứ hung', yNghia: 'Dễ vướng vào thị phi, cãi vã nhỏ nhặt, hao tốn tài sản nhỏ, bất hòa sinh hoạt.' },
      'Lục Sát': { nhom: 'Hung (Xấu)', hanh: 'Thủy', mucDo: 'Thứ hung', yNghia: 'Gia đạo hay bất an, tình cảm dễ rạn nứt, tranh chấp, rủi ro về pháp lý hoặc tai tiếng.' },
      'Ngũ Quỷ': { nhom: 'Hung (Xấu)', hanh: 'Hỏa', mucDo: 'Đại hung', yNghia: 'Dễ tai bay họa gió, mất mát tài sản, mâu thuẫn bộc phát dữ dội, công danh trắc trở.' },
      'Tuyệt Mệnh': { nhom: 'Hung (Xấu)', hanh: 'Kim', mucDo: 'Đại hung', yNghia: 'Cung xấu nhất, ảnh hưởng lớn đến sức khỏe, dễ chia phôi, công danh tài lộc gặp trở lực nặng.' },
    },
  },
};
