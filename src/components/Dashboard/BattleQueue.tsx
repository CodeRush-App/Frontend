"use client"
import { Button, Card, CardContent, Divider, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { enterQueue, pollQueue } from "@/api/match";
import { useRouter } from "next/navigation";

export default function BattleQueue() {
  const [topic, setTopic] = useState("Topic");
  const router = useRouter();

  const queue = async () => {
    // TODO: Get userId from auth context
    const res = await enterQueue("68594614c973259bbe213684" as string);
    if (res) {
      router.push(`/match/${res.roomId}/${res.problemId}`);
    } else {
      let i = -1;
      const intervalId = setInterval(async () => {
        i++;
        // TODO: Get userId from auth context
        const res = await pollQueue("68594614c973259bbe213684" as string);
        if (res) {
          clearInterval(intervalId);
          router.push(`/match/${res.roomId}/${res.problemId}`);
        }
      }, 1000);
    }
  }

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Select variant="outlined" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <MenuItem value="Topic">Topic</MenuItem>
          <MenuItem value="Topic2">Topic2</MenuItem>
        </Select>
        <Button variant="contained" onClick={queue}>Queue for battle</Button>
        <Divider><Typography>or</Typography></Divider>
        <TextField variant="outlined" label="Enter a username" />
        <Button variant="contained">Challenge user</Button>
      </CardContent>
    </Card>
  );
}