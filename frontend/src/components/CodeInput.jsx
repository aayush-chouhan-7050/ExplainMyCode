import { useState } from "react";
import { debugCode } from "../api";
import { toast } from "react-toastify";
import { FaPython, FaJs, FaJava, FaRust, FaHtml5, FaCss3Alt, FaCode } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiGo, SiJson, SiMysql } from "react-icons/si";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import Editor from "@monaco-editor/react";

// Constants moved outside component
const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "SQL",
  "HTML",
  "CSS",
  "JSON",
];

const LANGUAGE_MAP = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  "C#": "csharp",
  Go: "go",
  Rust: "rust",
  SQL: "sql",
  HTML: "html",
  CSS: "css",
  JSON: "json",
};

const LANGUAGE_ICONS = {
  Python: <FaPython />,
  JavaScript: <FaJs />,
  Java: <FaJava />,
  Rust: <FaRust />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  TypeScript: <SiTypescript />,
  "C++": <SiCplusplus />,
  Go: <SiGo />,
  JSON: <SiJson />,
  SQL: <SiMysql />,
  "C#": <FaCode />,
};

const CodeInput = ({ setExplanation }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to debug");
      return;
    }
    
    try {
      setLoading(true);
      const data = await debugCode(code, language);
      setExplanation(data);
      toast.success("Code analyzed successfully!");
    } catch (error) {
      console.error("Debug error:", error);
      toast.error("Failed to analyze code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Paste your code:</Typography>
      <Box sx={{ height: "40vh", minHeight: "300px" }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language={LANGUAGE_MAP[language]}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Select Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Select Language"
          fullWidth
        >
          {LANGUAGES.map((lang) => (
            <MenuItem key={lang} value={lang}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {LANGUAGE_ICONS[lang]}
                {lang}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button 
        variant="contained" 
        onClick={handleDebug} 
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Debug Code"}
      </Button>
    </Box>
  );
};

export default CodeInput;
