"use client"
import { Problem } from "@/app/api/problem";
import { createSubmission, getJudge0Result, Judge0Submission, sendJudge0Submission, Submission } from "@/app/api/submission";
import { addMain, getDefaultCode, LANGUAGES, passedAllTests } from "@/lib/solveUtils";
import { Box, Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function EditorCard({
  passLanguage,
  passTestResults,
  passLoading,
  passSubmission,
  problem,
}: {
  passLanguage?: (language: string) => void;
  passTestResults?: (testResults: Judge0Submission) => void;
  passLoading?: (loading: boolean) => void;
  passSubmission?: (submission: Submission) => void;
  problem: Problem;
}) {
  const [code, setCode] = useState(getDefaultCode(LANGUAGES[0].value, problem));
  const [runLoading, setRunLoading] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0].value);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [testResults, setTestResults] = useState<Judge0Submission | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setCode(getDefaultCode(language, problem));
  }, [language, problem]);

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
    if (passLanguage) passLanguage(e.target.value);
  };

  const sendSubmission = async (languageId: number) => {
    setRunLoading(true);
    if (passLoading) passLoading(true);
    const token = await sendJudge0Submission({
      source_code: addMain(language, code, problem),
      language_id: languageId,
    });

    let retryCount = 0;
    const intervalId = setInterval(async () => {
      retryCount++;
      try {
        const result = await getJudge0Result(token);
        if (result.status === "Processing" && retryCount < 3) return;
        clearInterval(intervalId);
        if (passTestResults) passTestResults(result);
        setTestResults(result);
      } catch (err) {
        console.error(err);
        clearInterval(intervalId);
      } finally {
        setRunLoading(false);
        if (passLoading) passLoading(false);
      }
    }, 1000);
  }

  const handleRunCode = async () => {
    if (!problem) return;
    const languageId = LANGUAGES.find(l => l.value === language)?.id;
    if (!languageId) return;

    await sendSubmission(languageId);
  };

  const handleSubmitCode = async () => {
    if (!problem || !language || !session) return;
    if (!testResults) {
      console.error("No test results");
      return;
    }

    setSubmitLoading(true);
    try {
      const submission: Submission = {
        userId: session.user.id,
        problemId: problem.id,
        result: passedAllTests(testResults, problem) ? "Accepted" : "Denied",
        language,
        calculationTimeMs: (Number(testResults.time || 0) * 1000),
        complexity: "O(n)",
        memoryUsageKb: testResults.memory || 0,
        code
      };
      const newSubmission = await createSubmission(submission);
      if (passSubmission) passSubmission(newSubmission);
    } catch (err) {
      // TODO: Show error to user
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Card sx={{ p: 2, flex: 1 }}>
      <Stack>
        <Box flex={1}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              label="Language"
              onChange={handleLanguageChange}
            >
              {LANGUAGES.map(lang => (
                <MenuItem key={lang.value} value={lang.value}>{lang.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ border: "1px solid #27375E", borderRadius: 2, overflow: "hidden", mb: 2, background: "#101c3a" }}>
            <MonacoEditor
              height="60vh"
              language={language}
              value={code}
              theme="vs-dark"
              onChange={v => setCode(v || "")}
              options={{ fontSize: 16, minimap: { enabled: false } }}
            />
          </Box>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "flex-end", alignItems: "center" }}>
            {runLoading && <CircularProgress size={24} />}
            <Button variant="contained" color="secondary" onClick={handleRunCode} disabled={runLoading} sx={{ fontWeight: "bold" }}>Run Code</Button>
            <Button variant="contained" color="primary" onClick={handleSubmitCode} disabled={submitLoading || !testResults} sx={{ fontWeight: "bold" }}>Submit Code</Button>
          </Stack>
        </Box>
      </Stack>
    </Card>
  )
}