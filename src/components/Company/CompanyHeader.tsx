import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CompanyHeader({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
      {logoUrl ? (
        <Avatar src={logoUrl} alt={name + ' logo'} sx={{ width: 64, height: 64 }} />
      ) : (
        <AccountCircleIcon sx={{ fontSize: 64 }} />
      )}
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {name}
      </Typography>
    </Box>
  );
}
