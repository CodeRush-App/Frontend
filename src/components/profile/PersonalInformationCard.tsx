"use client"
import { updateUser, User } from "@/app/api/user";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import InlineTextEdit from "./InlineTextEdit";

export default function PersonalInformationCard({ user, setUser }: { user: User, setUser: (user: User) => void }) {
  const [editInfo, setEditInfo] = useState(false);
  const [infoDraft, setInfoDraft] = useState({ name: user.name, phoneNumber: user.phoneNumber, country: user.country });

  const handleInfoEdit = () => setEditInfo(true);
  const handleInfoSave = () => {
    setEditInfo(false);
    const updatedUser = { ...user, ...infoDraft };
    setUser(updatedUser);
    updateUser(updatedUser);
  };
  const handleInfoCancel = () => {
    setEditInfo(false);
    setInfoDraft({ name: user.name, phoneNumber: user.phoneNumber, country: user.country });
  };


  return (
    <Card sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>Personal Information</Typography>
          {editInfo ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton onClick={handleInfoSave} size="small">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleInfoCancel} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={handleInfoEdit} size="small">
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={{ fontWeight: 500 }}>Username: {user.username}</Typography>
          <Typography sx={{ fontWeight: 500 }}>Email: {user.email}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>Full Name:</Typography>
            <InlineTextEdit
              value={infoDraft.name}
              onChange={(v: string) => setInfoDraft(d => ({ ...d, name: v }))}
              editing={editInfo}
              label="Full Name"
              styling={{ color: "text" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>Phone:</Typography>
            <InlineTextEdit
              value={infoDraft.phoneNumber}
              onChange={(v: string) => setInfoDraft(d => ({ ...d, phoneNumber: v }))}
              editing={editInfo}
              label="Phone"
              styling={{ color: "text" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>Country:</Typography>
            <InlineTextEdit
              value={infoDraft.country}
              onChange={(v: string) => setInfoDraft(d => ({ ...d, country: v }))}
              editing={editInfo}
              label="Country"
              styling={{ color: "text" }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}