import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

// Add auth token to requests
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Load token from storage
const loadToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
};

// Auth endpoints
export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    setAuthToken(res.data.token);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const register = async (email, password, username) => {
  try {
    const res = await api.post("/auth/register", { email, password, username });
    setAuthToken(res.data.token);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
    setAuthToken(null);
    return { success: true };
  } catch (error) {
    throw new Error("Logout failed");
  }
};

// Debug endpoints
export const debugCode = async (code, language) => {
  try {
    const res = await api.post("/api/debug", { code, language });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error debugging code");
  }
};

export const getDebugHistory = async () => {
  try {
    const res = await api.get("/api/debug/history");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch debugging history");
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data.user;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const updateUserProfile = async (data) => {
  try {
    const res = await api.put("/api/auth/profile", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Profile update failed");
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      setAuthToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Initialize by loading token
loadToken();

export default api;