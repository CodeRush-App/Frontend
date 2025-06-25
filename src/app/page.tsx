import { Particles } from "@/components/magicui/particles";
import { Box, Button, Paper } from "@mui/material";
import Image from "next/image";
import code from "../../public/code.png";
import Link from "next/link";
import { MagicCard } from "@/components/magicui/magic-card";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", position: "relative", height: "60vh", width: "100%", alignItems: "center", minHeight: "400px" }}>
        <Particles className="absolute h-full w-full" refresh />
        <Box sx={{ display: "flex", pl: "20vw", flexFlow: "column", position: "absolute", width: "50vw", gap: 2 }}>
          <Box color="white" sx={{ fontSize: 36, fontWeight: "bold", textAlign: "start", }} >
            Lorem ipsum dolor sit amet, consetetur sadipscing
          </Box>
          <Box color="white" sx={{ fontSize: 20, textAlign: "start" }} >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* TODO: Button Logic */}
            <Button variant="contained" color="primary" >Get Started </Button>
            <Button variant="contained" color="secondary" >Learn More</Button>
          </Box>
        </Box>
      </Box>

      <Box color="white" sx={{ fontSize: 36, fontWeight: "bold", textAlign: "start", mt: 8, alignSelf: "center" }}> What we offer</Box>

      <Box sx={{ display: "flex", pr: "10vw", pl: "10vw", pt: 10, pb: 10, justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, width: "25vw" }}>
          <Box color="white" sx={{ fontSize: 32, fontWeight: "bold" }}>
            Coding Battles
          </Box>
          <Box color="white" sx={{ fontSize: 18, textAlign: "start" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
          </Box>
          {/* TODO: Link Logic */}
          <Link href="/" style={{ color: "white", textDecoration: "underline" }}> Get started </Link>
        </Box>
        <Image src={code} alt="Code" width={450} />
      </Box>

      <Box sx={{ display: "flex", pr: "10vw", pl: "10vw", pb: 10, justifyContent: "space-between", alignItems: "center" }}>
        <Image src={code} alt="Code" width={450} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, width: "25vw" }}>
          <Box color="white" sx={{ fontSize: 32, fontWeight: "bold" }}>
            Ranked System
          </Box>
          <Box color="white" sx={{ fontSize: 18, textAlign: "start" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
          </Box>
          {/* TODO: Link Logic */}
          <Link href="/" style={{ color: "white", textDecoration: "underline" }}> Get started </Link>
        </Box>
      </Box>

      <Box sx={{ display: "flex", pr: "10vw", pl: "10vw", pb: 10, justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, width: "25vw" }}>
          <Box color="white" sx={{ fontSize: 32, fontWeight: "bold" }}>
            Coop Problem Solving
          </Box>
          <Box color="white" sx={{ fontSize: 18, textAlign: "start" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
          </Box>
          {/* TODO: Link Logic */}
          <Link href="/" style={{ color: "white", textDecoration: "underline" }}> Get started </Link>
        </Box>
        <Image src={code} alt="Code" width={450} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Paper sx={{ flex: 1 }}>
          <MagicCard gradientColor="#27375E">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", p: 2 }}>
              <Box sx={{ fontSize: 32, fontWeight: "bold", mt: 10 }}>
                For Developers
              </Box>
              <Box sx={{ fontSize: 18, textAlign: "center", width: "60%", mt: 4 }}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
              </Box>
              {/* TODO: Button Logic */}
              <Button variant="contained" color="secondary" sx={{ mt: 4, mb: 10 }}>
                Get started now
              </Button>
            </Box>
          </MagicCard>
        </Paper>
        <Paper sx={{ flex: 1, ml: 1 }}>
          <MagicCard gradientColor="#27375E">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", p: 2 }}>
              <Box sx={{ fontSize: 32, fontWeight: "bold", mt: 10 }}>
                For Companies
              </Box>
              <Box sx={{ fontSize: 18, textAlign: "center", width: "60%", mt: 4 }}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
              </Box>
              {/* TODO: Button Logic */}
              <Button variant="contained" color="secondary" sx={{ mt: 4, mb: 10 }}>
                Request Access
              </Button>
            </Box>
          </MagicCard>
        </Paper>
      </Box>
    </Box>
  );
}