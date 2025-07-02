"use client"
import { Problem } from "@/app/api/problem";
import { Submission } from "@/app/api/submission";
import { brandColors } from "@/app/theme";
import { Box, Button, Card, CircularProgress, Divider, Chip, Tab, Tabs, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";

export default function ProblemCard({ problem, submissions }: { problem: Problem, submissions: Submission[] }) {
  const [tab, setTab] = useState<number>(0);

  return (
    <Card sx={{ display: "flex", flexDirection: "column", p: 2, flex: 1, maxWidth: "30vw", gap: 2, maxHeight: "80vh", overflowY: "auto" }}>
      {/* Tab Headers */}
      <Tabs value={tab} onChange={(_event: React.SyntheticEvent, v: number) => setTab(v)} variant="fullWidth" sx={{ mb: 2 }}>
        <Tab label="Problem" />
        <Tab label="Submissions" />
        <Tab label="Leaderboard" />
        <Tab label="Discussion" />
      </Tabs>
      {/* Tab Content */}
      {tab === 0 && (
        <>
          <Box>
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>{problem.title}</Typography>
            <Typography color="primary" sx={{ fontSize: 18 }}>{problem.difficulty} • {problem.topic}</Typography>
          </Box>
          <Divider sx={{ borderColor: brandColors.darkest, borderWidth: 1, borderRadius: 2 }} />
          <Typography sx={{ whiteSpace: "pre-line" }}>{problem.description}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Constraints:</Typography>
            {problem?.constraints.map((c, i) => <Box key={i}><Typography variant="body2" sx={{ fontFamily: "monospace" }}>{c}</Typography></Box>)}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Examples:</Typography>
            {problem?.examples?.map((e, i) => <Box key={i}>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "monospace" }}>&quot;{String(e.input) || ""}&quot;</Typography>
              <Typography variant="body2">{e.explanation || ""}</Typography>
            </Box>)}
          </Box>
        </>
      )}
      {tab === 1 && (
        <Box>
          {!submissions ? <CircularProgress /> : (
            <Table aria-label="simple table" sx={{ backgroundColor: brandColors.darkest, borderRadius: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell><b>Result</b></TableCell>
                  <TableCell><b>Language</b></TableCell>
                  <TableCell><b>Submission Date</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow
                    key={s.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {s.result === 'Accepted' ? <Chip label={s.result} color="success" /> : <Chip label={s.result} color="error" />}
                    </TableCell>
                    <TableCell>{s.language}</TableCell>
                    <TableCell>{new Date(s.submissionDate!).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => console.log(s.code)}>View submission</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}
      {tab === 2 && <Box></Box>}
      {tab === 3 && <Box></Box>}
    </Card>
  )
}