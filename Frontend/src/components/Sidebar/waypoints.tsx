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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useWaypoints } from "@/components/Map/useWaypoints";

export const Waypoints: FC = () => {
  const { waypoints, addWaypoint, removeWaypoint } = useWaypoints();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
              #
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
              Lat
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
              Lng
            </TableCell>
            <TableCell sx={{ width: "10%" }}></TableCell>
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
                  sx={{ py: 2 }}
                >
                  No waypoints added
                </Typography>
                <IconButton
                  color="primary"
                  className="waypoint-btn"
                  onClick={() => addWaypoint()}
                  sx={{
                    mx: "auto",
                    display: "flex",
                  }}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ) : (
            waypoints.map((pos, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  height: 12,
                  "&:hover .waypoint-btn": {
                    opacity: 1,
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pos.lat.toFixed(6)}</TableCell>
                <TableCell>{pos.lng.toFixed(6)}</TableCell>
                <TableCell colSpan={4} sx={{ p: 0 }}>
                  <IconButton
                    size="small"
                    className="waypoint-btn"
                    onClick={() => addWaypoint(index)}
                    sx={{
                      opacity: 0,
                      transition: "opacity 0.15s ease",
                      mx: "auto",
                      display: "flex",
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="waypoint-btn"
                    onClick={() => removeWaypoint(index)}
                    sx={{
                      opacity: 0,
                      transition: "opacity 0.15s ease",
                      mx: "auto",
                      display: "flex",
                    }}
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
