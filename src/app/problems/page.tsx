"use client"
import { getProblems, Problem } from "@/app/api/problem";
import { getSubmissions, Submission } from "@/app/api/submission";
import { brandColors } from "@/app/theme";
import ProblemFilter, { ProblemFilterProps } from "@/components/Problem/ProblemFilter";
import ProblemList from "@/components/Problem/ProblemList";
import ScoreBadge from "@/components/ScoreBadge";
import { getProblemsSolved, getProgressToNextBadge, getSuccessRate, isProblemSolved } from "@/lib/problemUtils";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, CircularProgress, Divider, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Problems() {
  const ALL_TOPICS = "All";
  const FILTER_INITIAL_STATE: ProblemFilterProps['filter'] = {
    status: [],
    difficulty: [],
    successRate: [0, 100],
  };

  const [selectedTopic, setSelectedTopic] = useState<string>(ALL_TOPICS);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<ProblemFilterProps['filter']>(FILTER_INITIAL_STATE);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    getProblems()
      .then((problems) => {
        setProblems(problems);
        getSubmissions()
          .then((submissions) => {
            setSubmissions(submissions);
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load submissions");
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Failed to load problems");
        setLoading(false);
      });

  }, [status]);

  const filteredProblems = useMemo(() => {
    let result = problems;
    if (selectedTopic !== ALL_TOPICS) {
      result = result.filter((problem) => problem.topic === selectedTopic);
    }
    result = result.filter((problem) => {
      const isSolved = isProblemSolved(problem, submissions);
      if (filter.status.length && !filter.status.includes(isSolved ? "Solved" : "Unsolved")) return false;
      if (filter.difficulty.length && !filter.difficulty.includes(problem.difficulty)) return false;
      const rate = getSuccessRate();
      if (rate < filter.successRate[0] || rate > filter.successRate[1]) return false;
      return true;
    });
    return result;
  }, [problems, filter, selectedTopic, submissions]);

  const handleFilterChange = useCallback((newFilter: ProblemFilterProps['filter']) => {
    setFilter(newFilter);
  }, []);

  const onSelectTopic = useCallback((event: SelectChangeEvent) => {
    setSelectedTopic(event.target.value);
  }, []);

  const handleOpenFilter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 2, backgroundColor: brandColors.dark, borderRadius: 2, p: 2, justifyContent: "space-between" }}>
            <Select variant="outlined" value={selectedTopic} sx={{ minWidth: "200px" }} onChange={onSelectTopic}>
              <MenuItem value={ALL_TOPICS}>All</MenuItem>
              {problems.map((problem) => (
                <MenuItem key={problem.id} value={problem.topic}>
                  {problem.topic}
                </MenuItem>
              ))}
            </Select>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <p>Problems solved: {getProblemsSolved(problems, submissions, selectedTopic).length} / {filteredProblems?.length || problems.length || 0}</p>
              {selectedTopic !== "All" &&
                <>
                  <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mr: 2 }}>
                    <p>Progess to next badge:</p>
                    <p>{
                      getProgressToNextBadge(selectedTopic, problems, submissions)[0]}% - {getProgressToNextBadge(selectedTopic, problems, submissions)[1]} / {getProgressToNextBadge(selectedTopic, problems, submissions)[2]
                      }</p>
                  </Box>
                  <ScoreBadge score={getProgressToNextBadge(selectedTopic, problems, submissions)[1]} />
                </>
              }
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
            <h2>Select a problem</h2>
            <Divider sx={{ flex: 1, borderColor: brandColors.dark, borderWidth: 1, borderRadius: 2 }} />
            <IconButton onClick={handleOpenFilter} size="small">
              <FilterAltIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box sx={{ pr: 2, overflowY: "auto", height: "calc(80vh - 300px)" }}>
            <ProblemList problems={filteredProblems || problems} />
          </Box>
          <ProblemFilter
            open={openFilter}
            onClose={handleCloseFilter}
            anchorEl={anchorEl}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        </>
      )
      }
    </Box>
  );
}