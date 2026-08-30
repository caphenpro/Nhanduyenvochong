import { CanName, ChiName, MenhNguHanh, CoupleAnalysisResult } from '../types';
import { THIEN_CAN, DIA_CHI, NGU_HANH_NAP_AM_60, getCanChiByYear } from './tamtheData';

export interface SolarTermInfo {
  name: string;
  hanTu: string;
  season: 'Xuân' | 'Hạ' | 'Thu' | 'Đông';
  approxDate: string; // e.g. "04/02 - 18/02"
  nguHanhVuong: MenhNguHanh;
  nguHanhTuong: MenhNguHanh;
  nguHanhTu: MenhNguHanh;
  kyMonDon: 'Dương Độn' | 'Âm Độn';
  kyMonCuc: number[]; // e.g. [1, 7, 4]
  nguyetTuongLucNham: string; // e.g. "Hợi (Đăng Minh)"
  yNghia: string;
}

export const SOLAR_TERMS_24: SolarTermInfo[] = [
  {
    name: 'Lập Xuân',
    hanTu: '立春',
    season: 'Xuân',
    approxDate: '04/02 - 18/02',
    nguHanhVuong: 'Mộc',
    nguHanhTuong: 'Hỏa',
    nguHanhTu: 'Kim',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [8, 5, 2],
    nguyetTuongLucNham: 'Hợi (Đăng Minh)',
    yNghia: 'Bắt đầu mùa xuân, vạn vật đâm chồi nảy lộc, mộc khí đương lệnh phát tiết sinh khí.',
  },
  {
    name: 'Vũ Thủy',
    hanTu: '雨水',
    season: 'Xuân',
    approxDate: '19/02 - 05/03',
    nguHanhVuong: 'Mộc',
    nguHanhTuong: 'Hỏa',
    nguHanhTu: 'Kim',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [9, 6, 3],
    nguyetTuongLucNham: 'Hợi (Đăng Minh)',
    yNghia: 'Mưa xuân ẩm nhuận đất đai, thủy sinh mộc, vạn sự thuận hòa khởi đầu ấm áp.',
  },
  {
    name: 'Kinh Trập',
    hanTu: '驚蟄',
    season: 'Xuân',
    approxDate: '06/03 - 20/03',
    nguHanhVuong: 'Mộc',
    nguHanhTuong: 'Hỏa',
    nguHanhTu: 'Kim',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [1, 7, 4],
    nguyetTuongLucNham: 'Tuất (Hà Khôi)',
    yNghia: 'Sấm xuân đánh thức côn trùng sâu bọ, dương khí thăng hoa mạnh mẽ.',
  },
  {
    name: 'Xuân Phân',
    hanTu: '春分',
    season: 'Xuân',
    approxDate: '21/03 - 04/04',
    nguHanhVuong: 'Mộc',
    nguHanhTuong: 'Hỏa',
    nguHanhTu: 'Kim',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [3, 9, 6],
    nguyetTuongLucNham: 'Tuất (Hà Khôi)',
    yNghia: 'Ngày đêm bằng nhau, âm dương quân bình điều hòa, tốt cho đính ước giá thú.',
  },
  {
    name: 'Thanh Minh',
    hanTu: '清明',
    season: 'Xuân',
    approxDate: '05/04 - 19/04',
    nguHanhVuong: 'Mộc',
    nguHanhTuong: 'Hỏa',
    nguHanhTu: 'Kim',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [4, 1, 7],
    nguyetTuongLucNham: 'Dậu (Tùng Khôi)',
    yNghia: 'Trời trong gió mát, tưởng nhớ tổ tiên, bồi đắp cội nguồn phước đức gia tộc.',
  },
  {
    name: 'Cốc Vũ',
    hanTu: '穀雨',
    season: 'Xuân',
    approxDate: '20/04 - 04/05',
    nguHanhVuong: 'Thổ',
    nguHanhTuong: 'Kim',
    nguHanhTu: 'Mộc',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [5, 2, 8],
    nguyetTuongLucNham: 'Dậu (Tùng Khôi)',
    yNghia: 'Mưa nuôi dưỡng lúa mạ ngũ cốc, thời khắc chuyển mùa sinh tài nảy lộc.',
  },
  {
    name: 'Lập Hạ',
    hanTu: '立夏',
    season: 'Hạ',
    approxDate: '05/05 - 20/05',
    nguHanhVuong: 'Hỏa',
    nguHanhTuong: 'Thổ',
    nguHanhTu: 'Thủy',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [4, 1, 7],
    nguyetTuongLucNham: 'Thân (Truyền Tống)',
    yNghia: 'Bắt đầu mùa hạ, hỏa khí thịnh vượng, năng lượng dương nhiệt bừng nở.',
  },
  {
    name: 'Tiểu Mãn',
    hanTu: '小滿',
    season: 'Hạ',
    approxDate: '21/05 - 05/06',
    nguHanhVuong: 'Hỏa',
    nguHanhTuong: 'Thổ',
    nguHanhTu: 'Thủy',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [5, 2, 8],
    nguyetTuongLucNham: 'Thân (Truyền Tống)',
    yNghia: 'Hạt thóc non bắt đầu đẫy đà, hy vọng một mùa bội thu tươi sáng.',
  },
  {
    name: 'Mang Chủng',
    hanTu: '芒種',
    season: 'Hạ',
    approxDate: '06/06 - 20/06',
    nguHanhVuong: 'Hỏa',
    nguHanhTuong: 'Thổ',
    nguHanhTu: 'Thủy',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [6, 3, 9],
    nguyetTuongLucNham: 'Mùi (Tiểu Cát)',
    yNghia: 'Thu hoạch lúa có râu, gieo cấy vụ mùa mới, lao động cần mẫn tạo phúc.',
  },
  {
    name: 'Hạ Chí',
    hanTu: '夏至',
    season: 'Hạ',
    approxDate: '21/06 - 06/07',
    nguHanhVuong: 'Hỏa',
    nguHanhTuong: 'Thổ',
    nguHanhTu: 'Thủy',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [9, 3, 6],
    nguyetTuongLucNham: 'Mùi (Tiểu Cát)',
    yNghia: 'Ngày dài nhất năm, đỉnh điểm dương cực thì nhất âm sinh, chuyển sang Âm Độn.',
  },
  {
    name: 'Tiểu Thử',
    hanTu: '小暑',
    season: 'Hạ',
    approxDate: '07/07 - 22/07',
    nguHanhVuong: 'Hỏa',
    nguHanhTuong: 'Thổ',
    nguHanhTu: 'Thủy',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [8, 2, 5],
    nguyetTuongLucNham: 'Ngọ (Thắng Quang)',
    yNghia: 'Trời bắt đầu oi ả nồng bức, hỏa vượng cần nước mát dưỡng can thận.',
  },
  {
    name: 'Đại Thử',
    hanTu: '大暑',
    season: 'Hạ',
    approxDate: '23/07 - 06/08',
    nguHanhVuong: 'Thổ',
    nguHanhTuong: 'Kim',
    nguHanhTu: 'Mộc',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [7, 1, 4],
    nguyetTuongLucNham: 'Ngọ (Thắng Quang)',
    yNghia: 'Nóng gắt đỉnh điểm cuối hè, tam phục tương tranh, cần điều hòa tâm tính.',
  },
  {
    name: 'Lập Thu',
    hanTu: '立秋',
    season: 'Thu',
    approxDate: '07/08 - 22/08',
    nguHanhVuong: 'Kim',
    nguHanhTuong: 'Thủy',
    nguHanhTu: 'Hỏa',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [2, 5, 8],
    nguyetTuongLucNham: 'Tỵ (Thái Ất)',
    yNghia: 'Bắt đầu mùa thu, heo may chớm lạnh, kim khí ngưng tụ thanh bạch.',
  },
  {
    name: 'Xử Thử',
    hanTu: '處暑',
    season: 'Thu',
    approxDate: '23/08 - 06/09',
    nguHanhVuong: 'Kim',
    nguHanhTuong: 'Thủy',
    nguHanhTu: 'Hỏa',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [1, 4, 7],
    nguyetTuongLucNham: 'Tỵ (Thái Ất)',
    yNghia: 'Hết hẳn nắng nực mùa hè, trời mát trong trẻo, kim sinh thủy thuận.',
  },
  {
    name: 'Bạch Lộ',
    hanTu: '白露',
    season: 'Thu',
    approxDate: '07/09 - 22/09',
    nguHanhVuong: 'Kim',
    nguHanhTuong: 'Thủy',
    nguHanhTu: 'Hỏa',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [9, 3, 6],
    nguyetTuongLucNham: 'Thìn (Thiên Cương)',
    yNghia: 'Sương trắng đọng lá buổi sớm, âm khí ngưng tụ, cảnh vật thanh khiết.',
  },
  {
    name: 'Thu Phân',
    hanTu: '秋分',
    season: 'Thu',
    approxDate: '23/09 - 07/10',
    nguHanhVuong: 'Kim',
    nguHanhTuong: 'Thủy',
    nguHanhTu: 'Hỏa',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [7, 1, 4],
    nguyetTuongLucNham: 'Thìn (Thiên Cương)',
    yNghia: 'Đêm ngày cân bằng giữa thu, ánh trăng tròn đầy, tình duyên êm ả.',
  },
  {
    name: 'Hàn Lộ',
    hanTu: '寒露',
    season: 'Thu',
    approxDate: '08/10 - 22/10',
    nguHanhVuong: 'Kim',
    nguHanhTuong: 'Thủy',
    nguHanhTu: 'Hỏa',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [6, 9, 3],
    nguyetTuongLucNham: 'Mão (Thái Xung)',
    yNghia: 'Sương lạnh buốt giá, thu sắp tàn, chuẩn bị tích trữ lương thực năng lượng.',
  },
  {
    name: 'Sương Giáng',
    hanTu: '霜降',
    season: 'Thu',
    approxDate: '23/10 - 06/11',
    nguHanhVuong: 'Thổ',
    nguHanhTuong: 'Kim',
    nguHanhTu: 'Mộc',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [5, 8, 2],
    nguyetTuongLucNham: 'Mão (Thái Xung)',
    yNghia: 'Sương muối phủ trắng cành cây, thời tiết chuyển từ thu sang đông.',
  },
  {
    name: 'Lập Đông',
    hanTu: '立冬',
    season: 'Đông',
    approxDate: '07/11 - 21/11',
    nguHanhVuong: 'Thủy',
    nguHanhTuong: 'Mộc',
    nguHanhTu: 'Thổ',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [6, 9, 3],
    nguyetTuongLucNham: 'Dần (Công Tào)',
    yNghia: 'Bắt đầu mùa đông, vạn vật thu liễm tàng ẩn, thủy vượng giá băng.',
  },
  {
    name: 'Tiểu Tuyết',
    hanTu: '小雪',
    season: 'Đông',
    approxDate: '22/11 - 06/12',
    nguHanhVuong: 'Thủy',
    nguHanhTuong: 'Mộc',
    nguHanhTu: 'Thổ',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [5, 8, 2],
    nguyetTuongLucNham: 'Dần (Công Tào)',
    yNghia: 'Tuyết nhỏ lất phất rơi, khí lạnh tràn ngập sơn khê.',
  },
  {
    name: 'Đại Tuyết',
    hanTu: '大雪',
    season: 'Đông',
    approxDate: '07/12 - 21/12',
    nguHanhVuong: 'Thủy',
    nguHanhTuong: 'Mộc',
    nguHanhTu: 'Thổ',
    kyMonDon: 'Âm Độn',
    kyMonCuc: [4, 7, 1],
    nguyetTuongLucNham: 'Sửu (Đại Cát)',
    yNghia: 'Tuyết phủ dày đặc non sông, hàn khí cùng cực, chuẩn bị đón điểm phục sinh.',
  },
  {
    name: 'Đông Chí',
    hanTu: '冬至',
    season: 'Đông',
    approxDate: '22/12 - 05/01',
    nguHanhVuong: 'Thủy',
    nguHanhTuong: 'Mộc',
    nguHanhTu: 'Thổ',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [1, 7, 4],
    nguyetTuongLucNham: 'Sửu (Đại Cát)',
    yNghia: 'Đêm dài nhất năm, âm cực thì nhất dương sinh, bắt đầu chuyển về Dương Độn.',
  },
  {
    name: 'Tiểu Hàn',
    hanTu: '小寒',
    season: 'Đông',
    approxDate: '06/01 - 19/01',
    nguHanhVuong: 'Thủy',
    nguHanhTuong: 'Mộc',
    nguHanhTu: 'Thổ',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [2, 8, 5],
    nguyetTuongLucNham: 'Tý (Thần Hậu)',
    yNghia: 'Lạnh giá bước vào giai đoạn khắc nghiệt, chuẩn bị đón tết cổ truyền.',
  },
  {
    name: 'Đại Hàn',
    hanTu: '大寒',
    season: 'Đông',
    approxDate: '20/01 - 03/02',
    nguHanhVuong: 'Thổ',
    nguHanhTuong: 'Kim',
    nguHanhTu: 'Mộc',
    kyMonDon: 'Dương Độn',
    kyMonCuc: [3, 9, 6],
    nguyetTuongLucNham: 'Tý (Thần Hậu)',
    yNghia: 'Rét buốt tột cùng trước khi mùa xuân mới tái sinh, chuyển giao chu kỳ.',
  },
];

// Helper to determine current Solar Term based on Date
export function getCurrentSolarTerm(date: Date = new Date()): SolarTermInfo {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Approximate matching based on calendar dates
  if ((month === 2 && day >= 4) || (month === 2 && day <= 18)) return SOLAR_TERMS_24[0];
  if ((month === 2 && day >= 19) || (month === 3 && day <= 5)) return SOLAR_TERMS_24[1];
  if ((month === 3 && day >= 6) || (month === 3 && day <= 20)) return SOLAR_TERMS_24[2];
  if ((month === 3 && day >= 21) || (month === 4 && day <= 4)) return SOLAR_TERMS_24[3];
  if ((month === 4 && day >= 5) || (month === 4 && day <= 19)) return SOLAR_TERMS_24[4];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 4)) return SOLAR_TERMS_24[5];
  if ((month === 5 && day >= 5) || (month === 5 && day <= 20)) return SOLAR_TERMS_24[6];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 5)) return SOLAR_TERMS_24[7];
  if ((month === 6 && day >= 6) || (month === 6 && day <= 20)) return SOLAR_TERMS_24[8];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 6)) return SOLAR_TERMS_24[9];
  if ((month === 7 && day >= 7) || (month === 7 && day <= 22)) return SOLAR_TERMS_24[10];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 6)) return SOLAR_TERMS_24[11];
  if ((month === 8 && day >= 7) || (month === 8 && day <= 22)) return SOLAR_TERMS_24[12];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 6)) return SOLAR_TERMS_24[13];
  if ((month === 9 && day >= 7) || (month === 9 && day <= 22)) return SOLAR_TERMS_24[14];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 7)) return SOLAR_TERMS_24[15];
  if ((month === 10 && day >= 8) || (month === 10 && day <= 22)) return SOLAR_TERMS_24[16];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 6)) return SOLAR_TERMS_24[17];
  if ((month === 11 && day >= 7) || (month === 11 && day <= 21)) return SOLAR_TERMS_24[18];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 6)) return SOLAR_TERMS_24[19];
  if ((month === 12 && day >= 7) || (month === 12 && day <= 21)) return SOLAR_TERMS_24[20];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 5)) return SOLAR_TERMS_24[21];
  if ((month === 1 && day >= 6) || (month === 1 && day <= 19)) return SOLAR_TERMS_24[22];
  return SOLAR_TERMS_24[23];
}

export interface MetaphysicsBoardState {
  currentDateStr: string;
  solarTerm: SolarTermInfo;
  batTuHienTai: {
    nam: string;
    thang: string;
    ngay: string;
    gio: string;
    napAmNam: string;
  };
  kyMonDonGiap: {
    don: 'Dương Độn' | 'Âm Độn';
    cuc: number;
    trucPhu: string;
    trucSu: string;
    batMon: { mon: string; cung: string; tinhChat: string }[];
    cuuTinh: { tinh: string; cung: string; hanh: string }[];
    batThan: { than: string; cung: string }[];
  };
  lucNham: {
    nguyetTuong: string;
    thoiDia: string;
    tuKhoa: { khoa: number; canChi: string; tuong: string; yNghia: string }[];
    tamTruyen: { so: string; canChi: string; than: string; luocGiai: string }[];
    thapNhiThan: string[];
  };
}

// Generate the complete real-time metaphysics board state
export function generateMetaphysicsState(date: Date = new Date()): MetaphysicsBoardState {
  const solarTerm = getCurrentSolarTerm(date);
  const year = date.getFullYear();
  const yearCanChi = getCanChiByYear(year);

  // Approximate Can Chi for Current Month / Day / Hour
  const monthIdx = date.getMonth();
  const monthChi = DIA_CHI[(monthIdx + 2) % 12]; // Dần, Mão...
  const monthCan = THIEN_CAN[(year % 5 * 2 + monthIdx + 2) % 10];

  const hour = date.getHours();
  const hourIdx = Math.floor((hour + 1) / 2) % 12;
  const hourChi = DIA_CHI[hourIdx];
  const hourCan = THIEN_CAN[(date.getDate() % 5 * 2 + hourIdx) % 10];

  const dayCan = THIEN_CAN[(date.getDate() + 3) % 10];
  const dayChi = DIA_CHI[(date.getDate() + 7) % 12];

  const don = solarTerm.kyMonDon;
  const cuc = solarTerm.kyMonCuc[0];

  return {
    currentDateStr: date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    solarTerm,
    batTuHienTai: {
      nam: `${yearCanChi.fullName} (${yearCanChi.menh})`,
      thang: `${monthCan} ${monthChi}`,
      ngay: `${dayCan} ${dayChi}`,
      gio: `${hourCan} ${hourChi}`,
      napAmNam: yearCanChi.menh,
    },
    kyMonDonGiap: {
      don,
      cuc,
      trucPhu: 'Thiên Tâm Tinh (Càn Cung)',
      trucSu: 'Khai Môn (Càn Lục Cung - Đại Cát)',
      batMon: [
        { mon: 'Hưu Môn', cung: 'Khảm 1 Cung (Bắc)', tinhChat: 'Đại Cát - Cầu tài, hôn nhân hòa hợp, an khang' },
        { mon: 'Sinh Môn', cung: 'Cấn 8 Cung (Đông Bắc)', tinhChat: 'Thượng Cát - Điền sản hưng vượng, sinh con quý tử' },
        { mon: 'Thương Môn', cung: 'Chấn 3 Cung (Đông)', tinhChat: 'Thứ Hung - Bắt bớ, cạnh tranh, kỵ giá thú' },
        { mon: 'Đỗ Môn', cung: 'Tốn 4 Cung (Đông Nam)', tinhChat: 'Bình Hòa - Ẩn nấp, giữ gìn tài sản' },
        { mon: 'Cảnh Môn', cung: 'Ly 9 Cung (Nam)', tinhChat: 'Tiểu Cát - Văn thư, hỷ sự, yến tiệc' },
        { mon: 'Tử Môn', cung: 'Khôn 2 Cung (Tây Nam)', tinhChat: 'Đại Hung - Kỵ khởi sự, nên tu tâm bồi đức' },
        { mon: 'Kinh Môn', cung: 'Đoài 7 Cung (Tây)', tinhChat: 'Thứ Hung - Khẩu thiệt, tranh chấp kiện tụng' },
        { mon: 'Khai Môn', cung: 'Càn 6 Cung (Tây Bắc)', tinhChat: 'Thượng Cát - Khai mở sự nghiệp, kết hôn vinh hoa' },
      ],
      cuuTinh: [
        { tinh: 'Thiên Bồng Tinh', cung: 'Khảm 1 Cung', hanh: 'Thủy - Hung' },
        { tinh: 'Thiên Nhuế Tinh', cung: 'Khôn 2 Cung', hanh: 'Thổ - Hung' },
        { tinh: 'Thiên Xung Tinh', cung: 'Chấn 3 Cung', hanh: 'Mộc - Cát' },
        { tinh: 'Thiên Phụ Tinh', cung: 'Tốn 4 Cung', hanh: 'Mộc - Đại Cát' },
        { tinh: 'Thiên Cầm Tinh', cung: 'Trung 5 Cung', hanh: 'Thổ - Cát' },
        { tinh: 'Thiên Tâm Tinh', cung: 'Càn 6 Cung', hanh: 'Kim - Đại Cát' },
        { tinh: 'Thiên Trụ Tinh', cung: 'Đoài 7 Cung', hanh: 'Kim - Bình' },
        { tinh: 'Thiên Nhậm Tinh', cung: 'Cấn 8 Cung', hanh: 'Thổ - Đại Cát' },
        { tinh: 'Thiên Anh Tinh', cung: 'Ly 9 Cung', hanh: 'Hỏa - Bình' },
      ],
      batThan: [
        { than: 'Trực Phù (Quý Thần)', cung: 'Càn 6 Cung' },
        { than: 'Đằng Xà (Hư Kinh)', cung: 'Khảm 1 Cung' },
        { than: 'Thái Âm (Bảo Hộ)', cung: 'Cấn 8 Cung' },
        { than: 'Lục Hợp (Hôn Nhân - Hòa Hợp)', cung: 'Chấn 3 Cung' },
        { than: 'Bạch Hổ (Uy Dũng)', cung: 'Tốn 4 Cung' },
        { than: 'Huyền Vũ (Ẩn Tàng)', cung: 'Ly 9 Cung' },
        { than: 'Cửu Địa (Bền Vững)', cung: 'Khôn 2 Cung' },
        { than: 'Cửu Thiên (Thăng Tiến)', cung: 'Đoài 7 Cung' },
      ],
    },
    lucNham: {
      nguyetTuong: solarTerm.nguyetTuongLucNham,
      thoiDia: `${hourChi} thời lâm ${dayChi}`,
      tuKhoa: [
        { khoa: 1, canChi: `${dayCan} Thượng Thần`, tuong: 'Thanh Long (Mộc)', yNghia: 'Bản thân, chí hướng và khởi nguồn tiền duyên' },
        { khoa: 2, canChi: `${dayCan} Âm Thần`, tuong: 'Lục Hợp (Mộc)', yNghia: 'Gia đạo bề trong, tâm tư lứa đôi' },
        { khoa: 3, canChi: `${dayChi} Thượng Thần`, tuong: 'Thái Thường (Thổ)', yNghia: 'Nhà cửa điền sản, phương hướng sinh sống' },
        { khoa: 4, canChi: `${dayChi} Âm Thần`, tuong: 'Thiên Hậu (Thủy)', yNghia: 'Hào con cái, phúc ấm hậu duệ' },
      ],
      tamTruyen: [
        { so: 'Sơ Truyền (Phát Đoan)', canChi: 'Dần Mộc', than: 'Thanh Long', luocGiai: 'Khởi đầu thuận lợi, duyên lành đưa đẩy tao phùng' },
        { so: 'Trung Truyền (Di Thần)', canChi: 'Ngọ Hỏa', than: 'Chu Tước', luocGiai: 'Quá trình chung sống cần đề phòng khẩu thiệt, bớt lời khi tranh luận' },
        { so: 'Mạt Truyền (Quy Túc)', canChi: 'Tuất Thổ', than: 'Thái Thường', luocGiai: 'Hậu vận vững chãi, tích lũy điền sản, con cái thành đạt' },
      ],
      thapNhiThan: [
        'Quý Nhân (Cát thần)', 'Đằng Xà (Quấy nhiễu)', 'Chu Tước (Khẩu thiệt)', 'Lục Hợp (Hòa hiệp)',
        'Câu Trận (Trì trệ)', 'Thanh Long (Tài lộc)', 'Thiên Không (Hư hao)', 'Bạch Hổ (Hung hiểm)',
        'Thái Thường (Ăn uống, hỷ sự)', 'Huyền Vũ (Trộm cắp)', 'Thái Âm (Che chở)', 'Thiên Hậu (Ân đức phụ nữ)'
      ],
    },
  };
}

// Format full contextual prompt payload for AI
export function buildComprehensiveMetaphysicsContext(
  coupleData?: CoupleAnalysisResult | null,
  date: Date = new Date()
): string {
  const metaState = generateMetaphysicsState(date);

  let output = `\n======================================================
THÔNG TIN BÀN QUẺ & TRẠNG THÁI CỔ THUẬT HIỆN TẠI (SYSTEM STATE)
Thời điểm tra cứu: ${metaState.currentDateStr}
Tiết khí: ${metaState.solarTerm.name} (${metaState.solarTerm.hanTu}) - Mùa: ${metaState.solarTerm.season}
Ý nghĩa tiết khí: ${metaState.solarTerm.yNghia}
Ngũ hành thời lệnh: Vương [${metaState.solarTerm.nguHanhVuong}] - Tướng [${metaState.solarTerm.nguHanhTuong}] - Tù [${metaState.solarTerm.nguHanhTu}]

[BÁT TỰ THỜI ĐIỂM HIỆN TẠI]:
- Năm: ${metaState.batTuHienTai.nam}
- Tháng: ${metaState.batTuHienTai.thang}
- Ngày: ${metaState.batTuHienTai.ngay}
- Giờ: ${metaState.batTuHienTai.gio}

[KỲ MÔN ĐỘN GIÁP]:
- Độn Cục: ${metaState.kyMonDonGiap.don} - Cục số: ${metaState.kyMonDonGiap.cuc}
- Trực Phù: ${metaState.kyMonDonGiap.trucPhu} | Trực Sử: ${metaState.kyMonDonGiap.trucSu}
- Bát Môn phân bố:
${metaState.kyMonDonGiap.batMon.map(m => `  + ${m.mon} đóng tại ${m.cung} -> ${m.tinhChat}`).join('\n')}
- Bát Thần hộ vệ:
${metaState.kyMonDonGiap.batThan.map(t => `  + ${t.than} ngự tại ${t.cung}`).join('\n')}

[ĐẠI LỤC NHÂM - THỜI KHÓA]:
- Nguyệt Tướng: ${metaState.lucNham.nguyetTuong} | Thời Địa: ${metaState.lucNham.thoiDia}
- Tứ Khóa:
${metaState.lucNham.tuKhoa.map(k => `  + Khóa ${k.khoa}: ${k.canChi} [${k.tuong}] -> ${k.yNghia}`).join('\n')}
- Tam Truyền:
${metaState.lucNham.tamTruyen.map(t => `  + ${t.so}: ${t.canChi} [Thần: ${t.than}] -> ${t.luocGiai}`).join('\n')}`;

  if (coupleData) {
    output += `\n
[DỮ LIỆU ĐANG TRA CỨU CỦA CẶP ĐÔI]:
- Người Chồng: Tuổi ${coupleData.chong.fullName} (${coupleData.chong.lunarYear}) | Can: ${coupleData.chong.can} | Chi: ${coupleData.chong.chi} | Mạng nạp âm: ${coupleData.chong.menh} (${coupleData.chong.nguHanh})
- Người Vợ: Tuổi ${coupleData.vo.fullName} (${coupleData.vo.lunarYear}) | Can: ${coupleData.vo.can} | Chi: ${coupleData.vo.chi} | Mạng nạp âm: ${coupleData.vo.menh} (${coupleData.vo.nguHanh})
- Tương quan Mạng: ${coupleData.tuongSinhMenh.quanHe} (${coupleData.tuongSinhMenh.hop ? 'Tương sinh / Hợp' : 'Tương khắc'}) - ${coupleData.tuongSinhMenh.chiTiet}
- Đồ Hình Cao Ly: ${coupleData.caoly.tenDoHinh} (${coupleData.caoly.danhGia})
  + Thơ Hán Nôm: "${coupleData.caoly.thoHanNom}"
  + Chú thích cổ thư: ${coupleData.caoly.chuThich}
  + Khuyên dạy: ${coupleData.caoly.khuyenNghi}
- Cung Trường Sanh: Chồng [${coupleData.tamtheTruongSanh?.chuChong || 'Trường Sanh'}] - Vợ [${coupleData.tamtheTruongSanh?.chuVo || 'Trường Sanh'}]
- Cô Thần - Quả Tú: ${coupleData.coThanQuaTu?.chiTiet || 'Không phạm'}
- Điểm hòa hợp tổng quan: ${coupleData.tongKetDuyenNo.diemSo}/100 - Xếp loại: ${coupleData.tongKetDuyenNo.xepLoai}
- Lời khuyên hóa giải Đức Năng Thắng Số: ${coupleData.tongKetDuyenNo.loiKhuyenHoaGiai}`;
  }

  output += `\n======================================================`;
  return output;
}
