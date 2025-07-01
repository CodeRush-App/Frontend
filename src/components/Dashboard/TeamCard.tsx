"use client"
import { Button, Card, CardContent, Divider, TextField, Box, Typography } from "@mui/material";

// TODO: Implement
export default function TeamCard() {
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography>Create a team</Typography>
        <Button variant="contained">Create team</Button>
        <Divider />
        <Typography>Join a team</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <TextField variant="outlined" label="Enter a team name"/>
          <Button variant="contained" sx={{height: "100%", flex: 1}}>Join team</Button>
        </Box>
      </CardContent>
    </Card>
  );
}