export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  sources?: string[];
}

export type CanName = 'Giáp' | 'Ất' | 'Bính' | 'Đinh' | 'Mậu' | 'Kỷ' | 'Canh' | 'Tân' | 'Nhâm' | 'Quý';
export type ChiName = 'Tý' | 'Sửu' | 'Dần' | 'Mẹo' | 'Thìn' | 'Tỵ' | 'Ngọ' | 'Mùi' | 'Thân' | 'Dậu' | 'Tuất' | 'Hợi';

export type MenhNguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface CanChiInfo {
  can: CanName;
  chi: ChiName;
  fullName: string;
  lunarYear: number;
  menh: string;
  nguHanh: MenhNguHanh;
  tuoiCon: string;
}

export interface CaoLyGiaiDoan {
  canChong: CanName;
  chiVo: string; // e.g., "Tý", "Sửu hay Dần", "Mẹo"
  chiVoList: ChiName[];
  tenDoHinh: string; // e.g., "Giáp thủ Tý chi đồ"
  thoHanNom: string;
  chuThich: string;
  danhGia: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  tomTat: string;
  khuyenNghi: string;
}

export interface TamTheTruongSanh {
  chu: string; // Trường Sanh, Mộc Dục, Quan Đái, Lâm Quan, Đế Vượng, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng
  yNghia: string;
  baiTho: string;
  danhGia: 'Tốt trọn' | 'Trước xấu sau tốt' | 'Trước sau trọn tốt' | 'Vất vả' | 'Xấu' | 'Khá';
}

export interface TamTheSauChu {
  loai: 'Nam' | 'Nữ';
  chu: 'Hòa Hiệp' | 'Thương Lượng' | 'Ngỗ Nghịch' | 'Bảo Thủ' | 'Nhập Xá' | 'Ly Thê' | 'Trùng Phu' | 'Trùng Thê' | 'Khắc Tử' | 'Tương Hiểm' | 'Cách Sơn' | 'Cầu Tử';
  baiTho: string;
  giaiNghia: string;
}

export interface CoupleAnalysisResult {
  chong: CanChiInfo;
  vo: CanChiInfo;
  tuongSinhMenh: {
    hop: boolean;
    quanHe: string;
    chiTiet: string;
  };
  caoly: CaoLyGiaiDoan;
  tamtheTruongSanh?: {
    chuChong: string;
    chuVo: string;
    giaiDoanChong?: TamTheTruongSanh;
    giaiDoanVo?: TamTheTruongSanh;
  };
  coThanQuaTu?: {
    chongPham: boolean;
    voPham: boolean;
    chiTiet: string;
  };
  tongKetDuyenNo: {
    diemSo: number; // 0 - 100
    xepLoai: 'Thượng Cát' | 'Cát Duyên' | 'Thứ Cát' | 'Bình Duyên' | 'Tiền Khổ Hậu Cam' | 'Nhiều Thử Thách';
    loiKhuyenHoaGiai: string;
  };
}
