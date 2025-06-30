"use client"
import { getUsers } from "@/api/user";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={() => getUsers()}>Get Users</Button>
    </div>
  );
}