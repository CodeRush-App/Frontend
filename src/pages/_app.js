import { ThemeProvider } from "@mui/material";
import "./globals.css";
import { theme } from "../lib/theme";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
