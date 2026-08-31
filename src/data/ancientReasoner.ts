import { extractYearsFromText, analyzeCoupleMultiLayer } from '../services/coupleAnalysis';
import { CoupleAnalysisResult } from '../types';

export function generateAncientWisdomResponse(
  userQuery: string,
  coupleContext?: CoupleAnalysisResult | null
): string {
  const queryLower = userQuery.toLowerCase();
  const extractedYears = extractYearsFromText(userQuery);

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

#### ❖ TẦNG 5: CUNG MỆNH BÁT TRẠCH
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

Chào quý bạn! Ta là **AI Nhân Duyên**, trợ lý chuyên sâu về luận giải hòa hợp nhân duyên vợ chồng theo hệ thống Âm Dương – Ngũ Hành khoa học và đa tầng.

#### ❖ NGUYÊN TẮC LUẬN GIẢI CHUẨN MỰC:
1. **Không dùng 1 yếu tố đơn lẻ** để kết luận toàn bộ một mối quan hệ.
2. **Xung không đồng nghĩa với ly hôn**; **Hợp không đồng nghĩa với tốt tuyệt đối**.
3. **Phân biệt rõ 3 lớp quy chiếu**: Thiên Can (Khí) &bull; Địa Chi (Động) &bull; Nạp Âm (Lục Thập Hoa Giáp) &bull; Cung Mệnh (Bát Trạch).
4. **Không chấm điểm cơ học thô thiển**: Luận giải dựa trên **Cấu Trúc Tương Tác** và cơ chế **Sinh – Khắc – Chế – Hóa**.
5. **Giới hạn xem tuổi**: Năm sinh chỉ là đánh giá hòa hợp cơ bản; muốn phân tích toàn diện cần đủ Tứ Trụ (Giờ, Ngày, Tháng, Năm sinh).

> *"Một người không phải chỉ là một cái tuổi. Huyền học là hệ thống tham khảo nhận diện khuynh hướng; còn chất lượng hôn nhân thực tế phụ thuộc vào tính cách, giao tiếp, trách nhiệm, đạo đức và cách hai người cùng nhau xử lý khác biệt."*

👉 Quý bạn hãy nhập **năm sinh của hai người** (ví dụ: *Chồng 1990 Vợ 1993*) để ta lập bảng phân tích đa tầng nhé!

*#nguyenhoangdang #huyenhoc #huyenhocdoisong #NhanDuyen #AmDuongNguHanh #LucThapHoaGiap #BatTu #BatTrach*`;
}
