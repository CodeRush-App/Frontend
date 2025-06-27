import axiosInstance from "./axiosInstance";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  topic: string;
  tags: string[];
  description: string;
  function: string;
  constraints: string[];
  examples: string[];
  testCases: string[];
  createdAt: string;
  updatedAt: string;
}

export const getProblems = async () => {
  try {
    const response = await axiosInstance.get('/problems');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};