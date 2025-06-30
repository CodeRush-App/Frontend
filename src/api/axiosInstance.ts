import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "bypass-tunnel-reminder": "true",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaXNBZG1pbiI6dHJ1ZX0.O4TU0HcG1CTkmbjbyrsiXulZy_NC7AVEuBFhVtsFGmM",
    withCredentials: true,
  },
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
