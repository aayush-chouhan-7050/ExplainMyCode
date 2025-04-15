import { ContentCopy } from "@mui/icons-material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

const Explanation = ({ explanation }) => {
  const handleCopy = (text) => {
    copy(text);
    toast.info("Copied to clipboard!");
  };

  if (!explanation) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4 relative border border-gray-100">
      <h6 className="text-xl font-semibold text-gray-900">Debugging Explanation:</h6>
      <div className="mt-4">
        <h6 className="text-lg font-medium text-gray-900">Error Type:</h6>
        <p className="whitespace-pre-wrap mb-4 text-gray-600">
          {explanation.error_type || "Not specified"}
        </p>
        
        <h6 className="text-lg font-medium text-gray-900">Explanation:</h6>
        <p className="whitespace-pre-wrap mb-4 text-gray-600">
          {explanation.explanation || "No explanation available yet."}
        </p>
        
        {explanation.fixed_code && (
          <>
            <div className="flex items-center gap-1">
              <h6 className="text-lg font-medium text-gray-900">Fixed Code:</h6>
              <button 
                onClick={() => handleCopy(explanation.fixed_code)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <ContentCopy fontSize="small" />
              </button>
            </div>
            <div className="mt-2">
              <SyntaxHighlighter 
                language="javascript" 
                style={materialLight} 
                wrapLongLines
              >
                {explanation.fixed_code}
              </SyntaxHighlighter>
            </div>
          </>
        )}
        
        <h6 className="text-lg font-medium text-gray-900 mt-4">Optimization:</h6>
        <p className="whitespace-pre-wrap text-gray-600">
          {explanation.optimizations || "No optimizations suggested."}
        </p>
      </div>
    </div>
  );
};

export default Explanation;