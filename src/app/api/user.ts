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
  skills: string[];
  education: education[];
  workExperience: workExperience[];
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

export interface UserScore {
  id: string;
  username: string;
  score: number;
  elo: number;
  country: string;
}

export async function getUser(userId: string): Promise<User> {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
}

export async function getUsers(): Promise<User[]> {
  const response = await axiosInstance.get(`/users`);
  return response.data;
}

export const registerUser = async (userData: UserRegister) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const checkUserExists = async (email: string) => {
  const response = await axiosInstance.get("/users/exists", {
    params: { email }
  });
  return response.data;
};

export async function updateUser(user: User): Promise<User> {
  // Remove unallowed fields without creating variables
  const userWithoutUnallowedFields: User = { ...user };
  delete userWithoutUnallowedFields.id;
  delete userWithoutUnallowedFields.score;
  delete userWithoutUnallowedFields.elo;
  delete userWithoutUnallowedFields.isAdmin;
  delete userWithoutUnallowedFields.email;
  delete userWithoutUnallowedFields.provider;
  delete userWithoutUnallowedFields.providerId;
  const response = await axiosInstance.put(
    `/users/${user.id}`,
    userWithoutUnallowedFields
  );
  return response.data;
}

export async function getUserScore(): Promise<UserScore[]> {
  const response = await axiosInstance.get(`/users/scores`);
  return response.data;
}
