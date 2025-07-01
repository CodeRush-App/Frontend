"use client"
import { Button, Card, CardContent, Divider, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

// TODO: Implement
export default function BattleQueue() {
  const [topic, setTopic] = useState("Topic");

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Select variant="outlined" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <MenuItem value="Topic">Topic</MenuItem>
          <MenuItem value="Topic2">Topic2</MenuItem>
        </Select>
        <Button variant="contained">Queue for battle</Button>
        <Divider>or</Divider>
        <TextField variant="outlined" label="Enter a username" />
        <Button variant="contained">Challenge user</Button>
      </CardContent>
    </Card>
  );
}