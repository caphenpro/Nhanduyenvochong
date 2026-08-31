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

    return `### 🌸 NỀN TẢNG LUẬN GIẢI HÒA HỢP VỢ CHỒNG — AI NHÂN DUYÊN
**Chồng:** ${chong.fullName} (${chong.lunarYear}) • Can: ${chong.can} (${chong.canNguHanh}) • Chi: ${chong.chi} (${chong.chiNguHanh}) • Mệnh: ${chong.menh} • Cung: ${chong.cungPhi} (${chong.dongTayMenh})  
**Vợ:** ${vo.fullName} (${vo.lunarYear}) • Can: ${vo.can} (${vo.canNguHanh}) • Chi: ${vo.chi} (${vo.chiNguHanh}) • Mệnh: ${vo.menh} • Cung: ${vo.cungPhi} (${vo.dongTayMenh})

---

#### ❖ TẦNG 1: THIÊN CAN (TẦNG QUAN HỆ KHÍ)
- **Quan hệ:** **${tang1ThienCan.quanHe}** (${tang1ThienCan.canChong} &times; ${tang1ThienCan.canVo})
- **Luận giải:** ${tang1ThienCan.chiTiet}
- **Ý nghĩa:** ${tang1ThienCan.yNghiaKhi}

#### ❖ TẦNG 2: ĐỊA CHI (TẦNG QUAN HỆ ĐỘNG)
- **Cấu trúc Chi:** ${chong.chi} (${chong.tuoiCon}) &times; ${vo.chi} (${vo.tuoiCon})
- **Khảo sát:** ${tang2DiaChi.tamHop ? `Tam Hợp: ${tang2DiaChi.tamHopNhom} • ` : ''}${tang2DiaChi.lucHop ? `Lục Hợp: ${tang2DiaChi.lucHopCap} • ` : ''}${tang2DiaChi.lucXung ? `Lục Xung: ${tang2DiaChi.lucXungCap} • ` : ''}${tang2DiaChi.lucHai ? `Lục Hại: ${tang2DiaChi.lucHaiCap} • ` : ''}${tang2DiaChi.lucPha ? `Lục Phá: ${tang2DiaChi.lucPhaCap} • ` : ''}${tang2DiaChi.hinh ? `Hình: ${tang2DiaChi.hinhLoai} • ` : ''}${!tang2DiaChi.tamHop && !tang2DiaChi.lucHop && !tang2DiaChi.lucXung && !tang2DiaChi.lucHai ? 'Bình hòa' : ''}
- **Nhận định:** ${tang2DiaChi.chiTietDong}

#### ❖ TẦNG 3: NGŨ HÀNH NỘI TẠI
- ${tang3NguHanh.chiTiet}

#### ❖ TẦNG 4: LỤC THẬP HOA GIÁP & NẠP ÂM
- **Nạp Âm Chồng:** ${tang4NapAm.napAmChong} (${tang4NapAm.nguHanhChong})
- **Nạp Âm Vợ:** ${tang4NapAm.napAmVo} (${tang4NapAm.nguHanhVo})
- **Quan hệ:** ${tang4NapAm.quanHe}
- **Lưu ý quy chiếu:** ${tang4NapAm.phanBietRoRang}

#### ❖ TẦNG 5: CUNG MỆNH BÁT TRẠCH & HƯỚNG PHONG THỦY
- **Phối cung:** ${tang5CungMenh.cungChong} (${tang5CungMenh.dongTayChong}) &times; ${tang5CungMenh.cungVo} (${tang5CungMenh.dongTayVo}) $\\rightarrow$ **${tang5CungMenh.ketQuaBatTrach}** (Nhóm ${tang5CungMenh.nhomBatTrach})
- **Ý nghĩa:** ${tang5CungMenh.yNghia}

---

#### ❖ TỔNG HỢP CẤU TRÚC TƯƠNG TÁC
* **Điểm thuận:**
${cauTrucTongHop.diemThuan.length > 0 ? cauTrucTongHop.diemThuan.map((d) => `  - ✅ ${d}`).join('\n') : '  - Không có quan hệ tương sinh lớn, giữ thế tự nhiên.'}
* **Điểm nghịch / Khác biệt:**
${cauTrucTongHop.diemNghich.length > 0 ? cauTrucTongHop.diemNghich.map((d) => `  - ⚠️ ${d}`).join('\n') : '  - Không có quan hệ xung hại lớn.'}
* **Điểm cần lưu ý:**
${cauTrucTongHop.diemLuuY.map((d) => `  - 💡 ${d}`).join('\n')}

---

#### ❖ THÔNG ĐIỆP & NGUYÊN TẮC CỐT LÕI
> *"${cauTrucTongHop.thongDiepCotLoi}"*

${cauTrucTongHop.amDuongCheHoa}

*#nguyenhoangdang #huyenhoc #huyenhocdoisong #NhanDuyen #AmDuongNguHanh #LucThapHoaGiap #BatTu #BatTrach*`;
  }

  // General questions response
  return `### 🌸 AI Nhân Duyên — Kết Nối Tâm Duyên, Thấu Hiểu Yêu Thương

Chào quý bạn! Ta là **AI Nhân Duyên**, trợ lý chuyên sâu về luận giải hòa hợp nhân duyên vợ chồng và Bát Trạch phong thủy theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.

#### ❖ NGUYÊN TẮC LUẬN GIẢI CHUẨN MỰC:
1. **Không dùng 1 yếu tố đơn lẻ** để kết luận toàn bộ một mối quan hệ.
2. **Xung không đồng nghĩa với ly hôn**; **Hợp không đồng nghĩa với tốt tuyệt đối**.
3. **Phân biệt rõ 4 lớp quy chiếu**: Thiên Can (Khí) &bull; Địa Chi (Động) &bull; Nạp Âm (Lục Thập Hoa Giáp) &bull; Cung Mệnh (Bát Trạch Phong Thủy).
4. **Không chấm điểm cơ học thô thiển**: Luận giải dựa trên **Cấu Trúc Tương Tác** và cơ chế **Sinh – Khắc – Chế – Hóa**.
5. **Giới hạn xem tuổi**: Năm sinh chỉ là đánh giá hòa hợp cơ bản; muốn phân tích toàn diện cần đủ Tứ Trụ (Giờ, Ngày, Tháng, Năm sinh).

> *"Một người không phải chỉ là một cái tuổi. Huyền học là hệ thống tham khảo nhận diện khuynh hướng; còn chất lượng hôn nhân thực tế phụ thuộc vào tính cách, giao tiếp, trách nhiệm, đạo đức và cách hai người cùng nhau xử lý khác biệt."*

👉 Quý bạn hãy nhập **năm sinh của hai người** (ví dụ: *Chồng 1990 Vợ 1993*) hoặc **câu hỏi về Bát Trạch, hướng nhà, hóa giải xung khắc** để ta giải đáp nhé!

*#nguyenhoangdang #huyenhoc #huyenhocdoisong #NhanDuyen #AmDuongNguHanh #LucThapHoaGiap #BatTu #BatTrach*`;
}

