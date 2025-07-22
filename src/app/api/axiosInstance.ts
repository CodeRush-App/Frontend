import axios from "axios";

export const JUDGE0_URL = process.env.NEXT_PUBLIC_JUDGE0_URL || "";
export const JUDGE0_HEADERS = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": process.env.NEXT_PUBLIC_JUDGE0_KEY || "",
  "X-RapidAPI-Host": process.env.NEXT_PUBLIC_JUDGE0_HOST || "",
};
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const headers: Record<string, string> = {};
if (process.env.NEXT_PUBLIC_API_TOKEN)
  headers["Authorization"] = "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    let userMessage = "An unexpected error occurred.";
    if (error.response) {
      userMessage =
        error.response.data?.message || `Error: ${error.response.status}`;
    } else if (error.request) {
      userMessage = "No response from server.";
    } else if (error.message) {
      userMessage = error.message;
    }
    error.userMessage = userMessage;
    return Promise.reject(error);
  }
);

export default axiosInstance;