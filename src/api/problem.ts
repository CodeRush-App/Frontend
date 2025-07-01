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

/**
 * Fetches all problems from the API.
 * @returns {Promise<Problem[]>} Array of problems
 */
export const getProblems = async (): Promise<Problem[]> => {
  const response = await axiosInstance.get<Problem[]>("/problems");
  return response.data;
};

export const getProblem = async (problemId: string): Promise<Problem> => {
  const response = await axiosInstance.get<Problem>(`/problems/${problemId}`);
  return response.data;
};
