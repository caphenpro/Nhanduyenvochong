import React, { useState } from 'react';
import { X, FolderGit2, FileText, CheckCircle2, ShieldCheck, Database, Search, ArrowRight, Sparkles, BookOpen, Scale, Check } from 'lucide-react';
import { KNOWLEDGE_BASE_DOCUMENTS, KnowledgeDocument } from '../data/knowledge_base';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPromptTemplate?: (prompt: string) => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
  onSelectPromptTemplate,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'documents'>('rules');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument>(KNOWLEDGE_BASE_DOCUMENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredDocs = KNOWLEDGE_BASE_DOCUMENTS.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyPrompt = (promptText: string) => {
    if (onSelectPromptTemplate) {
      onSelectPromptTemplate(promptText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="bg-stone-900 text-stone-100 rounded-2xl max-w-4xl w-full border border-amber-600/40 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/80 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-400/30 text-amber-300">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base sm:text-lg text-amber-100 leading-tight">
                  Kho Tri Thức Ưu Tiên & Quy Chuẩn AI
                </h3>
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Ground Truth (Active)</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Thư mục nội bộ: <span className="text-amber-300">/src/data/knowledge_base/</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-4 bg-stone-950 border-b border-stone-800 space-x-2">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'border-amber-500 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>3 Nguyên Tắc Kết Hợp Tri Thức & Mở Rộng</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px]">Cốt Lõi</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'documents'
                ? 'border-amber-500 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Danh Mục Tệp Dữ Liệu Chuẩn</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-300 text-[10px]">{KNOWLEDGE_BASE_DOCUMENTS.length} tệp</span>
          </button>
        </div>

        {/* TAB 1: 3 NGUYÊN TẮC KẾT HỢP TRI THỨC */}
        {activeTab === 'rules' && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-900/60">
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-100 flex items-center space-x-1.5 text-sm mb-1">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Chỉ dẫn Vận Hành Dành Cho Chuyên Gia AI Chatbox</span>
              </strong>
              <p>
                Bạn là chuyên gia tư vấn dựa trên <strong>TÀI LIỆU ĐƯỢC CUNG CẤP</strong>. Do tài liệu đang trong quá trình hoàn thiện, AI Chatbox bắt buộc phải kết hợp giữa kiến thức nội bộ và kiến thức mở rộng theo 3 nguyên tắc nền tảng sau:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Nguyên tắc 1 */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/40 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm mb-2.5 border border-amber-500/30">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wide mb-2">
                    Ưu Tiên Tuyệt Đối (Cốt Lõi)
                  </h4>
                  <ul className="text-xs text-stone-300 space-y-2 leading-relaxed">
                    <li className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Tài liệu đính kèm trong thư mục <code className="text-amber-300 font-mono text-[10px]">/src/data/knowledge_base/</code> là nguồn <strong>THỰC TẠI CHUẨN (Ground Truth)</strong>.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Khi có bất kỳ sự xung đột, mâu thuẫn hay khác biệt nào giữa tài liệu đính kèm và kiến thức bên ngoài, AI <strong>BẮT BUỘC</strong> phải tuân theo tài liệu đính kèm.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-800 text-[11px] text-amber-400/90 font-medium">
                  ⭐ Chuẩn mực tối cao
                </div>
              </div>

              {/* Nguyên tắc 2 */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/30 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-sm mb-2.5 border border-blue-500/30">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-blue-200 uppercase tracking-wide mb-2">
                    Nguyên Tắc Mở Rộng
                  </h4>
                  <ul className="text-xs text-stone-300 space-y-2 leading-relaxed">
                    <li className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>Nếu câu hỏi nằm ngoài phạm vi hoặc tài liệu chưa đề cập tới, AI <strong>ĐƯỢC PHÉP</strong> tự mở rộng bằng kiến thức chuyên môn.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>Phần mở rộng <strong>bắt buộc phải dựa trên logic, văn phong và hệ thống lý luận tương đồng</strong> với tài liệu đã cung cấp.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-800 text-[11px] text-blue-400/90 font-medium">
                  🌐 Bổ khuyết linh hoạt
                </div>
              </div>

              {/* Nguyên tắc 3 */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-emerald-500/30 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm mb-2.5 border border-emerald-500/30">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wide mb-2">
                    Minh Bạch Nguồn Gốc
                  </h4>
                  <ul className="text-xs text-stone-300 space-y-2 leading-relaxed">
                    <li className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Thông tin có sẵn trong tài liệu:</strong> Trình bày trực tiếp, khẳng định.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Kiến thức tự mở rộng thêm:</strong> Thêm ghi chú nhẹ phía dưới:</span>
                    </li>
                  </ul>
                  <div className="mt-2 p-2 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300 italic">
                    "Lưu ý: Phần [Nội dung X] dựa trên kiến thức mở rộng bổ trợ cho tài liệu gốc..."
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-800 text-[11px] text-emerald-400/90 font-medium">
                  📝 Rõ ràng, trung thực
                </div>
              </div>
            </div>

            {/* Practical Prompt Examples */}
            <div className="p-4 rounded-xl bg-stone-950/50 border border-stone-800">
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wide mb-2.5 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Thực hành thử nghiệm các câu hỏi mẫu chuẩn theo 3 nguyên tắc:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() =>
                    handleApplyPrompt(
                      'Hồ sơ tuổi 1989 Kỷ Tỵ Nam và ma trận phối cung Bát Trạch 8x8 theo Kho Tri Thức Nội Bộ?'
                    )
                  }
                  className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-left text-stone-300 hover:text-amber-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">1. Tra cứu Hồ sơ 1989 Kỷ Tỵ (Tài liệu gốc)</span>
                  <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 shrink-0 ml-2" />
                </button>

                <button
                  onClick={() =>
                    handleApplyPrompt(
                      'Giải thích 3 nguyên tắc kết hợp tri thức nội bộ và kiến thức mở rộng của AI Nhân Duyên?'
                    )
                  }
                  className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-left text-stone-300 hover:text-amber-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">2. Hỏi về 3 Nguyên tắc vận hành</span>
                  <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 shrink-0 ml-2" />
                </button>

                <button
                  onClick={() =>
                    handleApplyPrompt(
                      'Bảng tính Cung Mệnh theo số dư chia 9 cho Nam và Nữ trong tài liệu chuẩn?'
                    )
                  }
                  className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-left text-stone-300 hover:text-amber-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">3. Bảng số dư chia 9 Cung Mệnh (Tài liệu gốc)</span>
                  <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 shrink-0 ml-2" />
                </button>

                <button
                  onClick={() =>
                    handleApplyPrompt(
                      'Chồng sinh 1989 (Kỷ Tỵ), Vợ sinh 1992 (Nhâm Thân) — Phân tích hòa hợp kết hợp ghi chú minh bạch nguồn gốc!'
                    )
                  }
                  className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-left text-stone-300 hover:text-amber-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">4. Luận giải phối ngẫu có ghi chú minh bạch</span>
                  <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 shrink-0 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DUYỆT TỆP DỮ LIỆU */}
        {activeTab === 'documents' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Sidebar: Documents List */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-stone-800 bg-stone-950/50 flex flex-col">
              <div className="p-3 border-b border-stone-800">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Tìm tệp tri thức..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-2 space-y-1.5 overflow-y-auto flex-1 max-h-56 md:max-h-none">
                {filteredDocs.map((doc) => {
                  const isSelected = selectedDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-500/50 text-amber-100 shadow-xs'
                          : 'bg-stone-900/40 border-stone-800/80 hover:bg-stone-850 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-stone-800 text-amber-300 font-semibold">
                          TỆP #{doc.order.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-stone-400">{doc.dateAdded}</span>
                      </div>
                      <h4 className="text-xs font-bold line-clamp-1 text-stone-100 mb-1">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                        {doc.summary}
                      </p>
                    </button>
                  );
                })}

                {/* Instructions on adding future files */}
                <div className="mt-3 p-2.5 rounded-xl border border-dashed border-stone-700 bg-stone-900/30 text-[11px] text-stone-400">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-semibold mb-1">
                    <Database className="w-3.5 h-3.5" />
                    <span>Bổ sung tệp mới sau này:</span>
                  </div>
                  <p className="leading-normal">
                    Chỉ cần tạo thêm tệp mới trong thư mục <code className="text-amber-300 font-mono text-[10px]">/src/data/knowledge_base/</code> và khai báo vào <code className="text-amber-300 font-mono text-[10px]">index.ts</code>, AI sẽ tự động nạp!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Main Content: Document Viewer */}
            <div className="flex-1 flex flex-col bg-stone-900/60 overflow-hidden">
              {/* Doc Header */}
              <div className="px-5 py-3 border-b border-stone-800 bg-stone-950/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                      {selectedDoc.category}
                    </span>
                    <span className="text-xs text-stone-400">
                      Tác giả: <strong className="text-stone-300">{selectedDoc.author}</strong>
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-amber-100 mt-1">
                    {selectedDoc.title}
                  </h4>
                </div>

                <div className="hidden sm:flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleApplyPrompt(
                        'Xin cho biết thông tin tuổi 1989 Kỷ Tỵ Nam và ma trận phối cung Bát Trạch chuẩn mực từ Kho Tri Thức Nội Bộ?'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Hỏi Về Tệp Này</span>
                  </button>
                </div>
              </div>

              {/* Doc Content Scrollable */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                {/* Profile Card for 1989 */}
                {selectedDoc.structuredData?.profile1989Nam && (
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs">
                    <div className="font-bold text-amber-300 text-sm mb-2 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Hồ Sơ Chuẩn Mực: Năm sinh 1989 — Kỷ Tỵ (Nam)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-300">
                      <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800">
                        <span className="text-stone-400 block text-[10px]">Năm sinh:</span>
                        <strong className="text-amber-200">1989 (Kỷ Tỵ)</strong>
                      </div>
                      <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800">
                        <span className="text-stone-400 block text-[10px]">Nạp âm:</span>
                        <strong className="text-amber-200">Đại Lâm Mộc</strong>
                      </div>
                      <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800">
                        <span className="text-stone-400 block text-[10px]">Can - Chi:</span>
                        <strong className="text-amber-200">Kỷ (Thổ) - Tỵ (Hỏa)</strong>
                      </div>
                      <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800">
                        <span className="text-stone-400 block text-[10px]">Cung mệnh Nam:</span>
                        <strong className="text-emerald-300">Khôn (Tây Tứ)</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Raw Markdown Rendered */}
                <div className="p-4 bg-stone-950/70 rounded-xl border border-stone-800/80 font-mono text-[11px] sm:text-xs text-stone-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {selectedDoc.rawText}
                </div>
              </div>

              {/* Doc Footer Action */}
              <div className="p-3 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between">
                <div className="text-[11px] text-stone-400 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Nguồn Ground Truth được bảo vệ bởi Nguyên tắc số 1.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleApplyPrompt(
                        'Xin AI Nhân Duyên giải thích bảng phối cung vợ chồng theo Ma trận Bát Trạch 8x8 trong Kho Tri Thức Nội Bộ?'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <span>Hỏi Về Ma Trận 8x8</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
