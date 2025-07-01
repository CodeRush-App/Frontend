import { Problem } from "@/api/problem";
import { Submission } from "@/api/submission";

export function getProblemsSolved(problems: Problem[], submissions: Submission[], topic?: string): Problem[] {
  if (!topic || topic == "All") return problems.filter((problem) => isProblemSolved(problem, submissions));
  return problems.filter((problem) => problem.topic === topic && isProblemSolved(problem, submissions));
}

export function getProgressToNextBadge(topic: string | null, problems: Problem[], submissions: Submission[]): [number, number, number] {
  if (!topic || topic === "All") return [0, 0, 0];
  const topicProblems = problems.filter((problem) => problem.topic === topic);
  const solvedProblems = getProblemsSolved(topicProblems, submissions);
  const solvedScore = solvedProblems.reduce((acc, problem) => acc + getScoreForProblem(problem), 0);
  const scoreToNextBadge = solvedScore < 1000 ? 1000 : solvedScore < 2000 ? 2000 : solvedScore < 3000 ? 3000 : Infinity;

  const percentage = (solvedScore / scoreToNextBadge * 100).toFixed(2);
  return [Number(percentage), solvedScore, scoreToNextBadge];
}

// TODO: Implement
export function getSuccessRate() {
  return 0;
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
