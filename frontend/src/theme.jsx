import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F52BA", // Buttons, highlights
      contrastText: "#ffffff",
    },
    background: {
      default: "#D6E6F2", // Main background
      paper: "#A6C6D8",   // Cards & surfaces
    },
    text: {
      primary: "#000A26",  // Main text
      secondary: "#0F52BA", // Accent text
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      color: "#000A26",
      fontWeight: 600,
    },
    body1: {
      color: "#000A26",
    },
    body2: {
      color: "#000A26",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#A6C6D8",
        },
      },
    },
  },
});

export default theme;
