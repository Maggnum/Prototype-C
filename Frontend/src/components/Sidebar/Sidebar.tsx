import {
  Box,
  Divider,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  type SxProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type FC } from "react";
import { MapUrl } from "./MapUrl";

const drawerStyle: SxProps = {
  width: "18vw",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "18vw",
    boxSizing: "border-box",
    backgroundColor: "background.paper",
  },
};

export const Sidebar: FC = () => {
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
        </Box>

        <Divider />
      </Box>
    </Drawer>
  );
};
