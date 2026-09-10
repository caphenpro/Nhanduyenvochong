import { extractYearsFromText, analyzeCoupleMultiLayer } from '../services/coupleAnalysis';
import { CoupleAnalysisResult } from '../types';
import { BAT_TRACH_8_CUNG_CHI_TIET, Y_NGHIA_8_DU_NIEN, BANG_SO_DU_BAT_TRACH, calculateBatTrachByYear } from './batTrachData';

export function generateAncientWisdomResponse(
  userQuery: string,
  coupleContext?: CoupleAnalysisResult | null
): string {
  const queryLower = userQuery.toLowerCase();
  const extractedYears = extractYearsFromText(userQuery);

  // If user asks about Bát Trạch or directions or specific year cung phi
  if (
    queryLower.includes('bát trạch') ||
    queryLower.includes('cung mệnh') ||
    queryLower.includes('hướng nhà') ||
    queryLower.includes('hướng bếp') ||
    queryLower.includes('đông tứ') ||
    queryLower.includes('tây tứ') ||
    queryLower.includes('du niên') ||
    queryLower.includes('sinh khí') ||
    queryLower.includes('tuyệt mệnh')
  ) {
    // If there is a single year in query
    if (extractedYears.length === 1) {
      const year = extractedYears[0];
      const namRes = calculateBatTrachByYear(year, 'Nam');
      const nuRes = calculateBatTrachByYear(year, 'Nữ');
      const namCungInfo = BAT_TRACH_8_CUNG_CHI_TIET[namRes.cung];
      const nuCungInfo = BAT_TRACH_8_CUNG_CHI_TIET[nuRes.cung];

      return `### 🧭 TRA CỨU CUNG MỆNH BÁT TRẠCH — NĂM SINH ${year}

#### 1. Công Thức & Cách Tính Số Dư Chia 9:
- Tổng các chữ số năm sinh: **${String(year).split('').join(' + ')} = ${namRes.tongChuSo}** $\\rightarrow$ Số dư chia cho 9: **${namRes.soDu}**
- **Nam Mạng:** Cung **${namRes.cung}** (${namRes.nguHanh}) — Thuộc nhóm **${namRes.nhom}**
  - **Hướng Cát (Tốt):** ${namCungInfo.huongHop.join(' • ')}
  - **Hướng Hung (Nên tránh):** ${namCungInfo.huongKhongHop.join(' • ')}
- **Nữ Mạng:** Cung **${nuRes.cung}** (${nuRes.nguHanh}) — Thuộc nhóm **${nuRes.nhom}**
  - **Hướng Cát (Tốt):** ${nuCungInfo.huongHop.join(' • ')}
  - **Hướng Hung (Nên tránh):** ${nuCungInfo.huongKhongHop.join(' • ')}

---

#### 2. Chi Tiết Ý Nghĩa 8 Hướng Du Niên:
- **Sinh Khí (Đại Cát):** Vượng tài lộc, danh tiếng, thăng tiến công danh, con cái đỗ đạt.
- **Thiên Y (Thượng Cát):** Sức khỏe dồi dào, tiêu trừ bệnh tật, có quý nhân phù trợ.
- **Diên Niên (Thứ Cát):** Gia đạo hòa thuận, tình duyên bền chặt, sự nghiệp vững chắc.
- **Phục Vị (Tiểu Cát):** Bình an, thanh tịnh, củng cố nội lực (hợp bàn thờ, phòng học).
- **Họa Hại (Thứ Hung):** Thị phi, mất mát tài chính nhỏ, bất hòa lặt vặt.
- **Lục Sát (Thứ Hung):** Trục trặc quan hệ, trì trệ kinh doanh, bất an tình cảm.
- **Ngũ Quỷ (Đại Hung):** Tai họa, hao tài tốnของ, hỏa hoạn mất cắp, tranh chấp.
- **Tuyệt Mệnh (Cực Hung):** Bệnh tật hiểm nghèo, suy vi tài sản (cần dùng hướng bếp/Thiên Y hóa giải).

*#nguyenhoangdang #huyenhoc #BatTrach #PhongThuy #CungMenh #HuongNha*`;
    }

    // General Bát Trạch overview
    return `### 🧭 BẢN ĐỒ CUNG MỆNH BÁT TRẠCH & 8 HƯỚNG PHONG THỦY

Cung mệnh Bát Trạch (Cung Phi) là phương pháp xác định quẻ mệnh của mỗi người dựa trên năm sinh âm lịch và giới tính, từ đó ứng dụng vào việc chọn hướng nhà, hướng bếp, bàn làm việc, cũng như xem tuổi hòa hợp trong hôn nhân.

---

#### 1. Bảng 8 Cung Mệnh & Hai Nhóm Trạch:
* **Đông Tứ Mệnh:** Gồm các cung **Khảm** (Thủy), **Ly** (Hỏa), **Chấn** (Mộc), **Tốn** (Mộc).
  * *Hướng hợp (Đông Tứ Trạch):* **Đông, Đông Nam, Nam, Bắc**.
* **Tây Tứ Mệnh:** Gồm các cung **Càn** (Kim), **Đoài** (Kim), **Cấn** (Thổ), **Khôn** (Thổ).
  * *Hướng hợp (Tây Tứ Trạch):* **Tây, Tây Bắc, Tây Nam, Đông Bắc**.

---

#### 2. Cách Tính Cung Mệnh Bát Trạch (Số Dư Chia 9):
1. Cộng tất cả chữ số trong năm sinh âm lịch, sau đó chia cho 9 để lấy số dư (nếu chia hết lấy số dư là 9 hoặc 0).
2. Đối chiếu số dư theo bảng Cung Mệnh Nam và Nữ:
* **Dư 1:** Nam **Khảm (Thủy)** | Nữ **Cấn (Thổ)**
* **Dư 2:** Nam **Ly (Hỏa)** | Nữ **Càn (Kim)**
* **Dư 3:** Nam **Cấn (Thổ)** | Nữ **Đoài (Kim)**
* **Dư 4:** Nam **Đoài (Kim)** | Nữ **Cấn (Thổ)**
* **Dư 5:** Nam **Càn (Kim)** | Nữ **Ly (Hỏa)**
* **Dư 6:** Nam **Khôn (Thổ)** | Nữ **Khảm (Thủy)**
* **Dư 7:** Nam **Tốn (Mộc)** | Nữ **Khôn (Thổ)**
* **Dư 8:** Nam **Chấn (Mộc)** | Nữ **Chấn (Mộc)**
* **Dư 0 / 9:** Nam **Khôn (Thổ)** | Nữ **Tốn (Mộc)**

---

#### 3. Ý Nghĩa 8 Du Niên Cát — Hung:
* **4 Hướng Tốt (Cát):** Sinh Khí (vượng tài lộc), Thiên Y (sức khỏe quý nhân), Diên Niên (gia đạo êm ấm), Phục Vị (bình an tinh thần).
* **4 Hướng Xấu (Hung):** Họa Hại (thị phi mất mát), Ngũ Quỷ (tai họa tranh chấp), Lục Sát (xung đột quan hệ), Tuyệt Mệnh (bệnh tật suy vi).

👉 *Quý bạn có thể nhập năm sinh (ví dụ: "Xem hướng nhà cho nam 1990" hoặc "Chồng 1990 Vợ 1993") để ta phân tích chi tiết!*

*#nguyenhoangdang #huyenhoc #BatTrach #CungMenh #PhongThuy*`;
  }

  let targetCouple = coupleContext;
  if (extractedYears.length >= 2) {
    targetCouple = analyzeCoupleMultiLayer(extractedYears[0], 1, extractedYears[1], 1);
  }

  if (targetCouple) {
    const { chong, vo, tang1ThienCan, tang2DiaChi, tang3NguHanh, tang4NapAm, tang5CungMenh, cauTrucTongHop } = targetCouple;

    return `### 🌸 BÁO CÁO LUẬN GIẢI NHÂN DUYÊN — AI NHÂN DUYÊN
*(Phân tích chuẩn xác theo Cấu Trúc Báo Cáo 5 Phần & Triết Lý Đa Tầng)*

---

### PHẦN 1: THÔNG TIN BẢN MỆNH
| Đối Tượng | Năm Sinh (Can Chi) | Nạp Âm Hoa Giáp (Hành) | Cung Mệnh / Cung Phi (Trạch Mệnh) |
| :--- | :--- | :--- | :--- |
| **Nam (Chồng)** | **${chong.fullName}** (${chong.lunarYear}) | **${tang4NapAm.napAmChong}** (${tang4NapAm.nguHanhChong}) | Cung **${chong.cungPhi}** (${chong.dongTayMenh}) |
| **Nữ (Vợ)** | **${vo.fullName}** (${vo.lunarYear}) | **${tang4NapAm.napAmVo}** (${tang4NapAm.nguHanhVo}) | Cung **${vo.cungPhi}** (${vo.dongTayMenh}) |

*Lưu ý:* Hiện đang phân tích tổng quan theo niên mệnh. Khi cung cấp thêm ngày, tháng, giờ sinh, hệ thống sẽ tiến hành lập Bát Tự (Tứ Trụ) hoàn chỉnh.

---

### PHẦN 2: PHÂN TÍCH CÁC TẦNG TƯƠNG TÁC (TỪ TỔNG QUAN ĐẾN CHI TIẾT)

#### 1. Tầng Niên Mệnh (Năm sinh):
- **Thiên Can (Tầng Khí):** ${tang1ThienCan.canChong} &times; ${tang1ThienCan.canVo} $\\rightarrow$ **${tang1ThienCan.quanHe}**. ${tang1ThienCan.chiTiet}. ${tang1ThienCan.yNghiaKhi}
- **Địa Chi (Tầng Động):** ${chong.chi} &times; ${vo.chi} $\\rightarrow$ **${tang2DiaChi.tamHop ? `Tam Hợp (${tang2DiaChi.tamHopNhom})` : tang2DiaChi.lucHop ? `Lục Hợp (${tang2DiaChi.lucHopCap})` : tang2DiaChi.lucXung ? `Lục Xung (${tang2DiaChi.lucXungCap})` : tang2DiaChi.lucHai ? `Lục Hại (${tang2DiaChi.lucHaiCap})` : 'Bình Hòa'}**. ${tang2DiaChi.chiTietDong} *(Nguyên tắc: Xung không đồng nghĩa với ly hôn, Hợp không đồng nghĩa với tốt tuyệt đối).*
- **Nạp Âm Hoa Giáp (Bản Thể):** ${tang4NapAm.nguHanhChong} &times; ${tang4NapAm.nguHanhVo} $\\rightarrow$ **${tang4NapAm.quanHe}**. ${tang4NapAm.phanBietRoRang}
- **Cung Mệnh / Cung Phi (Bát Trạch):** ${tang5CungMenh.cungChong} phối ${tang5CungMenh.cungVo} $\\rightarrow$ Du Niên **${tang5CungMenh.ketQuaBatTrach}** (${tang5CungMenh.nhomBatTrach}). ${tang5CungMenh.yNghia}

#### 2. Tầng Bát Tự Chuyên Sâu (Định hướng khi có thêm giờ/ngày/tháng):
- Khảo sát tương tác Nhật Chủ (Can ngày của Chồng và Vợ) và trạng thái Cung Phu Thê (Nhật Chi).
- Đối chiếu độ khuyết vượng Ngũ Hành & Dụng Thần bổ trợ cho nhau.
- Rà soát Thần sát Hôn nhân (Đào Hoa, Thiên Hỷ, Hồng Loan, Cô Thần, Quả Tú).

---

### PHẦN 3: ĐÁNH GIÁ TÍNH CÁCH VÀ LỐI SỐNG
- **Đặc tính bản mệnh:** Người chồng mang khí chất ${tang4NapAm.napAmChong}, thiên về ${chong.canNguHanh === 'Kim' ? 'quyết đoán, kỷ luật' : chong.canNguHanh === 'Mộc' ? 'nhân hậu, hướng thượng' : chong.canNguHanh === 'Thủy' ? 'linh hoạt, sâu sắc' : chong.canNguHanh === 'Hỏa' ? 'nhiệt tình, bộc trực' : 'trung hậu, vững chãi'}; Người vợ mang bản thể ${tang4NapAm.napAmVo}, có tính cách ${vo.canNguHanh === 'Kim' ? 'tinh tế, cương nghị' : vo.canNguHanh === 'Mộc' ? 'ôn hòa, bao dung' : vo.canNguHanh === 'Thủy' ? 'thấu cảm, khéo léo' : vo.canNguHanh === 'Hỏa' ? 'chân thành, sôi nổi' : 'chu đáo, thủy chung'}.
- **Điểm tương đồng dễ gắn kết:**
${cauTrucTongHop.diemThuan.length > 0 ? cauTrucTongHop.diemThuan.map((d) => `  - ✅ ${d}`).join('\n') : '  - Hai bạn có nền tảng tự nhiên để cùng vun đắp, không bị chi phối bởi thiên kiến cứng nhắc.'}
- **Điểm khác biệt / Dễ phát sinh bất đồng:**
${cauTrucTongHop.diemNghich.length > 0 ? cauTrucTongHop.diemNghich.map((d) => `  - ⚠️ ${d}`).join('\n') : '  - Khí vận khá thuận hòa, cần lưu ý giữ gìn sự tươi mới trong giao tiếp hàng ngày.'}

---

### PHẦN 4: DỰ ĐOÁN & THỜI ĐIỂM CẦN LƯU Ý
${cauTrucTongHop.diemLuuY.map((d) => `- 💡 **Lưu ý:** ${d}`).join('\n')}
- **Thời điểm quan trọng:** Khi bước vào các năm có Địa Chi tương xung/hình với tuổi của hai bạn (đặc biệt các năm hạn Tam Tai hoặc xung Chi năm sinh), gia đình nên thận trọng trong lời ăn tiếng nói, tránh quyết định đầu tư mạo hiểm khi tâm trí đang bất an.
- **Thời điểm tốt:** Chọn năm tháng có Thiên Can tương hợp, Tam hợp hoặc sinh dưỡng bản mệnh để tiến hành việc hỷ sự, mua nhà hoặc đón thêm thành viên mới nhằm gia tăng sinh khí hóa giải xung khắc.

---

### PHẦN 5: LỜI KHUYÊN & PHƯƠNG PHÁP HÓA GIẢI
1. **Ứng xử tâm lý thực tế (Quan trọng nhất):**
   - Vợ chồng lấy đạo nghĩa làm trọng, "Tương kính như tân", học cách lắng nghe khi đối phương chia sẻ và kiềm chế khẩu thiệt lúc bất đồng.
   - Tôn trọng không gian cá nhân và phân định rõ ràng trách nhiệm gia đình.
2. **Phương pháp điều chỉnh phong thủy & Ngũ hành:**
   - Ưu tiên chọn hướng nhà, hướng bếp theo các cung tốt của Bát Trạch (${tang5CungMenh.ketQuaBatTrach === 'Tuyệt Mệnh' || tang5CungMenh.ketQuaBatTrach === 'Ngũ Quỷ' ? 'dùng hướng bếp Thiên Y hoặc Sinh Khí để chế hóa' : 'giữ hướng bếp và phòng ngủ tại cung Sinh Khí / Diên Niên'}).
   - Màu sắc nội thất và trang phục nên phối hòa theo ngũ hành tương sinh giữa hai nạp âm để tạo trường năng lượng ấm áp.

> *"Một người không phải chỉ là một cái tuổi. Huyền học là hệ thống tham khảo nhận diện khuynh hướng; còn chất lượng hôn nhân thực tế phụ thuộc vào tính cách, giao tiếp, sự tôn trọng, trách nhiệm, đạo đức và cách hai người cùng nhau xử lý khác biệt."*

*#nguyenhoangdang #huyenhoc #NhanDuyen #AmDuongNguHanh #BatTu #BatTrach*`;
  }

  // General questions response
  return `### 🌸 CHUYÊN GIA TƯ VẤN NHÂN DUYÊN & HÔN NHÂN BÁT TỰ — MỆNH LÝ
*(Hệ Thống AI Nhân Duyên: Kết Nối Tâm Duyên – Thấu Hiểu Yêu Thương)*

Kính chào quý bạn! Ta là **AI Nhân Duyên**, chuyên gia tư vấn hôn nhân, tình duyên và phong thủy gia đạo.

---

#### 📋 1. YÊU CẦU THU THẬP THÔNG TIN (INPUT REQUIREMENTS):
- **Thông Tin Bắt Buộc:**
  1. Giới tính (Nam / Nữ) của cả hai bên.
  2. Năm sinh dương lịch hoặc âm lịch của cả hai bên.
- **Thông Tin Ưu Tiên (Càng Tốt Để Đạt Độ Chính Xác Cao):**
  - Tháng sinh, Ngày sinh, Giờ sinh (Âm hoặc Dương lịch).
  - Nơi sinh (để cân chỉnh giờ địa phương).

*Quy tắc ứng xử:* Nếu chỉ có Năm sinh, ta sẽ phân tích theo Niên Mệnh (Can Chi, Nạp Âm, Cung Mệnh Bát Trạch). Nếu có đủ Ngày/Tháng/Năm/Giờ, ta sẽ tiến hành lập Bát Tự (Tứ Trụ) chuyên sâu.

---

#### 📑 2. CẤU TRÚC PHÂN TÍCH & BÁO CÁO 5 PHẦN (OUTPUT FRAMEWORK):
1. **Phần 1 — Thông Tin Bản Mệnh:** Bảng tóm tắt Can Chi, Nạp Âm Hoa Giáp và Cung Mệnh Bát Trạch.
2. **Phần 2 — Phân Tích Các Tầng Tương Tác:**
   - Tầng Niên Mệnh (Thiên Can khí, Địa Chi động, Nạp Âm bản thể, Cung Mệnh phong thủy).
   - Tầng Bát Tự Chuyên Sâu (Nhật Chủ, Cung Hôn Nhân, Dụng Thần bổ trợ, Thần Sát).
3. **Phần 3 — Đánh Giá Tính Cách & Lối Sống:** Điểm tương đồng gắn kết và điểm bất đồng khác biệt.
4. **Phần 4 — Dự Đoán & Thời Điểm Cần Lưu Ý:** Giai đoạn rủi ro và năm tháng tốt lành để tiến hành đại sự.
5. **Phần 5 — Lời Khuyên & Phương Pháp Hóa Giải:** Ứng xử tâm lý thực tế (quan trọng nhất) và điều chỉnh phong thủy, Ngũ hành.

---

#### 🌟 3. NGUYÊN TẮC LUẬN GIẢI CỐT LÕI:
- **Khách quan & Xây dựng:** Không dùng từ ngữ mang tính đe dọa, tuyệt vọng. Mọi xung khắc đều có phương pháp cân bằng và hóa giải.
- **Cân bằng giữa Lý thuyết & Thực tế:** Kết hợp tri thức mệnh lý và tâm lý hôn nhân hiện đại.
- **Triết lý bất biến:** *"Một người không phải chỉ là một cái tuổi. Xung không đồng nghĩa với ly hôn, Hợp không đồng nghĩa với tốt tuyệt đối."*

👉 **Quý bạn hãy gửi thông tin tuổi/ngày sinh của hai bạn (ví dụ: "Chồng sinh 1990, Vợ sinh 1993") để ta tiến hành lập báo cáo 5 phần nhé!**

*#nguyenhoangdang #huyenhoc #NhanDuyen #AmDuongNguHanh #BatTu #BatTrach*`;
}

