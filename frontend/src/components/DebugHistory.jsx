import { useEffect, useState } from "react";
import { getDebugHistory } from "../api";
import { toast } from "react-toastify";
import {
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";

const DebugHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getDebugHistory();
        setHistory(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {history.map((entry, index) => (
        <Card key={index} variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">
              <strong>Language:</strong> {entry.language}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Code:</strong> <pre>{entry.code}</pre>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Error Type:</strong> <pre>{entry.result.error_type}</pre>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Explanation:</strong> <pre>{entry.result.explanation}</pre>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Fixed Code:</strong> <pre>{entry.result.fixed_code}</pre>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Optimizations:</strong> <pre>{entry.result.optimizations}</pre>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DebugHistory;
