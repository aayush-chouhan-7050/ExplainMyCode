import axios from "axios";

const api = axios.create({
  baseURL: "https://explainmycode-backend.onrender.com",
  withCredentials: true,
});


// Auth endpoints
export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const register = async (email, password, name) => {
  try {
    const res = await api.post("/auth/register", { email, password, name });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
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
    return res.data;
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

export default api;