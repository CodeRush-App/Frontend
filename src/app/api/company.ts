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
  openPositions: OpenPosition[];
  upcomingEvents: UpcomingEvent[];
}

interface CompanyRegister {
  username: string;
  email: string;
  password: string;
  companyName: string;
}

export async function getCompany(companyId: string): Promise<Company> {
  const response = await axiosInstance.get(`/companies/${companyId}`);
  return response.data;
}

export async function getCompanies(): Promise<Company[]> {
  const response = await axiosInstance.get(`/companies`);
  return response.data;
}

export async function updateCompany(companyId: string, company: Company): Promise<Company> {
  const updatedCompany = { ...company };
  delete updatedCompany.id;
  delete updatedCompany.size;
  const response = await axiosInstance.put(`/companies/${companyId}`, updatedCompany);
  return response.data;
}

export const registerCompany = async (companyData: CompanyRegister) => {
  const response = await axiosInstance.post("/companies", companyData);
  return response.data;
};
