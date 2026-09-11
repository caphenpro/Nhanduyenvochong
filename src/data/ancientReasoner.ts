import { extractYearsFromText, analyzeCoupleMultiLayer } from '../services/coupleAnalysis';
import { CoupleAnalysisResult } from '../types';
import { BAT_TRACH_8_CUNG_CHI_TIET, Y_NGHIA_8_DU_NIEN, BANG_SO_DU_BAT_TRACH, calculateBatTrachByYear } from './batTrachData';
import { DOC_01_KY_TY_1989_BAT_TRACH, KNOWLEDGE_BASE_DOCUMENTS, lookupBatTrachMarriageMatrix } from './knowledge_base';

export function generateAncientWisdomResponse(
  userQuery: string,
  coupleContext?: CoupleAnalysisResult | null
): string {
  const queryLower = userQuery.toLowerCase();
  const extractedYears = extractYearsFromText(userQuery);

  // 1. Check if user is asking about the Knowledge Base / Priority Directory / Rules
  if (
    queryLower.includes('thư mục') ||
    queryLower.includes('tiệp dữ liệu') ||
    queryLower.includes('tệp dữ liệu') ||
    queryLower.includes('kho kiến thức') ||
    queryLower.includes('nguyên tắc') ||
    queryLower.includes('quy tắc') ||
    queryLower.includes('ưu tiên lấy kiến thức') ||
    queryLower.includes('mở rộng') ||
    queryLower.includes('minh bạch nguồn gốc') ||
    queryLower.includes('ground truth') ||
    queryLower.includes('knowledge base')
  ) {
    return `### 📚 KHO TRI THỨC ƯU TIÊN NỘI BỘ & NGUYÊN TẮC VẬN HÀNH

Tài liệu đính kèm là nguồn **THỰC TẠI CHUẨN (Ground Truth)** được lưu trữ trong hệ thống. Quy trình tư vấn tuân thủ 3 nguyên tắc vận hành:

1. **Nguyên tắc Ưu tiên tuyệt đối:** Mọi giải nghĩa đối chiếu từ tài liệu nội bộ luôn mang giá trị cao nhất.
2. **Nguyên tắc Mở rộng:** Khi vấn đề vượt ngoài phạm vi tài liệu hiện hành, hệ thống kết hợp học thuật mệnh lý cổ truyền để bổ trợ mà không mâu thuẫn với gốc.
3. **Minh bạch nguồn gốc:** Phân định rõ ràng giữa tri thức gốc và phần luận giải mở rộng nhằm bảo đảm tính xác thực cao nhất.

---

#### ❖ HỆ THỐNG DỮ LIỆU ĐANG KÍCH HOẠT:
- **Hồ sơ 1989 Kỷ Tỵ Nam:** Nạp âm Đại Lâm Mộc, Can Kỷ (Thổ), Chi Tỵ (Hỏa), Cung Mệnh Khôn (Tây Tứ Mệnh).
- **Hệ thống Ma trận Cung Mệnh 8x8:** Phối biến Bát Trạch chuẩn hóa (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại).
- **Phân định bản chất 8 Cung Cát Hung:** Thượng cát, Thứ cát, Tiểu cát, Thứ hung và Đại hung.`;
  }

  // 2. Priority check: If user asks specifically about 1989 or Kỷ Tỵ Nam
  if (
    (queryLower.includes('1989') || queryLower.includes('kỷ tỵ') || queryLower.includes('ky ty')) &&
    (queryLower.includes('nam') || !queryLower.includes('nữ')) &&
    extractedYears.length <= 1
  ) {
    return `### 📜 LUẬN GIẢI BẢN MỆNH — NĂM SINH 1989 (KỶ TỴ NAM MẠNG)

#### BƯỚC 1: THÔNG TIN BẢN MỆNH
THÔNG TIN NAM:
Năm sinh: 1989 (Kỷ Tỵ)
Thiên Can: Kỷ (Âm Thổ)
Địa Chi: Tỵ (Âm Hỏa)
Nạp Âm: Đại Lâm Mộc (Gỗ rừng già)
Cung Mệnh: Khôn (Tây Tứ Mệnh)

---

#### BƯỚC 2: THẦN KHÍ BẢN CHẤT NẠP ÂM & CUNG MỆNH
- **Khí chất Nạp Âm Đại Lâm Mộc:** Đại Lâm Mộc là gỗ của rừng đại ngàn cổ thụ, thân cành vững chãi, tán lá sum sê chở che vạn vật. Người mang nạp âm này sở hữu nội tâm thâm trầm, tấm lòng bao dung, sống trọng tình nghĩa, có khí phách gánh vác việc lớn và che chở cho gia đạo. Tuy nhiên, vì là mộc rừng già nên tính tình có phần cố chấp, không dễ khuất phục trước áp lực.
- **Tương tác Nội Tại Can - Chi:** Thiên can Kỷ thuộc Thổ, Địa chi Tỵ thuộc Hỏa. Hỏa của chi Tỵ âm thầm sinh dưỡng cho Thổ của can Kỷ (Chi sinh Can), tạo nên nền tảng cội rễ vững bền, trong nghịch cảnh vẫn luôn tìm được quý nhân nâng đỡ, hậu vận tích lũy được phúc lộc thâm sâu.
- **Khí vận Cung Mệnh Khôn (Thổ):** Khôn vi Địa, biểu tượng của đất mẹ hiền hòa, điềm đạm, chu đáo, rất coi trọng mái ấm gia đình và sự bình ổn lâu dài.

---

#### BƯỚC 3: GIÁ TRỊ THỰC TIỄN & PHỐI CUNG HÔN PHỐI
**1. Tương phối Bát Trạch với các tuổi Nữ:**
- **Kết hợp Nữ cung Cấn:** Đạt **Sinh Khí** (Đại Cát) — Vượng tài lộc, gia nghiệp hanh thông, con cháu hiếu thảo thành đạt.
- **Kết hợp Nữ cung Đoài:** Đạt **Thiên Y** (Thượng Cát) — Khí huyết điều hòa, sức khỏe an khang, gia đạo luôn có quý nhân trợ lực.
- **Kết hợp Nữ cung Càn:** Đạt **Diên Niên** (Thứ Cát) — Tình cảm vợ chồng keo sơn gắn bó, bền chặt sắt son qua năm tháng.
- **Kết hợp Nữ cung Khôn:** Đạt **Phục Vị** (Tiểu Cát) — Gia đạo bình an, cùng chung chí hướng, cuộc sống thanh nhàn.
- **Gặp các cung Khảm (Tuyệt Mệnh), Tốn (Ngũ Quỷ), Ly (Lục Sát), Chấn (Họa Hại):** Đây là các biến cung cần đặc biệt chú ý trong giao tiếp vợ chồng và vận dụng phương pháp chuyển hóa phong thủy.

**2. Phương hướng phong thủy cát lợi (Tây Tứ Trạch):**
- Hướng đón vượng khí: **Tây Bắc (Diên Niên), Đông Bắc (Sinh Khí), Tây (Thiên Y), Tây Nam (Phục Vị)**.

**3. Lời khuyên tu dưỡng & Gia đạo:**
Đại Lâm Mộc muốn thành rường cột phải chịu được sương gió, người tuổi Kỷ Tỵ Nam cần rèn luyện tính kiên nhẫn, tránh để sự cương trực biến thành độc đoán. Trong hôn nhân, lấy chữ "Nhẫn" làm đầu, lắng nghe người bạn đời để cội rễ gia đình luôn vững bền.`;
  }

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

      return `### 🧭 LUẬN GIẢI CUNG MỆNH BÁT TRẠCH — NĂM SINH ${year}

#### BƯỚC 1: THÔNG TIN BẢN MỆNH
THÔNG TIN NAM:
Năm sinh: ${year}
Cung Mệnh: ${namRes.cung} (${namRes.nguHanh})
Trạch Mệnh: ${namRes.nhom}

THÔNG TIN NỮ:
Năm sinh: ${year}
Cung Mệnh: ${nuRes.cung} (${nuRes.nguHanh})
Trạch Mệnh: ${nuRes.nhom}

---

#### BƯỚC 2: THẦN KHÍ & ĐẶC TÍNH KHÍ VẬN
- **Nam mạng cung ${namRes.cung} (${namRes.nguHanh}):** Khí chất thuộc nhóm ${namRes.nhom}, trường năng lượng tương ứng với các phương vị tiếp nhận sinh khí tự nhiên từ đất trời, mang lại sự bền bỉ trong sự nghiệp và sự chu toàn đối với gia đình.
- **Nữ mạng cung ${nuRes.cung} (${nuRes.nguHanh}):** Khí chất thuộc nhóm ${nuRes.nhom}, tượng trưng cho sự mềm mại, khéo léo vun vén, mang lại sự an ổn cho phong thủy gia đạo.

---

#### BƯỚC 3: PHƯƠNG HƯỚNG CÁT HUNG & GIẢI PHÁP ỨNG DỤNG
**1. Đối với Nam Mạng:**
- **Hướng Cát (Nên đặt cửa chính, phòng khách, ban thờ):** ${namCungInfo.huongHop.join(' • ')}
- **Hướng Hung (Nên tránh đặt cửa chính, chỉ dùng đặt bếp hoặc nhà vệ sinh để trấn hung):** ${namCungInfo.huongKhongHop.join(' • ')}

**2. Đối với Nữ Mạng:**
- **Hướng Cát (Tốt lành sinh vượng):** ${nuCungInfo.huongHop.join(' • ')}
- **Hướng Hung (Cần tiết chế, tránh trổ cửa):** ${nuCungInfo.huongKhongHop.join(' • ')}

**3. Bản chất 4 cung cát và 4 cung hung trong đời sống:**
- **Sinh Khí:** Khơi thông dòng chảy tài lộc, thúc đẩy công danh, con cái thông tuệ.
- **Thiên Y:** Tăng cường sinh lực, tiêu trừ ám khí bệnh tật, gặp gỡ quý nhân tương trợ.
- **Diên Niên:** Gắn kết ân tình vợ chồng, gia đạo êm ấm trên dưới thuận hòa.
- **Phục Vị:** Tâm tính tĩnh tại, củng cố nội lực, duy trì sự ổn định.
- **Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh:** Biểu hiện của các trường khí nhiễu loạn; giải pháp tối ưu trong phong thủy là "Đa hung tọa hung hướng cát" - dùng hướng bếp, ban thờ để chế hóa hung khí, biến thách thức thành động lực bồi đắp phúc đức.`;
    }

    // General Bát Trạch overview
    return `### 🧭 ĐẠI CƯƠNG CUNG MỆNH BÁT TRẠCH & KHÍ VẬN PHONG THỦY

Bát Trạch là học thuật phân định trường năng lượng giữa con người và không gian cư ngụ, giúp nhận diện dòng khí lưu chuyển để định hướng nơi an cư và tìm kiếm sự đồng điệu trong nhân duyên.

---

#### ❖ PHÂN ĐỊNH HAI NHÓM TRẠCH MỆNH:
1. **Đông Tứ Mệnh:** Gồm 4 cung Khảm (Thủy), Ly (Hỏa), Chấn (Mộc), Tốn (Mộc).
   - Hướng cát đón vượng khí: **Đông, Đông Nam, Nam, Bắc**.
2. **Tây Tứ Mệnh:** Gồm 4 cung Càn (Kim), Đoài (Kim), Cấn (Thổ), Khôn (Thổ).
   - Hướng cát đón vượng khí: **Tây, Tây Bắc, Tây Nam, Đông Bắc**.

---

#### ❖ BẢN CHẤT CÁT HUNG CỦA 8 CUNG BIẾN:
- **Tứ Cát Khí:**
  - *Sinh Khí:* Chủ về danh vọng, tài lộc vượng phát, năng lượng tươi mới.
  - *Thiên Y:* Chủ về trường thọ, sức khỏe tráng kiện, được quý nhân nâng đỡ.
  - *Diên Niên:* Chủ về ân nghĩa vợ chồng, gia hòa vạn sự hưng.
  - *Phục Vị:* Chủ về sự bình an, củng cố ý chí và định lực tinh thần.
- **Tứ Hung Khí:**
  - *Họa Hại:* Xung đột nhỏ, khẩu thiệt lặt vặt.
  - *Lục Sát:* Trục trặc trong giao tiếp, xáo trộn tinh thần.
  - *Ngũ Quỷ:* Hao tài, tranh chấp bất ngờ.
  - *Tuyệt Mệnh:* Nghịch cảnh sức khỏe, suy giảm vận khí (hóa giải bằng hướng bếp sinh cát khí).

Quý bạn hãy gửi năm sinh và giới tính (ví dụ: "Xem cung mệnh nam 1990 nữ 1993") để nhận bài luận giải chuyên sâu.`;
  }

  let targetCouple = coupleContext;
  if (extractedYears.length >= 2) {
    targetCouple = analyzeCoupleMultiLayer(extractedYears[0], 1, extractedYears[1], 1);
  }

  if (targetCouple) {
    const { chong, vo, tang1ThienCan, tang2DiaChi, tang4NapAm, tang5CungMenh, cauTrucTongHop } = targetCouple;

    return `### 🌸 BÀI LUẬN GIẢI NHÂN DUYÊN VỢ CHỒNG

#### BƯỚC 1: THÔNG TIN BẢN MỆNH
THÔNG TIN NAM:
Năm sinh: ${chong.lunarYear} (${chong.fullName})
Thiên Can: ${tang1ThienCan.canChong} (${chong.canNguHanh})
Địa Chi: ${chong.chi} (${chong.chiNguHanh})
Nạp Âm: ${tang4NapAm.napAmChong} (${tang4NapAm.nguHanhChong})
Cung Mệnh: ${chong.cungPhi} (${chong.dongTayMenh})

THÔNG TIN NỮ:
Năm sinh: ${vo.lunarYear} (${vo.fullName})
Thiên Can: ${tang1ThienCan.canVo} (${vo.canNguHanh})
Địa Chi: ${vo.chi} (${vo.chiNguHanh})
Nạp Âm: ${tang4NapAm.napAmVo} (${tang4NapAm.nguHanhVo})
Cung Mệnh: ${vo.cungPhi} (${vo.dongTayMenh})

---

#### BƯỚC 2: THẦN KHÍ BẢN CHẤT NẠP ÂM & CUNG MỆNH
- **Khí chất bản thể của Người Chồng:** Nạp âm mang hình tượng ${tang4NapAm.napAmChong}, phản ánh tâm tính ${chong.canNguHanh === 'Kim' ? 'cương trực, quyết đoán, trọng danh dự' : chong.canNguHanh === 'Mộc' ? 'nhân từ, hướng thượng, có lòng vị tha' : chong.canNguHanh === 'Thủy' ? 'trí tuệ, linh hoạt, suy nghĩ sâu sắc' : chong.canNguHanh === 'Hỏa' ? 'nhiệt huyết, bộc trực, chuộng sự công bằng' : 'điềm đạm, vững vàng, rất coi trọng lời hứa'}. Cung mệnh ${chong.cungPhi} định hình phong thái là trụ cột gia đình, luôn mong muốn gây dựng nền móng bền vững cho tương lai.
- **Khí chất bản thể của Người Vợ:** Nạp âm mang hình tượng ${tang4NapAm.napAmVo}, biểu thị tính cách ${vo.canNguHanh === 'Kim' ? 'tinh tế, kiên định, thấu đáo' : vo.canNguHanh === 'Mộc' ? 'ôn hòa, dịu dàng, chu toàn' : vo.canNguHanh === 'Thủy' ? 'nhu thuận, giàu cảm xúc, thấu cảm người khác' : vo.canNguHanh === 'Hỏa' ? 'sôi nổi, chân thành, giàu đức hy sinh' : 'ân cần, kín đáo, sâu sắc'}. Cung mệnh ${vo.cungPhi} thể hiện thiên hướng chăm lo tổ ấm, gìn giữ sự hòa thuận và ngọn lửa yêu thương.
- **Tương tác Ngũ Hành Nạp Âm:** Mối quan hệ giữa ${tang4NapAm.napAmChong} (${tang4NapAm.nguHanhChong}) và ${tang4NapAm.napAmVo} (${tang4NapAm.nguHanhVo}) tạo nên thế ${tang4NapAm.quanHe}. Đây là tầng năng lượng bản thể chi phối cách thức hai người thể hiện cảm xúc, sẻ chia buồn vui và nương tựa vào nhau trong đời sống thường nhật.

---

#### BƯỚC 3: LUẬN GIẢI GIÁ TRỊ THỰC TIỄN & GIẢI PHÁP HÒA HỢP

**1. Đánh giá Cát Hung Đa Tầng:**
- **Thiên Can (Tầng Khí kết nối):** ${tang1ThienCan.canChong} và ${tang1ThienCan.canVo} tạo thành quan hệ ${tang1ThienCan.quanHe}. ${tang1ThienCan.chiTiet}. Khí vận thiên can quyết định cách hai bên chia sẻ quan điểm và đồng thuận trong các quyết sách lớn.
- **Địa Chi (Tầng Động sinh hoạt):** ${chong.chi} cùng ${vo.chi} phối hợp tạo thế ${tang2DiaChi.tamHop ? `Tam Hợp (${tang2DiaChi.tamHopNhom})` : tang2DiaChi.lucHop ? `Lục Hợp (${tang2DiaChi.lucHopCap})` : tang2DiaChi.lucXung ? `Lục Xung (${tang2DiaChi.lucXungCap})` : tang2DiaChi.lucHai ? `Lục Hại (${tang2DiaChi.lucHaiCap})` : 'Bình Hòa'}. ${tang2DiaChi.chiTietDong}
- **Cung Mệnh Hôn Phối (Bát Trạch):** Cung ${tang5CungMenh.cungChong} phối cùng cung ${tang5CungMenh.cungVo} tạo nên Du Niên **${tang5CungMenh.ketQuaBatTrach}** (${tang5CungMenh.nhomBatTrach}). ${tang5CungMenh.yNghia}

**2. Điểm thuận lợi gắn kết & Khác biệt cần dung hòa:**
- *Thuận duyên:* ${cauTrucTongHop.diemThuan.length > 0 ? cauTrucTongHop.diemThuan.join('; ') : 'Hai bạn có nền tảng tự nhiên để cùng vun đắp, không bị chi phối bởi các định kiến cứng nhắc.'}
- *Khác biệt tiềm ẩn:* ${cauTrucTongHop.diemNghich.length > 0 ? cauTrucTongHop.diemNghich.join('; ') : 'Khí vận cơ bản thuận hòa, chỉ cần lưu ý gìn giữ sự lắng nghe chân thành trong giao tiếp.'}

**3. Phương pháp chuyển hóa & Lời khuyên gia đạo:**
- **Đạo lý vợ chồng (Căn bản nhất):** Cổ nhân dạy "Tương kính như tân" — xem nhau như khách quý để luôn giữ sự tôn trọng, không vì sự thân thuộc mà buông lỏng lời ăn tiếng nói. Sự hòa hợp đích thực không nằm ở việc lá số có trùng khớp tuyệt đối hay không, mà ở thái độ cùng nhau đối diện khó khăn.
- **Phong thủy trợ vận:** Bố trí hướng phòng ngủ và hướng bếp quay về các phương vị sinh khí của Bát Trạch (${tang5CungMenh.ketQuaBatTrach === 'Tuyệt Mệnh' || tang5CungMenh.ketQuaBatTrach === 'Ngũ Quỷ' ? 'dùng bếp hướng Thiên Y hoặc Sinh Khí để chuyển hóa nghịch khí' : 'ưu tiên hướng Sinh Khí hoặc Diên Niên'}). Lựa chọn gam màu không gian sống hài hòa ngũ hành để nuôi dưỡng vượng khí cho gia đình.`;
  }

  // General questions response
  return `### 🌸 NGUYÊN TẮC LUẬN GIẢI MỆNH LÝ & NHÂN DUYÊN

Mỗi người sinh ra trong trời đất đều mang theo một bản đồ khí vận riêng biệt gồm Thiên Can, Địa Chi, Nạp Âm Hoa Giáp và Cung Mệnh Bát Trạch. Để nhận được bài luận giải chuẩn mực, quý bạn vui lòng cung cấp:

- **Thông tin cơ bản:** Giới tính và Năm sinh (âm lịch hoặc dương lịch) của hai bạn.
- **Thông tin bổ trợ (nếu có):** Tháng sinh, Ngày sinh, Giờ sinh để tiến hành phân tích Tứ Trụ chuyên sâu (Nhật chủ, Dụng thần, Cung Phu Thê).

---

#### ❖ QUY CHUẨN LUẬN GIẢI 3 BƯỚC:
1. **Bước 1 — Thông Tin Bản Mệnh:** Trình bày chuẩn hóa khung thông tin Can Chi, Nạp Âm và Cung Mệnh.
2. **Bước 2 — Thần Khí Bản Chất Nạp Âm & Cung Mệnh:** Phác họa tâm tính, khí chất và điểm tương tác ngũ hành bản thể.
3. **Bước 3 — Luận Giải Thực Tiễn & Giải Pháp:** Đánh giá sự hòa hợp, cơ duyên gặp gỡ, thách thức cần vượt qua cùng định hướng phong thủy và tu dưỡng đạo nghĩa vợ chồng.

> *"Một người không phải chỉ là một cái tuổi. Xung không đồng nghĩa với ly hôn, Hợp không đồng nghĩa với tốt tuyệt đối. Hạnh phúc chân chính bắt nguồn từ sự thấu hiểu, bao dung và đồng lòng vun đắp."*

Quý bạn hãy gửi năm sinh của hai bạn (ví dụ: "Chồng 1989 Vợ 1993") để bắt đầu luận giải!`;
}

