import { CungPhi, MenhNguHanh, BatTrachBatCung } from '../types';

export type BatTrachNhom = 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
export type HuongDiaLy = 'Bắc' | 'Đông' | 'Đông Nam' | 'Nam' | 'Tây Bắc' | 'Tây' | 'Tây Nam' | 'Đông Bắc';
export type DuNienLoai = 'Cát' | 'Hung';

export interface DuNienDetail {
  duNien: BatTrachBatCung;
  loai: DuNienLoai;
  nguHanhDuNien: MenhNguHanh;
  yNghia: string;
}

export interface CungBatTrachInfo {
  cung: CungPhi;
  nguHanh: MenhNguHanh;
  nhom: BatTrachNhom;
  huongHop: string[];
  huongKhongHop: string[];
  huongDetail: Record<HuongDiaLy, DuNienDetail>;
}

export const Y_NGHIA_8_DU_NIEN: Record<BatTrachBatCung, { loai: DuNienLoai; tieuDe: string; yNghia: string; phongThuy: string }> = {
  'Sinh Khí': {
    loai: 'Cát',
    tieuDe: 'Đại Cát — Vượng Tài Lộc & Thăng Tiến',
    yNghia: 'Vượng cho tài lộc, danh tiếng, thăng tiến sự nghiệp, con cái thuận hòa thông minh.',
    phongThuy: 'Thích hợp đặt cửa chính, phòng khách, bàn làm việc, phòng ngủ gia chủ.',
  },
  'Thiên Y': {
    loai: 'Cát',
    tieuDe: 'Thượng Cát — Sức Khỏe & Quý Nhân Trợ Giúp',
    yNghia: 'Chủ về sức khỏe dồi dào, bệnh tật tiêu trừ, tâm tính ổn định, có quý nhân phù trợ.',
    phongThuy: 'Thích hợp đặt phòng ngủ, phòng khám bệnh, bàn làm việc, bếp nấu hướng về Thiên Y.',
  },
  'Diên Niên': {
    loai: 'Cát',
    tieuDe: 'Thứ Cát — Gia Đạo Hòa Thuận & Tình Duyên Bền Chặt',
    yNghia: 'Củng cố các mối quan hệ gia đình, tình yêu, vợ chồng son sắt, sự nghiệp ổn định lâu dài.',
    phongThuy: 'Thích hợp đặt phòng ngủ vợ chồng, cửa chính, phòng sinh hoạt chung.',
  },
  'Phục Vị': {
    loai: 'Cát',
    tieuDe: 'Tiểu Cát — Bình An, Thanh Tịnh & Củng Cố Tinh Thần',
    yNghia: 'Mang lại may mắn nhẹ, sự bình yên, tinh thần vững vàng, nâng cao năng lực nội tại.',
    phongThuy: 'Thích hợp đặt phòng thờ, bàn thờ gia tiên, phòng đọc sách học tập.',
  },
  'Họa Hại': {
    loai: 'Hung',
    tieuDe: 'Thứ Hung — Thị Phi, Trở Ngại & Hao Tổn Nhỏ',
    yNghia: 'Dễ gặp mất mát tài chính nhỏ, thị phi khẩu thiệt, công việc gặp trắc trở không may.',
    phongThuy: 'Không nên đặt cửa chính, phòng ngủ. Có thể đặt nhà kho, nhà vệ sinh để trấn hung.',
  },
  'Lục Sát': {
    loai: 'Hung',
    tieuDe: 'Thứ Hung — Xung Đột, Trục Trặc Quan Hệ & Trì Trệ',
    yNghia: 'Xung đột quan hệ, tai nạn, bất hòa tình cảm, công việc kinh doanh bị trì trệ.',
    phongThuy: 'Tránh đặt cửa chính, giường ngủ; cần giải bằng phong thủy diên niên hoặc hướng bếp.',
  },
  'Ngũ Quỷ': {
    loai: 'Hung',
    tieuDe: 'Đại Hung — Tai Họa, Mất Cắp & Bất Hòa Tranh Chấp',
    yNghia: 'Dễ gặp tai họa, tổn hại tài sản, mất cắp hỏa hoạn, gia đạo bất hòa tranh chấp liên miên.',
    phongThuy: 'Tuyệt đối tránh cửa chính, giường ngủ. Có thể hóa giải bằng hướng bếp Sinh Khí.',
  },
  'Tuyệt Mệnh': {
    loai: 'Hung',
    tieuDe: 'Cực Hung — Bệnh Tật Hiểm Nghèo & Hao Vượng Tài Lộc',
    yNghia: 'Bệnh tật hiểm nghèo, suy vượng tài sản, mưu sự khó thành, tai họa lớn.',
    phongThuy: 'Hung hiểm nhất trong Bát Trạch, cần dùng Thiên Y hoặc sinh khí chế hóa, tu đức bồi phúc.',
  },
};

// Bảng tra cứu Cung Mệnh theo số dư năm sinh âm lịch chia 9
export const BANG_SO_DU_BAT_TRACH: Record<number, { nam: { cung: CungPhi; hanh: MenhNguHanh }; nu: { cung: CungPhi; hanh: MenhNguHanh } }> = {
  1: { nam: { cung: 'Khảm', hanh: 'Thủy' }, nu: { cung: 'Cấn', hanh: 'Thổ' } },
  2: { nam: { cung: 'Ly', hanh: 'Hỏa' }, nu: { cung: 'Càn', hanh: 'Kim' } },
  3: { nam: { cung: 'Cấn', hanh: 'Thổ' }, nu: { cung: 'Đoài', hanh: 'Kim' } },
  4: { nam: { cung: 'Đoài', hanh: 'Kim' }, nu: { cung: 'Cấn', hanh: 'Thổ' } },
  5: { nam: { cung: 'Càn', hanh: 'Kim' }, nu: { cung: 'Ly', hanh: 'Hỏa' } },
  6: { nam: { cung: 'Khôn', hanh: 'Thổ' }, nu: { cung: 'Khảm', hanh: 'Thủy' } },
  7: { nam: { cung: 'Tốn', hanh: 'Mộc' }, nu: { cung: 'Khôn', hanh: 'Thổ' } },
  8: { nam: { cung: 'Chấn', hanh: 'Mộc' }, nu: { cung: 'Chấn', hanh: 'Mộc' } },
  0: { nam: { cung: 'Khôn', hanh: 'Thổ' }, nu: { cung: 'Tốn', hanh: 'Mộc' } },
  9: { nam: { cung: 'Khôn', hanh: 'Thổ' }, nu: { cung: 'Tốn', hanh: 'Mộc' } },
};

// Bảng chi tiết 8 Cung Mệnh kết hợp 8 Hướng Địa Lý
export const BAT_TRACH_8_CUNG_CHI_TIET: Record<CungPhi, CungBatTrachInfo> = {
  Khảm: {
    cung: 'Khảm',
    nguHanh: 'Thủy',
    nhom: 'Đông Tứ Mệnh',
    huongHop: ['Đông Nam (Sinh Khí)', 'Đông (Thiên Y)', 'Nam (Diên Niên)', 'Bắc (Phục Vị)'],
    huongKhongHop: ['Tây (Họa Hại)', 'Tây Bắc (Lục Sát)', 'Đông Bắc (Ngũ Quỷ)', 'Tây Nam (Tuyệt Mệnh)'],
    huongDetail: {
      'Bắc': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Thủy', yNghia: 'Phục vị khí, củng cố bình an gia đạo' },
      'Đông': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Quý nhân hỗ trợ, sức khỏe dồi dào' },
      'Đông Nam': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Tài lộc vượng phát, công danh hanh thông' },
      'Nam': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Vợ chồng hòa thuận, bền vững dài lâu' },
      'Tây Bắc': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Dễ nảy sinh tranh chấp, thị phi' },
      'Tây': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Xui xẻo, hao hụt tài chính nhẹ' },
      'Tây Nam': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Bệnh tật, tai họa, cần hóa giải phong thủy' },
      'Đông Bắc': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Mất cắp, hỏa họa, bất hòa tranh cãi' },
    },
  },
  Chấn: {
    cung: 'Chấn',
    nguHanh: 'Mộc',
    nhom: 'Đông Tứ Mệnh',
    huongHop: ['Nam (Sinh Khí)', 'Bắc (Thiên Y)', 'Đông Nam (Diên Niên)', 'Đông (Phục Vị)'],
    huongKhongHop: ['Tây Nam (Họa Hại)', 'Đông Bắc (Lục Sát)', 'Tây Bắc (Ngũ Quỷ)', 'Tây (Tuyệt Mệnh)'],
    huongDetail: {
      'Bắc': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Sức khỏe an khang, quý nhân trợ lực' },
      'Đông': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Bình yên vững chãi, củng cố nội lực' },
      'Đông Nam': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Gia đạo êm ấm, tình cảm thủy chung' },
      'Nam': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Phát triển mạnh mẽ, danh vọng rạng rỡ' },
      'Tây Bắc': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Xung đột, tổn thất tài vật' },
      'Tây': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Trì trệ, tổn hại, nghịch khí Bát Trạch' },
      'Tây Nam': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Thị phi, trở ngại công danh' },
      'Đông Bắc': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Trục trặc tình cảm, xáo trộn gia quyến' },
    },
  },
  Tốn: {
    cung: 'Tốn',
    nguHanh: 'Mộc',
    nhom: 'Đông Tứ Mệnh',
    huongHop: ['Bắc (Sinh Khí)', 'Nam (Thiên Y)', 'Đông (Diên Niên)', 'Đông Nam (Phục Vị)'],
    huongKhongHop: ['Tây Bắc (Họa Hại)', 'Tây (Lục Sát)', 'Tây Nam (Ngũ Quỷ)', 'Đông Bắc (Tuyệt Mệnh)'],
    huongDetail: {
      'Bắc': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Tài lộc vượng phát, đại cát hanh thông' },
      'Đông': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Quan hệ tốt đẹp, gia đình thuận hòa' },
      'Đông Nam': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Tinh thần vững vàng, an cư lạc nghiệp' },
      'Nam': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Trường thọ, bình an, tiêu trừ bệnh tật' },
      'Tây Bắc': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Khó khăn, khẩu thiệt thị phi' },
      'Tây': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Tai ách, xích mích quan hệ nội ngoại' },
      'Tây Nam': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Hao tài, bất hòa trong công việc' },
      'Đông Bắc': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Tổn thất lớn, cần chuyển hóa phong thủy' },
    },
  },
  Ly: {
    cung: 'Ly',
    nguHanh: 'Hỏa',
    nhom: 'Đông Tứ Mệnh',
    huongHop: ['Đông (Sinh Khí)', 'Đông Nam (Thiên Y)', 'Bắc (Diên Niên)', 'Nam (Phục Vị)'],
    huongKhongHop: ['Đông Bắc (Họa Hại)', 'Tây Nam (Lục Sát)', 'Tây (Ngũ Quỷ)', 'Tây Bắc (Tuyệt Mệnh)'],
    huongDetail: {
      'Bắc': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Sự nghiệp, gia đình hòa thuận ổn định' },
      'Đông': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Vượng khí, phát triển vượt bậc' },
      'Đông Nam': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Sức khỏe dồi dào, phúc lộc trường tồn' },
      'Nam': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Hỏa', yNghia: 'Bình an, may mắn, tinh thần sáng suốt' },
      'Tây Bắc': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Bệnh tật, suy vi tài vận' },
      'Tây': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Tranh chấp, tai tiếng, hao tài tốn của' },
      'Tây Nam': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Tổn hại quan hệ, bất an nội tâm' },
      'Đông Bắc': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Thất thoát tài chính, phiền toái lặt vặt' },
    },
  },
  Càn: {
    cung: 'Càn',
    nguHanh: 'Kim',
    nhom: 'Tây Tứ Mệnh',
    huongHop: ['Tây (Sinh Khí)', 'Đông Bắc (Thiên Y)', 'Tây Nam (Diên Niên)', 'Tây Bắc (Phục Vị)'],
    huongKhongHop: ['Đông Nam (Họa Hại)', 'Bắc (Lục Sát)', 'Đông (Ngũ Quỷ)', 'Nam (Tuyệt Mệnh)'],
    huongDetail: {
      'Tây Bắc': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Củng cố bản thân, uy quyền vững vàng' },
      'Tây': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Thăng tiến công danh, tài lộc vinh hiển' },
      'Tây Nam': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Vợ chồng hòa thuận, gia sự hưng long' },
      'Đông Bắc': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Sức khỏe bình an, trường thọ vô ưu' },
      'Bắc': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Thị phi, trục trặc gia sự' },
      'Đông': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Tai họa, hao tốn tiền của' },
      'Đông Nam': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Mất mát nhẹ, mưu sự trắc trở' },
      'Nam': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Nguy hiểm, tổn hại sức khỏe, nghịch cung' },
    },
  },
  Khôn: {
    cung: 'Khôn',
    nguHanh: 'Thổ',
    nhom: 'Tây Tứ Mệnh',
    huongHop: ['Đông Bắc (Sinh Khí)', 'Tây (Thiên Y)', 'Tây Bắc (Diên Niên)', 'Tây Nam (Phục Vị)'],
    huongKhongHop: ['Đông (Họa Hại)', 'Nam (Lục Sát)', 'Đông Nam (Ngũ Quỷ)', 'Bắc (Tuyệt Mệnh)'],
    huongDetail: {
      'Tây Bắc': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Gia đạo, sự nghiệp êm đẹp trăm năm' },
      'Tây': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Sức khỏe dồi dào, tâm tính nhu thuận' },
      'Tây Nam': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Yên ổn, phát triển tâm trí và đạo hạnh' },
      'Đông Bắc': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Đại cát đại lợi, phú quý hưng thịnh' },
      'Bắc': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Tai họa lớn, cần chú ý sức khỏe' },
      'Đông': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Xui xẻo, thất bại trong đầu tư' },
      'Đông Nam': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Mất mát, xung đột với người ngoài' },
      'Nam': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Xung đột, tai tiếng khẩu thiệt' },
    },
  },
  Đoài: {
    cung: 'Đoài',
    nguHanh: 'Kim',
    nhom: 'Tây Tứ Mệnh',
    huongHop: ['Tây Bắc (Sinh Khí)', 'Tây Nam (Thiên Y)', 'Đông Bắc (Diên Niên)', 'Tây (Phục Vị)'],
    huongKhongHop: ['Bắc (Họa Hại)', 'Đông Nam (Lục Sát)', 'Nam (Ngũ Quỷ)', 'Đông (Tuyệt Mệnh)'],
    huongDetail: {
      'Tây Bắc': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Hanh thông tài lộc, vượng khí dồi dào' },
      'Tây': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Bình an, vững chắc, tâm an trí sáng' },
      'Tây Nam': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Trường thọ, bệnh tật tiêu trừ' },
      'Đông Bắc': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Gia đạo bền vững, tình duyên thắm nồng' },
      'Bắc': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Mất mát, thị phi không đáng có' },
      'Đông': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Tai họa, tổn hại mưu sự' },
      'Đông Nam': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Bất hòa, tai tiếng trong giao tế' },
      'Nam': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Hao tốn tiền bạc, bất an tâm tính' },
    },
  },
  Cấn: {
    cung: 'Cấn',
    nguHanh: 'Thổ',
    nhom: 'Tây Tứ Mệnh',
    huongHop: ['Tây Nam (Sinh Khí)', 'Tây Bắc (Thiên Y)', 'Tây (Diên Niên)', 'Đông Bắc (Phục Vị)'],
    huongKhongHop: ['Nam (Họa Hại)', 'Đông (Lục Sát)', 'Bắc (Ngũ Quỷ)', 'Đông Nam (Tuyệt Mệnh)'],
    huongDetail: {
      'Tây Bắc': { duNien: 'Thiên Y', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Sức khỏe, quý nhân trợ lực hanh thông' },
      'Tây': { duNien: 'Diên Niên', loai: 'Cát', nguHanhDuNien: 'Kim', yNghia: 'Tình cảm, sự nghiệp bền vững' },
      'Tây Nam': { duNien: 'Sinh Khí', loai: 'Cát', nguHanhDuNien: 'Mộc', yNghia: 'Vượng tài vượng khí, con cháu đỗ đạt' },
      'Đông Bắc': { duNien: 'Phục Vị', loai: 'Cát', nguHanhDuNien: 'Thổ', yNghia: 'Bình an, may mắn, điềm tĩnh vững tâm' },
      'Bắc': { duNien: 'Ngũ Quỷ', loai: 'Hung', nguHanhDuNien: 'Hỏa', yNghia: 'Tranh chấp, hao tài, xáo trộn nội bộ' },
      'Đông': { duNien: 'Lục Sát', loai: 'Hung', nguHanhDuNien: 'Thủy', yNghia: 'Thị phi, trì trệ trong kế hoạch' },
      'Đông Nam': { duNien: 'Tuyệt Mệnh', loai: 'Hung', nguHanhDuNien: 'Kim', yNghia: 'Bệnh tật, xui xẻo, nghịch khí' },
      'Nam': { duNien: 'Họa Hại', loai: 'Hung', nguHanhDuNien: 'Thổ', yNghia: 'Rắc rối nhỏ, thất bại việc lặt vặt' },
    },
  },
};

/**
 * Tính Cung Mệnh Bát Trạch chuẩn xác theo năm sinh âm lịch và giới tính
 * Thuật toán: Cộng tất cả chữ số năm sinh, lấy số dư chia cho 9 (nếu chia hết lấy 9 hoặc 0)
 */
export function calculateBatTrachByYear(year: number, gender: 'Nam' | 'Nữ'): {
  cung: CungPhi;
  nguHanh: MenhNguHanh;
  nhom: BatTrachNhom;
  soDu: number;
  tongChuSo: number;
} {
  const digits = String(year).split('').map(Number);
  const totalSum = digits.reduce((a, b) => a + b, 0);
  const soDu = totalSum % 9;

  const mapping = BANG_SO_DU_BAT_TRACH[soDu] || BANG_SO_DU_BAT_TRACH[0];
  const target = gender === 'Nam' ? mapping.nam : mapping.nu;

  const dongTuCung: CungPhi[] = ['Khảm', 'Ly', 'Chấn', 'Tốn'];
  const nhom: BatTrachNhom = dongTuCung.includes(target.cung) ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh';

  return {
    cung: target.cung,
    nguHanh: target.hanh,
    nhom,
    soDu,
    tongChuSo: totalSum,
  };
}
