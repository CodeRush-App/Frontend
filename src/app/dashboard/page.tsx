"use client"
import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import RankOverview from "@/components/Dashboard/RankOverview";
import TopicBadge from "@/components/Dashboard/TopicBadge";
import React, { useEffect } from "react";
import BattleQueue from "@/components/Dashboard/BattleQueue";
import TeamCard from "@/components/Dashboard/TeamCard";
import { getProblems, Problem } from "@/app/api/problem";
import { getSubmissions, Submission } from "@/app/api/submission";
import { getUser } from "@/app/api/user";
import { User } from "@/app/api/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);
  const [problems, setProblems] = React.useState<Problem[]>([]);
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  React.useEffect(() => {
    if (status !== "authenticated") return;

    getUser(session.user.id)
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
  }, [status, session]);

  // Prevent flash of protected content before being authenticated
  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <Box sx={{ mb: "5vh", width: "100%" }}>
      {/* Top row */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>Enter battle</Typography>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <BattleQueue />
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>Solve with Friends</Typography>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <TeamCard />
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>Rank overview</Typography>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <RankOverview user={user} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 8, pb: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>Continue Solving</Typography>
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
        <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>Select a topic</Typography>
        <Divider sx={{ flex: 1, ml: 3, borderWidth: 2, borderColor: "#27375E", borderRadius: 2 }} />
      </Box>
      <Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 5fr)", gap: "2px" }}>
          {(() => {
            const topics = ["Algorithms", "Data Structures", "Math", "Artificial Intelligence", "C", "C++", "Java", "Python", "Ruby", "SQL", "Databases", "Linux Shell", "Functional Programming", "Regex", "React"]
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