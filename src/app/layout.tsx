import Theme from "./theme";
import "./globals.css";
import Header from "@/components/Header";
import { Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Header isLoggedIn={true} />
          <Box sx={{ width: "80vw", mx: "auto", mt: "10vh" }}>
            {children}
          </Box>
        </Theme>
      </body>
    </html>
  );
}