"use client"
import { Box, Button, Checkbox, Paper, TextField } from "@mui/material";
import { useState } from "react"
import { ShineBorder } from "@/components/magicui/shine-border";
import { registerCompany } from "../api/company";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CompanyRegister() {
  const [email, setEmail] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const router = useRouter();

  const verifyEmail = (email: string) => {
    email = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const verifyPassword = (password: string) => {
    password = password.trim();
    // Password must be at least 8 characters long and contain at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  const handleRegisterClick = async () => {
    if (!email || !username || !password || !companyName) {
      setError("Please fill in all required fields");
      return;
    }

    const checks = [
      { valid: verifyEmail(email), message: "Invalid email format" },
      { valid: verifyPassword(password), message: "Password must be at least 8 characters long and contain at least one letter and one number" },
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
      await registerCompany({
        username,
        email,
        password,
        companyName,
      });
    } catch (error) {
      console.error(error);
      setError("Error trying to register company");
      return;
    }
    router.push("/login");
  };

  return (
    <Box className="radial-background" sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: "100vh", top: 0, zIndex: -1 }}>
      <Paper elevation={3} sx={{ position: "relative", padding: 4, display: "flex", flexDirection: "column", alignItems: "center", width: "25vw", minWidth: "500px" }}>
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <Box sx={{ alignSelf: "flex-start", fontSize: 32, fontWeight: "bold", mb: 4 }}>Sign up</Box>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", gap: 2, mb: 1 }}>
          <TextField type="text" id="Username" label="Username" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setUsername(e.target.value)} />
          <TextField type="email" id="Email" label="E-Mail" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" id="Password" label="Password" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setPassword(e.target.value)} />
          <TextField type="text" id="Company" label="Company Name" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setCompanyName(e.target.value)} />
        </Box>

        {error && <Box sx={{ color: "red", alignSelf: "flex-start", mt: 1, mb: 1 }}>{error}</Box>}
        <Box sx={{ alignSelf: "flex-start" }}>
          <Checkbox onChange={(e) => setIsAgreed(e.target.checked)} color="primary" sx={{ pl: 0, pr: 0.5, left: -3, top: -2 }} />
          I agree to CodeRush&apos;s Terms of Service and Privacy Policy
        </Box>

        <Button variant="contained" color="primary" sx={{ width: "100%", mt: 2 }} onClick={handleRegisterClick}>
          Request access
        </Button>

        <Box sx={{ mt: 2 }}>
          Already have an account? <Link color="primary" style={{ textDecoration: "underline" }} href="/login">Sign in</Link>
        </Box>
        <Box sx={{ mt: 2 }}>
          Looking for an individual account? <Link color="primary" style={{ textDecoration: "underline" }} href="/userRegister">Go here instead</Link>
        </Box>
      </Paper>
    </Box>
  )
}