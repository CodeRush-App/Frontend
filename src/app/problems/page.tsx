"use client"
import { getProblems, Problem } from "@/api/problem";
import { brandColors } from "@/app/theme";
import ProblemFilter, { ProblemFilterProps } from "@/components/Problem/ProblemFilter";
import ProblemList from "@/components/Problem/ProblemList";
import { getProblemsSolved, getProgressToNextBadge, getSuccessRate, isProblemSolved } from "@/lib/problemUtils";
import BronzeBadge from "@/public/bronze.png";
import { Box, Button, Divider, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

export default function Problems() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filter, setFilter] = useState<ProblemFilterProps['filter']>({
    status: [],
    difficulty: [],
    successRate: [0, 100],
  });
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProblems()
      .then((problems) => {
        setProblems(problems);
      })
      .catch((error) => {
        // TODO: show error message
        console.error(error);
      });
  }, []);

  const filteredProblems = useMemo(() => {
    let result = problems;
    // Topic filter
    if (selectedTopic !== "All") {
      result = result.filter((problem) => problem.topic === selectedTopic);
    }
    // Search filter
    if (search.trim() !== "") {
      result = result.filter((problem) => problem.title.toLowerCase().includes(search.toLowerCase()));
    }
    // Status, difficulty, success rate filters
    result = result.filter((problem) => {
      const isSolved = isProblemSolved(problem);
      if (filter.status.length && !filter.status.includes(isSolved ? "Solved" : "Unsolved")) return false;
      if (filter.difficulty.length && !filter.difficulty.includes(problem.difficulty)) return false;
      const rate = getSuccessRate(problem, problems);
      if (rate < filter.successRate[0] || rate > filter.successRate[1]) return false;
      return true;
    });
    return result;
  }, [problems, filter, selectedTopic, search]);

  function handleFilterChange(newFilter: ProblemFilterProps['filter']) {
    setFilter(newFilter);
  }

  function onSelectTopic(event: SelectChangeEvent) {
    setSelectedTopic(event.target.value);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, px: "15vw", pt: "10vh" }}>
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
        <TextField variant="outlined" label="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Button variant="contained" onClick={(event) => { setAnchorEl(event.currentTarget); setOpenFilter(true) }} id="filter-button">Filter</Button>
      </Box>

      <Box sx={{ pr: 2, overflowY: "auto", height: "calc(90vh - 300px)" }}>
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