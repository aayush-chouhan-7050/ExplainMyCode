import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser, login as apiLogin, logout as apiLogout, register as apiRegister, 
} from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      // Only try to load user if we have a token
      if (localStorage.getItem('token')) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Failed to load user:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await apiLogin(email, password);
      setUser(res.user);
      toast.success("Login successful!");
      navigate("/dashboard");
      return res;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };
  const updateUserState = (updatedUser) => {
    setUser(updatedUser);
  };

  const register = async (email, password, username) => {
    try {
      setError(null);
      const res = await apiRegister(email, password, username);
      setUser(res.user);
      toast.success("Registration successful!");
      navigate("/dashboard");
      return res;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('token');
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Still remove user data even if logout API fails
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUserState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}