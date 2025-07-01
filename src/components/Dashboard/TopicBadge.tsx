import { Problem } from "@/api/problem";
import { Submission } from "@/api/submission";
import { getProblemsSolved, getProgressToNextBadge } from "@/lib/problemUtils";
import { Box, Card, Typography } from "@mui/material";
import ScoreBadge from "../ScoreBadge";

export default function TopicBadge({ problems, submissions, selectedTopic }: { problems: Problem[], submissions: Submission[], selectedTopic: string }) {
  const problemsSolved = getProblemsSolved(problems, submissions, selectedTopic);
  const progressToNextBadge = getProgressToNextBadge(selectedTopic, problems, submissions);

  return (
    <Card sx={{ padding: 2, position: "relative" }}>
      <ScoreBadge score={progressToNextBadge[1]} style={{ position: "absolute", top: 0, right: 0 }}/>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1><u>{selectedTopic}</u></h1>
      </Box>
      <p>Problems solved:</p>
      <p><b>{problemsSolved.length} / {problems.filter((problem) => problem.topic === selectedTopic).length}</b></p>
      <p>Progress to next badge:</p>
      <Typography sx={{ fontWeight: "bold" }}>{progressToNextBadge[0]}% - {progressToNextBadge[1]} / {progressToNextBadge[2]}</Typography>
    </Card>
  );
}