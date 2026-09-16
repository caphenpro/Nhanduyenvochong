type VercelRequest = Record<string, unknown>;
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    hasServerOpenRouterKey: Boolean(process.env.OPENROUTER_API_KEY),
    hasServerGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
}
