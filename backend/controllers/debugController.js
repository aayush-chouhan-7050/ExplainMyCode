const DebugHistory = require("../models/DebugHistory");

exports.debugCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: "Missing code or language parameter" });
    }

    // Build structured prompt
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

EXAMPLE RESPONSE FOR PYTHON:
<START>
[Error Type]: Syntax
[Explanation]: Missing quotation marks around string literal
[Fixed Code]:
\`\`\`python
print("hello world")
\`\`\`
[Optimization]: Use f-strings for complex formatting
<END>
    `;

    // Send request to the AI model
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "deepseek-coder:1.3b",
        prompt,
        stream: false,
        options: {
          temperature: 0.2,
          num_ctx: 4096
        }
      }),
      signal: AbortSignal.timeout(60000)
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error("JSON Parse Error:", jsonError, "\nRaw response:", text);
      return res.status(500).json({ error: "Invalid response from AI model" });
    }

    // Ensure we received a response from the AI
    if (!data.response) {
      return res.status(500).json({ error: "AI model returned an empty response" });
    }

    // Sanitize and parse the response
    const sanitizedResponse = data.response
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .replace(/‘/g, "'")
      .replace(/’/g, "'");
    const result = parseAIResponse(sanitizedResponse.trim(), code);

    // Fallback to original code if no fixed code is provided
    if (!result.fixed_code.trim()) {
      result.fixed_code = code;
    }

    // Save debugging history to MongoDB
    const newHistory = new DebugHistory({
      code,
      language,
      result: {
        error_type: result.error_type,
        explanation: result.explanation,
        fixed_code: result.fixed_code,
        optimizations: result.optimizations
      }
    });
    try {
      await newHistory.save();
    } catch (saveError) {
      console.error("Database save error:", saveError);
      return res.status(500).json({ 
        error: "Failed to save debug history", 
        details: saveError.message 
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Debugging error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to parse the AI response into structured output
function parseAIResponse(responseText, originalCode) {
  const errorBlocks = responseText.split('<START>').slice(1);
  if (errorBlocks.length === 0) {
    return {
      error_type: 'None',
      explanation: 'No issues found',
      fixed_code: originalCode,
      optimizations: 'None'
    };
  }

  const bestError = errorBlocks[0];
  const codeMatch = bestError.match(/```(?:\w+)?\s*\n([\s\S]*?)\n```/);
  
  return {
    error_type: (bestError.match(/\[Error Type\]:\s*(.+?)(\n|$)/i) || [])[1]?.trim() || 'Unknown',
    explanation: (bestError.match(/\[Explanation\]:\s*([\s\S]+?)(?=\n\[|\n```|$)/i) || [])[1]?.trim() || 'No explanation',
    fixed_code: codeMatch ? codeMatch[1].trim() : originalCode,
    optimizations: (bestError.match(/\[Optimization\]:\s*([\s\S]+?)(?=\n|$)/i) || [])[1]?.trim() || 'None'
  };
}
