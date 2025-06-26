import { Box, Card, CardContent, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import bronze from "../../public/bronze.png";

export default function RankOverview() {
  return (
    <Card sx={{ minWidth: "25vw" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h2><u>Overall rank</u></h2>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <p>Rank points: 12.632</p>
          <Box>
            <p>Rank: 12</p>
            <p>Top 56%</p>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <h2><u>Rank points</u></h2>
            <Image src={bronze} alt="Rank points" width={40} height={40} />
          </Box>
          <Select variant="outlined" value="Topic" sx={{ flex: 1, maxWidth: "200px" }}>
            <MenuItem value="Topic">Topic</MenuItem>
            <MenuItem value="Topic">Topic</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <p>Rank points: --</p>
          <Box>
            <p>Rank: --</p>
            <p>Top --%</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}