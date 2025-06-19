import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { Box, Button, Divider, Link } from "@mui/material";
import { useRouter } from "next/router";

export default function LoginSelection() {
  const router = useRouter();


  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <DotPattern style={{ position: "absolute", top: 0, left: -5, zIndex: -1 }}
          className={cn(
            "[mask-image:radial-gradient(50vw_circle_at_center,gray,transparent)]",
          )}
        />
      <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "40vw", height: "80vh", justifyContent: "center", gap: 2, padding: 4 }}>
        <Box sx={{ fontSize: 32, fontWeight: "bold" }}>
          For Developers
        </Box>
        <Box sx={{ fontSize: 18, textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button variant="contained" color="primary" sx={{ mt: 4, mb: 10 }} onClick={() => router.push("/login")}>
            Login
          </Button>
          Dont have an account? <Link color="primary" onClick={() => router.push("/userRegister")}>Sign up</Link>
        </Box>
      </Box>

      <Divider orientation="vertical" sx={{ mx: 4, height: "60vh", borderWidth: 0.5 }} />

      <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "40vw", height: "80vh", justifyContent: "center", gap: 2, padding: 4 }}>
        <Box sx={{ fontSize: 32, fontWeight: "bold" }}>
          For Companies
        </Box>
        <Box sx={{ fontSize: 18, textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, tempor invidunt ut labore et dolore magna aliquyam erat
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button variant="contained" color="primary" sx={{ mt: 4, mb: 10 }} onClick={() => router.push("/login")}>
            Login
          </Button>
          Dont have an account? <Link color="primary" onClick={() => router.push("/companyRegister")}>Request access</Link>
        </Box>
      </Box>
    </Box>
  )
}