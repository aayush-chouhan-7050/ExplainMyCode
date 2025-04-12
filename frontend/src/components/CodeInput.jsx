import { useState } from "react";
import { debugCode } from "../api";
import { toast } from "react-toastify";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

const CodeInput = ({ setExplanation }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");

  const handleDebug = async () => {
    if (!code.trim()) return toast.error("Code cannot be empty");
    try {
      const data = await debugCode(code, language);
      setExplanation(data);
      toast.success("Code analyzed successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Paste your code:</Typography>
      <TextField
        label="Code"
        multiline
        minRows={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        fullWidth
      >
        <MenuItem value="JavaScript">JavaScript</MenuItem>
        <MenuItem value="Python">Python</MenuItem>
        <MenuItem value="C++">C++</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleDebug}>
        Debug Code
      </Button>
    </Box>
  );
};

export default CodeInput;
