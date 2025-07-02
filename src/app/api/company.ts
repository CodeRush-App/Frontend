import axiosInstance from "./axiosInstance";

export interface OpenPosition {
    duration: string;
    position: string;
    qualifications: string[];
    salary: string;
}

export interface UpcomingEvent {
    duration: string;
    location: string;
    name: string;
}

export interface Company {
    id?: string;
    name: string;
    size?: string;
    country?: string;
    managedBy: string;
    openPositions?: OpenPosition[];
    upcomingEvents?: UpcomingEvent[];
}

interface CompanyRegister {
    username: string;
    email: string;
    password: string;
    companyName: string;
}

export const registerCompany = async (companyData: CompanyRegister) => {
    try {
        const response = await axiosInstance.post("/companies", companyData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
