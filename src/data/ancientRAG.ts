import { extractYearsFromText, analyzeCoupleMultiLayer } from '../services/coupleAnalysis';
import { CoupleAnalysisResult, CanName, ChiName } from '../types';
import { KNOWLEDGE_BASE_DOCUMENTS, searchKnowledgeBase } from './knowledge_base';
import { CAO_LY_DATA } from './caolyData';
import { BAT_TRACH_8_CUNG_CHI_TIET, Y_NGHIA_8_DU_NIEN, calculateBatTrachByYear } from './batTrachData';
import { BANG_TRA_CUU_10_THIEN_CAN, DANH_SACH_TRANG_THAI } from './vongTruongSinhData';
import { CO_THAN_QUA_TU, getCanChiByYear } from './tamtheData';
import { getCurrentSolarTerm } from './metaphysicsData';

export interface RAGSearchResultItem {
  source: string;
  category: string;
  score: number;
  snippet: string;
}

/**
 * Trích xuất các thực thể mệnh lý từ câu hỏi (Năm sinh, Can Chi, Cung mệnh, Từ khóa thuật số)
 */
function extractEntities(userQuery: string) {
  const queryLower = userQuery.toLowerCase();
  const extractedYears = extractYearsFromText(userQuery);

  const canList: CanName[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const chiList: ChiName[] = ['Tý', 'Sửu', 'Dần', 'Mẹo', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const foundCans = canList.filter((can) => queryLower.includes(can.toLowerCase()));
  const foundChis = chiList.filter((chi) => queryLower.includes(chi.toLowerCase()) || (chi === 'Mẹo' && queryLower.includes('mão')));

  const isBatTrachQuery = queryLower.includes('bát trạch') || queryLower.includes('cung mệnh') || queryLower.includes('hướng') || queryLower.includes('du niên') || queryLower.includes('sinh khí') || queryLower.includes('tuyệt mệnh');
  const isCaoLyQuery = queryLower.includes('cao ly') || queryLower.includes('đồ hình') || queryLower.includes('thơ hán nôm');
  const isTruongSinhQuery = queryLower.includes('trường sinh') || queryLower.includes('vòng trường sinh') || queryLower.includes('đế vượng') || queryLower.includes('mộc dục');
  const isCoThanQuery = queryLower.includes('cô thần') || queryLower.includes('quả tú');
  const isTietKhiQuery = queryLower.includes('tiết khí') || queryLower.includes('lập xuân') || queryLower.includes('hạ chí') || queryLower.includes('đông chí');

  return {
    years: extractedYears,
    cans: foundCans,
    chis: foundChis,
    isBatTrachQuery,
    isCaoLyQuery,
    isTruongSinhQuery,
    isCoThanQuery,
    isTietKhiQuery,
  };
}

/**
 * Thực hiện Vector / Keyword Search (RAG) trong Kho Cổ Thư Nội Bộ
 */
export function searchAncientLibraryRAG(
  userQuery: string,
  coupleContext?: CoupleAnalysisResult | null,
  limit: number = 4
): RAGSearchResultItem[] {
  const results: RAGSearchResultItem[] = [];
  const queryLower = userQuery.toLowerCase().trim();
  if (!queryLower) return results;

  const entities = extractEntities(userQuery);

  // 1. Search in Priority Knowledge Base (/src/data/knowledge_base/)
  const kbDocs = searchKnowledgeBase(queryLower);
  kbDocs.forEach((doc) => {
    let score = 5;
    if (entities.years.includes(1989) || queryLower.includes('kỷ tỵ')) score += 10;
    results.push({
      source: `Tài Liệu Nội Bộ: ${doc.title}`,
      category: doc.category,
      score,
      snippet: `[${doc.title}] Tóm lược: ${doc.summary}\nNội dung cổ thư: ${doc.rawText.slice(0, 800)}...`,
    });
  });

  // 2. Search in Cao Ly Đầu Hình (100 đồ hình cổ thư)
  if (entities.isCaoLyQuery || entities.years.length >= 2 || entities.cans.length > 0) {
    CAO_LY_DATA.forEach((item) => {
      let score = 0;
      if (entities.cans.some((c) => c === item.canChong)) score += 3;
      if (entities.chis.some((c) => item.chiVoList.includes(c))) score += 3;

      if (coupleContext) {
        if (item.canChong === coupleContext.chong.can && item.chiVoList.includes(coupleContext.vo.chi)) {
          score += 20; // Exact match for current couple
        }
      }

      if (score > 0) {
        results.push({
          source: `Cao Ly Đầu Hình: ${item.tenDoHinh}`,
          category: 'Cổ Thư Cao Ly',
          score,
          snippet: `[${item.tenDoHinh}] - Đánh giá: ${item.danhGia}\nThơ Hán Nôm: "${item.thoHanNom}"\nChú thích cổ thư: ${item.chuThich}\nTóm tắt: ${item.tomTat}\nLời khuyên: ${item.khuyenNghi}`,
        });
      }
    });
  }

  // 3. Search in Bát Trạch Phong Thủy (8 Cung & 8 Du Niên)
  if (entities.isBatTrachQuery || entities.years.length > 0) {
    entities.years.forEach((year) => {
      const namRes = calculateBatTrachByYear(year, 'Nam');
      const nuRes = calculateBatTrachByYear(year, 'Nữ');
      const namDetail = BAT_TRACH_8_CUNG_CHI_TIET[namRes.cung];
      const nuDetail = BAT_TRACH_8_CUNG_CHI_TIET[nuRes.cung];

      results.push({
        source: `Bát Trạch Phong Thủy - Tuổi ${year}`,
        category: 'Bát Trạch Bát Cung',
        score: 8,
        snippet: `[Năm ${year}] Nam Cung ${namRes.cung} (${namRes.nhom}, ${namRes.nguHanh}): Hướng hợp [${namDetail.huongHop.join(', ')}]. Nữ Cung ${nuRes.cung} (${nuRes.nhom}, ${nuRes.nguHanh}): Hướng hợp [${nuDetail.huongHop.join(', ')}].`,
      });
    });

    Object.entries(Y_NGHIA_8_DU_NIEN).forEach(([duNien, info]) => {
      if (queryLower.includes(duNien.toLowerCase())) {
        results.push({
          source: `Bát Trạch Du Niên: ${duNien}`,
          category: 'Ý Nghĩa Du Niên',
          score: 10,
          snippet: `[Cung ${duNien}] Tiêu đề: ${info.tieuDe} (Loại: ${info.loai})\nÝ nghĩa cổ thư: ${info.yNghia}\nỨng dụng phong thủy: ${info.phongThuy}`,
        });
      }
    });
  }

  // 4. Search in Vòng Trường Sinh 10 Thiên Can
  if (entities.isTruongSinhQuery || entities.cans.length > 0) {
    entities.cans.forEach((can) => {
      const tsData = BANG_TRA_CUU_10_THIEN_CAN[can];
      if (tsData) {
        results.push({
          source: `Vòng Trường Sinh - Can ${can}`,
          category: 'Trường Sinh 10 Can',
          score: 7,
          snippet: `[Can ${can} (${tsData.tenGoi})] Đếm ${tsData.chieuDem} khởi tại ${tsData.khoiTai}. Nguyên lý: ${tsData.nguyenLy}\nChuỗi 12 Địa Chi: ${Object.entries(tsData.diaChiMap).map(([chi, tt]) => `${chi}: ${tt}`).join(' • ')}`,
        });
      }
    });

    DANH_SACH_TRANG_THAI.forEach((st) => {
      if (queryLower.includes(st.ten.toLowerCase())) {
        results.push({
          source: `Trạng Thái Trường Sinh: ${st.ten}`,
          category: '12 Cung Trường Sinh',
          score: 9,
          snippet: `[Trạng thái ${st.ten}] Phân loại: ${st.phanLoai}\nÝ nghĩa cổ thư: ${st.yNghia}\nLời khuyên gia đạo: ${st.khuyenGiaDao}`,
        });
      }
    });
  }

  // 5. Search in Cô Thần Quả Tú & 24 Tiết Khí
  if (entities.isCoThanQuery) {
    results.push({
      source: `Cổ Thư - Cô Thần Quả Tú`,
      category: 'Thần Sát Hôn Nhân',
      score: 10,
      snippet: `[Quy luật Cô Thần Quả Tú] Đàn ông phạm Cô Thần dễ lận đận bôn ba buổi đầu; Đàn bà phạm Quả Tú dễ phòng loan quạnh quẽ. Cách hóa giải: Tu tâm dưỡng tính, lấy đạo đức nhẫn nại làm gốc, tích thiện giải nghiệp.`,
    });
  }

  if (entities.isTietKhiQuery) {
    const currentTerm = getCurrentSolarTerm();
    results.push({
      source: `24 Tiết Khí: ${currentTerm.name}`,
      category: 'Thời Lệnh Tiết Khí',
      score: 8,
      snippet: `[Tiết ${currentTerm.name} (${currentTerm.hanTu})] Mùa: ${currentTerm.season}. Ngũ hành vượng: ${currentTerm.nguHanhVuong}, Tướng: ${currentTerm.nguHanhTuong}, Tù: ${currentTerm.nguHanhTu}. Ý nghĩa: ${currentTerm.yNghia}`,
    });
  }

  // Sort by score descending and return top matches
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

/**
 * Biên soạn các đoạn cổ thư RAG đã truy vấn thành khối Context đính kèm vào Prompt
 */
export function compileRAGContextForPrompt(userQuery: string, coupleContext?: CoupleAnalysisResult | null): string {
  const items = searchAncientLibraryRAG(userQuery, coupleContext, 4);

  if (items.length === 0) {
    return '';
  }

  const compiledText = items
    .map((item, idx) => `[TRÍCH ĐOẠN CỔ THƯ RAG #${idx + 1} - ${item.source} (${item.category})]:\n${item.snippet}`)
    .join('\n\n');

  return `
======================================================================
📖 KẾT QUẢ TRUY VẤN RAG TỪ KHO CỔ THƯ NỘI BỘ (GROUND TRUTH RETRIEVAL):
Dưới đây là các đoạn văn bản cổ thư liên quan nhất được hệ thống tự động tìm kiếm dựa trên câu hỏi của người dùng:

${compiledText}
======================================================================
`;
}
