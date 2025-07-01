import { UserScore } from "@/api/user";

export function getUserRank(userId: string, userScore: UserScore[]): number {
  return (
    [...userScore]
      .sort((a, b) => b.elo - a.elo)
      .findIndex((user) => user.id === userId) + 1
  );
}

export function getUserRankPercentage(
  userId: string,
  userScore: UserScore[]
): number {
  return Number(
    ((getUserRank(userId, userScore) / userScore.length) * 100).toFixed(2)
  );
}
