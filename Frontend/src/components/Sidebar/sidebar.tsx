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
import { MapUrl } from "@/components/MapUrl";
import { useRouting } from "@/components/Map";
import { Waypoints } from "@/components/Waypoints";
import { PolygonsTable } from "@/components/PolygonsTable";

const drawerStyle: SxProps = {
  width: "22vw",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "22vw",
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

          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>Polygons</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PolygonsTable />
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
