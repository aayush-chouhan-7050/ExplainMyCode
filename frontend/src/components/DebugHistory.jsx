import { useEffect, useState } from "react";
import { getDebugHistory } from "../api";
import {
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  TextField,
  Pagination,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const DebugHistory = () => {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getDebugHistory();
        setHistory(data);
        setFiltered(data);
        toast.success("History loaded!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const results = history.filter(
      (entry) =>
        (entry.code && entry.code.toLowerCase().includes(lowerQuery)) ||
        (entry.result?.explanation && 
          entry.result.explanation.toLowerCase().includes(lowerQuery)) ||
        (entry.language && entry.language.toLowerCase().includes(lowerQuery))
    );
    setFiltered(results);
    setPage(1); // reset to page 1 when searching
  }, [searchQuery, history]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <CircularProgress />;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Search code, explanation, or language"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />

      {paginatedItems.length > 0 ? (
        paginatedItems.map((entry, index) => (
          <Card key={index} variant="outlined">
            <CardContent sx={{ overflowX: "auto" }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Language:</strong> {entry.language}
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>Code:</strong>
              </Typography>
              <Box sx={{ fontSize: '0.8rem' }}> {/* Smaller font container */}
                <SyntaxHighlighter 
                  language={entry.language || 'javascript'} 
                  style={materialLight}
                  customStyle={{
                    margin: 0,
                    padding: '1em',
                    fontSize: 'inherit', // Inherits from parent Box
                    lineHeight: '1.3' // Tighter line height
                  }}
                >
                  {entry.code}
                </SyntaxHighlighter>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>Explanation:</strong>
              </Typography>
              <Box component="div" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' , fontSize: '0.9rem' }}>
                {entry.result?.explanation}
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" align="center">
          No history entries found
        </Typography>
      )}

      {filtered.length > itemsPerPage && (
        <Stack alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
};

export default DebugHistory;