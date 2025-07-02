"use client"
import { AppBar, Box, Button, TextField, Toolbar } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from "next/image";
import logo from "../../public/logo.png";
import ProfileButton from "./headerProfileButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", fontWeight: "bold", pt: 1 }}>
        {/* Left options */}
        <Box sx={{ display: "flex", gap: 6, alignItems: "center", pl: 2 }}>
          {isLoggedIn && (
            <>
              <Link href="/dashboard">
                <Image src={logo} alt="Logo" width={140} height={140} />
              </Link>
              <Link color="textPrimary" href="/problems">
                Problems
              </Link>
              <Link color="textPrimary" href="/compete">
                Compete
              </Link>
              <Link color="textPrimary" href="/teamup">
                Team-up
              </Link>
              <Link color="textPrimary" href="/leaderboards">
                Leaderboards
              </Link>
              <Link color="textPrimary" href="/getHired">
                Get hired
              </Link>
            </>)}

          {!isLoggedIn && (
            <>
              <Link href="/">
                <Image src={logo} alt="Logo" width={140} height={140} />
              </Link>
              <Link color="textPrimary" href="/pricing">
                Pricing
              </Link>
            </>)}
        </Box>

        {/* Right options */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pr: 2 }}>
          {isLoggedIn && (
            <>
              <TextField type="text" id="search" label="Search" variant="outlined" size="small" sx={{ width: "200px" }} />
              <Button>
                <NotificationsIcon />
              </Button>
              <ProfileButton userId={session.user.id} />
            </>)}
          {!isLoggedIn && (<>
            <Link color="textPrimary" href="/login">
              Log In
            </Link>
            <Button variant="contained" color="primary" sx={{ fontWeight: "bold" }} href="/loginSelection">
              Create an Account
            </Button>
          </>)}
        </Box>

      </Toolbar>
    </AppBar>
  );
}