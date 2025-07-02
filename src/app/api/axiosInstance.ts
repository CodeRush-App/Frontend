import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
    withCredentials: true,
    headers: {
        "bypass-tunnel-reminder": "true"
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