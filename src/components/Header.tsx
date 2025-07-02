import { AppBar, Box, Button, Link, TextField, Toolbar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from "next/image";
import logo from "../../public/logo.png";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  const isLoggedIn = !!session;

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
              <Link color="textPrimary" href="/problems" underline="none">
                Problems
              </Link>
              <Link color="textPrimary" href="/compete" underline="none">
                Compete
              </Link>
              <Link color="textPrimary" href="/teamup" underline="none">
                Team-up
              </Link>
              <Link color="textPrimary" href="/leaderboards" underline="none">
                Leaderboards
              </Link>
              <Link color="textPrimary" href="/gethired" underline="none">
                Get hired
              </Link>
            </>)}

          {!isLoggedIn && (
            <>
              <Link href="/">
                <Image src={logo} alt="Logo" width={140} height={140} />
              </Link>
              <Link color="textPrimary" href="/dashboard" underline="none">
                Dashboard
              </Link>
              <Link color="textPrimary" href="/pricing" underline="none">
                Pricing
              </Link>
            </>)}
        </Box>

        {/* Right options */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pr: 2 }}>
          {isLoggedIn && (
            <>
              <TextField type="text" id="search" label="Search" variant="outlined" size="small" sx={{ width: "200px" }} />
              <Button color="inherit">
                <NotificationsIcon />
              </Button>
              <Link color="inherit" href="/profile">
                <AccountCircleIcon fontSize="large" />
              </Link>
            </>)}
          {!isLoggedIn && (<>
            <Link color="textPrimary" href="/login" underline="none">
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