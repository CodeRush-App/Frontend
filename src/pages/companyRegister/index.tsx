import { Autocomplete, Box, Button, Checkbox, Divider, Link, Paper, TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from "next/router";
import { useState } from "react"
import { ShineBorder } from "@/components/magicui/shine-border";

export default function CompanyRegister() {
  const [email, setEmail] = useState<string | undefined>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [company, setCompany] = useState<string | undefined>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isAgreedError, setIsAgreedError] = useState<boolean>(false);
  const router = useRouter();

  const verifyEmail = (email: string) => {
    email = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  }

  const verifyPassword = (password: string) => {
    password = password.trim();
    // Password must be at least 8 characters long and contain at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setPasswordError(!passwordRegex.test(password));
  }

  const handleRegisterClick = () => {
    if (!email || !username || !password || !company) {
      // TODO: Show error message
      alert("TODO: Show error message");
      return;
    }

    verifyEmail(email);
    verifyPassword(password);
    setIsAgreedError(!isAgreed);


    // TODO: Register logic
    console.log(email, username, password, company);
  };

  return (
    <Box className="radial-background" sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: "100vh", top: 0, zIndex: -1 }}>
      <Paper elevation={3} sx={{ position: "relative", padding: 4, display: "flex", flexDirection: "column", alignItems: "center", minWidth: "500px" }}>
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <Box sx={{ alignSelf: "flex-start", fontSize: 32, fontWeight: "bold" }}>Sign up</Box>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", mb: 2, gap: 2 }}>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField type="text" id="Username" label="Username" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setUsername(e.target.value)} />

            <TextField type="email" id="Email" label="E-Mail" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <Box sx={{ color: "red", alignSelf: "flex-start" }}>Invalid email format.</Box>}
              
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField error={passwordError} type="password" id="Password" label="Password" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <Box sx={{ color: "red", alignSelf: "flex-start" }}>Password must be at least 8 characters long <br /> and contain at least one letter and one number.</Box>}

            <TextField type="text" id="Company" label="Company" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setCompany(e.target.value)} />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* TODO: Autocomplete for Countries and Company sizes */}
            <Autocomplete
              options={["Countries"]}
              renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
              sx={{ width: "100%" }}
            />
            <Autocomplete
              options={["Company Size"]}
              renderInput={(params) => <TextField {...params} label="Company Size" variant="outlined" />}
              sx={{ width: "100%" }}
            />
          </Box>

        </Box>

        <Box sx={{ alignSelf: "flex-start", mt: 1 }}>
          <Checkbox onChange={(e) => setIsAgreed(e.target.checked)} color="primary" sx={{ pl: 0, pr: 0.5, left: -3, top: -2 }} />
          I agree to CodeRush's Terms of Service and Privacy Policy
        </Box>

        {isAgreedError && <Box sx={{ color: "red", alignSelf: "flex-start" }}>You must agree to the terms and conditions.</Box>}
        <Button variant="contained" color="primary" sx={{ width: "100%", mt: 2 }} onClick={handleRegisterClick}>
          Register
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
          Already have an account? <Link color="primary" onClick={() => router.push("/userLogin")}>Sign in</Link>
        </Box>
      </Paper>
    </Box>
  )
}