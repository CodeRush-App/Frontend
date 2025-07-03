import axiosInstance, { JUDGE0_URL } from "./axiosInstance";

export interface Submission {
  id?: string;
  userId: string;
  problemId: string;
  result: "Accepted" | "Denied";
  language: string;
  submissionDate?: string;
  calculationTimeMs: number;
  complexity: string;
  memoryUsageKb: number;
  code: string;
}

export interface Judge0Submission {
  source_code: string;
  language_id: number;
  compiler_options?: string;
  command_line_arguments?: string;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  cpu_extra_time?: number;
  wall_time_limit?: number;
  memory_limit?: number;
  stack_limit?: number;
  max_processes_and_or_threads?: number;
  enable_per_process_and_thread_time_limit?: boolean;
  enable_per_process_and_thread_memory_limit?: boolean;
  max_file_size?: number;
  redirect_stderr_to_stdout?: boolean;
  enable_network?: boolean;
  number_of_runs?: number;
  additional_files?: string;
  callback_url?: string;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  exit_code?: number;
  exit_signal?: number;
  status?: string;
  created_at?: Date;
  finished_at?: Date;
  token?: string;
  time?: number;
  wall_time?: number;
  memory?: number;
}

export async function getSubmissions(): Promise<Submission[]> {
  const response = await axiosInstance.get("/submissions");
  return response.data;
}

export async function createSubmission(
  submission: Submission
): Promise<Submission> {
  const response = await axiosInstance.post("/submissions", submission);
  return response.data;
}

export async function getSubmissionsForProblem(
  userId: string,
  problemId: string
): Promise<Submission[]> {
  const response = await axiosInstance.get(
    `/submissions/${userId}/${problemId}`
  );
  return response.data;
}

export async function sendJudge0Submission(
  submission: Judge0Submission
): Promise<string> {
  const res = await axiosInstance.post(JUDGE0_URL + "/submissions", submission);
  return res.data.token;
}

export async function getJudge0Result(token: string): Promise<Judge0Submission> {
  const res = await axiosInstance.get(JUDGE0_URL + "/submissions/" + token);
  return res.data;
}