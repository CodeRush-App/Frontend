"use client"
import { getProblems, Problem } from "@/api/problem";
import { brandColors } from "@/app/theme";
import ProblemFilter, { ProblemFilterProps } from "@/components/Problem/ProblemFilter";
import ProblemList from "@/components/Problem/ProblemList";
import { getProblemsSolved, getProgressToNextBadge, getSuccessRate, isProblemSolved } from "@/lib/problemUtils";
import BronzeBadge from "@/public/bronze.png";
import { Box, Button, Divider, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Problems() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[] | undefined>(undefined);
  const [filter, setFilter] = useState<ProblemFilterProps['filter']>({
    status: [],
    difficulty: [],
    successRate: [0, 100],
  });
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  useEffect(() => {
    // TODO: Show user error
    getProblems().then((problems) => {
      setProblems(problems);
    });
  }, []);

  function handleFilterChange(newFilter: ProblemFilterProps['filter']) {
    setFilter(newFilter);
    const filteredProblems = problems.filter(problem => {
      const isSolved = isProblemSolved(problem);
      if (newFilter.status.length && !newFilter.status.includes(isSolved ? "Solved" : "Unsolved")) return false;
      // Difficulty
      if (newFilter.difficulty.length && !newFilter.difficulty.includes(problem.difficulty)) return false;
      // Success Rate
      const rate = getSuccessRate(problem, problems);
      if (rate < newFilter.successRate[0] || rate > newFilter.successRate[1]) return false;
      // Topic
      if (selectedTopic !== "All" && problem.topic !== selectedTopic) return false;
      return true;
    });
    setFilteredProblems(filteredProblems);
    console.log(filteredProblems);
  }

  function onSelectTopic(event: SelectChangeEvent) {
    setSelectedTopic(event.target.value);
    if (event.target.value === "All") {
      setFilteredProblems(undefined);
    } else {
      setFilteredProblems(problems.filter((problem) => problem.topic === event.target.value));
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: "15vw", pt: "10vh" }}>
      <Box sx={{ display: "flex", gap: 2, backgroundColor: brandColors.dark, borderRadius: 2, p: 2, justifyContent: "space-between" }}>
        <Select variant="outlined" value={selectedTopic} sx={{ minWidth: "200px" }} onChange={onSelectTopic}>
          <MenuItem value="All">All</MenuItem>
          {problems.map((problem) => (
            <MenuItem key={problem.id} value={problem.topic}>
              {problem.topic}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <p>Problems solved: {getProblemsSolved(problems).length} / {filteredProblems?.length || problems.length || 0}</p>
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mr: 2 }}>
            <p>Progess to next badge:</p>
            <p>{getProgressToNextBadge(problems)[0]}% - {getProgressToNextBadge(problems)[1]} / {filteredProblems?.length || problems.length || 0}</p>
          </Box>
          <Image src={BronzeBadge} alt="Bronze Badge" width={50} height={50} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <h2>Select a problem</h2>
        <Divider sx={{ flex: 1, borderColor: brandColors.dark, borderWidth: 1, borderRadius: 2 }} />
        <TextField variant="outlined" label="Search" onChange={(event) => { setFilteredProblems(problems.filter((problem) => problem.title.toLowerCase().includes(event.target.value.toLowerCase()))) }} />
        <Button variant="contained" onClick={(event) => { setAnchorEl(event.currentTarget); setOpenFilter(true) }} id="filter-button">Filter</Button>
      </Box>

      <Box sx={{ pr: 2, overflowY: "auto", height: "calc(100vh - 300px)" }}>
        <ProblemList problems={filteredProblems || problems} />
      </Box>
      <ProblemFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        anchorEl={anchorEl}
        filter={filter}
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
}