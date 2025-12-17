import {
  Box,
  Divider,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  type SxProps,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type FC } from "react";
import { MapUrl } from "./mapUrl";
import { useRouting } from "../Map/useRouting";
import { Waypoints } from "./waypoints";

const drawerStyle: SxProps = {
  width: "18vw",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "20vw",
    boxSizing: "border-box",
    backgroundColor: "background.paper",
  },
};

const buttonStyle: SxProps = {
  px: 5,
  py: 1.2,
  fontWeight: 600,
  borderRadius: 999,
  boxShadow: "0 4px 20px rgba(255, 152, 0, 0.25)",
};

export const Sidebar: FC = () => {
  const { loading, route } = useRouting();

  return (
    <Drawer variant="permanent" sx={drawerStyle}>
      <Box display="flex" flexDirection="column" height="100%" px={2} py={3}>
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h5"
            fontWeight={700}
            letterSpacing={1}
            color="primary"
          >
            ProtoWaze
          </Typography>
        </Box>

        <Divider />

        <Box flex={1} mt={2}>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>Map URL</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MapUrl />
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>Waypoints</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Waypoints />
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider />
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={buttonStyle}
            onClick={route}
            disabled={loading}
          >
            Route
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
