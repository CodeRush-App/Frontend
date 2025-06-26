import { Box, Divider } from "@mui/material";
import RankOverview from "../../components/RankOverview";
import TopicBadge from "@/components/TopicBadge";
import React from "react";
import BattleQueue from "@/components/BattleQueue";
import TeamCard from "@/components/TeamCard";

export default function Dashboard() {
  return (
    <Box sx={{ px: "10vw", py: "5vh", pt: "20vh" }}>
      {/* Top row */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <h1>Rank overview</h1>
            <Divider sx={{ flex: 1, ml: 3, borderWidth: "1px", borderColor: "#27375E", borderRadius: 2 }} />
          </Box>
          <RankOverview />
        </Box>
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
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 8, pb: 2 }}>
        <h1>Continue Solving</h1>
        <Divider sx={{ flex: 1, ml: 3, borderWidth: 2, borderColor: "#27375E", borderRadius: 2 }} />
      </Box>
      {/* Middle Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
        <TopicBadge />
        <TopicBadge />
        <TopicBadge />
        <TopicBadge />
      </Box>
      {/* Bottom row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 8, pb: 2 }}>
        <h1>Select a topic</h1>
        <Divider sx={{ flex: 1, ml: 3, borderWidth: 2, borderColor: "#27375E", borderRadius: 2 }} />
      </Box>
      <Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 5fr)", gap: "2px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <React.Fragment key={i}>
              {Array.from({ length: 3 }).map((_, j) => (
                <Box
                  key={j}
                  sx={{
                    p: 2,
                    borderTopLeftRadius: i === 0 && j === 0 ? 8 : 0,
                    borderTopRightRadius: i === 0 && j === 2 ? 8 : 0,
                    borderBottomLeftRadius: i === 4 && j === 0 ? 8 : 0,
                    borderBottomRightRadius: i === 4 && j === 2 ? 8 : 0,
                    backgroundColor: "#27375E",
                  }}
                >
                  {`Topic ${i * 3 + j + 1}`}
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
}