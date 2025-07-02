"use client"
import { getProblem, Problem } from "@/api/problem";
import { getSubmissionsForProblem, Judge0Submission, Submission } from "@/api/submission";
import EditorCard from "@/components/Solve/EditorCard";
import OutputCard from "@/components/Solve/OutputCard";
import ProblemCard from "@/components/Solve/ProblemCard";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Solve() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [testResults, setTestResults] = useState<Judge0Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with actual user
    getSubmissionsForProblem("68594614c973259bbe213684", problemId as string)
      .then(setSubmissions)
      .catch(() => setSubmissions([]))
  }, [problemId]);

  useEffect(() => {
    setLoading(true);
    getProblem(problemId as string)
      .then((problem) => {
        setProblem(problem);
      })
      .catch(() => setError("Problem not found."))
      .finally(() => setLoading(false));
  }, [problemId]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  if (error || !problem) return <Alert severity="error">{error || "Problem not found."}</Alert>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 15 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        <ProblemCard problem={problem} submissions={submissions} />
        <EditorCard problem={problem} passTestResults={setTestResults} passLoading={setSubmissionLoading} passSubmission={(s) => setSubmissions([...submissions, s])} />
      </Box>
      <Box sx={{ alignSelf: "flex-end" }}>
        <OutputCard testResults={testResults} problem={problem} loading={submissionLoading} />
      </Box>
    </Box >
  );
}