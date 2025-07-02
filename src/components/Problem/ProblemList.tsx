import { Problem } from "@/app/api/problem";
import { brandColors } from "@/app/theme";
import { getSuccessRate } from "@/lib/problemUtils";
import { Box, Button } from "@mui/material";
import { memo, useMemo } from "react";

export default function ProblemList({ problems }: { problems: Problem[] }) {
  const tagColors = useMemo(
    () => [
      "#FFC107", "#FF9800", "#FF69B4", "#8BC34A", "#4CAF50", "#009688", "#00BCD4", "#03A9F4", "#2196F3", "#3F51B5",
      "#673AB7", "#9C27B0", "#E91E63", "#FF5252", "#F06292", "#D81B60", "#C2185B", "#8E24AA", "#E040FB", "#9B27AF"
    ], []);

  const tagColorsMap = useMemo(() => {
    const map = new Map<string, string>();
    problems.forEach(problem => {
      problem.tags.forEach(tag => {
        if (!map.has(tag)) {
          map.set(tag, tagColors[tag.charCodeAt(0) % tagColors.length]);
        }
      });
    });
    return map;
  }, [problems, tagColors]);

  const getTagColor = (tag: string): string => tagColorsMap.get(tag) || tagColors[0];

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case "Easy":
        return "green";
      case "Medium":
        return "orange";
      case "Hard":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {problems.map((problem) => (
        <ProblemListElement
          key={problem.id}
          problem={problem}
          getTagColor={getTagColor}
          getDifficultyColor={getDifficultyColor}
        />
      ))}
    </Box>
  );
}

const ProblemListElement = memo(function ProblemListElement({ problem, getTagColor, getDifficultyColor }: { problem: Problem; getTagColor: (tag: string) => string; getDifficultyColor: (difficulty: string) => string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, backgroundColor: brandColors.dark, padding: 2, borderRadius: 2 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <h2>{problem.title}</h2>
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              style={{ backgroundColor: getTagColor(tag), padding: 2, paddingLeft: 6, paddingRight: 6, borderRadius: 20 }}
            >
              {tag}
            </span>
          ))}
        </Box>
        <p>
          <span style={{ color: getDifficultyColor(problem.difficulty) }}>{problem.difficulty}</span>
          <span>, {problem.topic}</span>
          <span>, Success Rate: {getSuccessRate()}%</span>
        </p>
      </Box>
      <Button variant="contained" href={`/problems/${problem.slug}`}>Solve Problem</Button>
    </Box>
  );
});