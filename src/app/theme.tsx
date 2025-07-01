"use client"
import { createTheme, ThemeProvider } from "@mui/material";

export const brandColors = {
  brand: "#F62F63",
  darkest: "#0F172A",
  dark: "#27375E",
  mid: "#ABB8C9",
  light: "#E1E6EB",
  lightest: "#FFFFFF",
}

const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.brand,
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: brandColors.mid,
    },
    background: {
      default: brandColors.darkest,
      paper: brandColors.dark,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: brandColors.dark,
            },
            backgroundColor: brandColors.darkest,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // border: "2px solid #27375E",
          backgroundColor: "rgba(5, 14, 35, 0.7)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: brandColors.dark,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          border: "2px solid " + brandColors.dark,
        },
        outlinedSecondary: {
          border: "2px solid " + brandColors.dark,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: brandColors.light,
          borderColor: brandColors.light,
          "&::before, &::after": {
            borderColor: "#FFFFFF",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "#FFFFFF",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          backgroundColor: brandColors.darkest,
        },
      },
    },
  },
});


export default function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}