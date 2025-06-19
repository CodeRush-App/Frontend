import { AppBar, Avatar, Box, Button, Link, TextField, Toolbar } from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  // TODO: Replace with actual authentication logic
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", fontWeight: "bold", pt: 1 }}>
        {/* Left options */}
        <Box sx={{ display: "flex", gap: 6, alignItems: "center", pl: 2 }}>
          {isloggedIn && (
            <>
              <Image src={logo} alt="Logo" width={140} height={140} onClick={() => router.push("/dashboard")} />
              <Link color="textPrimary" onClick={() => router.push("/problems")} underline="none">
                Problems
              </Link>
              <Link color="textPrimary" onClick={() => router.push("/compete")} underline="none">
                Compete
              </Link>
              <Link color="textPrimary" onClick={() => router.push("/teamup")} underline="none">
                Team-up
              </Link>
              <Link color="textPrimary" onClick={() => router.push("/leaderboards")} underline="none">
                Leaderboards
              </Link>
              <Link color="textPrimary" onClick={() => router.push("/gethired")} underline="none">
                Get hired
              </Link>
            </>)}

          {!isloggedIn && (
            <>
              <Image src={logo} alt="Logo" width={140} height={140} onClick={() => router.push("/")} />
              <Link color="textPrimary" onClick={() => router.push("/dashboard")} underline="none">
                Dashboard
              </Link>
              <Link color="textPrimary" onClick={() => router.push("/pricing")} underline="none">
                Pricing
              </Link>
            </>)}
        </Box>

        {/* Right options */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pr: 2 }}>
          {isloggedIn && (
            <>
              <TextField type="text" id="search" label="Search" variant="outlined" size="small" sx={{ width: "200px" }} />
              <Button variant="text">
                TODO: BELL
              </Button>
              <Avatar alt="User Avatar" src="/avatar.png" sx={{ width: 40, height: 40, cursor: "pointer" }} onClick={() => router.push("/profile")} />
            </>)}
          {!isloggedIn && (<>
            <Link color="textPrimary" onClick={() => router.push("/login")} underline="none">
              Log In
            </Link>
            <Button variant="contained" color="primary" sx={{ fontWeight: "bold" }} onClick={() => router.push("/loginSelection")}>
              Create an Account
            </Button>
          </>)}
        </Box>

      </Toolbar>
    </AppBar>
  );
}