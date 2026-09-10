import React from 'react';
import { X, CheckCircle2, Shield, AlertTriangle, FileText, Send, Sparkles, BookOpen, UserCheck, Compass } from 'lucide-react';
import { CHATBOT_ROLE_TASK_DOC } from '../data/knowledgeBasePrompt';

interface RoleTaskStandardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPromptTemplate?: (template: string) => void;
}

export const RoleTaskStandardModal: React.FC<RoleTaskStandardModalProps> = ({
  isOpen,
  onClose,
  onSelectPromptTemplate,
}) => {
  if (!isOpen) return null;

  const doc = CHATBOT_ROLE_TASK_DOC;

  const handleApplyTemplate = (type: 'nienMenh' | 'batTu') => {
    let template = '';
    if (type === 'nienMenh') {
      template = `Xin AI Nhân Duyên phân tích hòa hợp nhân duyên theo Cấu Trúc Báo Cáo 5 Phần chuẩn mực:
- Người Nam: Năm sinh 1996 (Bính Tý)
- Người Nữ: Năm sinh 1997 (Đinh Sửu)
(Yêu cầu: Lập bảng bản mệnh, phân tích tầng Niên Mệnh Can Chi Nạp Âm Cung Mệnh, đánh giá tính cách lối sống, thời điểm lưu ý và lời khuyên hóa giải)`;
    } else {
      template = `Xin AI Nhân Duyên lập Bát Tự chuyên sâu và luận giải hôn nhân theo Cấu Trúc 5 Phần:
- Người Nam: Sinh ngày 15/10/1992, Giờ Thìn (07:30 sáng), Dương lịch. Nơi sinh: Hà Nội.
- Người Nữ: Sinh ngày 22/04/1995, Giờ Mùi (14:15 chiều), Dương lịch. Nơi sinh: TP. Hồ Chí Minh.
(Yêu cầu: Phân tích Nhật chủ, Dụng thần, Cung Thê/Phu, Thần sát hôn nhân, tính cách và định hướng thời điểm kết hôn)`;
    }

    if (onSelectPromptTemplate) {
      onSelectPromptTemplate(template);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-amber-50 rounded-2xl max-w-2xl w-full border border-amber-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-amber-950">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-900 via-amber-850 to-amber-900 text-amber-50 flex items-center justify-between border-b border-amber-700">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-amber-800/80 rounded-lg border border-amber-600/50">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-amber-100 leading-tight">
                Vai Trò, Nhiệm Vụ & Cấu Trúc Báo Cáo AI
              </h3>
              <p className="text-xs text-amber-300/90">
                Quy chuẩn vận hành chuyên gia tư vấn hôn nhân Bát Tự - Mệnh Lý
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-300 hover:text-white rounded-lg hover:bg-amber-800/60 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-stone-800 leading-relaxed">
          {/* Section 1: Role & Task */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center space-x-2 text-amber-900 font-bold mb-1.5 text-sm sm:text-base">
              <UserCheck className="w-4 h-4 text-amber-700" />
              <h4>1. Vai Trò & Nhiệm Vụ Cốt Lõi (Role & Task)</h4>
            </div>
            <p className="mb-2">
              <strong className="text-amber-900">Vai trò:</strong> {doc.role}
            </p>
            <p className="text-stone-700">
              <strong className="text-amber-900">Nhiệm vụ:</strong> {doc.task}
            </p>
          </div>

          {/* Section 2: Input Requirements */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-2.5">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm sm:text-base">
              <Shield className="w-4 h-4 text-amber-700" />
              <h4>2. Yêu Cầu Thu Thập Thông Tin (Input Requirements)</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">
                  🔴 Thông Tin Bắt Buộc (Must-have):
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                  {doc.inputRequirements.mustHave.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">
                  🟢 Thông Tin Ưu Tiên (Optional - Càng tốt):
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                  {doc.inputRequirements.optional.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-2.5 bg-amber-100/60 rounded-lg border border-amber-300 text-xs text-amber-950">
              <strong>Quy tắc ứng xử khi thiếu thông tin:</strong> {doc.inputRequirements.missingRule}
            </div>
          </div>

          {/* Section 3: Output Framework 5 Parts */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h4>3. Cấu Trúc Phân Tích & Báo Cáo 5 Phần (Output Framework)</h4>
            </div>

            <div className="space-y-2.5">
              {doc.outputFramework.map((item) => (
                <div key={item.part} className="p-3 rounded-lg bg-stone-50 border border-stone-200 hover:border-amber-300 transition-colors">
                  <div className="font-bold text-amber-950 flex items-center space-x-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-xs shrink-0 font-mono">
                      {item.part}
                    </span>
                    <span>PHẦN {item.part}: {item.title}</span>
                  </div>
                  <p className="text-stone-600 text-xs mb-1.5 italic pl-7">{item.description}</p>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-700 pl-7 text-xs">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Guiding Principles */}
          <div className="bg-amber-100/70 p-4 rounded-xl border border-amber-300 space-y-2">
            <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <h4>4. Nguyên Tắc Luận Giải Cốt Lõi</h4>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-800">
              {doc.guidingPrinciples.map((principle, pIdx) => (
                <li key={pIdx} className="flex items-start space-x-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-amber-100/80 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleApplyTemplate('nienMenh')}
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Mẫu Niên Mệnh (Năm Sinh)</span>
            </button>
            <button
              onClick={() => handleApplyTemplate('batTu')}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-amber-50 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gửi Mẫu Bát Tự (Tứ Trụ)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
