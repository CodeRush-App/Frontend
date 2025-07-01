import { Problem } from "@/api/problem";
import { Submission } from "@/api/submission";
import { User } from "@/api/user";

export function getProblemsSolved(problems: Problem[], submissions: Submission[]): Problem[] {
  return problems.filter((problem) => isProblemSolved(problem, submissions));
}

export function getProgressToNextBadge(topic: string, user: User | null, problems: Problem[], submissions: Submission[]): [number, number, number] {
  if (!user || topic === "All") return [0, 0, 0];
  const topicProblems = problems.filter((problem) => problem.topic === topic);
  const solvedProblems = getProblemsSolved(topicProblems, submissions);
  const solvedScore = solvedProblems.reduce((acc, problem) => acc + getScoreForProblem(problem), 0);
  const scoreToNextBadge = solvedScore < 1000 ? 1000 : solvedScore < 2000 ? 2000 : solvedScore < 3000 ? 3000 : 0;

  const percentage = (solvedScore / scoreToNextBadge * 100).toFixed(2);
  return [Number(percentage), solvedScore, scoreToNextBadge];
}

export function getSuccessRate(problem: Problem, submissions: Submission[]) {
  const amountOfSubmissions = submissions.filter((submission) => submission.problemId === problem.id).length;
  const amountOfCompletedSubmissions = submissions.filter((submission) => submission.problemId === problem.id && submission.result === "Accepted").length;
  if (amountOfSubmissions === 0 || amountOfCompletedSubmissions === 0) return 0;
  const percentage = amountOfCompletedSubmissions / amountOfSubmissions;
  return percentage * 100;
}

export function isProblemSolved(problem: Problem, submissions: Submission[]): boolean {
  return submissions.some((submission) => submission.problemId === problem.id && submission.result === "Accepted");
}

export function getScoreForProblem(problem: Problem): number {
  return problem.difficulty === "Easy" ? 10 : problem.difficulty === "Medium" ? 25 : 100;
}

export function getBadgeFromScore(score: number): string {
  if (score < 1000) return "Bronze";
  if (score < 2000) return "Silver";
  if (score < 3000) return "Gold";
  return "Diamond";
}
