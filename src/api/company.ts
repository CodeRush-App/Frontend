import axiosInstance from "./axiosInstance";

export interface Company {
    id: string;
    name: string;
    size: string;
    country: string;
    managedBy: string;
    openPositions: OpenPosition[]
    upcomingEvents: UpcomingEvent[]
}

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

export async function getCompany(companyId: string): Promise<Company> {
  const response = await axiosInstance.get(`/companies/${companyId}`);
  return response.data;
}