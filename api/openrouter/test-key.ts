type VercelRequest = { method?: string; body?: any };
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Phương thức không được hỗ trợ.' });
  }

  const apiKey = (req.body?.apiKey || process.env.OPENROUTER_API_KEY || '').toString().trim();
  if (!apiKey) {
    return res.status(400).json({ success: false, error: 'Vui lòng cung cấp OpenRouter API Key để kiểm tra.' });
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.APP_URL || 'https://nhanduyenvochong.vercel.app',
        'X-Title': 'Nhan Duyen Tien Dinh Key Test',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: 'Xin chào, trả lời ngắn 1 từ: OK' }],
        max_tokens: 10,
      }),
    });

    const rawBody = await response.text();
    let data: any = null;
    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      data = null;
    }

    if (response.ok) {
      const reply = data?.choices?.[0]?.message?.content || 'OK';
      return res.status(200).json({
        success: true,
        message: 'Khóa OpenRouter hợp lệ và kết nối thành công!',
        sampleReply: reply,
      });
    }

    const errorMessage = data?.error?.message || `Lỗi từ OpenRouter (Mã ${response.status})`;
    return res.status(response.status).json({ success: false, error: errorMessage });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: `Không thể kết nối đến OpenRouter: ${error?.message || 'Lỗi không xác định.'}`,
    });
  }
}
