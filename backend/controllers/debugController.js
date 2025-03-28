// Install the OpenAI SDK: npm install openai
import OpenAI from "openai";

// Initialize DeepSeek Client
const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1', // DeepSeek API endpoint
  apiKey: process.env.DEEPSEEK_API_KEY, // Store your key in .env
});

export const debugCode = async (req, res) => {
  // 1. Validate Request
  const { code, language } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    // 2. Call DeepSeek API
    const completion = await deepseek.chat.completions.create({
      model: "deepseek-coder", // Best model for code debugging
      messages: [
        {
          role: "system",
          content: "You are an expert debugger. Explain errors and provide fixes.",
        },
        {
          role: "user",
          content: `Debug this ${language} code:\n${code}\n\nFormat response as:\n1. Error Analysis\n2. Fixed Code\n3. Prevention Tips`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // 3. Send Response
    res.json({
      explanation: completion.choices[0].message.content,
      tokens_used: completion.usage?.total_tokens,
    });

  } catch (error) {
    // 4. Error Handling
    console.error("DeepSeek Error:", error);
    res.status(500).json({
      error: error.message || "Failed to analyze code",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};