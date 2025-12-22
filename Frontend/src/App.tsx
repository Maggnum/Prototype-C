import type { FC } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { Map } from "@/components/Map";
import { Sidebar } from "@/components/Sidebar";
import { darkTheme } from "@/components/Theme";

export const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />

        <Box flex={1} height="100vh">
          <Map />
        </Box>
      </Box>
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
};
