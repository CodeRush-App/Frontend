"use client"
import { Box, Button, Checkbox, Divider, Link, Paper, TextField, Typography } from "@mui/material";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const router = useRouter();

  const handleLoginClick = async () => {
    if (!email || !password) {
      setLoginError(true);
      return;
    }

    setLoginError(false);
    await signIn("credentials", {
      email: email.trim(),
      password: password.trim(),
      redirect: false,
    });

    router.push("/dashboard")
  };

  const handleOAuthSignIn = async (provider: string) => {
    await signIn(provider, { redirectTo: "/dashboard" });
  }

  return (
    <Box className="radial-background" sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: "100vh", top: 0, zIndex: -1 }}>
      <Paper elevation={3} sx={{ position: "relative", padding: 4, display: "flex", flexDirection: "column", alignItems: "center", width: "25vw", minWidth: "500px" }}>
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <Typography variant="h4" sx={{ alignSelf: "flex-start", fontWeight: "bold", mb: 4 }}>Sign in</Typography>

        <TextField error={loginError} id="Email" label="E-Mail" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setEmail(e.target.value)} />

        <TextField error={loginError} type="password" id="Password" label="Password" variant="outlined" sx={{ width: "100%", mt: 2 }} onChange={(e) => setPassword(e.target.value)} />
        {loginError && <Box sx={{ color: "red", alignSelf: "flex-start" }}>Incorrect password or invalid email</Box>}

        <Box sx={{ alignSelf: "flex-start", mt: 1 }}>
          <Checkbox color="primary" sx={{ pl: 0, pr: 0.5, left: -3, top: -2 }} />
          Remember me
        </Box>

        <Button variant="contained" color="primary" sx={{ width: "100%", mt: 1 }} onClick={handleLoginClick}>
          Sign in
        </Button>

        <Divider textAlign="center" sx={{ width: "100%", mt: 2 }}>or</Divider>

        <Button sx={{ width: "100%", mt: 2, textTransform: "none" }} color="secondary" variant="contained" onClick={() => handleOAuthSignIn("google")} > <GoogleIcon sx={{ mr: 1 }} />Continue with Google</Button>
        <Button sx={{ width: "100%", mt: 2, textTransform: "none" }} color="secondary" variant="contained" onClick={() => handleOAuthSignIn("github")} ><GitHubIcon sx={{ mr: 1 }} />Continue with GitHub</Button>

        <Box sx={{ mt: 2 }}>
          Don&apos;t have an account?&nbsp;
          <Link color="primary" href="/loginSelection">Sign up</Link>
        </Box>
      </Paper>
    </Box>
  );
}