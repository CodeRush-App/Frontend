"use client"
import { User } from "@/app/api/user";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import InlineEdit from "./InlineTextEdit";

export default function EducationCard({ eduDrafts, setEduDrafts, edu, index, editEdu, handleEduRemove }: { eduDrafts: User['education'], setEduDrafts: (eduDrafts: User['education']) => void, edu: User['education'][number], index: number, editEdu: boolean, handleEduRemove: () => void }) {
  const [hoverEdu, setHoverEdu] = useState<number | null>(null);

  const handleEduChange = (field: string, value: string) => {
    setEduDrafts(eduDrafts.map((e, i) => i === index ? { ...e, [field]: value } : e));
  };

  return (
    <Card
      sx={{ p: 2, position: "relative" }}
      onMouseEnter={() => setHoverEdu(index)}
      onMouseLeave={() => setHoverEdu(null)}
    >
      {hoverEdu === index && (
        <IconButton onClick={handleEduRemove} size="small" sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
      )}
      <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
        <InlineEdit
          value={edu.institution}
          onChange={(v: string) => handleEduChange("institution", v)}
          editing={editEdu}
          label="Institution"
          styling={{ color: "text", fontWeight: "bold", fontSize: 24 }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <InlineEdit
            value={edu.major}
            onChange={(v: string) => handleEduChange("major", v)}
            editing={editEdu}
            label="Major"
            styling={{ color: "text" }}
          />
          <InlineEdit
            value={edu.degree}
            onChange={(v: string) => handleEduChange("degree", v)}
            editing={editEdu}
            label="Degree"
            styling={{ color: "text" }}
          />
          <svg width="20" height="22" viewBox="0 0 2 2" fill="none">
            <circle cx="1" cy="1" r="0.4" fill="lightgrey" />
          </svg>
          <InlineEdit
            value={edu.start}
            onChange={(v: string) => handleEduChange("start", v)}
            editing={editEdu}
            label="Start"
            styling={{ color: "text" }}
          />
          <Typography>-</Typography>
          <InlineEdit
            value={edu.end}
            onChange={(v: string) => handleEduChange("end", v)}
            editing={editEdu}
            label="End"
            styling={{ color: "text" }}
          />
          <svg width="20" height="22" viewBox="0 0 2 2" fill="none">
            <circle cx="1" cy="1" r="0.4" fill="lightgrey" />
          </svg>
          <InlineEdit
            value={edu.gpa.toString()}
            onChange={(v: string) => handleEduChange("gpa", v)}
            editing={editEdu}
            label="GPA"
            styling={{ color: "text" }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography>Notes: </Typography>
          <InlineEdit
            value={edu.notes}
            onChange={(v: string) => handleEduChange("notes", v)}
            editing={editEdu}
            label="Notes"
            styling={{ color: "text" }}
          />
        </Box>
      </Box>
    </Card>
  )
}