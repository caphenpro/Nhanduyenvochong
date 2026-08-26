import { CanName, ChiName, MenhNguHanh, CanChiInfo, TamTheTruongSanh, TamTheSauChu } from '../types';

export const THIEN_CAN: CanName[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const DIA_CHI: ChiName[] = ['Tý', 'Sửu', 'Dần', 'Mẹo', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const NGU_HANH_NAP_AM_60: Record<number, { can: CanName; chi: ChiName; menh: string; nguHanh: MenhNguHanh; tuoiCon: string }> = {
  1948: { can: 'Mậu', chi: 'Tý', menh: 'Tích Lịch Hỏa (Lửa sấm sét)', nguHanh: 'Hỏa', tuoiCon: 'Chuột' },
  1949: { can: 'Kỷ', chi: 'Sửu', menh: 'Tích Lịch Hỏa (Lửa sấm sét)', nguHanh: 'Hỏa', tuoiCon: 'Trâu' },
  1950: { can: 'Canh', chi: 'Dần', menh: 'Tòng Bá Mộc (Cây tùng bách)', nguHanh: 'Mộc', tuoiCon: 'Cọp' },
  1951: { can: 'Tân', chi: 'Mẹo', menh: 'Tòng Bá Mộc (Cây tùng bách)', nguHanh: 'Mộc', tuoiCon: 'Mèo' },
  1952: { can: 'Nhâm', chi: 'Thìn', menh: 'Trường Lưu Thủy (Nước chảy dài)', nguHanh: 'Thủy', tuoiCon: 'Rồng' },
  1953: { can: 'Quý', chi: 'Tỵ', menh: 'Trường Lưu Thủy (Nước chảy dài)', nguHanh: 'Thủy', tuoiCon: 'Rắn' },
  1954: { can: 'Giáp', chi: 'Ngọ', menh: 'Sa Trung Kim (Vàng trong cát)', nguHanh: 'Kim', tuoiCon: 'Ngựa' },
  1955: { can: 'Ất', chi: 'Mùi', menh: 'Sa Trung Kim (Vàng trong cát)', nguHanh: 'Kim', tuoiCon: 'Dê' },
  1956: { can: 'Bính', chi: 'Thân', menh: 'Sơn Hạ Hỏa (Lửa dưới núi)', nguHanh: 'Hỏa', tuoiCon: 'Khỉ' },
  1957: { can: 'Đinh', chi: 'Dậu', menh: 'Sơn Hạ Hỏa (Lửa dưới núi)', nguHanh: 'Hỏa', tuoiCon: 'Gà' },
  1958: { can: 'Mậu', chi: 'Tuất', menh: 'Bình Địa Mộc (Cây đồng bằng)', nguHanh: 'Mộc', tuoiCon: 'Chó' },
  1959: { can: 'Kỷ', chi: 'Hợi', menh: 'Bình Địa Mộc (Cây đồng bằng)', nguHanh: 'Mộc', tuoiCon: 'Heo' },
  1960: { can: 'Canh', chi: 'Tý', menh: 'Bích Thượng Thổ (Đất vách nhà)', nguHanh: 'Thổ', tuoiCon: 'Chuột' },
  1961: { can: 'Tân', chi: 'Sửu', menh: 'Bích Thượng Thổ (Đất vách nhà)', nguHanh: 'Thổ', tuoiCon: 'Trâu' },
  1962: { can: 'Nhâm', chi: 'Dần', menh: 'Kim Bạc Kim (Vàng lá trắng)', nguHanh: 'Kim', tuoiCon: 'Cọp' },
  1963: { can: 'Quý', chi: 'Mẹo', menh: 'Kim Bạc Kim (Vàng lá trắng)', nguHanh: 'Kim', tuoiCon: 'Mèo' },
  1964: { can: 'Giáp', chi: 'Thìn', menh: 'Phúc Đăng Hỏa (Lửa ngọn đèn)', nguHanh: 'Hỏa', tuoiCon: 'Rồng' },
  1965: { can: 'Ất', chi: 'Tỵ', menh: 'Phúc Đăng Hỏa (Lửa ngọn đèn)', nguHanh: 'Hỏa', tuoiCon: 'Rắn' },
  1966: { can: 'Bính', chi: 'Ngọ', menh: 'Thiên Hà Thủy (Nước trên trời)', nguHanh: 'Thủy', tuoiCon: 'Ngựa' },
  1967: { can: 'Đinh', chi: 'Mùi', menh: 'Thiên Hà Thủy (Nước trên trời)', nguHanh: 'Thủy', tuoiCon: 'Dê' },
  1968: { can: 'Mậu', chi: 'Thân', menh: 'Đại Trạch Thổ (Đất nền chòi)', nguHanh: 'Thổ', tuoiCon: 'Khỉ' },
  1969: { can: 'Kỷ', chi: 'Dậu', menh: 'Đại Trạch Thổ (Đất nền chòi)', nguHanh: 'Thổ', tuoiCon: 'Gà' },
  1970: { can: 'Canh', chi: 'Tuất', menh: 'Thoa Xuyến Kim (Vàng đeo tay)', nguHanh: 'Kim', tuoiCon: 'Chó' },
  1971: { can: 'Tân', chi: 'Hợi', menh: 'Thoa Xuyến Kim (Vàng đeo tay)', nguHanh: 'Kim', tuoiCon: 'Heo' },
  1972: { can: 'Nhâm', chi: 'Tý', menh: 'Tang Đố Mộc (Gỗ cây dâu)', nguHanh: 'Mộc', tuoiCon: 'Chuột' },
  1973: { can: 'Quý', chi: 'Sửu', menh: 'Tang Đố Mộc (Gỗ cây dâu)', nguHanh: 'Mộc', tuoiCon: 'Trâu' },
  1974: { can: 'Giáp', chi: 'Dần', menh: 'Đại Khê Thủy (Nước khe lớn)', nguHanh: 'Thủy', tuoiCon: 'Cọp' },
  1975: { can: 'Ất', chi: 'Mẹo', menh: 'Đại Khê Thủy (Nước khe lớn)', nguHanh: 'Thủy', tuoiCon: 'Mèo' },
  1976: { can: 'Bính', chi: 'Thìn', menh: 'Sa Trung Thổ (Đất trong cát)', nguHanh: 'Thổ', tuoiCon: 'Rồng' },
  1977: { can: 'Đinh', chi: 'Tỵ', menh: 'Sa Trung Thổ (Đất trong cát)', nguHanh: 'Thổ', tuoiCon: 'Rắn' },
  1978: { can: 'Mậu', chi: 'Ngọ', menh: 'Thiên Thượng Hỏa (Lửa trên trời)', nguHanh: 'Hỏa', tuoiCon: 'Ngựa' },
  1979: { can: 'Kỷ', chi: 'Mùi', menh: 'Thiên Thượng Hỏa (Lửa trên trời)', nguHanh: 'Hỏa', tuoiCon: 'Dê' },
  1980: { can: 'Canh', chi: 'Thân', menh: 'Thạch Lựu Mộc (Cây lựu đá)', nguHanh: 'Mộc', tuoiCon: 'Khỉ' },
  1981: { can: 'Tân', chi: 'Dậu', menh: 'Thạch Lựu Mộc (Cây lựu đá)', nguHanh: 'Mộc', tuoiCon: 'Gà' },
  1982: { can: 'Nhâm', chi: 'Tuất', menh: 'Đại Hải Thủy (Nước biển lớn)', nguHanh: 'Thủy', tuoiCon: 'Chó' },
  1983: { can: 'Quý', chi: 'Hợi', menh: 'Đại Hải Thủy (Nước biển lớn)', nguHanh: 'Thủy', tuoiCon: 'Heo' },
  1984: { can: 'Giáp', chi: 'Tý', menh: 'Hải Trung Kim (Vàng dưới biển)', nguHanh: 'Kim', tuoiCon: 'Chuột' },
  1985: { can: 'Ất', chi: 'Sửu', menh: 'Hải Trung Kim (Vàng dưới biển)', nguHanh: 'Kim', tuoiCon: 'Trâu' },
  1986: { can: 'Bính', chi: 'Dần', menh: 'Lư Trung Hỏa (Lửa trong lò)', nguHanh: 'Hỏa', tuoiCon: 'Cọp' },
  1987: { can: 'Đinh', chi: 'Mẹo', menh: 'Lư Trung Hỏa (Lửa trong lò)', nguHanh: 'Hỏa', tuoiCon: 'Mèo' },
  1988: { can: 'Mậu', chi: 'Thìn', menh: 'Đại Lâm Mộc (Cây rừng lớn)', nguHanh: 'Mộc', tuoiCon: 'Rồng' },
  1989: { can: 'Kỷ', chi: 'Tỵ', menh: 'Đại Lâm Mộc (Cây rừng lớn)', nguHanh: 'Mộc', tuoiCon: 'Rắn' },
  1990: { can: 'Canh', chi: 'Ngọ', menh: 'Lộ Bàng Thổ (Đất ven đường)', nguHanh: 'Thổ', tuoiCon: 'Ngựa' },
  1991: { can: 'Tân', chi: 'Mùi', menh: 'Lộ Bàng Thổ (Đất ven đường)', nguHanh: 'Thổ', tuoiCon: 'Dê' },
  1992: { can: 'Nhâm', chi: 'Thân', menh: 'Kiếm Phong Kim (Vàng gươm nhọn)', nguHanh: 'Kim', tuoiCon: 'Khỉ' },
  1993: { can: 'Quý', chi: 'Dậu', menh: 'Kiếm Phong Kim (Vàng gươm nhọn)', nguHanh: 'Kim', tuoiCon: 'Gà' },
  1994: { can: 'Giáp', chi: 'Tuất', menh: 'Sơn Đầu Hỏa (Lửa trên núi)', nguHanh: 'Hỏa', tuoiCon: 'Chó' },
  1995: { can: 'Ất', chi: 'Hợi', menh: 'Sơn Đầu Hỏa (Lửa trên núi)', nguHanh: 'Hỏa', tuoiCon: 'Heo' },
  1996: { can: 'Bính', chi: 'Tý', menh: 'Giang Hạ Thủy (Nước dưới sông)', nguHanh: 'Thủy', tuoiCon: 'Chuột' },
  1997: { can: 'Đinh', chi: 'Sửu', menh: 'Giang Hạ Thủy (Nước dưới sông)', nguHanh: 'Thủy', tuoiCon: 'Trâu' },
  1998: { can: 'Mậu', chi: 'Dần', menh: 'Thành Đầu Thổ (Đất đầu thành)', nguHanh: 'Thổ', tuoiCon: 'Cọp' },
  1999: { can: 'Kỷ', chi: 'Mẹo', menh: 'Thành Đầu Thổ (Đất đầu thành)', nguHanh: 'Thổ', tuoiCon: 'Mèo' },
  2000: { can: 'Canh', chi: 'Thìn', menh: 'Bạch Lạp Kim (Vàng chân đèn)', nguHanh: 'Kim', tuoiCon: 'Rồng' },
  2001: { can: 'Tân', chi: 'Tỵ', menh: 'Bạch Lạp Kim (Vàng chân đèn)', nguHanh: 'Kim', tuoiCon: 'Rắn' },
  2002: { can: 'Nhâm', chi: 'Ngọ', menh: 'Dương Liễu Mộc (Cây dương liễu)', nguHanh: 'Mộc', tuoiCon: 'Ngựa' },
  2003: { can: 'Quý', chi: 'Mùi', menh: 'Dương Liễu Mộc (Cây dương liễu)', nguHanh: 'Mộc', tuoiCon: 'Dê' },
  2004: { can: 'Giáp', chi: 'Thân', menh: 'Tuyền Trung Thủy (Nước trong giếng)', nguHanh: 'Thủy', tuoiCon: 'Khỉ' },
  2005: { can: 'Ất', chi: 'Dậu', menh: 'Tuyền Trung Thủy (Nước trong giếng)', nguHanh: 'Thủy', tuoiCon: 'Gà' },
  2006: { can: 'Bính', chi: 'Tuất', menh: 'Ốc Thượng Thổ (Đất nóc nhà)', nguHanh: 'Thổ', tuoiCon: 'Chó' },
  2007: { can: 'Đinh', chi: 'Hợi', menh: 'Ốc Thượng Thổ (Đất nóc nhà)', nguHanh: 'Thổ', tuoiCon: 'Heo' },
  2008: { can: 'Mậu', chi: 'Tý', menh: 'Tích Lịch Hỏa (Lửa sấm chớp)', nguHanh: 'Hỏa', tuoiCon: 'Chuột' },
  2009: { can: 'Kỷ', chi: 'Sửu', menh: 'Tích Lịch Hỏa (Lửa sấm chớp)', nguHanh: 'Hỏa', tuoiCon: 'Trâu' },
  2010: { can: 'Canh', chi: 'Dần', menh: 'Tòng Bá Mộc (Cây tùng bách)', nguHanh: 'Mộc', tuoiCon: 'Cọp' },
  2011: { can: 'Tân', chi: 'Mẹo', menh: 'Tòng Bá Mộc (Cây tùng bách)', nguHanh: 'Mộc', tuoiCon: 'Mèo' },
  2012: { can: 'Nhâm', chi: 'Thìn', menh: 'Trường Lưu Thủy (Nước chảy dài)', nguHanh: 'Thủy', tuoiCon: 'Rồng' },
  2013: { can: 'Quý', chi: 'Tỵ', menh: 'Trường Lưu Thủy (Nước chảy dài)', nguHanh: 'Thủy', tuoiCon: 'Rắn' },
  2014: { can: 'Giáp', chi: 'Ngọ', menh: 'Sa Trung Kim (Vàng trong cát)', nguHanh: 'Kim', tuoiCon: 'Ngựa' },
  2015: { can: 'Ất', chi: 'Mùi', menh: 'Sa Trung Kim (Vàng trong cát)', nguHanh: 'Kim', tuoiCon: 'Dê' },
  2016: { can: 'Bính', chi: 'Thân', menh: 'Sơn Hạ Hỏa (Lửa dưới núi)', nguHanh: 'Hỏa', tuoiCon: 'Khỉ' },
  2017: { can: 'Đinh', chi: 'Dậu', menh: 'Sơn Hạ Hỏa (Lửa dưới núi)', nguHanh: 'Hỏa', tuoiCon: 'Gà' },
  2018: { can: 'Mậu', chi: 'Tuất', menh: 'Bình Địa Mộc (Cây đất bằng)', nguHanh: 'Mộc', tuoiCon: 'Chó' },
  2019: { can: 'Kỷ', chi: 'Hợi', menh: 'Bình Địa Mộc (Cây đất bằng)', nguHanh: 'Mộc', tuoiCon: 'Heo' },
  2020: { can: 'Canh', chi: 'Tý', menh: 'Bích Thượng Thổ (Đất vách nhà)', nguHanh: 'Thổ', tuoiCon: 'Chuột' },
  2021: { can: 'Tân', chi: 'Sửu', menh: 'Bích Thượng Thổ (Đất vách nhà)', nguHanh: 'Thổ', tuoiCon: 'Trâu' },
  2022: { can: 'Nhâm', chi: 'Dần', menh: 'Kim Bạc Kim (Vàng lá trắng)', nguHanh: 'Kim', tuoiCon: 'Cọp' },
  2023: { can: 'Quý', chi: 'Mẹo', menh: 'Kim Bạc Kim (Vàng lá trắng)', nguHanh: 'Kim', tuoiCon: 'Mèo' },
  2024: { can: 'Giáp', chi: 'Thìn', menh: 'Phúc Đăng Hỏa (Lửa ngọn đèn)', nguHanh: 'Hỏa', tuoiCon: 'Rồng' },
  2025: { can: 'Ất', chi: 'Tỵ', menh: 'Phúc Đăng Hỏa (Lửa ngọn đèn)', nguHanh: 'Hỏa', tuoiCon: 'Rắn' },
  2026: { can: 'Bính', chi: 'Ngọ', menh: 'Thiên Hà Thủy (Nước trên trời)', nguHanh: 'Thủy', tuoiCon: 'Ngựa' },
  2027: { can: 'Đinh', chi: 'Mùi', menh: 'Thiên Hà Thủy (Nước trên trời)', nguHanh: 'Thủy', tuoiCon: 'Dê' },
  2028: { can: 'Mậu', chi: 'Thân', menh: 'Đại Trạch Thổ (Đất nền chòi)', nguHanh: 'Thổ', tuoiCon: 'Khỉ' },
  2029: { can: 'Kỷ', chi: 'Dậu', menh: 'Đại Trạch Thổ (Đất nền chòi)', nguHanh: 'Thổ', tuoiCon: 'Gà' },
  2030: { can: 'Canh', chi: 'Tuất', menh: 'Thoa Xuyến Kim (Vàng đeo tay)', nguHanh: 'Kim', tuoiCon: 'Chó' }
};

export function getCanChiByYear(year: number): CanChiInfo {
  if (NGU_HANH_NAP_AM_60[year]) {
    const info = NGU_HANH_NAP_AM_60[year];
    return {
      can: info.can,
      chi: info.chi,
      fullName: `${info.can} ${info.chi}`,
      lunarYear: year,
      menh: info.menh,
      nguHanh: info.nguHanh,
      tuoiCon: info.tuoiCon,
    };
  }

  // Formula if year is outside table
  const canIndex = (year + 6) % 10;
  const chiIndex = (year + 8) % 12;
  const can = THIEN_CAN[canIndex];
  const chi = DIA_CHI[chiIndex];
  const cycleYear = 1984 + ((year - 1984) % 60 + 60) % 60;
  const info = NGU_HANH_NAP_AM_60[cycleYear] || { menh: 'Ngũ Hành Nạp Âm', nguHanh: 'Kim', tuoiCon: chi };
  
  return {
    can,
    chi,
    fullName: `${can} ${chi}`,
    lunarYear: year,
    menh: info.menh,
    nguHanh: info.nguHanh,
    tuoiCon: info.tuoiCon,
  };
}

export function checkNguHanhRelation(chong: MenhNguHanh, vo: MenhNguHanh) {
  const tuongSinh: Record<MenhNguHanh, MenhNguHanh> = {
    'Kim': 'Thủy',
    'Thủy': 'Mộc',
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
  };

  const tuongKhac: Record<MenhNguHanh, MenhNguHanh> = {
    'Kim': 'Mộc',
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
  };

  if (chong === vo) {
    return {
      hop: true,
      quanHe: 'Lưỡng Mạng Tương Hòa (Bình Hòa / Cát)',
      chiTiet: `Chồng mạng ${chong} gặp Vợ mạng ${vo}: Lưỡng ${chong} cùng hành, vợ chồng bình hòa, tương trợ lẫn nhau cùng lập gia thất.`,
    };
  }

  if (tuongSinh[chong] === vo) {
    return {
      hop: true,
      quanHe: 'Chồng Sanh Vợ (Tương Sinh - Đại Cát)',
      chiTiet: `Chồng mạng ${chong} tương sinh cho Vợ mạng ${vo} (${chong} sanh ${vo}): Người chồng yêu thương, che chở và vun đắp cho vợ, gia đạo ấm êm phát tài.`,
    };
  }

  if (tuongSinh[vo] === chong) {
    return {
      hop: true,
      quanHe: 'Vợ Sanh Chồng (Tương Sinh - Đại Cát)',
      chiTiet: `Vợ mạng ${vo} tương sinh cho Chồng mạng ${chong} (${vo} sanh ${chong}): Người vợ vượng phu ích tử, phò trợ sự nghiệp gia đình hưng thịnh.`,
    };
  }

  if (tuongKhac[chong] === vo) {
    return {
      hop: false,
      quanHe: 'Chồng Khắc Vợ (Tương Khắc - Thứ Hung)',
      chiTiet: `Chồng mạng ${chong} khắc Vợ mạng ${vo} (${chong} khắc ${vo}): Cần nhường nhịn, bồi đắp đức hạnh và thông cảm tránh khẩu thiệt bất hòa.`,
    };
  }

  if (tuongKhac[vo] === chong) {
    return {
      hop: false,
      quanHe: 'Vợ Khắc Chồng (Tương Khắc - Đại Kỵ)',
      chiTiet: `Vợ mạng ${vo} khắc Chồng mạng ${chong} (${vo} khắc ${chong}): Cần hành thiện tích đức, hạ cái tôi, người vợ nên nhu hòa nương tựa người chồng.`,
    };
  }

  return {
    hop: true,
    quanHe: 'Bình Thường',
    chiTiet: `Hai mạng ${chong} và ${vo} hòa hợp bình ổn.`,
  };
}

// 12 chữ Trường Sanh theo Mạng và Tháng sanh
export const TRUONG_SANH_DATA: Record<string, TamTheTruongSanh> = {
  'Trường Sanh': {
    chu: 'Trường Sanh',
    yNghia: 'Vợ chồng duyên nợ đặng thành, trăm năm tơ tóc yến anh giao hòa. Trọn đời có một, dẫu là có hai.',
    baiTho: `Mẹ cha tích đức dày công,\nNên nay con hưởng phước hồng Trường Sanh.\nVợ chồng duyên nợ đặng thành,\nTrăm năm tơ tóc yến anh giao hòa.\nSống lâu an hưởng một nhà,\nTrọn đời có một dẫu là có hai.\nTôi trai tớ gái hàng ngày,\nSố này có đức hậu lai đặng nhờ.`,
    danhGia: 'Tốt trọn',
  },
  'Mộc Dục': {
    chu: 'Mộc Dục',
    yNghia: 'Chẳng may trắc trở chớ phiền, một đời thứ nhất không yên, đời sau vương vấn linh đinh, thứ ba hòa hiệp chung tình trăm năm.',
    baiTho: `Chẳng may số hễ ở trời,\nSanh nhằm Mộc Dục đổi dời căn duyên.\nHôn nhân trắc trở chớ phiền,\nMột đời thứ nhứt không yên gia đình.\nĐời sau vương vấn linh đinh,\nThứ ba hòa hiệp chung tình trăm năm.\nLo cho huynh đệ nhứt tâm,\nViệc rồi kết oán thù thâm nở đành.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Quan Đái': {
    chu: 'Quan Đái',
    yNghia: 'Đeo mang nợ tình, hai đời chịu linh đinh, thình lình gặp mối chung tình thứ ba, ngày sau nên cửa nên nhà.',
    baiTho: `Than ôi! Trong cảnh phòng loan,\nSanh nhằm Quan Đái đeo mang nợ tình.\nHai đời phải chịu linh đinh,\nThình lình gặp mối chung tình thứ ba.\nNgày sau nên cửa nên nhà,\nĐến già trọn đạo gọi là phu thê.\nTrong bề gia đạo đề huề,\nTề gia nội trợ mọi bề đặng an.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Lâm Quan': {
    chu: 'Lâm Quan',
    yNghia: 'Thân phận bạc sau này, vợ chồng ai cũng ước ao, tại sao có bạn khác như không, cách sông các núi vợ chồng quạnh hiu.',
    baiTho: `Hỡi thân phận bạc sau này,\nLâm Quan rủi gặp nỗi này đớn đau.\nVợ chồng ai cũng ước ao,\nTại sao có bạn khác nào như không.\nCách sông cách núi vợ chồng,\nÝ tình không hạp loan phòng quạnh hiu.\nNhớ trông buồn tủi bao nhiêu,\nĐến khi gặp mặt khó yêu tình chàng.`,
    danhGia: 'Xấu',
  },
  'Đế Vượng': {
    chu: 'Đế Vượng',
    yNghia: 'Khá nên tích đức thi công, sanh nhằm Đế Vượng phước hồng tương giao. Hôn nhân gặp chỗ sang giàu, thong thả phỉ nguyền thuận hòa thảnh thơi.',
    baiTho: `Khá nên tích đức thi công,\nSanh nhằm Đế Vượng phước hồng tương giao.\nHôn nhân gặp chỗ sang giàu,\nMột đời thong thả cùng nhau phỉ nguyền.\nThiên nhiên sở định lương duyên,\nThượng hòa hạ mục miệng đời đời khen.\nSố này duyên nợ chẳng dời,\nThảnh thơi lo liệu an nơi gia đình.`,
    danhGia: 'Trước sau trọn tốt',
  },
  'Suy': {
    chu: 'Suy',
    yNghia: 'Căn số vô phần, gặp duyên bạc phận, đôi co nhiều tiếng thiệt hơn, hai đời đổi xây, thứ ba mới sum vầy.',
    baiTho: `Thảm thay căn số vô phần,\nGặp duyên bạc phận sanh nhằm chữ Suy.\nMạng ai nấy tính không tùy,\nGặp nhau hiềm tỵ khác gì tù nhơn.\nĐôi co nhiều tiếng thiệt hơn,\nSâm thương hai ngã như đờn thiếu dây.\nHai đời phải chịu đổi xây,\nThứ ba mới đặng sum vầy nợ duyên.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Bệnh': {
    chu: 'Bệnh',
    yNghia: 'Thảm buồn cảnh nợ duyên, sanh ly tử biệt hai đường, thứ nhì mới đặng sum vầy lâu bền.',
    baiTho: `Thảm buồn cho cảnh nợ duyên,\nSanh nhằm chữ Bệnh lụy liên gia đình.\nThở than phiền trách phận mình,\nRồi đây thọ lãnh giữ gìn lư hương.\nSanh ly tử biệt hai đường,\nDẫu mà không thác tang thương chia lìa.\nTấn tu nhơn đức trau tria,\nThứ nhì mới đặng đó đây sum vầy.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Tử': {
    chu: 'Tử',
    yNghia: 'Phạm chữ Tử vương nhằm, không trùng duyên nợ đâu mà bình an. Đời sau trọn nghĩa trọn nghì, kết nguyền tơ tóc bền lâu.',
    baiTho: `Câu rằng: phu phụ tình thâm,\nPhạm nay chữ Tử vương nhằm cho ta.\nVợ chồng không đặng hiệp hòa,\nKhông trùng duyên nợ đâu mà bình an.\nMột đời thứ nhứt lo toan,\nKhông lìa thì thác hai đàng biệt ly.\nĐời sau trọn nghĩa trọn nghì,\nKết nguyền tơ tóc phải thì bền lâu.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Mộ': {
    chu: 'Mộ',
    yNghia: 'Căn duyên mù tịt lỡ làng, trước dời xóm kiến chòm ong, đời sau qui hiệp bướm bồng đa đoan, sau rồi ở góa an một mình.',
    baiTho: `Vợ chồng nghĩa trọng tình thâm,\nSanh nhằm chữ Mộ vương lâm cho chàng.\nCăn duyên mù tịt lỡ làng,\nKhi tan khi hiệp đôi đàng mới xong.\nTrước dời xóm kiến chòm ong,\nĐời sau qui hiệp bướm bồng đa đoan.\nVợ chồng mới đặng bình an,\nĐến sau rồi cũng bình an một mình.`,
    danhGia: 'Vất vả',
  },
  'Tuyệt': {
    chu: 'Tuyệt',
    yNghia: 'Duyên nợ chẳng lành, thêm sầu số phận quản bao, hai đời không bền, đời thứ ba mới an gia định.',
    baiTho: `Vợ chồng duyên nợ chẳng lành,\nSanh nhằm chữ Tuyệt bao đành sầu đau.\nThêm sầu số phận quản bao,\nXem trong duyên nợ khắc hào phu thê.\nMãng lo tranh đấu bộn bề,\nTrải qua bao độ gia tề mới an.\nBởi do số hệ chớ than,\nKỳ ba trời định mới an gia đình.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Thai': {
    chu: 'Thai',
    yNghia: 'Hồng nhan cốt cách xinh tươi, tiếng cười có duyên, thứ nhất vẹn tuyền đặng đâu, thứ nhì mới giao đầu phụng loan phát đạt.',
    baiTho: `Hồng nhan cốt cách xinh tươi,\nXuê xoa ăn mặc tiếng cười có duyên.\nDè đâu tình nghĩa ưu phiền,\nLương duyên thứ nhứt vẹn tuyền đặng đâu.\nCủa tiền hao tốn ngõ hầu,\nThứ nhì mới đặng giao đầu phụng loan.\nPhỉ nguyền tình thiếp nghĩa chàng,\nGia đình phát đạt đặng an một nhà.`,
    danhGia: 'Trước xấu sau tốt',
  },
  'Dưỡng': {
    chu: 'Dưỡng',
    yNghia: 'Trời Đất cho ta, vợ chồng phối ngẫu giao hoà bình an. Đồng một tuổi một tháng sanh thì đặng giàu sang, năm có con mau chóng.',
    baiTho: `Số này Trời Đất cho ta,\nVợ chồng phối ngẫu giao hoà bình an.\nPhụng loan kết cánh vầy đoàn,\nMột năm sanh dưỡng phòng loan kịp kỳ.\nĂn mặc đầy đủ số ni,\nVợ chồng một tuổi vậy thời giàu sang.\nChớ lo duyên nợ lỡ làng,\nVợ chồng hoà hiệp luận bàn thất gia.`,
    danhGia: 'Tốt trọn',
  }
};

// Tra cứu chữ Trường Sanh theo Mạng và Tháng sanh
export function getTruongSanhChu(nguHanh: MenhNguHanh, thangSanh: number): string {
  const thang = ((thangSanh - 1) % 12 + 12) % 12 + 1;
  const chuArray = ['Trường Sanh', 'Mộc Dục', 'Quan Đái', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
  
  let startMonth = 4; // Kim starts at month 4
  if (nguHanh === 'Kim') startMonth = 4;
  else if (nguHanh === 'Mộc') startMonth = 10;
  else if (nguHanh === 'Thủy') startMonth = 7;
  else if (nguHanh === 'Hỏa') startMonth = 1;
  else if (nguHanh === 'Thổ') startMonth = 7;

  const offset = ((thang - startMonth) % 12 + 12) % 12;
  return chuArray[offset];
}

// Bảng Cô Thần Quả Tú theo tháng sanh (trang 62 sách Diễn Cầm Tam Thế)
export const CO_THAN_QUA_TU: Record<ChiName, { traiPham: number[]; gaiPham: number[] }> = {
  'Tý': { traiPham: [1, 7], gaiPham: [2, 8] },
  'Sửu': { traiPham: [1, 7], gaiPham: [3, 9] },
  'Dần': { traiPham: [4, 10], gaiPham: [4, 10] },
  'Mẹo': { traiPham: [4, 10], gaiPham: [5, 11] },
  'Thìn': { traiPham: [4, 10], gaiPham: [6, 12] },
  'Tỵ': { traiPham: [1, 7], gaiPham: [1, 7] },
  'Ngọ': { traiPham: [1, 7], gaiPham: [2, 8] },
  'Mùi': { traiPham: [1, 7], gaiPham: [3, 9] },
  'Thân': { traiPham: [4, 10], gaiPham: [4, 10] },
  'Dậu': { traiPham: [4, 10], gaiPham: [5, 11] },
  'Tuất': { traiPham: [4, 10], gaiPham: [6, 12] },
  'Hợi': { traiPham: [1, 7], gaiPham: [1, 7] }
};
