import { Paper, Typography } from "@mui/material";
const Explanation = ({ explanation }) => {
  // Only render if explanation exists
  if (!explanation) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <div className="explanation" >
      <Typography variant="h6">Debugging Explanation:</Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
        Error Type: {explanation.error_type || "No explanation available yet."}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
      Explanation: {explanation.explanation || "No explanation available yet."}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
      Fixed Code: {explanation.fixed_code || "No explanation available yet."}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
      Optimization: {explanation.optimizations || "No explanation available yet."}
      </Typography>
      </div>
    </Paper>
  );
};

export default Explanation;
  