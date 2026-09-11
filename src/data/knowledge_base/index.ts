/**
 * KHO TRI THỨC ƯU TIÊN DUY NHẤT (PRIORITY KNOWLEDGE BASE REPOSITORY)
 * -------------------------------------------------------------------
 * Thư mục: /src/data/knowledge_base/
 * 
 * QUY TẮC BẤT BIẾN:
 * 1. AI Chatbox LUÔN ƯU TIÊN số 1 tra cứu kiến thức từ thư mục này trước.
 * 2. Chỉ khi không có hoặc thông tin trong thư mục chưa đầy đủ, mới lấy thêm kiến thức bên ngoài.
 * 3. Mọi tài liệu mới cần bổ sung trong tương lai sẽ được lưu vào thư mục này.
 */

import { KnowledgeDocument, DOC_01_KY_TY_1989_BAT_TRACH } from './01_nam_1989_ky_ty_va_bat_trach_cung_menh';

export * from './01_nam_1989_ky_ty_va_bat_trach_cung_menh';

/**
 * DANH SÁCH TẤT CẢ CÁC TỆP TÀI LIỆU TRI THỨC ĐÃ LƯU TRONG THƯ MỤC
 * Khi có tài liệu mới, chỉ cần import và bổ sung vào mảng này.
 */
export const KNOWLEDGE_BASE_DOCUMENTS: KnowledgeDocument[] = [
  DOC_01_KY_TY_1989_BAT_TRACH,
];

export const KNOWLEDGE_BASE_RULES = {
  rule1: {
    title: '1. NGUYÊN TẮC ƯU TIÊN TUYỆT ĐỐI (Cốt lõi)',
    bullets: [
      'Tài liệu đính kèm là nguồn THỰC TẠI CHUẨN (Ground Truth).',
      'Khi có bất kỳ sự xung đột, mâu thuẫn hay khác biệt nào giữa tài liệu đính kèm và kiến thức bên ngoài của bạn, bạn BẮT BUỘC phải tuân theo tài liệu đính kèm.',
    ],
  },
  rule2: {
    title: '2. NGUYÊN TẮC MỞ RỘNG (Khi tài liệu chưa đề cập đủ)',
    bullets: [
      'Nếu câu hỏi của người dùng nằm ngoài phạm vi hoặc tài liệu chưa đề cập tới, bạn ĐƯỢC PHÉP tự mở rộng bằng kiến thức chuyên môn của mình.',
      'Tuy nhiên, phần mở rộng phải dựa trên logic, văn phong và hệ thống lý luận tương đồng với tài liệu đã cung cấp.',
    ],
  },
  rule3: {
    title: '3. MẪU TRÌNH BÀY PHÂN BIỆT (Minh bạch nguồn gốc)',
    bullets: [
      'Khi trả lời các câu hỏi cần mở rộng, hãy phân định rõ ràng như sau:',
      '• Phần thông tin có sẵn trong tài liệu: Trình bày trực tiếp, khẳng định.',
      '• Phần kiến thức AI tự mở rộng thêm: Thêm một ghi chú nhẹ phía dưới (Ví dụ: "Lưu ý: Phần [Nội dung X] dựa trên kiến thức mở rộng bổ trợ cho tài liệu gốc...").',
    ],
  },
};

/**
 * Biên soạn toàn bộ nội dung của Kho Tri Thức Nội Bộ thành khối chỉ dẫn ưu tiên số 1 cho System Prompt của AI Chatbox.
 */
export function compileKnowledgeBaseForSystemPrompt(): string {
  const docsText = KNOWLEDGE_BASE_DOCUMENTS.map((doc, idx) => {
    return `### 📁 TỆP KIẾN THỨC NỘI BỘ #${idx + 1}: ${doc.title}
(Danh mục: ${doc.category} | Cập nhật: ${doc.dateAdded} | Tác giả: ${doc.author})
Tóm lược: ${doc.summary}

--- NỘI DUNG NGUYÊN VĂN TÀI LIỆU CHUẨN MỰC ---
${doc.rawText}
--- HẾT TỆP #${idx + 1} ---`;
  }).join('\n\n');

  return `
======================================================================
⭐ QUY TẮC VẬN HÀNH BẤT BIẾN: KHO TRI THỨC NỘI BỘ & KIẾN THỨC MỞ RỘNG
======================================================================
Bạn là chuyên gia tư vấn dựa trên TÀI LIỆU ĐƯỢC CUNG CẤP. Tài liệu này đang trong quá trình hoàn thiện, do đó bạn cần kết hợp giữa kiến thức nội bộ và kiến thức mở rộng theo các QUY TẮC NGUYÊN TẮC sau:

1. NGUYÊN TẮC ƯU TIÊN TUYỆT ĐỐI (Cốt lõi):
- Tài liệu đính kèm (trong thư mục /src/data/knowledge_base/) là nguồn THỰC TẠI CHUẨN (Ground Truth).
- Khi có bất kỳ sự xung đột, mâu thuẫn hay khác biệt nào giữa tài liệu đính kèm và kiến thức bên ngoài của bạn, bạn BẮT BUỘC phải tuân theo tài liệu đính kèm.

2. NGUYÊN TẮC MỞ RỘNG (Khi tài liệu chưa đề cập đủ):
- Nếu câu hỏi của người dùng nằm ngoài phạm vi hoặc tài liệu chưa đề cập tới, bạn ĐƯỢC PHÉP tự mở rộng bằng kiến thức chuyên môn của mình.
- Tuy nhiên, phần mở rộng phải dựa trên logic, văn phong và hệ thống lý luận tương đồng với tài liệu đã cung cấp.

3. MẪU TRÌNH BÀY PHÂN BIỆT (Minh bạch nguồn gốc):
Khi trả lời các câu hỏi cần mở rộng, hãy phân định rõ ràng như sau:
- Phần thông tin có sẵn trong tài liệu: Trình bày trực tiếp, khẳng định.
- Phần kiến thức AI tự mở rộng thêm: Thêm một ghi chú nhẹ phía dưới (Ví dụ: "Lưu ý: Phần [Nội dung X] dựa trên kiến thức mở rộng bổ trợ cho tài liệu gốc...").

--- DANH SÁCH TÀI LIỆU TRONG THƯ MỤC KIẾN THỨC NỘI BỘ ---
${docsText}
======================================================================
`;
}

/**
 * Tra cứu ma trận phối Cung Mệnh vợ chồng theo chuẩn tài liệu Doc 01
 */
export function lookupBatTrachMarriageMatrix(namCung: string, nuCung: string): {
  bienCung: string;
  loai: 'Cát' | 'Hung';
  hanh: string;
  mucDo: string;
  yNghia: string;
} | null {
  const doc = DOC_01_KY_TY_1989_BAT_TRACH;
  const matrix = doc.structuredData.cungMatrix;
  const meaning = doc.structuredData.batCungMeaning;

  const row = matrix[namCung];
  if (!row) return null;
  const bienCung = row[nuCung];
  if (!bienCung) return null;

  const detail = meaning[bienCung];
  if (!detail) return null;

  return {
    bienCung,
    loai: detail.nhom.includes('Cát') ? 'Cát' : 'Hung',
    hanh: detail.hanh,
    mucDo: detail.mucDo,
    yNghia: detail.yNghia,
  };
}

/**
 * Tìm kiếm nhanh các tài liệu trong kho tri thức theo từ khóa
 */
export function searchKnowledgeBase(keyword: string): KnowledgeDocument[] {
  if (!keyword || !keyword.trim()) return KNOWLEDGE_BASE_DOCUMENTS;
  const q = keyword.toLowerCase().trim();

  return KNOWLEDGE_BASE_DOCUMENTS.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q) ||
      doc.rawText.toLowerCase().includes(q)
    );
  });
}
