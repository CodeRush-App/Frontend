import { Problem } from "@/app/api/problem";
import { Submission } from "@/app/api/submission";
import { getProblemsSolved, getProgressToNextBadge } from "@/lib/problemUtils";
import { Box, Card, Typography } from "@mui/material";
import ScoreBadge from "../ScoreBadge";

export default function TopicBadge({ problems, submissions, selectedTopic }: { problems: Problem[], submissions: Submission[], selectedTopic: string }) {
  const problemsSolved = getProblemsSolved(problems, submissions, selectedTopic);
  const progressToNextBadge = getProgressToNextBadge(selectedTopic, problems, submissions);

  return (
    <Card sx={{ padding: 2, position: "relative" }}>
      <ScoreBadge score={progressToNextBadge[1]} style={{ position: "absolute", top: 0, right: 0 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 24, textDecoration: "underline" }}>{selectedTopic}</Typography>
      </Box>
      <Typography>Problems solved</Typography>
      <Typography>{problemsSolved.length} / {problems.filter((problem) => problem.topic === selectedTopic).length}</Typography>
      <Typography>Progress to next badge</Typography>
      <Typography>{progressToNextBadge[0]}% - {progressToNextBadge[1]} / {progressToNextBadge[2]}</Typography>
    </Card>
  );
}