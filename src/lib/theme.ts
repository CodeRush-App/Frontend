import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F62F63",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#ABB8C9",
    },
    background: {
      default: "#001341",
      paper: "#27375E",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#27375E",
            },
            backgroundColor: "#000000",
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
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          border: "2px solid #27375E",
        },
        outlinedSecondary: {
          border: "2px solid #27375E",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: "#E1E6EB",
          borderColor: "#E1E6EB",
          "&::before, &::after": {
            borderColor: "#FFFFFF",
          },
        },
      },
    },
  },
});
