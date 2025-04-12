import { Paper, Typography, IconButton, Box } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ContentCopy } from "@mui/icons-material";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

const Explanation = ({ explanation }) => {
  const handleCopy = (text) => {
    copy(text);
    toast.info("Copied to clipboard!");
  };

  // Only render if explanation exists
  if (!explanation) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, position: "relative" }}>
      <Typography variant="h6">Debugging Explanation:</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Error Type:</Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
          {explanation.error_type || "Not specified"}
        </Typography>
        
        <Typography variant="subtitle1">Explanation:</Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
          {explanation.explanation || "No explanation available yet."}
        </Typography>
        
        {explanation.fixed_code && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1">Fixed Code:</Typography>
              <IconButton onClick={() => handleCopy(explanation.fixed_code)} size="small">
                <ContentCopy fontSize="small" />
              </IconButton>
            </Box>
            <SyntaxHighlighter 
              language="javascript" 
              style={materialLight} 
              wrapLongLines
              sx={{ mt: 1 }}
            >
              {explanation.fixed_code}
            </SyntaxHighlighter>
          </>
        )}
        
        <Typography variant="subtitle1">Optimization:</Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {explanation.optimizations || "No optimizations suggested."}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Explanation;