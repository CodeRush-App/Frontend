"use client"
import { User } from "@/api/user";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import InlineTextEdit from "./InlineTextEdit";

export default function WorkExpCard({ workDrafts, setWorkDrafts, work, index, editWork, handleWorkRemove }: { workDrafts: User['workExperience'], setWorkDrafts: (workDrafts: User['workExperience']) => void, work: User['workExperience'][number], index: number, editWork: boolean, handleWorkRemove: () => void }) {
  const [hoverWork, setHoverWork] = useState<number | null>(null);

  const handleWorkChange = (field: string, value: string) => {
    setWorkDrafts(workDrafts.map((w, i) => i === index ? { ...w, [field]: value } : w));
  };

  return (
    <Card
      sx={{ p: 2, position: "relative" }}
      onMouseEnter={() => setHoverWork(index)}
      onMouseLeave={() => setHoverWork(null)}
    >
      {hoverWork === index && (
        <IconButton
          onClick={() => handleWorkRemove()}
          size="small"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", flexDirection: "column" }}>
        <InlineTextEdit
          value={work.company}
          onChange={(v: string) => handleWorkChange("company", v)}
          editing={editWork}
          label="Company"
          styling={{ color: "text", fontWeight: "bold", fontSize: 24 }}
        />
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <InlineTextEdit
              value={work.position}
              onChange={(v: string) => handleWorkChange("position", v)}
              editing={editWork}
              label="Position"
              styling={{ color: "text" }}
            />
            <svg width="20" height="22" viewBox="0 0 2 2" fill="none" aria-hidden="true">
              <circle cx="1" cy="1" r="0.4" fill="lightgrey" />
            </svg>
            <InlineTextEdit
              value={work.start}
              onChange={(v: string) => handleWorkChange("start", v)}
              editing={editWork}
              label="Start"
              styling={{ color: "text" }}
            />
            <Typography>-</Typography>
            <InlineTextEdit
              value={work.end}
              onChange={(v: string) => handleWorkChange("end", v)}
              editing={editWork}
              label="End"
              styling={{ color: "text" }}
            />
            <svg width="20" height="22" viewBox="0 0 2 2" fill="none">
              <circle cx="1" cy="1" r="0.4" fill="lightgrey" />
            </svg>
            <InlineTextEdit
              value={work.location}
              onChange={(v: string) => handleWorkChange("location", v)}
              editing={editWork}
              label="Location"
              styling={{ color: "text" }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography>Notes: </Typography>
            <InlineTextEdit
              value={work.notes}
              onChange={(v: string) => handleWorkChange("notes", v)}
              editing={editWork}
              styling={{ color: "text" }}
              label="Notes"
            />
          </Box>
        </Box>
      </Box>
    </Card>
  )
}