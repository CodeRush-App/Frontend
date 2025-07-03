"use client"
import { Box, Button, Checkbox, Divider, Paper, TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from "react"
import { ShineBorder } from "@/components/magicui/shine-border";
import { registerUser } from "@/app/api/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserRegister() {
  const [email, setEmail] = useState<string | undefined>("");
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const verifyEmail = (email: string) => {
    email = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const verifyPassword = (password: string) => {
    password = password.trim();
    // Password must be at least 8 characters long and contain at least one letter, one number and no special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  const handleRegisterClick = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    const checks = [
      { valid: verifyEmail(email), message: "Invalid email format" },
      { valid: verifyPassword(password), message: "Password must be at least 8 characters long and contain at least one letter, one number and no special characters" },
      { valid: password === confirmPassword, message: "Password confirmation does not match" },
      { valid: isAgreed, message: "You must agree to the terms and conditions" },
    ];

    for (const check of checks) {
      if (!check.valid) {
        setError(check.message);
        return;
      }
    }

    setError("");
    try {
      await registerUser({
        email,
        username,
        password,
        provider: "credentials",
      });
    } catch (error) {
      console.error(error);
      setError("Error trying to register user");
      return;
    }
    router.push("/login");
  };

  return (
    <Box className="radial-background" sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: "100vh", top: 0, zIndex: -1 }}>
      <Paper elevation={3} sx={{ position: "relative", padding: 4, display: "flex", flexDirection: "column", alignItems: "center", width: "25vw", minWidth: "500px" }}>
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <Box sx={{ alignSelf: "flex-start", fontSize: 32, fontWeight: "bold" }}>Sign up</Box>

        <TextField type="text" id="Username" label="Username" variant="outlined" sx={{ width: "100%", mt: 4 }} value={username} onChange={(e) => setUsername(e.target.value)} />

        <TextField type="email" id="Email" label="E-Mail" variant="outlined" sx={{ width: "100%", mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField type="password" id="Password" label="Password" variant="outlined" sx={{ width: "100%", mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />

        <TextField type="password" id="ConfirmPassword" label="Confirm Password" variant="outlined" sx={{ width: "100%", mt: 2 }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {/* Error message shown above the conditions checkbox */}
        {error && <Box sx={{ color: "red", alignSelf: "flex-start", mt: 1 }}>{error}</Box>}

        <Box sx={{ alignSelf: "flex-start", mt: 1 }}>
          <Checkbox onChange={(e) => setIsAgreed(e.target.checked)} color="primary" sx={{ pl: 0, pr: 0.5, left: -3, top: -2 }} />
          I agree to CodeRush&apos;s Terms of Service and Privacy Policy
        </Box>

        <Button variant="contained" color="primary" sx={{ width: "100%", mt: 2 }} onClick={handleRegisterClick}>
          Register
        </Button>

        <Divider textAlign="center" sx={{ width: "100%", mt: 2 }}>or</Divider>

        <Button sx={{ width: "100%", mt: 2 }} color="secondary" variant="contained" > <GoogleIcon sx={{ mr: 1 }} />Google</Button>
        <Button sx={{ width: "100%" }} color="secondary" variant="contained" ><GitHubIcon sx={{ mr: 1 }} /> GitHub</Button>

        <Box sx={{ mt: 2 }}>
          Already have an account? <Link color="primary" style={{ textDecoration: "underline" }} href="/login">Sign in</Link>
        </Box>
      </Paper>
    </Box>
  )
}