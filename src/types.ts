export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  sources?: string[];
}

export type CanName = 'Giáp' | 'Ất' | 'Bính' | 'Đinh' | 'Mậu' | 'Kỷ' | 'Canh' | 'Tân' | 'Nhâm' | 'Quý';
export type ChiName = 'Tý' | 'Sửu' | 'Dần' | 'Mão' | 'Mẹo' | 'Thìn' | 'Tỵ' | 'Ngọ' | 'Mùi' | 'Thân' | 'Dậu' | 'Tuất' | 'Hợi';

export type MenhNguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export type CungPhi = 'Khảm' | 'Ly' | 'Chấn' | 'Tốn' | 'Càn' | 'Khôn' | 'Cấn' | 'Đoài';
export type BatTrachBatCung = 'Sinh Khí' | 'Thiên Y' | 'Diên Niên' | 'Phục Vị' | 'Tuyệt Mệnh' | 'Ngũ Quỷ' | 'Lục Sát' | 'Họa Hại';

export interface CanChiInfo {
  can: CanName;
  chi: ChiName;
  fullName: string;
  lunarYear: number;
  menh: string; // Nạp âm (e.g. Hải Trung Kim)
  nguHanh: MenhNguHanh; // Ngũ hành nạp âm
  canNguHanh: MenhNguHanh; // Ngũ hành của Can
  chiNguHanh: MenhNguHanh; // Ngũ hành của Chi
  cungPhi?: CungPhi; // Cung phi Bát Trạch
  dongTayMenh?: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
  tuoiCon: string;
}

export interface Tang1ThienCan {
  canChong: CanName;
  canVo: CanName;
  quanHe: 'Tương Hợp' | 'Tương Sinh' | 'Tương Khắc' | 'Đồng Hành / Bình Hòa';
  chiTiet: string;
  yNghiaKhi: string;
}

export interface Tang2DiaChi {
  chiChong: ChiName;
  chiVo: ChiName;
  tamHop: boolean;
  tamHopNhom?: string;
  lucHop: boolean;
  lucHopCap?: string;
  lucXung: boolean;
  lucXungCap?: string;
  lucHai: boolean;
  lucHaiCap?: string;
  lucPha: boolean;
  lucPhaCap?: string;
  hinh: boolean;
  hinhLoai?: string;
  chiTietDong: string;
}

export interface Tang3NguHanh {
  chong: { can: MenhNguHanh; chi: MenhNguHanh };
  vo: { can: MenhNguHanh; chi: MenhNguHanh };
  chiTiet: string;
}

export interface Tang4NapAm {
  napAmChong: string;
  nguHanhChong: MenhNguHanh;
  napAmVo: string;
  nguHanhVo: MenhNguHanh;
  quanHe: string;
  phanBietRoRang: string;
}

export interface Tang5CungMenh {
  cungChong: CungPhi;
  dongTayChong: string;
  cungVo: CungPhi;
  dongTayVo: string;
  ketQuaBatTrach: BatTrachBatCung;
  nhomBatTrach: 'Cát' | 'Hung';
  yNghia: string;
}

export interface CaoLyGiaiDoan {
  canChong: CanName;
  chiVo: string;
  chiVoList: ChiName[];
  tenDoHinh: string;
  thoHanNom: string;
  chuThich: string;
  danhGia: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  tomTat: string;
  khuyenNghi: string;
}

export interface TamTheTruongSanh {
  cung?: number;
  ten?: string;
  hanTu?: string;
  nghia?: string;
  chu?: string;
  yNghia?: string;
  baiTho?: string;
  danhGia: string;
  loiGiai?: string;
}

export interface TamTheSauChu {
  chu: string;
  yNghia: string;
  giaiThich: string;
}

export interface CoupleAnalysisResult {
  chong: CanChiInfo;
  vo: CanChiInfo;
  tang1ThienCan: Tang1ThienCan;
  tang2DiaChi: Tang2DiaChi;
  tang3NguHanh: Tang3NguHanh;
  tang4NapAm: Tang4NapAm;
  tang5CungMenh: Tang5CungMenh;
  tuongSinhMenh: {
    hop: boolean;
    quanHe: string;
    chiTiet: string;
  };
  caoly?: CaoLyGiaiDoan;
  tamtheTruongSanh?: {
    chuChong: string;
    chuVo: string;
    giaiDoanChong?: { danhGia: string };
    giaiDoanVo?: { danhGia: string };
  };
  coThanQuaTu?: {
    chongPham: boolean;
    voPham: boolean;
    chiTiet: string;
  };
  cauTrucTongHop: {
    diemThuan: string[];
    diemNghich: string[];
    diemLuuY: string[];
    amDuongCheHoa: string;
    thongDiepCotLoi: string;
    nhanDinhTongQuan: string;
  };
  tongKetDuyenNo: {
    diemSo: number; // Điểm số hiển thị tượng trưng 0-100
    xepLoai: string;
    loiKhuyenHoaGiai: string;
  };
}

