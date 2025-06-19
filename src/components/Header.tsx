import { AppBar, Box, Button, Link, Toolbar } from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", fontWeight: "bold", pt: 1 }}>
        {/* Left options */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
          <Image src={logo} alt="Logo" width={140} height={140} onClick={() => router.push("/home")} />
          <Link color="textPrimary" onClick={() => router.push("/dashboard")} underline="none">
            Dashboard
          </Link>
          <Link color="textPrimary" onClick={() => router.push("/pricing")} underline="none">
            Pricing
          </Link>
        </Box>
        {/* Right options */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pr: 2 }}>
          <Link color="textPrimary" onClick={() => router.push("/login")} underline="none">
            Log In
          </Link>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold" }}
            onClick={() => router.push("/loginSelection")}
          >
            Create an Account
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}