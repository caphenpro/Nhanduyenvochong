import { getCanChiByYear, checkNguHanhRelation, getTruongSanhChu, TRUONG_SANH_DATA, CO_THAN_QUA_TU, NGU_HANH_NAP_AM_60, THIEN_CAN, DIA_CHI } from './tamtheData';
import { getCaoLyGiaiDoan, CAO_LY_DATA } from './caolyData';
import { CanName, ChiName, CoupleAnalysisResult } from '../types';

// Extract years or Can Chi from prompt
export function extractYearsFromText(text: string): number[] {
  const matches = text.match(/\b(19[4-9]\d|20[0-3]\d)\b/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map(Number)));
}

// Find Can Chi combinations mentioned in text
export function extractCanChiFromText(text: string): { can?: CanName; chi?: ChiName }[] {
  const results: { can?: CanName; chi?: ChiName }[] = [];
  const lower = text.toLowerCase();

  for (const can of THIEN_CAN) {
    for (const chi of DIA_CHI) {
      const phrase = `${can} ${chi}`.toLowerCase();
      if (lower.includes(phrase)) {
        results.push({ can, chi });
      }
    }
  }
  return results;
}

export function generateAncientWisdomResponse(
  userQuery: string,
  coupleContext?: CoupleAnalysisResult | null
): string {
  const queryLower = userQuery.toLowerCase();

  // 1. If coupleContext is provided or prompt asks about the active couple
  if (coupleContext && (queryLower.includes('quẻ') || queryLower.includes('vợ chồng') || queryLower.includes('luận') || queryLower.includes('hôn nhân') || queryLower.includes('hóa giải') || queryLower.includes('hợp') || queryLower.includes('khắc') || queryLower.includes('này'))) {
    const { chong, vo, caoly, tuongSinhMenh, tamtheTruongSanh, coThanQuaTu, tongKetDuyenNo } = coupleContext;
    return `### 📜 Luận Đoán Căn Duyên Tiền Định

**Chồng:** ${chong.fullName} (${chong.lunarYear}) — Mạng: **${chong.menh}**  
**Vợ:** ${vo.fullName} (${vo.lunarYear}) — Mạng: **${vo.menh}**

---

#### 1. Phép Cao Ly Đầu Hình (Can Chồng phối Chi Vợ)
* **Tên Đồ Hình:** **${caoly.tenDoHinh}** (${caoly.danhGia})
* **Thơ cổ Hán Nôm:**
> *"${caoly.thoHanNom}"*
* **Lời chú giải cổ thư:** ${caoly.chuThich}
* **Khuyên dạy:** ${caoly.khuyenNghi}

---

#### 2. Mạng Ngũ Hành & 12 Cung Trường Sanh (Diễn Cầm Tam Thế)
* **Tương quan Mạng:** Chồng ${chong.menh} gặp Vợ ${vo.menh} $\\rightarrow$ **${tuongSinhMenh.quanHe}** (${tuongSinhMenh.hop ? 'Hòa hợp, tương sinh trợ duyên' : 'Có nét khắc chế, cần lấy đức dưỡng tài'}).
* ${tuongSinhMenh.chiTiet}
* **Cung Trường Sanh:**
  - Chồng ứng chữ **${tamtheTruongSanh?.chuChong || 'Trường Sanh'}** (${tamtheTruongSanh?.giaiDoanChong?.danhGia || 'Cát'}).
  - Vợ ứng chữ **${tamtheTruongSanh?.chuVo || 'Trường Sanh'}** (${tamtheTruongSanh?.giaiDoanVo?.danhGia || 'Cát'}).
* **Xét hạn Cô Thần - Quả Tú:** ${coThanQuaTu?.chiTiet || 'Không phạm tháng Cô Thần, Quả Tú.'}

---

#### 3. Điểm Hòa Hợp & Xếp Loại Duyên Nợ
* **Điểm hòa hợp:** **${tongKetDuyenNo.diemSo}/100** — Xếp vào hàng: **${tongKetDuyenNo.xepLoai}**

---

#### 4. Lời Khuyên Vàng & Triết Lý "Đức Năng Thắng Số"
${tongKetDuyenNo.loiKhuyenHoaGiai}

*Cổ nhân có câu: "Chồng giận thì vợ bớt lời, cơm sôi bớt lửa chẳng đời nào khê". Vợ chồng cùng nhau tu tâm tích đức, giữ lòng chung thủy, hiếu kính phụ mẫu hai bên và năng làm việc thiện thì dẫu gặp quẻ nghịch cũng chuyển thành điềm lành, gia đạo êm ấm trăm năm.*`;
  }

  // 2. Check if user provided two years in the prompt (e.g. 1996 and 1997)
  const years = extractYearsFromText(userQuery);
  const canChis = extractCanChiFromText(userQuery);

  if (years.length >= 2 || canChis.length >= 2) {
    let cYear = years[0] || 1996;
    let vYear = years[1] || 1997;

    const chongInfo = getCanChiByYear(cYear);
    const voInfo = getCanChiByYear(vYear);
    const caoly = getCaoLyGiaiDoan(chongInfo.can, voInfo.chi);
    const tuongSinh = checkNguHanhRelation(chongInfo.nguHanh, voInfo.nguHanh);

    return `### 📜 Luận Đoán Căn Duyên Tiền Định

Theo cổ thư **Diễn Cầm Tam Thế (1952)** và **Cao Ly Đầu Hình (Đoàn Văn Đâu)**, nhân duyên của hai tuổi được luận giải như sau:

* **Chồng:** Tuổi **${chongInfo.fullName}** (${cYear}) — Mạng **${chongInfo.menh}**
* **Vợ:** Tuổi **${voInfo.fullName}** (${vYear}) — Mạng **${voInfo.menh}**

---

#### 1. Phép Cao Ly Đầu Hình: Can Chồng (${chongInfo.can}) phối Chi Vợ (${voInfo.chi})
* **Tên Đồ Hình:** **${caoly.tenDoHinh}** — Đánh giá: **${caoly.danhGia}**
* **Thơ cổ Hán Nôm:**
> *"${caoly.thoHanNom}"*
* **Lời chú giải cổ thư:** ${caoly.chuThich}
* **Khuyên dạy:** ${caoly.khuyenNghi}

---

#### 2. Mạng Ngũ Hành & Sự Tương Hợp
* **Quan hệ Mạng:** Chồng ${chongInfo.menh} gặp Vợ ${voInfo.menh} $\\rightarrow$ **${tuongSinh.quanHe}**.
* ${tuongSinh.chiTiet}

---

#### 3. Phương Pháp Hóa Giải & Bồi Đắp Gia Đạo
* **Đức Năng Thắng Số:** Người xưa xem số là để biết trước điểm xung khắc (khẩu thiệt, bướng bỉnh, khó giữ tiền tài...) để cùng nhau sửa mình.
* **Gợi ý hòa hợp:** ${tuongSinh.hop ? 'Đôi bên hòa hợp, cần giữ gìn sự khiêm nhường, tránh kiêu ngạo.' : 'Nên nhường nhịn lời ăn tiếng nói, có thể lập nghiệp xa quê hương để giảm trừ thị phi, tích cực làm việc thiện để tăng phúc báu.'}`;
  }

  // 3. Questions about "Cao Ly Đầu Hình"
  if (queryLower.includes('cao ly') || queryLower.includes('đồ hình') || queryLower.includes('can chồng')) {
    return `### 📖 Về Phép "Cao Ly Đầu Hình" Trong Hôn Nhân

Phép **Cao Ly Đầu Hình** là phương pháp chiêm nghiệm hôn nhân trứ danh được ghi chép trong cổ thư của soạn giả **Đoàn Văn Đâu** (bản dịch NXB Hồng Dân Sài Gòn).

#### 1. Nguyên Lý Tính:
* Lấy **Thiên Can của người Chồng** (1 trong 10 Can: *Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý*) phối với **Địa Chi của người Vợ** (1 trong 12 Chi: *Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi*).
* Tổng cộng tạo thành **100 Đồ Hình** (như *Giáp thủ Tý chi đồ, Bính thủ Ngọ chi đồ, Canh thủ Dần chi đồ...*).

#### 2. Giá Trị Cổ Bản:
* Mỗi đồ hình có một bức họa, một bài thơ tứ tuyệt Hán Nôm và lời giải đoán về đường duyên nợ, công danh, con cái và hậu vận.
* Cổ nhân phân chia rõ các mức: **Đại Cát, Cát, Bình Hòa, Hung, Đại Hung**.

Quý bạn có thể nhập năm sinh cụ thể của hai vợ chồng tại mục **"Lập Quẻ Duyên Nợ"** để xem ngay đồ hình tương ứng!`;
  }

  // 4. Questions about "Trường Sanh" or "Diễn Cầm Tam Thế"
  if (queryLower.includes('trường sanh') || queryLower.includes('cung') || queryLower.includes('diễn cầm')) {
    return `### 📜 12 Cung Trường Sanh Trong Sách "Diễn Cầm Tam Thế" (1952)

Theo soạn giả **Dương Công Hầu (hiệu Khương Đức)**, phép xem **Căn Duyên Tiền Định** lấy **Mạng Ngũ Hành** của bản thân kết hợp với **Tháng Sinh Âm Lịch** để an vào 1 trong 12 chữ:

1. **Trường Sanh:** Đặng sanh đặng dưỡng, căn mạng vững bền, con đàn cháu đống.
2. **Mộc Dục:** Tắm gội phong trần, tuổi trẻ lận đận trắc trở, trung niên mới đặng thành gia.
3. **Quan Đái:** Áo mão vinh quy, có danh chức tài lộc, gia đạo hưng thịnh.
4. **Lâm Quan:** Đứng đắn vững vàng, tài lộc tự tay tạo lập, số vinh hoa.
5. **Đế Vượng:** Cực thịnh quyền uy, thời vận hanh thông rạng rỡ.
6. **Suy:** Khí lực giảm sút, nên thủ phận giữ mình, chớ nên tranh đoạt.
7. **Bệnh:** Dễ đau ốm quạnh hiu, cần năng phóng sanh tu tâm bồi bổ sức khỏe.
8. **Tử:** Số gian truân buổi đầu, lấy đức dưỡng thân mới đặng bình yên.
9. **Mộ:** Của cải chôn giấu, trung niên tích lũy điền sản dồi dào.
10. **Tuyệt:** Dứt đoạn tiền duyên, nên tha hương lập nghiệp hoặc làm con nuôi cửa Phật.
11. **Thai:** Mầm sống phôi thai, vợ chồng tương kính, tương lai xán lạn.
12. **Dưỡng:** Nuôi dưỡng bồi đắp, hậu vận an nhàn hưởng phúc lộc con cháu.`;
  }

  // 5. Questions about "Cô Thần", "Quả Tú"
  if (queryLower.includes('cô thần') || queryLower.includes('quả tú')) {
    return `### ⏳ Hạn Cô Thần - Quả Tú Trong Cổ Thư

Trong thuật số chiêm duyên:
* **Nam kỵ Cô Thần:** Chủ về sự cô độc, trễ tràng duyên nợ, bôn ba xứ người mới đặng lập gia đình.
* **Nữ kỵ Quả Tú:** Chủ về cảnh phòng loan quạnh quẽ, tính tình khép kín, dễ chịu thiệt thòi đường tình cảm.

#### 💡 Cách Hóa Giải Theo Lời Tiền Nhân:
1. **Lập gia đình muộn:** Kết hôn trễ hơn độ tuổi thông thường để giảm bớt xung khắc.
2. **Tu tâm nhẫn nhịn:** Không đem chuyện hơn thua vào đời sống lứa đôi.
3. **Làm lành tích đức:** Phóng sanh, giúp đỡ người cô quả neo đơn để tạo phước lành chuyển hóa nghiệp duyên.`;
  }

  // 6. Questions about "Đức Năng Thắng Số"
  if (queryLower.includes('đức năng') || queryLower.includes('thắng số') || queryLower.includes('hóa giải')) {
    return `### 🌟 Triết Lý "Đức Năng Thắng Số" Trong Hôn Nhân

Chương 34 sách **Diễn Cầm Tam Thế Diễn Nghĩa (1952)** nhấn mạnh:

> *"Sách có câu nói rằng: Phước Đức Năng Thắng Số. Dẫu số có xấu mà tâm lành phước trổ thì họa hóa vi tường; dẫu số tốt mà lòng dạ bất minh thì phước cũng tiêu tan."*

#### 4 Điểm Tựa Vàng Cho Hạnh Phúc Lứa Đôi:
1. **Tương kính như tân:** Tôn trọng bạn đời như khách quý, lắng nghe và thấu cảm.
2. **Khẩu từ hòa nhã:** *"Chồng giận thì vợ bớt lời, cơm sôi bớt lửa chẳng đời nào khê"*.
3. **Hiếu kính song thân:** Thờ cha kính mẹ hai bên vẹn tròn là cội nguồn của mọi phước đức gia đạo.
4. **Hành thiện tích đức:** Chia sẻ của cải với người cơ nhỡ, sống chân thật vị tha thì tai ương tự khắc tiêu trừ.`;
  }

  // Default warm guidance
  return `### 📜 Lời Đàm Đạo Cùng Cụ Căn Duyên

Kính chào quý bạn! Ta là **Cụ Căn Duyên**, luôn sẵn lòng trợ duyên quý bạn tra cứu hôn nhân theo cổ bản:
* 📖 **Cao Ly Đầu Hình**: Phối hợp 10 Can chồng và 12 Chi vợ ra 100 Đồ Hình.
* 📜 **Diễn Cầm Tam Thế**: Xem mạng ngũ hành nạp âm, 12 cung Trường Sanh, Cô Thần - Quả Tú, và hào con cái.

Quý bạn có thể:
1. Cho ta biết **Năm sinh của Chồng và Vợ** (ví dụ: *Chồng 1995, Vợ 1998* hoặc *Chồng Bính Tý, Vợ Đinh Sửu*).
2. Hoặc sang thẻ **"Lập Quẻ Duyên Nợ"** để xem đồ hình và bảng điểm tương quan chi tiết nhất!`;
}
