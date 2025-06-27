import React from "react";
import { Box, Avatar, Typography, Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface CompanyHeaderProps {
  name: string;
  logoUrl?: string;
  manageAccess?: React.ReactNode;
}

export default function CompanyHeader({ name, logoUrl, manageAccess }: CompanyHeaderProps) {
  return (
    <Box mt={8} mb={4} display="flex" alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={2} alignItems="center">
        {logoUrl ? (
          <Avatar src={logoUrl} alt={name + ' logo'} sx={{ width: 64, height: 64 }} />
        ) : (
          <AccountCircleIcon sx={{ fontSize: 64 }} />
        )}
        <Typography variant="h4" fontWeight={700} color="text.primary">
          {name}
        </Typography>
      </Stack>
      {manageAccess}
    </Box>
  );
}
