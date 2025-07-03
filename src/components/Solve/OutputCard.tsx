import { Problem } from "@/app/api/problem";
import { Judge0Submission } from "@/app/api/submission";
import { brandColors } from "@/app/theme";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { parseStdout } from "@/lib/solveUtils";

export default function OutputCard({ testResults, problem, loading }: { testResults: Judge0Submission | null; problem: Problem; loading?: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!testResults || !problem?.testCases) return null;

  const stdoutMap = parseStdout(testResults.stdout!, problem);

  return (
    <Card sx={{ flex: 1, width: "50vw" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>{Object.values(stdoutMap).every(v => v) ? "Congratulations!" : "Failed"}{loading && " (Loading...)"}</Typography>
          <Typography variant="subtitle2">Your code {Object.values(stdoutMap).every(v => v) ? "passed all" : "failed some"} test cases. Click the submit button to submit your code.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 2 }}>
          <Typography variant="subtitle2">Time: {testResults.time ? `${testResults.time}s` : '-'}</Typography>
          <Typography variant="subtitle2">Memory: {testResults.memory ? `${testResults.memory} KB` : '-'}</Typography>
        </Box>

        <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>Test Cases</Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 2 }}>
          {problem.testCases.map((tc, idx) => {
            const passed = stdoutMap[idx];
            return (
              <Box
                key={idx}
                sx={{
                  border: 2,
                  borderColor: passed === undefined ? 'grey.400' : passed ? 'success.main' : 'error.main',
                  borderRadius: 2,
                  backgroundColor: brandColors.darkest,
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  minWidth: 140,
                  textAlign: 'center',
                  boxShadow: expanded === idx ? 10 : 0,
                  transition: 'box-shadow 0.2s',
                }}
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <Typography fontWeight={600}>{`Test case ${idx + 1}`}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {passed === undefined ? 'Not run' : passed ? 'Passed' : 'Failed'}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {expanded !== null && problem.testCases[expanded] && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Divider sx={{ borderColor: brandColors.darkest, borderWidth: 1, borderRadius: 2 }} />
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{`Details for Test case ${expanded + 1}`}</Typography>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Input</Typography>
              <Box sx={{ backgroundColor: brandColors.darkest, borderRadius: 2, p: 1, my: 1 }}>
                <Typography variant="body2"><code>{String(problem.testCases[expanded].input)}</code></Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Expected</Typography>
              <Box sx={{ backgroundColor: brandColors.darkest, borderRadius: 2, p: 1, my: 1 }}>
                <Typography variant="body2"><code>{String(problem.testCases[expanded].expectedOutput)}</code></Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Result</Typography>
              <Box sx={{ backgroundColor: brandColors.darkest, borderRadius: 2, p: 1, my: 1 }}>
                <Typography variant="body2"><code>{String(testResults.stdout?.split('\n')[expanded] ?? '-')}</code></Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}