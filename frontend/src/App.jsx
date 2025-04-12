import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppBar, Toolbar, Typography, Button , Box, Container} from "@mui/material";

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ExplainMyCode
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", py: 4 }} >
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
      </Box>
    </Router>
  );
}

export default App;
