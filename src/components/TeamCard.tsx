"use client"
import { Button, Card, CardContent, Divider, TextField, Box } from "@mui/material";

export default function TeamCard() {
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <p>Create a team</p>
        <Button variant="contained">Create team</Button>
        <Divider />
        <p>Join a team</p>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <TextField variant="outlined" label="Enter a team name"/>
          <Button variant="contained" sx={{height: "100%", flex: 1}}>Join team</Button>
        </Box>
      </CardContent>
    </Card>
  );
}