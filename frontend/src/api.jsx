import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const debugCode = async (code, language) => {
  try {
    const res = await axios.post(`${API_URL}/debug`, { code, language });
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error debugging code");
  }
};

export const getDebugHistory = async () => {
  try {
    const res = await axios.get(`${API_URL}/debug/history`);
    console.log(res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch debugging history");
  }
};
