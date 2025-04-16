import { useState } from "react";
import { debugCode } from "../api";
import { toast } from "react-toastify";
import { FaPython, FaJs, FaJava, FaRust, FaHtml5, FaCss3Alt, FaCode } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiGo, SiJson, SiMysql } from "react-icons/si";
import Editor from "@monaco-editor/react";

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
  Python: <FaPython size={18} />,
  JavaScript: <FaJs size={18} />,
  Java: <FaJava size={18} />,
  Rust: <FaRust size={18} />,
  HTML: <FaHtml5 size={18} />,
  CSS: <FaCss3Alt size={18} />,
  TypeScript: <SiTypescript size={18} />,
  "C++": <SiCplusplus size={18} />,
  Go: <SiGo size={18} />,
  JSON: <SiJson size={18} />,
  SQL: <SiMysql size={18} />,
  "C#": <FaCode size={18} />,
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
    <div className="flex flex-col gap-3">
      <h6 className="text-xl font-semibold text-gray-900">Paste your code:</h6>
      <div className="h-[40vh] min-h-[300px] border border-gray-300 rounded-md overflow-hidden">
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
            padding: { top: 10 },
          }}
        />
      </div>
      
      <div className="w-full">
        <label className="block text-gray-700 mb-2" htmlFor="language-select">
          Select Language
        </label>
        <div className="relative">
          <div className="absolute left-3 top-2.5 text-gray-500">
            {LANGUAGE_ICONS[language] || <FaCode size={18} />}
          </div>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        onClick={handleDebug}
        disabled={loading}
        className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        ) : "Debug Code"}
      </button>
    </div>
  );
};

export default CodeInput;