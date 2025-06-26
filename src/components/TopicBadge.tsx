import { Card, CardContent, CardHeader } from "@mui/material";
import Bronze from "../../public/bronze.png";
import Image from "next/image";
import { Box } from "@mui/material";

export default function TopicBadge() {
  return (
    <Card sx={{ padding: 2, position: "relative" }}>
      <Image src={Bronze} alt="Topic" width={50} height={50} style={{ position: "absolute", top: 0, right: 0 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1><u>Topic</u></h1>
      </Box>
      <p>Problems solved:</p>
      <p><b>19 / 83</b></p>
      <p>Progress to next badge:</p>
      <p><b>10,3% -- 103 / 1000</b></p>
    </Card>
  );
}