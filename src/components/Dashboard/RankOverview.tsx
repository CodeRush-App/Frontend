"use client"
import { getUserScore, User, UserScore } from "@/api/user";
import { getUserRank, getUserRankPercentage } from "@/lib/userUtils";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RankOverview({ user }: { user: User | null }) {
  const [userScore, setUserScore] = useState<UserScore[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserScore()
      .then(setUserScore)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !user) {
    return (
      <Card sx={{ minWidth: "25vw" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h2><u>Overall rank</u></h2>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error || !userScore) {
    return (
      <Card sx={{ minWidth: "10vw" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h2><u>Overall rank</u></h2>
          <p>{error || "Failed to load user score"}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: "25vw" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h2><u>Overall rank</u></h2>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 18 }}>Ranked elo: {user.elo}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 18 }}>Rank: {getUserRank(user.id!, userScore)}</Typography>
          <Typography sx={{ fontSize: 18 }}>Top {getUserRankPercentage(user.id!, userScore)}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}