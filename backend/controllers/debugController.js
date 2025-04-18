const { OpenAI } = require("openai");
const DebugHistory = require("../models/DebugHistory");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.chatanywhere.org/v1",
});

exports.debugCode = async (req, res) => {
  const { code, language } = req.body;
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  try {
    if (!code || !language) {
      return res.status(400).json({ error: "Missing code or language parameter" });
    }

    const prompt = `
STRICTLY FOLLOW THIS FORMAT:
<START>
[Error Type]: Syntax|Runtime|Logical
[Explanation]: <1-3 sentences>
[Fixed Code]:
\`\`\`${language}
<CODE HERE>
\`\`\`
[Optimization]: <1 suggestion or "None">
<END>

Analyze this ${language} code:
\`\`\`${language}
${code}
\`\`\`
`;

    // Send to chatanywhere GPT
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });
    console.log("AI Response:", completion.choices[0].message.content);
    console.log(completion);

    const aiResponse = completion.choices[0].message.content || "";
    const result = parseAIResponse(aiResponse.trim(), code);

    if (!result.fixed_code.trim()) result.fixed_code = code;

    const newHistory = new DebugHistory({
      code,
      language,
      result,
      userId: req.user._id,
    });

    try {
      await newHistory.save();
    } catch (saveError) {
      console.error("Database save error:", saveError);
      return res.status(500).json({ error: "Failed to save debug history" });
    }

    res.json(result);
  } catch (error) {
    console.error("Debugging error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function parseAIResponse(responseText, originalCode) {
  try {
    const errorBlock = responseText.split('<START>')[1]?.split('<END>')[0] || "";
    const codeMatch = errorBlock.match(/```(?:\w+)?\s*\n([\s\S]*?)\n```/);

    return {
      error_type: (errorBlock.match(/\[Error Type\]:\s*(.+)/i) || [])[1]?.trim() || "Unknown",
      explanation: (errorBlock.match(/\[Explanation\]:\s*([\s\S]*?)\n\[Fixed Code\]/i) || [])[1]?.trim() || "No explanation",
      fixed_code: codeMatch ? codeMatch[1].trim() : originalCode,
      optimizations: (errorBlock.match(/\[Optimization\]:\s*(.+)/i) || [])[1]?.trim() || "None",
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      error_type: "Parsing Error",
      explanation: "Failed to parse AI response",
      fixed_code: originalCode,
      optimizations: "None"
    };
  }
}

