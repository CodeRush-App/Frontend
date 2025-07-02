"use client"
import { pollMatch, sendMatchData } from "@/api/match";
import { getProblem, Problem } from "@/api/problem";
import { Judge0Submission, Submission } from "@/api/submission";
import EditorCard from "@/components/Solve/EditorCard";
import OutputCard from "@/components/Solve/OutputCard";
import ProblemCard from "@/components/Solve/ProblemCard";
import { parseStdout, passedAllTests } from "@/lib/solveUtils";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MatchPage() {
  const { roomId, problemId } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [testResults, setTestResults] = useState<Judge0Submission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [matchResult, setMatchResult] = useState<boolean | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          // When the timer reaches 0, disable the submit button
          setDisableSubmit(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getProblem(problemId as string)
      .then((problem) => {
        setProblem(problem);
      })
      .catch(() => setError("Problem not found."))
      .finally(() => setLoading(false));
  }, [problemId]);

  useEffect(() => {
    if (!testResults || !problem || !roomId || !disableSubmit) return;
    const send = async () => {
      const passed = passedAllTests(testResults, problem);
      try {
        const matchResult = await sendMatchData("68594614c973259bbe213684" as string, roomId as string, {
          calculationTimeMs: testResults.time || 0,
          memoryUsageKb: testResults.memory || 0,
          result: passed ? "Accepted" : "Denied",
          testResults: Object.entries(parseStdout(testResults.stdout!, problem) || {}).map(([key, value]) => value)
        });
        if (matchResult) {
          setMatchResult(matchResult);
        } else {
          if (!matchResult) {
            const intervalId = window.setInterval(async () => {
              try {
                const matchResult = await pollMatch("68594614c973259bbe213684" as string, roomId as string);
                if (matchResult) {
                  setMatchResult(matchResult);
                  clearInterval(intervalId);
                }
              } catch (err) {
                console.error(err);
              }
            }, 1000);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    send();
  }, [disableSubmit]);

  const timerDisplay = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  if (error || !problem) return <Alert severity="error">{error || "Problem not found."}</Alert>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 15 }}>
      {!matchResult &&
        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
          {disableSubmit ? "Time's up!" : `Time left: ${timerDisplay}`}
        </Typography>}
      {disableSubmit && !matchResult && <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>Waiting for other user to submit...</Typography>}
      {matchResult && <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>{matchResult ? "You won!" : "You lost."}</Typography>}
      <Box sx={{ display: "flex", gap: 4 }}>
        <ProblemCard problem={problem} disableOptions />
        <EditorCard problem={problem} passTestResults={setTestResults} passLoading={setSubmissionLoading} disableSubmit={disableSubmit} setDisableSubmit={setDisableSubmit} pvp />
      </Box>
      <Box sx={{ alignSelf: "flex-end" }}>
        <OutputCard testResults={testResults} problem={problem} loading={submissionLoading} />
      </Box>
    </Box >
  );
}