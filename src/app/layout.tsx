import Theme from "./theme";
import "./globals.css";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Theme>
            <Header />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80vw", mt: "10vh", mx: "auto" }}>
              {children}
            </Box>
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}