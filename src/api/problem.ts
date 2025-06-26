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
  const response = await axiosInstance.get('/problems');
  return response.data;
};