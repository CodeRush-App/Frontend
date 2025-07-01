import axiosInstance from "./axiosInstance";

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  result: "Accepted" | "Denied";
  language: string;
  submissionDate: string;
  calculationTimeMs: number;
  complexity: string;
  memoryUsageKb: number;
  code: string;
}

export async function getSubmissions(): Promise<Submission[]> {
  const response = await axiosInstance.get("/submissions");
  return response.data;
}
