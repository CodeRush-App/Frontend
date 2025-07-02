import axiosInstance from "./axiosInstance";

interface education {
    institution: string;
    major: string;
    degree: string;
    start: string;
    end: string;
    gpa: number;
    notes?: string;
}

interface workExperience {
    position: string;
    company: string;
    start: string;
    end: string;
    location: string;
    notes?: string;
}

export interface User {
    id?: string;
    name?: string;
    username: string;
    email?: string;
    password: string;
    country?: string;
    phoneNumber?: string;
    skills?: string[];
    education?: education[];
    workExperience?: workExperience[];
    score?: number;
    elo?: number;
    isAdmin?: boolean;
    provider?: string;
    providerId?: string;
}

interface UserRegister {
    name?: string;
    username: string;
    email: string;
    password: string;
    providerId?: string;
    provider: string;
}

export const registerUser = async (userData: UserRegister) => {
    try {
        const response = await axiosInstance.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await axiosInstance.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkUserExists = async (email: string) => {
    try {
        const response = await axiosInstance.get("/users/exists", {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};