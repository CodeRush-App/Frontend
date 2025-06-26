"use client"
import { getProblems, Problem } from "@/api/problem";
import { brandColors } from "@/app/theme";
import ProblemList from "@/components/Problem/ProblemList";
import { getProblemsSolved, getProgressToNextBadge } from "@/lib/problemUtils";
import BronzeBadge from "@/public/bronze.png";
import { Box, Button, Divider, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Problems() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<Problem[] | undefined>(undefined);

  useEffect(() => {
    getProblems().then((problems) => {
      setProblems(problems);
    });
  }, []);

  function onSelectTopic(event: SelectChangeEvent) {
    setSelectedTopic(event.target.value);
    if (event.target.value === "All") {
      setSelectedProblems(undefined);
    } else {
      setSelectedProblems(problems.filter((problem) => problem.topic === event.target.value));
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
          <p>Problems solved: {getProblemsSolved(problems).length} / {selectedProblems?.length || problems.length || 0}</p>
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mr: 2 }}>
            <p>Progess to next badge:</p>
            <p>{getProgressToNextBadge(problems)[0]}% - {getProgressToNextBadge(problems)[1]} / {selectedProblems?.length || problems.length || 0}</p>
          </Box>
          <Image src={BronzeBadge} alt="Bronze Badge" width={50} height={50} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <h2>Select a problem</h2>
        <Divider sx={{ flex: 1, borderColor: brandColors.dark, borderWidth: 1, borderRadius: 2 }} />
        <Button variant="contained">Filter</Button>
      </Box>

      <Box sx={{ pr: 2, overflowY: "auto", height: "calc(100vh - 300px)" }}>
        <ProblemList problems={selectedProblems || problems} />
      </Box>
    </Box>
  );
}