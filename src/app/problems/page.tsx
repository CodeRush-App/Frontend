"use client"
import { getProblems, Problem } from "@/api/problem";
import { getSubmissions, Submission } from "@/api/submission";
import { getUser, User } from "@/api/user";
import { brandColors } from "@/app/theme";
import ProblemFilter, { ProblemFilterProps } from "@/components/Problem/ProblemFilter";
import ProblemList from "@/components/Problem/ProblemList";
import ScoreBadge from "@/components/ScoreBadge";
import { getProblemsSolved, getProgressToNextBadge, getSuccessRate, isProblemSolved } from "@/lib/problemUtils";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Divider, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getProblems()
      .then((problems) => {
        setProblems(problems);
      })
      .catch((error) => {
        // TODO: show error message in UI instead of just console
        console.error(error);
      });
    getSubmissions()
      .then((submissions) => {
        setSubmissions(submissions);
      })
      .catch((error) => {
        // TODO: show error message in UI instead of just console
        console.error(error);
      });
    //TODO: get current user id
    getUser("68594614c973259bbe213684")
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        // TODO: show error message in UI instead of just console
        console.error(error);
      });
  }, []);

  const filteredProblems = useMemo(() => {
    let result = problems;
    if (selectedTopic !== ALL_TOPICS) {
      result = result.filter((problem) => problem.topic === selectedTopic);
    }
    result = result.filter((problem) => {
      const isSolved = isProblemSolved(problem, submissions);
      if (filter.status.length && !filter.status.includes(isSolved ? "Solved" : "Unsolved")) return false;
      if (filter.difficulty.length && !filter.difficulty.includes(problem.difficulty)) return false;
      const rate = getSuccessRate(problem, submissions);
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, px: "15vw", pt: "10vh" }}>
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
          <p>Problems solved: {getProblemsSolved(problems, submissions).length} / {filteredProblems?.length || problems.length || 0}</p>
          {selectedTopic !== "All" &&
            <>
              <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mr: 2 }}>
                <p>Progess to next badge:</p>
                <p>{
                  getProgressToNextBadge(selectedTopic, user, problems, submissions)[0]}% - {getProgressToNextBadge(selectedTopic, user, problems, submissions)[1]} / {getProgressToNextBadge(selectedTopic, user, problems, submissions)[2]
                  }</p>
              </Box>
              <ScoreBadge score={getProgressToNextBadge(selectedTopic, user, problems, submissions)[1]} />
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

      <Box sx={{ pr: 2, overflowY: "auto", height: "calc(90vh - 300px)" }}>
        <ProblemList problems={filteredProblems || problems} submissions={submissions} />
      </Box>
      <ProblemFilter
        open={openFilter}
        onClose={handleCloseFilter}
        anchorEl={anchorEl}
        filter={filter}
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
}