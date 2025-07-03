"use client"
import { updateUser, User } from "@/app/api/user";
import { brandColors } from "@/app/theme";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function SkillsCard({ user, setUser }: { user: User, setUser: (user: User) => void }) {
  const [editSkills, setEditSkills] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [hoverSkill, setHoverSkill] = useState<string | null>(null);

  const handleSkillSave = () => {
    setEditSkills(false);
    const updatedUser = { ...user, skills: user.skills };
    setUser(updatedUser);
    updateUser(updatedUser);
  };
  const handleSkillAdd = () => {
    if (skillInput.trim() && !user.skills.includes(skillInput.trim())) {
      setUser({ ...user, skills: [...user.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };
  const handleSkillRemove = (skill: string) => {
    setUser({ ...user, skills: user.skills.filter(s => s !== skill) });
  };

  return (
    <Card sx={{ flex: 1 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>Skills</Typography>
          {editSkills ? (
            <IconButton onClick={handleSkillSave} size="small" color="success">
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEditSkills(true)} size="small" sx={{ color: "text.secondary" }}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
          {user.skills.map(skill => (
            <Chip
              key={skill}
              label={skill}
              onDelete={editSkills ? () => handleSkillRemove(skill) : undefined}
              onMouseEnter={() => setHoverSkill(skill)}
              onMouseLeave={() => setHoverSkill(null)}
              deleteIcon={editSkills && hoverSkill === skill ? <CloseIcon /> : undefined}
              sx={{ bgcolor: brandColors.darkest }}
            />
          ))}
          {editSkills && (
            <TextField
              size="small"
              variant="outlined"
              value={skillInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSkillInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") handleSkillAdd(); }}
              placeholder="Add skill"
              sx={{ maxWidth: "120px" }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}