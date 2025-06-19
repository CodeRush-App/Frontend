import { Box, Button, Checkbox, Divider, Link, Paper, TextField } from "@mui/material";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function UserLogin() {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const router = useRouter();

  const handleLoginClick = () => {
    // TODO: Login logic
    console.log(email, password, rememberMe);
    // setLoginError(true);
  };

  return (
    <Box className="radial-background" sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: "100vh", top: 0, zIndex: -1 }}>
      <Paper elevation={3} sx={{ position: "relative", padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <Box sx={{ alignSelf: "flex-start", fontSize: 32, fontWeight: "bold", mb: 4 }}>Sign in</Box>

        <TextField error={loginError} id="Email" label="E-Mail" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setEmail(e.target.value)} />

        <TextField error={loginError} type="password" id="Password" label="Password" variant="outlined" sx={{ width: "100%", mt: 2 }} onChange={(e) => setPassword(e.target.value)} />
        {loginError && <Box sx={{ color: "red", alignSelf: "flex-start" }}>Incorrect Password or invalid E-Mail</Box>}

        <Box sx={{ alignSelf: "flex-start", mt: 1 }}>
          <Checkbox onChange={(e) => setRememberMe(e.target.checked)} color="primary" sx={{ pl: 0, pr: 0.5, left: -3, top: -2 }} />
          Remember me
        </Box>

        <Button variant="contained" color="primary" sx={{ width: "100%", mt: 1 }} onClick={handleLoginClick}>
          Sign in
        </Button>

        <Divider textAlign="center" sx={{ width: "100%", mt: 2 }}>or</Divider>

        <Button sx={{ width: "100%", mt: 2 }} color="secondary" variant="contained" > <GoogleIcon sx={{ mr: 1 }} />Google</Button>
        <Box sx={{ display: "flex", width: "100%", mt: 1, justifyContent: "space-between" }}>
          {/* TODO: Icon click Logic */}
          <Button sx={{ width: "100%" }} color="secondary" variant="contained" ><GitHubIcon sx={{ mr: 1 }} /> GitHub</Button>
          <Button sx={{ width: "100%", ml: 1, mr: 1 }} color="secondary" variant="contained" ><LinkedInIcon sx={{ mr: 1 }} /> LinkedIn</Button>
          <Button sx={{ width: "100%" }} color="secondary" variant="contained" ><FacebookIcon sx={{ mr: 1 }} /> Facebook</Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          Don't have an account? <Link color="primary" onClick={() => router.push("/userRegister")}>Sign up</Link>
        </Box>
      </Paper>
    </Box>
  );
}