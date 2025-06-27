import { Problem } from "@/api/problem";

// TODO: implement
export function getProblemsSolved(problems: Problem[]): Problem[] {
  return [problems[0]];
}

// TODO: implement
// Returns [percentage, problems solved]
export function getProgressToNextBadge(problems: Problem[]): [number, number] {
  const solvedProblems = getProblemsSolved(problems);
  const percentage = solvedProblems.length / problems.length;
  return [percentage * 100, solvedProblems.length];
}

// TODO: implement
export function getSuccessRate(problem: Problem, problems: Problem[]) {
  const amountOfSubmissons = 100;
  const amountOfCompletedSubmissions = 82;
  const percentage = amountOfCompletedSubmissions / amountOfSubmissons;
  return percentage * 100;
}

// TODO: implement
export function isProblemSolved(problem: Problem): boolean {
  return false;
}
