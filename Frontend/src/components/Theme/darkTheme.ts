import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800",
    },
    background: {
      default: "#0f0f0f",
      paper: "#161616",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  shape: {
    borderRadius: 10,
  },
});
