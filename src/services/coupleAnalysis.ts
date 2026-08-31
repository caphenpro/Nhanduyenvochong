import {
  CanName,
  ChiName,
  MenhNguHanh,
  CungPhi,
  BatTrachBatCung,
  CanChiInfo,
  Tang1ThienCan,
  Tang2DiaChi,
  Tang3NguHanh,
  Tang4NapAm,
  Tang5CungMenh,
  CoupleAnalysisResult,
} from '../types';
import { getCaoLyGiaiDoan } from '../data/caolyData';

// Trích xuất năm sinh từ văn bản
export function extractYearsFromText(text: string): number[] {
  const matches = text.match(/\b(19[4-9]\d|20[0-3]\d)\b/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map(Number)));
}

// Danh sách Thiên Can và Ngũ Hành
export const CAN_NGU_HANH: Record<CanName, { nguHanh: MenhNguHanh; amDuong: 'Dương' | 'Âm' }> = {
  Giáp: { nguHanh: 'Mộc', amDuong: 'Dương' },
  Ất: { nguHanh: 'Mộc', amDuong: 'Âm' },
  Bính: { nguHanh: 'Hỏa', amDuong: 'Dương' },
  Đinh: { nguHanh: 'Hỏa', amDuong: 'Âm' },
  Mậu: { nguHanh: 'Thổ', amDuong: 'Dương' },
  Kỷ: { nguHanh: 'Thổ', amDuong: 'Âm' },
  Canh: { nguHanh: 'Kim', amDuong: 'Dương' },
  Tân: { nguHanh: 'Kim', amDuong: 'Âm' },
  Nhâm: { nguHanh: 'Thủy', amDuong: 'Dương' },
  Quý: { nguHanh: 'Thủy', amDuong: 'Âm' },
};

// Danh sách Địa Chi và Ngũ Hành
export const CHI_NGU_HANH: Record<ChiName, { nguHanh: MenhNguHanh; tuoi: string }> = {
  Tý: { nguHanh: 'Thủy', tuoi: 'Chuột' },
  Sửu: { nguHanh: 'Thổ', tuoi: 'Trâu' },
  Dần: { nguHanh: 'Mộc', tuoi: 'Cọp' },
  Mão: { nguHanh: 'Mộc', tuoi: 'Mèo' },
  Mẹo: { nguHanh: 'Mộc', tuoi: 'Mèo' },
  Thìn: { nguHanh: 'Thổ', tuoi: 'Rồng' },
  Tỵ: { nguHanh: 'Hỏa', tuoi: 'Rắn' },
  Ngọ: { nguHanh: 'Hỏa', tuoi: 'Ngựa' },
  Mùi: { nguHanh: 'Thổ', tuoi: 'Dê' },
  Thân: { nguHanh: 'Kim', tuoi: 'Khỉ' },
  Dậu: { nguHanh: 'Kim', tuoi: 'Gà' },
  Tuất: { nguHanh: 'Thổ', tuoi: 'Chó' },
  Hợi: { nguHanh: 'Thủy', tuoi: 'Heo' },
};

// Lục Thập Hoa Giáp - 60 Năm Nạp Âm
export const LUC_THAP_HOA_GIAP_NAP_AM: Record<string, { napAm: string; nguHanh: MenhNguHanh }> = {
  'Giáp Tý': { napAm: 'Hải Trung Kim', nguHanh: 'Kim' },
  'Ất Sửu': { napAm: 'Hải Trung Kim', nguHanh: 'Kim' },
  'Bính Dần': { napAm: 'Lô Trung Hỏa', nguHanh: 'Hỏa' },
  'Đinh Mão': { napAm: 'Lô Trung Hỏa', nguHanh: 'Hỏa' },
  'Đinh Mẹo': { napAm: 'Lô Trung Hỏa', nguHanh: 'Hỏa' },
  'Mậu Thìn': { napAm: 'Đại Lâm Mộc', nguHanh: 'Mộc' },
  'Kỷ Tỵ': { napAm: 'Đại Lâm Mộc', nguHanh: 'Mộc' },
  'Canh Ngọ': { napAm: 'Lộ Bàng Thổ', nguHanh: 'Thổ' },
  'Tân Mùi': { napAm: 'Lộ Bàng Thổ', nguHanh: 'Thổ' },
  'Nhâm Thân': { napAm: 'Kiếm Phong Kim', nguHanh: 'Kim' },
  'Quý Dậu': { napAm: 'Kiếm Phong Kim', nguHanh: 'Kim' },
  'Giáp Tuất': { napAm: 'Sơn Đầu Hỏa', nguHanh: 'Hỏa' },
  'Ất Hợi': { napAm: 'Sơn Đầu Hỏa', nguHanh: 'Hỏa' },
  'Bính Tý': { napAm: 'Giản Hạ Thủy', nguHanh: 'Thủy' },
  'Đinh Sửu': { napAm: 'Giản Hạ Thủy', nguHanh: 'Thủy' },
  'Mậu Dần': { napAm: 'Thành Đầu Thổ', nguHanh: 'Thổ' },
  'Kỷ Mão': { napAm: 'Thành Đầu Thổ', nguHanh: 'Thổ' },
  'Kỷ Mẹo': { napAm: 'Thành Đầu Thổ', nguHanh: 'Thổ' },
  'Canh Thìn': { napAm: 'Bạch Lạp Kim', nguHanh: 'Kim' },
  'Tân Tỵ': { napAm: 'Bạch Lạp Kim', nguHanh: 'Kim' },
  'Nhâm Ngọ': { napAm: 'Dương Liễu Mộc', nguHanh: 'Mộc' },
  'Quý Mùi': { napAm: 'Dương Liễu Mộc', nguHanh: 'Mộc' },
  'Giáp Thân': { napAm: 'Tuyền Trung Thủy', nguHanh: 'Thủy' },
  'Ất Dậu': { napAm: 'Tuyền Trung Thủy', nguHanh: 'Thủy' },
  'Bính Tuất': { napAm: 'Ốc Thượng Thổ', nguHanh: 'Thổ' },
  'Đinh Hợi': { napAm: 'Ốc Thượng Thổ', nguHanh: 'Thổ' },
  'Mậu Tý': { napAm: 'Tích Lịch Hỏa', nguHanh: 'Hỏa' },
  'Kỷ Sửu': { napAm: 'Tích Lịch Hỏa', nguHanh: 'Hỏa' },
  'Canh Dần': { napAm: 'Tùng Bách Mộc', nguHanh: 'Mộc' },
  'Tân Mão': { napAm: 'Tùng Bách Mộc', nguHanh: 'Mộc' },
  'Tân Mẹo': { napAm: 'Tùng Bách Mộc', nguHanh: 'Mộc' },
  'Nhâm Thìn': { napAm: 'Trường Lưu Thủy', nguHanh: 'Thủy' },
  'Quý Tỵ': { napAm: 'Trường Lưu Thủy', nguHanh: 'Thủy' },
  'Giáp Ngọ': { napAm: 'Sa Trung Kim', nguHanh: 'Kim' },
  'Ất Mùi': { napAm: 'Sa Trung Kim', nguHanh: 'Kim' },
  'Bính Thân': { napAm: 'Sơn Hạ Hỏa', nguHanh: 'Hỏa' },
  'Đinh Dậu': { napAm: 'Sơn Hạ Hỏa', nguHanh: 'Hỏa' },
  'Mậu Tuất': { napAm: 'Bình Địa Mộc', nguHanh: 'Mộc' },
  'Kỷ Hợi': { napAm: 'Bình Địa Mộc', nguHanh: 'Mộc' },
  'Canh Tý': { napAm: 'Bích Thượng Thổ', nguHanh: 'Thổ' },
  'Tân Sửu': { napAm: 'Bích Thượng Thổ', nguHanh: 'Thổ' },
  'Nhâm Dần': { napAm: 'Kim Bạch Kim', nguHanh: 'Kim' },
  'Quý Mão': { napAm: 'Kim Bạch Kim', nguHanh: 'Kim' },
  'Quý Mẹo': { napAm: 'Kim Bạch Kim', nguHanh: 'Kim' },
  'Giáp Thìn': { napAm: 'Phúc Đăng Hỏa', nguHanh: 'Hỏa' },
  'Ất Tỵ': { napAm: 'Phúc Đăng Hỏa', nguHanh: 'Hỏa' },
  'Bính Ngọ': { napAm: 'Thiên Hà Thủy', nguHanh: 'Thủy' },
  'Đinh Mùi': { napAm: 'Thiên Hà Thủy', nguHanh: 'Thủy' },
  'Mậu Thân': { napAm: 'Đại Trạch Thổ', nguHanh: 'Thổ' },
  'Kỷ Dậu': { napAm: 'Đại Trạch Thổ', nguHanh: 'Thổ' },
  'Canh Tuất': { napAm: 'Thoa Xuyến Kim', nguHanh: 'Kim' },
  'Tân Hợi': { napAm: 'Thoa Xuyến Kim', nguHanh: 'Kim' },
  'Nhâm Tý': { napAm: 'Tang Đố Mộc', nguHanh: 'Mộc' },
  'Quý Sửu': { napAm: 'Tang Đố Mộc', nguHanh: 'Mộc' },
  'Bính Dần (Mới)': { napAm: 'Lô Trung Hỏa', nguHanh: 'Hỏa' },
};

// Tính Can Chi và Cung Phi từ năm sinh
export function getCanChiFullInfo(year: number, gender: 'Nam' | 'Nữ'): CanChiInfo {
  const canList: CanName[] = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
  const chiList: ChiName[] = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];

  const can = canList[year % 10];
  const chi = chiList[year % 12];
  const fullName = `${can} ${chi}`;

  const canData = CAN_NGU_HANH[can];
  const chiData = CHI_NGU_HANH[chi];

  const napAmEntry = LUC_THAP_HOA_GIAP_NAP_AM[fullName] || { napAm: 'Bản Mệnh', nguHanh: 'Thổ' as MenhNguHanh };

  // Tính Cung Phi Bát Trạch theo năm sinh
  // Rút gọn năm sinh thành 1 chữ số
  let sum = String(year)
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  while (sum > 9) {
    sum = String(sum)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  let cungPhi: CungPhi = 'Khôn';
  if (gender === 'Nam') {
    // Nam sinh thế kỷ 20-21
    const val = year < 2000 ? (11 - sum) % 9 || 9 : (10 - sum) % 9 || 9;
    const namCungMap: Record<number, CungPhi> = {
      1: 'Khảm',
      2: 'Ly',
      3: 'Cấn',
      4: 'Đoài',
      5: 'Càn',
      6: 'Khôn',
      7: 'Tốn',
      8: 'Chấn',
      9: 'Khôn',
    };
    cungPhi = namCungMap[val] || 'Khảm';
  } else {
    const val = year < 2000 ? (4 + sum) % 9 || 9 : (5 + sum) % 9 || 9;
    const nuCungMap: Record<number, CungPhi> = {
      1: 'Cấn',
      2: 'Càn',
      3: 'Đoài',
      4: 'Cấn',
      5: 'Ly',
      6: 'Khảm',
      7: 'Khôn',
      8: 'Chấn',
      9: 'Tốn',
    };
    cungPhi = nuCungMap[val] || 'Ly';
  }

  const dongTu: CungPhi[] = ['Khảm', 'Ly', 'Chấn', 'Tốn'];
  const dongTayMenh = dongTu.includes(cungPhi) ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh';

  return {
    can,
    chi,
    fullName,
    lunarYear: year,
    menh: napAmEntry.napAm,
    nguHanh: napAmEntry.nguHanh,
    canNguHanh: canData.nguHanh,
    chiNguHanh: chiData.nguHanh,
    cungPhi,
    dongTayMenh,
    tuoiCon: chiData.tuoi,
  };
}

// Tầng 1: Phân tích Thiên Can
export function analyzeTang1ThienCan(chongCan: CanName, voCan: CanName): Tang1ThienCan {
  const chongHanh = CAN_NGU_HANH[chongCan].nguHanh;
  const voHanh = CAN_NGU_HANH[voCan].nguHanh;

  // Cặp tương hợp Can
  const CAN_HOP: Record<string, string> = {
    'Giáp': 'Kỷ',
    'Kỷ': 'Giáp',
    'Ất': 'Canh',
    'Canh': 'Ất',
    'Bính': 'Tân',
    'Tân': 'Bính',
    'Đinh': 'Nhâm',
    'Nhâm': 'Đinh',
    'Mậu': 'Quý',
    'Quý': 'Mậu',
  };

  if (CAN_HOP[chongCan] === voCan) {
    return {
      canChong: chongCan,
      canVo: voCan,
      quanHe: 'Tương Hợp',
      chiTiet: `Thiên Can ${chongCan} và ${voCan} thuộc cặp Thiên Can Tương Hợp.`,
      yNghiaKhi:
        'Ở tầng Khí, hai Thiên Can tương hợp biểu hiện tính liên kết tự nhiên, dễ tạo dựng sự đồng thuận, thấu hiểu trong xu hướng hành động và chí hướng đối ngoại.',
    };
  }

  // Tương sinh
  const SINH_MAP: Record<MenhNguHanh, MenhNguHanh> = {
    Mộc: 'Hỏa',
    Hỏa: 'Thổ',
    Thổ: 'Kim',
    Kim: 'Thủy',
    Thủy: 'Mộc',
  };

  if (SINH_MAP[chongHanh] === voHanh) {
    return {
      canChong: chongCan,
      canVo: voCan,
      quanHe: 'Tương Sinh',
      chiTiet: `Can Chồng (${chongCan} - ${chongHanh}) tương sinh Can Vợ (${voCan} - ${voHanh}).`,
      yNghiaKhi:
        'Ở tầng Khí, người chồng có xu hướng chủ động hỗ trợ, nâng đỡ, nhường nhịn và tạo điều kiện phát triển cho người vợ.',
    };
  }
  if (SINH_MAP[voHanh] === chongHanh) {
    return {
      canChong: chongCan,
      canVo: voCan,
      quanHe: 'Tương Sinh',
      chiTiet: `Can Vợ (${voCan} - ${voHanh}) tương sinh Can Chồng (${chongCan} - ${chongHanh}).`,
      yNghiaKhi:
        'Ở tầng Khí, người vợ có xu hướng là hậu phương chu đáo, trợ lực và tiếp thêm động lực, vượng phu cho người chồng.',
    };
  }

  // Tương khắc
  const KHAC_MAP: Record<MenhNguHanh, MenhNguHanh> = {
    Mộc: 'Thổ',
    Thổ: 'Thủy',
    Thủy: 'Hỏa',
    Hỏa: 'Kim',
    Kim: 'Mộc',
  };

  if (KHAC_MAP[chongHanh] === voHanh || KHAC_MAP[voHanh] === chongHanh) {
    return {
      canChong: chongCan,
      canVo: voCan,
      quanHe: 'Tương Khắc',
      chiTiet: `Can ${chongCan} (${chongHanh}) và Can ${voCan} (${voHanh}) có quan hệ tương khắc ngũ hành.`,
      yNghiaKhi:
        'Ở tầng Khí, hai bên có thể có sự khác biệt về phong cách biểu hiện, tạo ra áp lực thử thách hoặc cạnh tranh; cần học cách lắng nghe để biến khác biệt thành động lực bổ khuyết.',
    };
  }

  return {
    canChong: chongCan,
    canVo: voCan,
    quanHe: 'Đồng Hành / Bình Hòa',
    chiTiet: `Can ${chongCan} và Can ${voCan} cùng mang ngũ hành ${chongHanh}.`,
    yNghiaKhi:
      'Ở tầng Khí, hai người bình hòa, có nhiều nét tương đồng trong quan điểm và cách tiếp cận cuộc sống.',
  };
}

// Tầng 2: Phân tích Địa Chi
export function analyzeTang2DiaChi(chongChi: ChiName, voChi: ChiName): Tang2DiaChi {
  // Tam hợp
  const TAM_HOP_GROUPS: Array<{ name: string; chis: ChiName[] }> = [
    { name: 'Thân – Tý – Thìn (Thủy Cục)', chis: ['Thân', 'Tý', 'Thìn'] },
    { name: 'Tỵ – Dậu – Sửu (Kim Cục)', chis: ['Tỵ', 'Dậu', 'Sửu'] },
    { name: 'Dần – Ngọ – Tuất (Hỏa Cục)', chis: ['Dần', 'Ngọ', 'Tuất'] },
    { name: 'Hợi – Mão – Mùi (Mộc Cục)', chis: ['Hợi', 'Mão', 'Mẹo', 'Mùi'] },
  ];

  let tamHop = false;
  let tamHopNhom: string | undefined;
  for (const group of TAM_HOP_GROUPS) {
    if (group.chis.includes(chongChi) && group.chis.includes(voChi) && chongChi !== voChi) {
      tamHop = true;
      tamHopNhom = group.name;
      break;
    }
  }

  // Lục hợp
  const LUC_HOP_PAIRS: Array<[ChiName, ChiName, string]> = [
    ['Tý', 'Sửu', 'Tý – Sửu Hợp Thổ'],
    ['Dần', 'Hợi', 'Dần – Hợi Hợp Mộc'],
    ['Mão', 'Tuất', 'Mão – Tuất Hợp Hỏa'],
    ['Mẹo', 'Tuất', 'Mẹo – Tuất Hợp Hỏa'],
    ['Thìn', 'Dậu', 'Thìn – Dậu Hợp Kim'],
    ['Tỵ', 'Thân', 'Tỵ – Thân Hợp Thủy'],
    ['Ngọ', 'Mùi', 'Ngọ – Mùi Hợp Thổ'],
  ];

  let lucHop = false;
  let lucHopCap: string | undefined;
  for (const [c1, c2, desc] of LUC_HOP_PAIRS) {
    if ((chongChi === c1 && voChi === c2) || (chongChi === c2 && voChi === c1)) {
      lucHop = true;
      lucHopCap = desc;
      break;
    }
  }

  // Lục xung
  const LUC_XUNG_PAIRS: Array<[ChiName, ChiName]> = [
    ['Tý', 'Ngọ'],
    ['Sửu', 'Mùi'],
    ['Dần', 'Thân'],
    ['Mão', 'Dậu'],
    ['Mẹo', 'Dậu'],
    ['Thìn', 'Tuất'],
    ['Tỵ', 'Hợi'],
  ];
  let lucXung = false;
  let lucXungCap: string | undefined;
  for (const [c1, c2] of LUC_XUNG_PAIRS) {
    if ((chongChi === c1 && voChi === c2) || (chongChi === c2 && voChi === c1)) {
      lucXung = true;
      lucXungCap = `${chongChi} – ${voChi}`;
      break;
    }
  }

  // Lục hại
  const LUC_HAI_PAIRS: Array<[ChiName, ChiName]> = [
    ['Tý', 'Mùi'],
    ['Sửu', 'Ngọ'],
    ['Dần', 'Tỵ'],
    ['Mão', 'Thìn'],
    ['Mẹo', 'Thìn'],
    ['Thân', 'Hợi'],
    ['Dậu', 'Tuất'],
  ];
  let lucHai = false;
  let lucHaiCap: string | undefined;
  for (const [c1, c2] of LUC_HAI_PAIRS) {
    if ((chongChi === c1 && voChi === c2) || (chongChi === c2 && voChi === c1)) {
      lucHai = true;
      lucHaiCap = `${chongChi} – ${voChi}`;
      break;
    }
  }

  // Lục phá
  const LUC_PHA_PAIRS: Array<[ChiName, ChiName]> = [
    ['Tý', 'Dậu'],
    ['Sửu', 'Thìn'],
    ['Dần', 'Hợi'],
    ['Mão', 'Ngọ'],
    ['Mẹo', 'Ngọ'],
    ['Tỵ', 'Thân'],
    ['Mùi', 'Tuất'],
  ];
  let lucPha = false;
  let lucPhaCap: string | undefined;
  for (const [c1, c2] of LUC_PHA_PAIRS) {
    if ((chongChi === c1 && voChi === c2) || (chongChi === c2 && voChi === c1)) {
      lucPha = true;
      lucPhaCap = `${chongChi} – ${voChi}`;
      break;
    }
  }

  // Hình
  let hinh = false;
  let hinhLoai: string | undefined;
  if ((chongChi === 'Tý' && (voChi === 'Mão' || voChi === 'Mẹo')) || ((chongChi === 'Mão' || chongChi === 'Mẹo') && voChi === 'Tý')) {
    hinh = true;
    hinhLoai = 'Tý – Mão (Vô lễ chi hình)';
  } else if (['Dần', 'Tỵ', 'Thân'].includes(chongChi) && ['Dần', 'Tỵ', 'Thân'].includes(voChi) && chongChi !== voChi) {
    hinh = true;
    hinhLoai = 'Dần – Tỵ – Thân (Vô ân chi hình)';
  } else if (['Sửu', 'Mùi', 'Tuất'].includes(chongChi) && ['Sửu', 'Mùi', 'Tuất'].includes(voChi) && chongChi !== voChi) {
    hinh = true;
    hinhLoai = 'Sửu – Mùi – Tuất (Trì thế chi hình)';
  } else if (chongChi === voChi && ['Thìn', 'Ngọ', 'Dậu', 'Hợi'].includes(chongChi)) {
    hinh = true;
    hinhLoai = `${chongChi} – ${voChi} (Tự hình)`;
  }

  let chiTietDong = '';
  if (lucHop) {
    chiTietDong = `Địa Chi ${chongChi} và ${voChi} đạt Lục Hợp (${lucHopCap}), biểu hiện tính liên kết gắn bó trực tiếp và độ hòa hợp cao trong nếp sinh hoạt.`;
  } else if (tamHop) {
    chiTietDong = `Địa Chi ${chongChi} và ${voChi} nằm trong cục Tam Hợp (${tamHopNhom}), mang xu hướng đồng thuận và hợp tác vững chắc.`;
  } else if (lucXung) {
    chiTietDong = `Địa Chi ${chongChi} và ${voChi} thuộc thế Lục Xung (${lucXungCap}). Theo nguyên tắc cốt lõi: "Xung biểu thị tính đối lập, chuyển động và va chạm khác biệt; không đồng nghĩa với xấu tuyệt đối hay ly hôn". Sự khác biệt này đòi hỏi sự kiên nhẫn chia sẻ và có thể tạo lực đẩy bù trừ mạnh mẽ.`;
  } else if (lucHai) {
    chiTietDong = `Địa Chi phạm Lục Hại (${lucHaiCap}), đôi khi dễ phát sinh hiểu lầm nhỏ trong gia đạo; cần sự cởi mở giao tiếp để hóa giải.`;
  } else if (lucPha) {
    chiTietDong = `Địa Chi thuộc thế Lục Phá (${lucPhaCap}), trong công việc làm ăn cần có kế hoạch rõ ràng để tránh bất đồng ý kiến.`;
  } else {
    chiTietDong = `Địa Chi ${chongChi} và ${voChi} bình hòa, không xung không khắc, tạo sự ổn định tự nhiên.`;
  }

  return {
    chiChong: chongChi,
    chiVo: voChi,
    tamHop,
    tamHopNhom,
    lucHop,
    lucHopCap,
    lucXung,
    lucXungCap,
    lucHai,
    lucHaiCap,
    lucPha,
    lucPhaCap,
    hinh,
    hinhLoai,
    chiTietDong,
  };
}

// Tầng 5: Bát Trạch Cung Mệnh
export function analyzeTang5CungMenh(cungChong: CungPhi, dongTayChong: string, cungVo: CungPhi, dongTayVo: string): Tang5CungMenh {
  const BAT_TRACH_TABLE: Record<CungPhi, Record<CungPhi, { cung: BatTrachBatCung; nhom: 'Cát' | 'Hung'; yNghia: string }>> = {
    Càn: {
      Càn: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Tiểu Cát, gia đạo bình yên, hòa thuận êm ấm.' },
      Khảm: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Dễ có bất đồng quan điểm, cần nhẫn nại hóa giải.' },
      Cấn: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Đại Cát, vượng sức khỏe, hòa khí sinh tài lộc.' },
      Chấn: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Hay có tranh cãi khẩu thiệt, nên tu dưỡng tâm tính.' },
      Tốn: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Thử thách về tài chính buổi đầu, càng về sau càng vững.' },
      Ly: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Nghịch cung trong Bát Trạch, cần hướng bàn thờ/bếp phù hợp.' },
      Khôn: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Thượng Cát, tình cảm sắt son gắn bó trọn đời.' },
      Đoài: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Đại Cát Cung, phúc lộc vẹn toàn, con cái phương trưởng.' },
    },
    Khảm: {
      Càn: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Khác biệt về nếp nghĩ, cần lắng nghe nhau nhiều hơn.' },
      Khảm: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Gia đạo an vui, bình an qua từng năm tháng.' },
      Cấn: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Thử thách gia sự, cần vợ chồng cùng chung một lòng.' },
      Chấn: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Hưởng lộc trời ban, sức khỏe và tinh thần vững vàng.' },
      Tốn: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Vượng khí ngập tràn, sự nghiệp và gia đạo hưng thịnh.' },
      Ly: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Thủy Hỏa tương tể, gắn kết sâu sắc và bền bỉ.' },
      Khôn: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Nghịch cung Bát Trạch; hóa giải bằng đức độ và hướng trạch.' },
      Đoài: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Cần cẩn trọng trong tài chính và lời ăn tiếng nói.' },
    },
    Cấn: {
      Càn: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Đại Cát, thân tâm an ổn, gia môn hưng vượng.' },
      Khảm: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Cần sự bao dung để vượt qua những lúc bất hòa.' },
      Cấn: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Cùng chung chí hướng, nền tảng gia đình vững chắc.' },
      Chấn: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Dễ xung đột lời nói, nhường nhịn là chìa khóa vàng.' },
      Tốn: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Quan hệ nghịch cung Bát Trạch; cần tu tâm dưỡng tính.' },
      Ly: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Khó khăn ban đầu, hậu vận ổn định nếu đồng lòng.' },
      Khôn: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Thượng Cát Cung, sinh sôi nảy nở, tài phúc lưỡng toàn.' },
      Đoài: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Vợ chồng đồng lòng, hạnh phúc bền lâu trăm năm.' },
    },
    Chấn: {
      Càn: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Cần học cách nhẫn nại, kiềm chế tính nóng nảy.' },
      Khảm: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Quý nhân phù trợ, gia đình mạnh khỏe an vui.' },
      Cấn: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Thử thách tính khí; cần sự thấu cảm lẫn nhau.' },
      Chấn: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Tâm ý tương thông, cùng nhau phát triển gia nghiệp.' },
      Tốn: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Đồng khí tương cầu, tình cảm keo sơn gắn bó.' },
      Ly: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Mộc sinh Hỏa vượng, con cái ngoan hiền đỗ đạt.' },
      Khôn: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Cần quản lý chi tiêu và tránh việc tranh chấp khẩu từ.' },
      Đoài: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Nghịch cung Bát Trạch; lấy phúc đức hóa giải.' },
    },
    Tốn: {
      Càn: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Dễ nảy sinh trở ngại nhỏ; cần sự kiên định.' },
      Khảm: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Thủy dưỡng Mộc sinh, phúc lộc dồi dào, gia đạo ấm êm.' },
      Cấn: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Khác biệt trường khí Bát Trạch; cần chỉnh hướng nhà/bếp.' },
      Chấn: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Mộc Mộc tương liên, thủy chung son sắt.' },
      Tốn: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Gia đạo thanh bình, cuộc sống êm đềm hòa nhã.' },
      Ly: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Thượng Cát, may mắn ngập tràn, sức khỏe trường thọ.' },
      Khôn: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Cần sự minh bạch và tin tưởng tuyệt đối vào nhau.' },
      Đoài: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Tránh để cảm xúc chi phối các quyết định lớn.' },
    },
    Ly: {
      Càn: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Trường khí đối lập; cần tu dưỡng đức hạnh để chuyển hóa.' },
      Khảm: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Thủy Hỏa giao hòa, duyên nợ sâu sắc bền chặt.' },
      Cấn: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Thử thách tính kiên nhẫn; hòa khí sinh tài.' },
      Chấn: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Sinh khí dồi dào, công danh và sự nghiệp thăng tiến.' },
      Tốn: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Phước tinh chiếu mệnh, gia đình hưng thịnh sum vầy.' },
      Ly: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Nhiệt huyết tương đồng, cùng sẻ chia lý tưởng sống.' },
      Khôn: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Cần chú trọng giao tiếp, tránh dồn nén ức chế.' },
      Đoài: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Cần giữ lòng trung thực và nhẫn nại khi có xung đột.' },
    },
    Khôn: {
      Càn: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Âm Dương cân bằng, gia đình thuận hòa phú quý.' },
      Khảm: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Nghịch cung Bát Trạch; áp dụng giải pháp phong thủy trạch mệnh.' },
      Cấn: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Thổ Thổ tương vượng, đại phú đại quý, con đàn cháu đống.' },
      Chấn: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Cần sự nhường nhịn để biến áp lực thành động lực.' },
      Tốn: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Chú ý sự tương tác và giữ lửa ấm hạnh phúc.' },
      Ly: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Thử thách cảm xúc; bình tĩnh suy xét mọi việc.' },
      Khôn: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Hiền hòa vững chãi, cuộc sống yên ổn bình an.' },
      Đoài: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Hưởng trọn an lành, phúc đức lưu truyền cho hậu thế.' },
    },
    Đoài: {
      Càn: { cung: 'Sinh Khí', nhom: 'Cát', yNghia: 'Kim khí tương sinh, tài lộc vượng phát, gia đạo vinh hoa.' },
      Khảm: { cung: 'Họa Hại', nhom: 'Hung', yNghia: 'Chú ý lời nói; đối thoại chân thành là chìa khóa.' },
      Cấn: { cung: 'Diên Niên', nhom: 'Cát', yNghia: 'Thổ sinh Kim vượng, tình cảm son sắt trăm năm.' },
      Chấn: { cung: 'Tuyệt Mệnh', nhom: 'Hung', yNghia: 'Quan hệ nghịch cung Bát Trạch; lấy đạo nghĩa bù đắp.' },
      Tốn: { cung: 'Lục Sát', nhom: 'Hung', yNghia: 'Cần sự lắng nghe và tránh chấp nhặt tiểu tiết.' },
      Ly: { cung: 'Ngũ Quỷ', nhom: 'Hung', yNghia: 'Khác biệt về nhịp điệu sống; cần dung hòa và chia sẻ.' },
      Khôn: { cung: 'Thiên Y', nhom: 'Cát', yNghia: 'Đại Cát Cung, sức khỏe an khang, gia sự thuận lợi.' },
      Đoài: { cung: 'Phục Vị', nhom: 'Cát', yNghia: 'Tương đồng suy nghĩ, đời sống tâm đầu ý hợp.' },
    },
  };

  const res = BAT_TRACH_TABLE[cungChong]?.[cungVo] || {
    cung: 'Phục Vị' as BatTrachBatCung,
    nhom: 'Cát' as const,
    yNghia: 'Bình hòa gia đạo.',
  };

  return {
    cungChong,
    dongTayChong,
    cungVo,
    dongTayVo,
    ketQuaBatTrach: res.cung,
    nhomBatTrach: res.nhom,
    yNghia: `Phối Cung (${cungChong} &times; ${cungVo}) đặng ${res.cung} (${res.nhom}). ${res.yNghia} *(Lưu ý: Đây là kết quả trong hệ thống Bát Trạch, không phải kết luận tuyệt đối về toàn bộ hôn nhân)*.`,
  };
}

// Toàn bộ logic phân tích đa tầng khoa học
export function analyzeCoupleMultiLayer(
  chongYear: number,
  chongMonth: number = 1,
  voYear: number,
  voMonth: number = 1
): CoupleAnalysisResult {
  const chong = getCanChiFullInfo(chongYear, 'Nam');
  const vo = getCanChiFullInfo(voYear, 'Nữ');

  // Tầng 1: Thiên Can
  const tang1ThienCan = analyzeTang1ThienCan(chong.can, vo.can);

  // Tầng 2: Địa Chi
  const tang2DiaChi = analyzeTang2DiaChi(chong.chi, vo.chi);

  // Tầng 3: Ngũ Hành
  const tang3NguHanh: Tang3NguHanh = {
    chong: { can: chong.canNguHanh, chi: chong.chiNguHanh },
    vo: { can: vo.canNguHanh, chi: vo.chiNguHanh },
    chiTiet: `Chồng có Can ${chong.can} (${chong.canNguHanh}) - Chi ${chong.chi} (${chong.chiNguHanh}); Vợ có Can ${vo.can} (${vo.canNguHanh}) - Chi ${vo.chi} (${vo.chiNguHanh}).`,
  };

  // Tầng 4: Nạp Âm Lục Thập Hoa Giáp
  const SINH_MAP: Record<MenhNguHanh, MenhNguHanh> = {
    Mộc: 'Hỏa',
    Hỏa: 'Thổ',
    Thổ: 'Kim',
    Kim: 'Thủy',
    Thủy: 'Mộc',
  };
  const KHAC_MAP: Record<MenhNguHanh, MenhNguHanh> = {
    Mộc: 'Thổ',
    Thổ: 'Thủy',
    Thủy: 'Hỏa',
    Hỏa: 'Kim',
    Kim: 'Mộc',
  };

  let napAmQuanHe = 'Bình Hòa';
  if (SINH_MAP[chong.nguHanh] === vo.nguHanh) napAmQuanHe = `Chồng sinh Vợ (${chong.nguHanh} sinh ${vo.nguHanh})`;
  else if (SINH_MAP[vo.nguHanh] === chong.nguHanh) napAmQuanHe = `Vợ sinh Chồng (${vo.nguHanh} sinh ${chong.nguHanh})`;
  else if (KHAC_MAP[chong.nguHanh] === vo.nguHanh) napAmQuanHe = `Chồng khắc Vợ (${chong.nguHanh} khắc ${vo.nguHanh})`;
  else if (KHAC_MAP[vo.nguHanh] === chong.nguHanh) napAmQuanHe = `Vợ khắc Chồng (${vo.nguHanh} khắc ${chong.nguHanh})`;

  const tang4NapAm: Tang4NapAm = {
    napAmChong: chong.menh,
    nguHanhChong: chong.nguHanh,
    napAmVo: vo.menh,
    nguHanhVo: vo.nguHanh,
    quanHe: napAmQuanHe,
    phanBietRoRang: `Năm ${chong.fullName} thuộc ${chong.menh} (${chong.nguHanh}) trong khi Can ${chong.can} (${chong.canNguHanh}), Chi ${chong.chi} (${chong.chiNguHanh}); Năm ${vo.fullName} thuộc ${vo.menh} (${vo.nguHanh}) trong khi Can ${vo.can} (${vo.canNguHanh}), Chi ${vo.chi} (${vo.chiNguHanh}). Đây là 3 lớp quy chiếu hoàn toàn khác nhau cần phân biệt rõ ràng.`,
  };

  // Tầng 5: Cung Mệnh Bát Trạch
  const tang5CungMenh = analyzeTang5CungMenh(chong.cungPhi!, chong.dongTayMenh!, vo.cungPhi!, vo.dongTayMenh!);

  // Tra cứu Cao Ly Đầu Hình (nếu có tham chiếu thêm)
  const caoly = getCaoLyGiaiDoan(chong.can, vo.chi);

  // Tầng 6: Tổng Hợp Cấu Trúc Quan Hệ
  const diemThuan: string[] = [];
  const diemNghich: string[] = [];
  const diemLuuY: string[] = [];

  // Thuận
  if (tang1ThienCan.quanHe === 'Tương Hợp' || tang1ThienCan.quanHe === 'Tương Sinh') {
    diemThuan.push(`Thiên Can ${tang1ThienCan.quanHe}: ${tang1ThienCan.chiTiet}`);
  }
  if (tang2DiaChi.lucHop) diemThuan.push(`Địa Chi Lục Hợp: ${tang2DiaChi.lucHopCap}`);
  if (tang2DiaChi.tamHop) diemThuan.push(`Địa Chi Tam Hợp: ${tang2DiaChi.tamHopNhom}`);
  if (napAmQuanHe.includes('sinh') || napAmQuanHe === 'Bình Hòa') {
    diemThuan.push(`Nạp Âm Ngũ Hành: ${napAmQuanHe}`);
  }
  if (tang5CungMenh.nhomBatTrach === 'Cát') {
    diemThuan.push(`Bát Trạch Cát Cung: Đạt ${tang5CungMenh.ketQuaBatTrach}`);
  }

  // Nghịch
  if (tang1ThienCan.quanHe === 'Tương Khắc') {
    diemNghich.push(`Thiên Can Tương Khắc: Tạo khác biệt trong cách tiếp cận`);
  }
  if (tang2DiaChi.lucXung) {
    diemNghich.push(`Địa Chi Lục Xung (${tang2DiaChi.lucXungCap}): Tồn tại tính đối lập và chuyển động va chạm`);
  }
  if (tang2DiaChi.lucHai) diemNghich.push(`Địa Chi Lục Hại: Dễ có sự khác biệt nhỏ về cảm xúc`);
  if (tang2DiaChi.hinh) diemNghich.push(`Địa Chi Hình: ${tang2DiaChi.hinhLoai}`);
  if (napAmQuanHe.includes('khắc')) {
    diemNghich.push(`Nạp Âm Tương Khắc: ${napAmQuanHe}`);
  }
  if (tang5CungMenh.nhomBatTrach === 'Hung') {
    diemNghich.push(`Bát Trạch Cung Mệnh: Đạt ${tang5CungMenh.ketQuaBatTrach} (thuộc nhóm thử thách trong hệ thống Bát Trạch)`);
  }

  // Lưu ý
  diemLuuY.push(`Cần phân biệt rõ Ngũ Hành của Thiên Can, Địa Chi và Nạp Âm là các lớp quy chiếu khác nhau.`);
  if (tang2DiaChi.lucXung) {
    diemLuuY.push(`Lục Xung không đồng nghĩa với ly hôn, mà biểu thị sự chuyển động, khác biệt có thể bổ khuyết và thúc đẩy lẫn nhau.`);
  }
  diemLuuY.push(`Khi chỉ có năm sinh, đây là đánh giá hòa hợp cơ bản theo tuổi; muốn phân tích toàn diện cần đủ Tứ Trụ (Năm, Tháng, Ngày, Giờ sinh).`);

  const amDuongCheHoa =
    'Theo nguyên lý Âm Dương: Không có Khắc thì không có chế hóa, không có Sinh thì không có phát triển. Cân bằng và tương tác đa chiều là trọng tâm của gia đạo bền vững.';

  const thongDiepCotLoi =
    'Một người không phải chỉ là một cái tuổi. Huyền học là hệ thống tham khảo nhận diện khuynh hướng; còn chất lượng hôn nhân thực tế phụ thuộc vào tính cách, giao tiếp, trách nhiệm, đạo đức và nỗ lực cùng nhau xử lý khác biệt.';

  let nhanDinhTongQuan = '';
  if (diemThuan.length >= 3 && diemNghich.length <= 1) {
    nhanDinhTongQuan = 'Hai tuổi có nhiều yếu tố tương trợ và thuận khí qua các tầng Thiên Can, Địa Chi và Nạp Âm. Mối quan hệ có nền tảng hòa hợp tốt.';
  } else if (diemThuan.length >= 2 && diemNghich.length >= 2) {
    nhanDinhTongQuan = 'Hai tuổi có cấu trúc đan xen giữa điểm tương trợ và điểm xung động. Mối quan hệ có lực hút và tính tương tác mạnh, đòi hỏi sự linh hoạt và thấu hiểu.';
  } else {
    nhanDinhTongQuan = 'Hai tuổi có một số điểm thử thách ở các tầng quy chiếu. Cổ nhân khuyên nên lấy sự nhường nhịn, tôn trọng và đồng hành làm gốc rễ xây dựng gia đình.';
  }

  // Tượng trưng điểm số hiển thị
  let score = 70 + diemThuan.length * 6 - diemNghich.length * 5;
  score = Math.max(35, Math.min(96, score));

  return {
    chong,
    vo,
    tang1ThienCan,
    tang2DiaChi,
    tang3NguHanh,
    tang4NapAm,
    tang5CungMenh,
    tuongSinhMenh: {
      hop: !napAmQuanHe.includes('khắc'),
      quanHe: napAmQuanHe,
      chiTiet: tang4NapAm.phanBietRoRang,
    },
    caoly,
    cauTrucTongHop: {
      diemThuan,
      diemNghich,
      diemLuuY,
      amDuongCheHoa,
      thongDiepCotLoi,
      nhanDinhTongQuan,
    },
    tongKetDuyenNo: {
      diemSo: score,
      xepLoai: score >= 80 ? 'Thuận Hòa Cát Duyên' : score >= 65 ? 'Cân Bằng Đa Chiều' : 'Tương Tác Thử Thách',
      loiKhuyenHoaGiai:
        'Vợ chồng lấy đạo nghĩa làm trọng, "Đức Năng Thắng Số", tương kính như tân, tôn trọng khác biệt để cùng nhau chuyển hóa thử thách thành quả ngọt gia đình.',
    },
  };
}

export function analyzeCoupleLocal(
  chongNamSinh: number,
  chongThangSanh: number = 1,
  voNamSinh: number,
  voThangSanh: number = 1
): CoupleAnalysisResult {
  return analyzeCoupleMultiLayer(chongNamSinh, chongThangSanh, voNamSinh, voThangSanh);
}
