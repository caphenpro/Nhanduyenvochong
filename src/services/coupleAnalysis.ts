import { getCanChiByYear, checkNguHanhRelation, getTruongSanhChu, TRUONG_SANH_DATA, CO_THAN_QUA_TU } from '../data/tamtheData';
import { getCaoLyGiaiDoan } from '../data/caolyData';
import { CoupleAnalysisResult } from '../types';

export function analyzeCoupleLocal(
  chongNamSinh: number,
  chongThangSanh: number = 1,
  voNamSinh: number,
  voThangSanh: number = 1
): CoupleAnalysisResult {
  const chongInfo = getCanChiByYear(Number(chongNamSinh));
  const voInfo = getCanChiByYear(Number(voNamSinh));

  const tuongSinh = checkNguHanhRelation(chongInfo.nguHanh, voInfo.nguHanh);
  const caoly = getCaoLyGiaiDoan(chongInfo.can, voInfo.chi);

  // Truong sanh
  const chuChong = getTruongSanhChu(chongInfo.nguHanh, Number(chongThangSanh));
  const chuVo = getTruongSanhChu(voInfo.nguHanh, Number(voThangSanh));
  const giaiDoanChong = TRUONG_SANH_DATA[chuChong];
  const giaiDoanVo = TRUONG_SANH_DATA[chuVo];

  // Co Than - Qua Tu
  const coThanCheck = CO_THAN_QUA_TU[chongInfo.chi];
  const quaTuCheck = CO_THAN_QUA_TU[voInfo.chi];
  const chongPhamCoThan = coThanCheck ? coThanCheck.traiPham.includes(Number(chongThangSanh)) : false;
  const voPhamQuaTu = quaTuCheck ? quaTuCheck.gaiPham.includes(Number(voThangSanh)) : false;

  let coThanQuaTuChiTiet = 'Không phạm tháng Cô Thần hay Quả Tú.';
  if (chongPhamCoThan && voPhamQuaTu) {
    coThanQuaTuChiTiet = `Chồng sinh tháng ${chongThangSanh} phạm Cô Thần; Vợ sinh tháng ${voThangSanh} phạm Quả Tú. Vợ chồng dễ lận đận buổi đầu, cần nhẫn nại hóa giải.`;
  } else if (chongPhamCoThan) {
    coThanQuaTuChiTiet = `Chồng sinh tháng ${chongThangSanh} phạm Cô Thần. Đàn ông số dễ chịu cảnh bôn ba chậm duyên, về sau mới đặng yên ấm.`;
  } else if (voPhamQuaTu) {
    coThanQuaTuChiTiet = `Vợ sinh tháng ${voThangSanh} phạm Quả Tú. Người vợ số phòng loan quạnh quẽ, nên tu tâm dưỡng tính để gia đạo ấm êm.`;
  }

  // Calculate overall score (0 - 100)
  let score = 70;
  if (tuongSinh.hop) score += 15;
  else score -= 15;

  if (caoly.danhGia === 'Đại Cát') score += 15;
  else if (caoly.danhGia === 'Cát') score += 10;
  else if (caoly.danhGia === 'Hung') score -= 15;
  else if (caoly.danhGia === 'Đại Hung') score -= 25;

  if (chongPhamCoThan || voPhamQuaTu) score -= 8;
  score = Math.max(20, Math.min(98, score));

  let xepLoai: any = 'Cát Duyên';
  if (score >= 85) xepLoai = 'Thượng Cát';
  else if (score >= 70) xepLoai = 'Cát Duyên';
  else if (score >= 55) xepLoai = 'Bình Duyên';
  else if (score >= 40) xepLoai = 'Tiền Khổ Hậu Cam';
  else xepLoai = 'Nhiều Thử Thách';

  let loiKhuyenHoaGiai = 'Vợ chồng lấy đạo nghĩa làm trọng, "Đức Năng Thắng Số", tương kính như tân, cùng nhau tích thiện bồi đức để hưởng phúc bền lâu.';
  if (score < 60) {
    loiKhuyenHoaGiai = 'Cặp đôi có một số nét xung khắc tiền duyên. Cổ nhân khuyên nên: Đi làm ăn xa quê hương (tha hương lập nghiệp), học cách dằn bớt nóng giận khẩu thiệt, làm nhiều việc thiện phóng sanh, chia sẻ tài lộc để chuyển họa thành phúc.';
  }

  return {
    chong: chongInfo,
    vo: voInfo,
    tuongSinhMenh: tuongSinh,
    caoly,
    tamtheTruongSanh: {
      chuChong,
      chuVo,
      giaiDoanChong,
      giaiDoanVo,
    },
    coThanQuaTu: {
      chongPham: chongPhamCoThan,
      voPham: voPhamQuaTu,
      chiTiet: coThanQuaTuChiTiet,
    },
    tongKetDuyenNo: {
      diemSo: score,
      xepLoai,
      loiKhuyenHoaGiai,
    },
  };
}
