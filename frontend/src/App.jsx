import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import pages
import Landing from "./pages/Landing";
import LoginSignupPage from "./pages/LoginSignupPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import DebugPage from "./pages/DebugPage";
import DebugHistory from "./components/DebugHistory";

// Import AuthContext
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginSignupPage />} />

          {/* Routes with sidebar layout */}
          <Route 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/history" element={<DebugHistory />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </Router>
  );
}

export default App;