import type { FC } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  type SxProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useWaypoints } from "@/components/Waypoints";

const addButtonStyle: SxProps = {
  mx: "auto",
  display: "flex",
};

const smallAddButtonStyle: SxProps = {
  opacity: 0,
  transition: "opacity 0.15s ease",
  mx: "auto",
  display: "flex",
};

const smallDeleteIconStyle: SxProps = {
  opacity: 0,
  transition: "opacity 0.15s ease",
  mx: "auto",
  display: "flex",
};

const rowStyle: SxProps = {
  height: 12,
  "&:hover .waypoint-btn": {
    opacity: 1,
  },
};

const buttonColumnStyle: SxProps = { width: "10%" };
const cellHeaderStyle: SxProps = { fontWeight: 600, color: "text.secondary" };
const emptyMessageStyle: SxProps = { py: 2 };
const buttonCellStyle: SxProps = { p: 0 };

export const Waypoints: FC = () => {
  const { waypoints, addWaypoint, removeWaypoint } = useWaypoints();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={cellHeaderStyle}>#</TableCell>
            <TableCell sx={cellHeaderStyle}>Lat</TableCell>
            <TableCell sx={cellHeaderStyle}>Lng</TableCell>
            <TableCell sx={buttonColumnStyle}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {waypoints.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={emptyMessageStyle}
                >
                  No waypoints added
                </Typography>
                <IconButton
                  color="primary"
                  className="waypoint-btn"
                  onClick={() => addWaypoint()}
                  sx={addButtonStyle}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ) : (
            waypoints.map((pos, index) => (
              <TableRow key={index} hover sx={rowStyle}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pos.lat.toFixed(6)}</TableCell>
                <TableCell>{pos.lng.toFixed(6)}</TableCell>
                <TableCell colSpan={4} sx={buttonCellStyle}>
                  <IconButton
                    size="small"
                    className="waypoint-btn"
                    onClick={() => addWaypoint(index)}
                    sx={smallAddButtonStyle}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="waypoint-btn"
                    onClick={() => removeWaypoint(index)}
                    sx={smallDeleteIconStyle}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
