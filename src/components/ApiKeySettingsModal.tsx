import React, { useState, useEffect } from 'react';
import {
  Key,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Cpu,
  Trash2,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface ApiKeySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: (newKey: string) => void;
}

export const OPENROUTER_KEY_STORAGE = 'openrouter_user_api_key';

export const getStoredOpenRouterKey = (): string => {
  try {
    return localStorage.getItem(OPENROUTER_KEY_STORAGE) || '';
  } catch {
    return '';
  }
};

export const ApiKeySettingsModal: React.FC<ApiKeySettingsModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [serverConfig, setServerConfig] = useState<{ hasServerOpenRouterKey: boolean; hasServerGeminiKey: boolean } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredOpenRouterKey());
      setTestResult(null);
      setSavedSuccess(false);

      // Check server status
      fetch('/api/openrouter/config-status')
        .then((res) => res.json())
        .then((data) => setServerConfig(data))
        .catch(() => setServerConfig(null));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    try {
      if (trimmed) {
        localStorage.setItem(OPENROUTER_KEY_STORAGE, trimmed);
      } else {
        localStorage.removeItem(OPENROUTER_KEY_STORAGE);
      }
      setSavedSuccess(true);
      if (onKeyUpdated) onKeyUpdated(trimmed);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.removeItem(OPENROUTER_KEY_STORAGE);
    setTestResult(null);
    setSavedSuccess(false);
    if (onKeyUpdated) onKeyUpdated('');
  };

  const handleTestKey = async () => {
    const keyToTest = apiKey.trim();
    if (!keyToTest) {
      setTestResult({
        success: false,
        message: 'Vui lòng nhập mã API Key trước khi kiểm tra.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/openrouter/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: keyToTest }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setTestResult({
          success: true,
          message: data.message || 'Kết nối thành công! Khóa API OpenRouter hoạt động tốt.',
        });
        // Auto save on successful test
        localStorage.setItem(OPENROUTER_KEY_STORAGE, keyToTest);
        if (onKeyUpdated) onKeyUpdated(keyToTest);
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Khóa API không hợp lệ hoặc đã hết hạn ngạch.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Lỗi kết nối kiểm tra: ${err.message}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const isStored = Boolean(getStoredOpenRouterKey());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="bg-stone-900 border border-amber-700/50 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-950 via-stone-900 to-amber-950 px-5 py-4 border-b border-amber-800/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-100 shadow-md ring-1 ring-amber-400/40">
              <Key className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-100 font-serif flex items-center space-x-2">
                <span>Cài Đặt OpenRouter API Key</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Bảo Mật
                </span>
              </h3>
              <p className="text-xs text-amber-300/80">
                Tự do đẩy mã nguồn lên GitHub mà không lo lộ API Key
              </p>
            </div>
          </div>

          <button
            id="close-api-settings-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-200 hover:bg-stone-800/80 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto text-stone-200 text-sm">
          {/* Key Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Trạng thái khóa hiện tại:</span>
            </div>
            {isStored ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã lưu khóa cá nhân (Trình duyệt)</span>
              </span>
            ) : serverConfig?.hasServerOpenRouterKey ? (
              <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/60 font-medium">
                Sử dụng khóa máy chủ mặc định
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-stone-800 text-stone-400 border border-stone-700 font-medium">
                Chưa có khóa (Dùng Động cơ Cổ Thư Nội Bộ)
              </span>
            )}
          </div>

          {/* Input Box */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-amber-200">
              Nhập mã khóa OpenRouter API Key (bắt đầu bằng <code className="text-amber-400 font-mono">sk-or-v1-...</code>):
            </label>
            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full pl-3.5 pr-20 py-2.5 rounded-xl bg-stone-950 border border-amber-700/50 text-stone-100 placeholder-stone-600 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400"
              />
              <div className="absolute right-2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-stone-400 hover:text-amber-200 rounded-lg hover:bg-stone-800 transition-colors"
                  title={showKey ? 'Ẩn khóa' : 'Hiện khóa'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              🔒 <strong>Bảo mật 100%:</strong> Khóa API của bạn được lưu an toàn trong trình duyệt (LocalStorage), không lưu trên mã nguồn Git, giúp bạn tự do đẩy lên GitHub mà không bao giờ bị lộ hay bị quét.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              id="save-api-key-btn"
              onClick={handleSave}
              disabled={isTesting}
              className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedSuccess ? 'Đã lưu thành công!' : 'Lưu Khóa'}</span>
            </button>

            <button
              id="test-api-key-btn"
              onClick={handleTestKey}
              disabled={isTesting || !apiKey.trim()}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-200 border border-amber-700/40 hover:border-amber-500 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isTesting ? 'Đang kiểm tra...' : 'Kiểm Tra Kết Nối'}</span>
            </button>

            {apiKey && (
              <button
                id="clear-api-key-btn"
                onClick={handleClear}
                disabled={isTesting}
                className="px-3 py-2 rounded-xl text-stone-400 hover:text-rose-300 hover:bg-stone-800/80 text-xs font-medium flex items-center space-x-1 transition-colors"
                title="Xóa khóa đã lưu"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            )}
          </div>

          {/* Test Status Message */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start space-x-2 animate-fadeIn ${
                testResult.success
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-700/60 text-rose-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              )}
              <div className="flex-1 leading-relaxed">{testResult.message}</div>
            </div>
          )}

          {/* Guide on How to get OpenRouter Key */}
          <div className="pt-3 border-t border-stone-800 space-y-3">
            <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Hướng dẫn lấy OpenRouter API Key (Miễn phí & Dễ dàng):</span>
            </div>

            <ol className="space-y-2.5 text-xs text-stone-300 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <div className="leading-relaxed">
                  Truy cập trang chủ{' '}
                  <a
                    href="https://openrouter.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 underline hover:text-amber-300 font-medium inline-flex items-center space-x-1"
                  >
                    <span>openrouter.ai</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  và chọn <strong>Sign In / Sign Up</strong> (đăng nhập bằng tài khoản Google hoặc GitHub rất nhanh chóng).
                </div>
              </li>

              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <div className="leading-relaxed">
                  Vào trang quản lý Keys:{' '}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 underline hover:text-amber-300 font-medium inline-flex items-center space-x-1"
                  >
                    <span>openrouter.ai/keys</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <div className="leading-relaxed">
                  Bấm nút <strong>Create Key</strong> (Tạo khóa mới), đặt tên gợi nhớ (ví dụ: <code className="bg-stone-900 px-1 py-0.5 rounded text-amber-300 font-mono">CanDuyenAI</code>), rồi bấm <strong>Create</strong>.
                </div>
              </li>

              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 flex items-center justify-center font-bold text-[11px] shrink-0">
                  4
                </span>
                <div className="leading-relaxed">
                  Sao chép chuỗi mã bắt đầu bằng <code className="bg-stone-900 px-1 py-0.5 rounded text-amber-400 font-mono">sk-or-v1-...</code> và dán vào ô nhập bên trên, sau đó bấm <strong>Lưu Khóa</strong>.
                </div>
              </li>
            </ol>

            <div className="text-[11px] text-amber-400/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/40 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
              <span>
                <strong>Gợi ý:</strong> OpenRouter hỗ trợ nhiều mô hình miễn phí hoặc cực kỳ tiết kiệm (như Gemini 2.5 Flash, DeepSeek Chat). Nếu chưa có Key, bạn vẫn có thể sử dụng <strong>Động cơ Cổ Thư Tích Hợp</strong> để giải đoán hôn nhân chính xác theo sách cổ.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-5 py-3 border-t border-stone-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
