import type { FC } from "react";
import { MapView } from "./components/MapView/mapView";
import { ToastContainer } from "react-toastify";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { darkTheme } from "./components/Theme/darkTheme";

export const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />

        <Box flex={1} height="100vh">
          <MapView />
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};
