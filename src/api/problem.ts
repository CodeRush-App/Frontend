import axiosInstance from "./axiosInstance";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  topic: string;
  tags: string[];
  description: string;
  function: ProblemFunction;
  constraints: string[];
  examples: Example[];
  testCases: TestCase[];
  createdAt: string;
  updatedAt: string;
}

export interface Example {
  explanation: string;
  input: string;
  output: boolean;
}

export interface ProblemFunction {
  name: string;
  parameters: { name: string; type: string, description: string }[];
  return: { type: string, description: string };
}

export interface TestCase {
  input: string;
  expectedOutput: string;
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
