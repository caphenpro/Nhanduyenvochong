import { CanName, ChiName, MenhNguHanh } from '../types';

export type TrangThaiTruongSinh =
  | 'Trường sinh'
  | 'Mộc dục'
  | 'Quan đới'
  | 'Lâm quan'
  | 'Đế vượng'
  | 'Suy'
  | 'Bệnh'
  | 'Tử'
  | 'Mộ'
  | 'Tuyệt'
  | 'Thai'
  | 'Dưỡng';

export interface VongTruongSinhCanInfo {
  can: CanName;
  amDuong: 'Dương' | 'Âm';
  nguHanh: MenhNguHanh;
  tenGoi: string;
  chieuDem: 'Thuận' | 'Nghịch';
  khoiTruongSinhTai: ChiName;
  nguyenLyKhoi: string;
  soDoThuTu: { chi: ChiName; trangThai: TrangThaiTruongSinh }[];
}

export interface TamHopCucKhoiTruongSinh {
  hanh: MenhNguHanh;
  tamHop: string;
  khoiTai: ChiName;
  yNghia: string;
}

export const TAM_HOP_CUC_TRUONG_SINH: TamHopCucKhoiTruongSinh[] = [
  {
    hanh: 'Mộc',
    tamHop: 'Hợi - Mão - Mùi',
    khoiTai: 'Hợi',
    yNghia: 'Khởi Trường Sinh tại Hợi (chi đầu tiên của Tam hợp cục Hợi Mão Mùi)',
  },
  {
    hanh: 'Hỏa',
    tamHop: 'Dần - Ngọ - Tuất',
    khoiTai: 'Dần',
    yNghia: 'Khởi Trường Sinh tại Dần (chi đầu tiên của Tam hợp cục Dần Ngọ Tuất)',
  },
  {
    hanh: 'Kim',
    tamHop: 'Tỵ - Dậu - Sửu',
    khoiTai: 'Tỵ',
    yNghia: 'Khởi Trường Sinh tại Tỵ (chi đầu tiên của Tam hợp cục Tỵ Dậu Sửu)',
  },
  {
    hanh: 'Thủy',
    tamHop: 'Thân - Tý - Thìn',
    khoiTai: 'Thân',
    yNghia: 'Khởi Trường Sinh tại Thân (Thủy Thổ đồng hành/đồng cung theo Bát Tự cổ truyền)',
  },
  {
    hanh: 'Thổ',
    tamHop: 'Thân - Tý - Thìn',
    khoiTai: 'Thân',
    yNghia: 'Thổ đồng hành cùng Thủy/Hỏa; trong Vòng Trường Sinh Thổ an theo Hỏa hoặc Thủy (Bát tự truyền thống quy Hỏa Thổ đồng cung)',
  },
];

export const DANH_SACH_TRANG_THAI: {
  ten: TrangThaiTruongSinh;
  phanLoai: 'Vượng Khí' | 'Bình Hòa' | 'Suy Khí' | 'Chuyển Tiếp';
  yNghia: string;
  khuyenGiaDao: string;
}[] = [
  {
    ten: 'Trường sinh',
    phanLoai: 'Vượng Khí',
    yNghia: 'Mầm sống mới xuất hiện, như thai nhi chào đời, sinh khí tràn đầy, cát lành hưng thịnh.',
    khuyenGiaDao: 'Khởi đầu thuận lợi, duyên nợ lâu bền, gia đạo hòa hợp.',
  },
  {
    ten: 'Mộc dục',
    phanLoai: 'Bình Hòa',
    yNghia: 'Như trẻ sơ sinh tắm gội sạch ô uế, còn non nớt, phong lưu, đa tình, cảm xúc dao động.',
    khuyenGiaDao: 'Cần giữ lòng thủy chung, tránh bốc đồng đa mang tình cảm bên ngoài.',
  },
  {
    ten: 'Quan đới',
    phanLoai: 'Vượng Khí',
    yNghia: 'Như người trưởng thành đội mũ mặc áo, bước vào đời lập nghiệp, phát triển công danh.',
    khuyenGiaDao: 'Sự nghiệp thăng tiến, vợ chồng đồng lòng lập cơ đồ.',
  },
  {
    ten: 'Lâm quan',
    phanLoai: 'Vượng Khí',
    yNghia: 'Bước lên đài vinh hiển, như nhận chức vị quan lộc, độc lập, tự chủ, đắc tài đắc lộc.',
    khuyenGiaDao: 'Cung Lộc vượng, kinh tế gia đình vững chắc.',
  },
  {
    ten: 'Đế vượng',
    phanLoai: 'Vượng Khí',
    yNghia: 'Khí thế đỉnh cao cực thịnh, sung mãn tột bậc, như bậc quân vương trị vì thiên hạ.',
    khuyenGiaDao: 'Đỉnh cao tài lộc, cần nhu hòa nhường nhịn tránh cái tôi áp đặt.',
  },
  {
    ten: 'Suy',
    phanLoai: 'Suy Khí',
    yNghia: 'Sau đỉnh cao bắt đầu thoái trào, khí lực giảm sút, tĩnh lặng, hướng nội.',
    khuyenGiaDao: 'Nên cẩn trọng, tích lũy, tránh tranh cãi hơn thua.',
  },
  {
    ten: 'Bệnh',
    phanLoai: 'Suy Khí',
    yNghia: 'Khí lực suy yếu sinh tật bệnh, cơ thể mệt mỏi, cần được chăm sóc an dưỡng.',
    khuyenGiaDao: 'Quan tâm sức khỏe bạn đời, san sẻ việc gia đình.',
  },
  {
    ten: 'Tử',
    phanLoai: 'Suy Khí',
    yNghia: 'Khí chất tĩnh tại ngưng đọng, khép lại một chu kỳ sinh hoạt bên ngoài.',
    khuyenGiaDao: 'Lắng đọng tâm tư, nhẫn nại vượt qua giai đoạn trầm lắng.',
  },
  {
    ten: 'Mộ',
    phanLoai: 'Chuyển Tiếp',
    yNghia: 'Quy tụ về đất, chôn giấu cất giữ, biểu tượng của kho tàng, tích lũy, trầm mặc.',
    khuyenGiaDao: 'Cần cởi mở chia sẻ, tránh giấu kín nỗi niềm làm xa cách tình cảm.',
  },
  {
    ten: 'Tuyệt',
    phanLoai: 'Suy Khí',
    yNghia: 'Khí hình hoàn toàn tan biến, cạn kiệt dấu vết cũ, chuẩn bị đón mầm mống mới.',
    khuyenGiaDao: 'Bình tĩnh trước khó khăn, coi thử thách là cơ hội tái sinh.',
  },
  {
    ten: 'Thai',
    phanLoai: 'Chuyển Tiếp',
    yNghia: 'Khí âm dương lại giao hòa, mầm sống tượng hình trong bụng mẹ, ấm áp chở che.',
    khuyenGiaDao: 'Ấp ủ hy vọng, chuẩn bị chu đáo cho kế hoạch tương lai.',
  },
  {
    ten: 'Dưỡng',
    phanLoai: 'Vượng Khí',
    yNghia: 'Được nuôi dưỡng chở che chờ ngày đơm hoa kết trái, đón ánh bình minh.',
    khuyenGiaDao: 'Vun đắp tình cảm từng ngày, phước lộc gia tăng.',
  },
];

// Bảng tra cứu Vòng Trường Sinh 10 Thiên Can qua 12 Địa Chi
// Khóa: CanName -> ChiName -> TrangThaiTruongSinh
export const BANG_TRA_CUU_10_THIEN_CAN: Record<
  CanName,
  {
    amDuong: 'Dương' | 'Âm';
    nguHanh: MenhNguHanh;
    tenGoi: string;
    chieuDem: 'Thuận' | 'Nghịch';
    khoiTai: ChiName;
    nguyenLy: string;
    diaChiMap: Record<ChiName, TrangThaiTruongSinh>;
  }
> = {
  Giáp: {
    amDuong: 'Dương',
    nguHanh: 'Mộc',
    tenGoi: 'Dương Mộc',
    chieuDem: 'Thuận',
    khoiTai: 'Hợi',
    nguyenLy: 'Khởi Trường Sinh tại Hợi (Tam hợp Hợi Mão Mùi), đếm THUẬN theo chiều kim đồng hồ.',
    diaChiMap: {
      Hợi: 'Trường sinh',
      Tý: 'Mộc dục',
      Sửu: 'Quan đới',
      Dần: 'Lâm quan',
      Mão: 'Đế vượng',
      Mẹo: 'Đế vượng',
      Thìn: 'Suy',
      Tỵ: 'Bệnh',
      Ngọ: 'Tử',
      Mùi: 'Mộ',
      Thân: 'Tuyệt',
      Dậu: 'Thai',
      Tuất: 'Dưỡng',
    },
  },
  Ất: {
    amDuong: 'Âm',
    nguHanh: 'Mộc',
    tenGoi: 'Âm Mộc',
    chieuDem: 'Nghịch',
    khoiTai: 'Ngọ',
    nguyenLy: 'Khởi Trường Sinh tại Ngọ (là vị trí Tử của Giáp), đếm NGHỊCH ngược chiều kim đồng hồ.',
    diaChiMap: {
      Ngọ: 'Trường sinh',
      Tỵ: 'Mộc dục',
      Thìn: 'Quan đới',
      Mão: 'Lâm quan',
      Mẹo: 'Lâm quan',
      Dần: 'Đế vượng',
      Sửu: 'Suy',
      Tý: 'Bệnh',
      Hợi: 'Tử',
      Tuất: 'Mộ',
      Dậu: 'Tuyệt',
      Thân: 'Thai',
      Mùi: 'Dưỡng',
    },
  },
  Bính: {
    amDuong: 'Dương',
    nguHanh: 'Hỏa',
    tenGoi: 'Dương Hỏa',
    chieuDem: 'Thuận',
    khoiTai: 'Dần',
    nguyenLy: 'Khởi Trường Sinh tại Dần (Tam hợp Dần Ngọ Tuất), đếm THUẬN theo chiều kim đồng hồ.',
    diaChiMap: {
      Dần: 'Trường sinh',
      Mão: 'Mộc dục',
      Mẹo: 'Mộc dục',
      Thìn: 'Quan đới',
      Tỵ: 'Lâm quan',
      Ngọ: 'Đế vượng',
      Mùi: 'Suy',
      Thân: 'Bệnh',
      Dậu: 'Tử',
      Tuất: 'Mộ',
      Hợi: 'Tuyệt',
      Tý: 'Thai',
      Sửu: 'Dưỡng',
    },
  },
  Đinh: {
    amDuong: 'Âm',
    nguHanh: 'Hỏa',
    tenGoi: 'Âm Hỏa',
    chieuDem: 'Nghịch',
    khoiTai: 'Dậu',
    nguyenLy: 'Khởi Trường Sinh tại Dậu (là vị trí Tử của Bính), đếm NGHỊCH ngược chiều kim đồng hồ.',
    diaChiMap: {
      Dậu: 'Trường sinh',
      Thân: 'Mộc dục',
      Mùi: 'Quan đới',
      Ngọ: 'Lâm quan',
      Tỵ: 'Đế vượng',
      Thìn: 'Suy',
      Mão: 'Bệnh',
      Mẹo: 'Bệnh',
      Dần: 'Tử',
      Sửu: 'Mộ',
      Tý: 'Tuyệt',
      Hợi: 'Thai',
      Tuất: 'Dưỡng',
    },
  },
  Mậu: {
    amDuong: 'Dương',
    nguHanh: 'Thổ',
    tenGoi: 'Dương Thổ (Hỏa Thổ đồng cung)',
    chieuDem: 'Thuận',
    khoiTai: 'Dần',
    nguyenLy: 'Theo Bát tự truyền thống, Hỏa Thổ đồng hành. Mậu khởi Trường Sinh tại Dần, đếm THUẬN.',
    diaChiMap: {
      Dần: 'Trường sinh',
      Mão: 'Mộc dục',
      Mẹo: 'Mộc dục',
      Thìn: 'Quan đới',
      Tỵ: 'Lâm quan',
      Ngọ: 'Đế vượng',
      Mùi: 'Suy',
      Thân: 'Bệnh',
      Dậu: 'Tử',
      Tuất: 'Mộ',
      Hợi: 'Tuyệt',
      Tý: 'Thai',
      Sửu: 'Dưỡng',
    },
  },
  Kỷ: {
    amDuong: 'Âm',
    nguHanh: 'Thổ',
    tenGoi: 'Âm Thổ (Hỏa Thổ đồng cung)',
    chieuDem: 'Nghịch',
    khoiTai: 'Dậu',
    nguyenLy: 'Hỏa Thổ đồng hành, Kỷ khởi Trường Sinh tại Dậu (vị trí Tử của Mậu), đếm NGHỊCH.',
    diaChiMap: {
      Dậu: 'Trường sinh',
      Thân: 'Mộc dục',
      Mùi: 'Quan đới',
      Ngọ: 'Lâm quan',
      Tỵ: 'Đế vượng',
      Thìn: 'Suy',
      Mão: 'Bệnh',
      Mẹo: 'Bệnh',
      Dần: 'Tử',
      Sửu: 'Mộ',
      Tý: 'Tuyệt',
      Hợi: 'Thai',
      Tuất: 'Dưỡng',
    },
  },
  Canh: {
    amDuong: 'Dương',
    nguHanh: 'Kim',
    tenGoi: 'Dương Kim',
    chieuDem: 'Thuận',
    khoiTai: 'Tỵ',
    nguyenLy: 'Khởi Trường Sinh tại Tỵ (Tam hợp Tỵ Dậu Sửu), đếm THUẬN theo chiều kim đồng hồ.',
    diaChiMap: {
      Tỵ: 'Trường sinh',
      Ngọ: 'Mộc dục',
      Mùi: 'Quan đới',
      Thân: 'Lâm quan',
      Dậu: 'Đế vượng',
      Tuất: 'Suy',
      Hợi: 'Bệnh',
      Tý: 'Tử',
      Sửu: 'Mộ',
      Dần: 'Tuyệt',
      Mão: 'Thai',
      Mẹo: 'Thai',
      Thìn: 'Dưỡng',
    },
  },
  Tân: {
    amDuong: 'Âm',
    nguHanh: 'Kim',
    tenGoi: 'Âm Kim',
    chieuDem: 'Nghịch',
    khoiTai: 'Tý',
    nguyenLy: 'Khởi Trường Sinh tại Tý (là vị trí Tử của Canh), đếm NGHỊCH ngược chiều kim đồng hồ.',
    diaChiMap: {
      Tý: 'Trường sinh',
      Hợi: 'Mộc dục',
      Tuất: 'Quan đới',
      Dậu: 'Lâm quan',
      Thân: 'Đế vượng',
      Mùi: 'Suy',
      Ngọ: 'Bệnh',
      Tỵ: 'Tử',
      Thìn: 'Mộ',
      Mão: 'Tuyệt',
      Mẹo: 'Tuyệt',
      Dần: 'Thai',
      Sửu: 'Dưỡng',
    },
  },
  Nhâm: {
    amDuong: 'Dương',
    nguHanh: 'Thủy',
    tenGoi: 'Dương Thủy',
    chieuDem: 'Thuận',
    khoiTai: 'Thân',
    nguyenLy: 'Khởi Trường Sinh tại Thân (Tam hợp Thân Tý Thìn), đếm THUẬN theo chiều kim đồng hồ.',
    diaChiMap: {
      Thân: 'Trường sinh',
      Dậu: 'Mộc dục',
      Tuất: 'Quan đới',
      Hợi: 'Lâm quan',
      Tý: 'Đế vượng',
      Sửu: 'Suy',
      Dần: 'Bệnh',
      Mão: 'Tử',
      Mẹo: 'Tử',
      Thìn: 'Mộ',
      Tỵ: 'Tuyệt',
      Ngọ: 'Thai',
      Mùi: 'Dưỡng',
    },
  },
  Quý: {
    amDuong: 'Âm',
    nguHanh: 'Thủy',
    tenGoi: 'Âm Thủy',
    chieuDem: 'Nghịch',
    khoiTai: 'Mão',
    nguyenLy: 'Khởi Trường Sinh tại Mão (là vị trí Tử của Nhâm), đếm NGHỊCH ngược chiều kim đồng hồ.',
    diaChiMap: {
      Mão: 'Trường sinh',
      Mẹo: 'Trường sinh',
      Dần: 'Mộc dục',
      Sửu: 'Quan đới',
      Tý: 'Lâm quan',
      Hợi: 'Đế vượng',
      Tuất: 'Suy',
      Dậu: 'Bệnh',
      Thân: 'Tử',
      Mùi: 'Mộ',
      Ngọ: 'Tuyệt',
      Tỵ: 'Thai',
      Thìn: 'Dưỡng',
    },
  },
};

export const CHI_TIET_4_CAP_THIEN_CAN = [
  {
    nhom: '1. Hành Mộc (Giáp - Ất)',
    moTa: 'Giáp là Dương Mộc, Ất là Âm Mộc. Hợi là đất sinh của Mộc (Thủy sinh Mộc).',
    cacCan: [
      {
        can: 'Giáp (Dương Mộc)',
        khoi: 'Khởi Trường Sinh tại Hợi, đếm THUẬN qua 12 Địa Chi:',
        chuoi: 'Hợi (Trường sinh) ➔ Tý (Mộc dục) ➔ Sửu (Quan đới) ➔ Dần (Lâm quan) ➔ Mão (Đế vượng) ➔ Thìn (Suy) ➔ Tị (Bệnh) ➔ Ngọ (Tử) ➔ Mùi (Mộ) ➔ Thân (Tuyệt) ➔ Dậu (Thai) ➔ Tuất (Dưỡng)',
      },
      {
        can: 'Ất (Âm Mộc)',
        khoi: 'Khởi Trường Sinh tại Ngọ (vị trí Tử của Giáp), đếm NGHỊCH qua 12 Địa Chi:',
        chuoi: 'Ngọ (Trường sinh) ➔ Tị (Mộc dục) ➔ Thìn (Quan đới) ➔ Mão (Lâm quan) ➔ Dần (Đế vượng) ➔ Sửu (Suy) ➔ Tý (Bệnh) ➔ Hợi (Tử) ➔ Tuất (Mộ) ➔ Dậu (Tuyệt) ➔ Thân (Thai) ➔ Mùi (Dưỡng)',
      },
    ],
  },
  {
    nhom: '2. Hành Hỏa & Thổ (Bính/Mậu - Đinh/Kỷ)',
    moTa: 'Bát tự truyền thống quy Hỏa và Thổ đồng hành trong Vòng Trường Sinh (Hỏa sinh Thổ, đồng vượng tại phương Nam).',
    cacCan: [
      {
        can: 'Bính / Mậu (Dương Hỏa / Dương Thổ)',
        khoi: 'Khởi Trường Sinh tại Dần (Tam hợp Dần Ngọ Tuất), đếm THUẬN theo chiều kim đồng hồ:',
        chuoi: 'Dần (Trường sinh) ➔ Mão (Mộc dục) ➔ Thìn (Quan đới) ➔ Tị (Lâm quan) ➔ Ngọ (Đế vượng) ➔ Mùi (Suy) ➔ Thân (Bệnh) ➔ Dậu (Tử) ➔ Tuất (Mộ) ➔ Hợi (Tuyệt) ➔ Tý (Thai) ➔ Sửu (Dưỡng)',
      },
      {
        can: 'Đinh / Kỷ (Âm Hỏa / Âm Thổ)',
        khoi: 'Khởi Trường Sinh tại Dậu (vị trí Tử của Bính/Mậu), đếm NGHỊCH ngược chiều kim đồng hồ:',
        chuoi: 'Dậu (Trường sinh) ➔ Thân (Mộc dục) ➔ Mùi (Quan đới) ➔ Ngọ (Lâm quan) ➔ Tị (Đế vượng) ➔ Thìn (Suy) ➔ Mão (Bệnh) ➔ Dần (Tử) ➔ Sửu (Mộ) ➔ Tý (Tuyệt) ➔ Hợi (Thai) ➔ Tuất (Dưỡng)',
      },
    ],
  },
  {
    nhom: '3. Hành Kim (Canh - Tân)',
    moTa: 'Canh là Dương Kim, Tân là Âm Kim. Tị là đất sinh của Kim (Hỏa luyện Kim/Trường Sinh Kim cục).',
    cacCan: [
      {
        can: 'Canh (Dương Kim)',
        khoi: 'Khởi Trường Sinh tại Tị (Tam hợp Tị Dậu Sửu), đếm THUẬN theo chiều kim đồng hồ:',
        chuoi: 'Tị (Trường sinh) ➔ Ngọ (Mộc dục) ➔ Mùi (Quan đới) ➔ Thân (Lâm quan) ➔ Dậu (Đế vượng) ➔ Tuất (Suy) ➔ Hợi (Bệnh) ➔ Tý (Tử) ➔ Sửu (Mộ) ➔ Dần (Tuyệt) ➔ Mão (Thai) ➔ Thìn (Dưỡng)',
      },
      {
        can: 'Tân (Âm Kim)',
        khoi: 'Khởi Trường Sinh tại Tý (vị trí Tử của Canh), đếm NGHỊCH ngược chiều kim đồng hồ:',
        chuoi: 'Tý (Trường sinh) ➔ Hợi (Mộc dục) ➔ Tuất (Quan đới) ➔ Dậu (Lâm quan) ➔ Thân (Đế vượng) ➔ Mùi (Suy) ➔ Ngọ (Bệnh) ➔ Tị (Tử) ➔ Thìn (Mộ) ➔ Mão (Tuyệt) ➔ Dần (Thai) ➔ Sửu (Dưỡng)',
      },
    ],
  },
  {
    nhom: '4. Hành Thủy (Nhâm - Quý)',
    moTa: 'Nhâm là Dương Thủy, Quý là Âm Thủy. Thân là đất sinh của Thủy (Kim sinh Thủy/Trường Sinh Thủy cục).',
    cacCan: [
      {
        can: 'Nhâm (Dương Thủy)',
        khoi: 'Khởi Trường Sinh tại Thân (Tam hợp Thân Tý Thìn), đếm THUẬN theo chiều kim đồng hồ:',
        chuoi: 'Thân (Trường sinh) ➔ Dậu (Mộc dục) ➔ Tuất (Quan đới) ➔ Hợi (Lâm quan) ➔ Tý (Đế vượng) ➔ Sửu (Suy) ➔ Dần (Bệnh) ➔ Mão (Tử) ➔ Thìn (Mộ) ➔ Tị (Tuyệt) ➔ Ngọ (Thai) ➔ Mùi (Dưỡng)',
      },
      {
        can: 'Quý (Âm Thủy)',
        khoi: 'Khởi Trường Sinh tại Mão (vị trí Tử của Nhâm), đếm NGHỊCH ngược chiều kim đồng hồ:',
        chuoi: 'Mão (Trường sinh) ➔ Dần (Mộc dục) ➔ Sửu (Quan đới) ➔ Tý (Lâm quan) ➔ Hợi (Đế vượng) ➔ Tuất (Suy) ➔ Dậu (Bệnh) ➔ Thân (Tử) ➔ Mùi (Mộ) ➔ Ngọ (Tuyệt) ➔ Tị (Thai) ➔ Thìn (Dưỡng)',
      },
    ],
  },
];

export const MEO_NHO_NHANH = [
  {
    tieuDe: 'Dương Sinh Âm Tử',
    noiDung: 'Can Dương sinh tại đâu thì Can Âm cùng hành sẽ tử tại đó; ngược lại, Can Dương tử tại đâu thì Can Âm sẽ khởi Trường Sinh tại đó.',
  },
  {
    tieuDe: 'Trùng Lộc & Kình Dương',
    noiDung: 'Thiên can Dương có các cung vượng (Lâm quan, Đế vượng) trùng với Lộc và Kình dương của chính can đó (Ví dụ: Giáp Lộc tại Dần, Vượng tại Mão).',
  },
  {
    tieuDe: 'Trường Sinh Can Âm tại Mộc Dục Can Dương',
    noiDung: 'Vị trí khởi Trường Sinh của Can Âm chính là vị trí Mộc Dục của Can Dương cùng hành (Ví dụ: Giáp Mộc dục tại Tý ➔ Tân Trường sinh tại Tý; Bính Mộc dục tại Mão ➔ Quý Trường sinh tại Mão).',
  },
  {
    tieuDe: 'Tam Hợp Cục Là Gốc',
    noiDung: 'Bốn điểm khởi Trường Sinh của 4 Can Dương chính là 4 chi đầu tiên trong bộ Tam hợp Ngũ hành: Hợi (Mộc), Dần (Hỏa), Tị (Kim), Thân (Thủy).',
  },
];

export function getTrangThaiTruongSinhCanChi(can: CanName, chi: ChiName): TrangThaiTruongSinh {
  const canData = BANG_TRA_CUU_10_THIEN_CAN[can];
  if (!canData) return 'Trường sinh';
  return canData.diaChiMap[chi] || 'Trường sinh';
}
