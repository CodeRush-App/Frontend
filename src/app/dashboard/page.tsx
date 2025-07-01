"use client"
import { Box, Divider } from "@mui/material";
import Link from "next/link";
import RankOverview from "../../components/Dashboard/RankOverview";
import TopicBadge from "@/components/Dashboard/TopicBadge";
import React from "react";
import BattleQueue from "@/components/Dashboard/BattleQueue";
import TeamCard from "@/components/Dashboard/TeamCard";
import { getProblems, Problem } from "@/api/problem";
import { getSubmissions, Submission } from "@/api/submission";
import { getUser } from "@/api/user";
import { User } from "@/api/user";

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);
  const [problems, setProblems] = React.useState<Problem[]>([]);
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);

  React.useEffect(() => {
    // TODO: Replace with actual user
    getUser("68594614c973259bbe213684")
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        console.error("Failed to load user");
      });
    getProblems()
      .then(data => {
        setProblems(data);
      })
      .catch(() => {
        console.error("Failed to load problems");
      });
    getSubmissions()
      .then(data => {
        setSubmissions(data);
      })
      .catch(() => {
        console.error("Failed to load submissions");
      });
  }, []);

  return (
    <Box sx={{ mb: "5vh" }}>
      {/* Top row */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <h1>Enter battle</h1>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <BattleQueue />
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <h1>Solve with Friends</h1>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <TeamCard />
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <h1>Rank overview</h1>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <RankOverview user={user} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 8, pb: 2 }}>
        <h1>Continue Solving</h1>
        <Divider sx={{ flex: 1, ml: 3, borderWidth: 2, borderColor: "#27375E", borderRadius: 2 }} />
      </Box>
      {/* Middle Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
        {[...new Set(problems.map(p => p.topic))].slice(0, 4).map(topic => (
          <TopicBadge key={topic} problems={problems} submissions={submissions} selectedTopic={topic} />
        ))}
      </Box>
      {/* Bottom row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 8, pb: 2 }}>
        <h1>Select a topic</h1>
        <Divider sx={{ flex: 1, ml: 3, borderWidth: 2, borderColor: "#27375E", borderRadius: 2 }} />
      </Box>
      <Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 5fr)", gap: "2px" }}>
          {(() => {
            const topics = ["Algorithms", "Data Structures", "Math", "Artificial Intelligence", "C", "C++", "Java","Python","Ruby","SQL","Databases","Linux Shell","Funcaiton Programming","Regex","React"]
            const gridSlots = 15; // 5 rows x 3 columns
            return Array.from({ length: gridSlots }).map((_, idx) => {
              const topic = topics[idx];
              return (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    borderTopLeftRadius: idx === 0 ? 8 : 0,
                    borderTopRightRadius: idx === 2 ? 8 : 0,
                    borderBottomLeftRadius: idx === 12 ? 8 : 0,
                    borderBottomRightRadius: idx === 14 ? 8 : 0,
                    backgroundColor: "#27375E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 64,
                    cursor: topic ? "pointer" : "default",
                    transition: "background 0.2s",
                    fontWeight: "bold",
                    '&:hover': topic ? { backgroundColor: '#31457a' } : {},
                  }}
                  component={topic ? Link : 'div'}
                  href={topic ? "/problems" : undefined}
                >
                  {topic || ''}
                </Box>
              );
            });
          })()}
        </Box>
      </Box>
    </Box>
  );
}