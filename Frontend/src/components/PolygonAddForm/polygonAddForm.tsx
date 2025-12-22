import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  Stack,
  type SxProps,
} from "@mui/material";
import { useState, type FC } from "react";

import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { usePolygonsControl } from "@/components/PolygonsTable";

const secondaryHeaderStyle: SxProps = { whiteSpace: "nowrap" };

const buttonsCellStyle: SxProps = {
  opacity: 0,
  transition: "opacity 0.15s",
  display: "flex",
  gap: 0.5,
  justifyContent: "flex-end",
};

const rowStyle: SxProps = {
  "&:hover .row-actions": { opacity: 1 },
};

const addButtonStyle: SxProps = { mt: 1 };

export const PolygonAddForm: FC = () => {
  const { addPolygon } = usePolygonsControl();
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState<Array<[number, number]>>([]);
  const [lat, setLat] = useState<number | "">("");
  const [lng, setLng] = useState<number | "">("");

  const addVertex = () => {
    if (lat === "" || lng === "") return;
    setCoordinates((prev) => [...prev, [lng, lat]]);
    setLat("");
    setLng("");
  };

  const deleteVertex = (index: number) => {
    setCoordinates((prev) => prev.filter((_, i) => i !== index));
  };

  const moveVertex = (from: number, to: number) => {
    setCoordinates((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const newVertexs = [...prev];
      const [item] = newVertexs.splice(from, 1);
      newVertexs.splice(to, 0, item);
      return newVertexs;
    });
  };

  return (
    <Stack spacing={2}>
      <Stack direction={"row"} alignItems={"flex-end"} spacing={3}>
        <Box>
          <Typography variant="h6">Add polygon</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={secondaryHeaderStyle}
          >
            Minimum 3 vertices required
          </Typography>
        </Box>

        <TextField
          label="Polygon name"
          variant="standard"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Lng</TableCell>
              <TableCell>Lat</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {coordinates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No vertices added
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              coordinates.map((coords, index) => (
                <TableRow key={index} hover sx={rowStyle}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{coords[0].toFixed(6)}</TableCell>
                  <TableCell>{coords[1].toFixed(6)}</TableCell>
                  <TableCell align="right">
                    <Box className="row-actions" sx={buttonsCellStyle}>
                      <IconButton
                        size="small"
                        disabled={index === 0}
                        onClick={() => moveVertex(index, index - 1)}
                      >
                        <ArrowUpwardIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        size="small"
                        disabled={index === coordinates.length - 1}
                        onClick={() => moveVertex(index, index + 1)}
                      >
                        <ArrowDownwardIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteVertex(index)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" gap={3} alignItems="flex-end">
        <TextField
          label="Lat"
          variant="standard"
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value === "" ? "" : +e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addVertex()}
        />
        <TextField
          label="Lng"
          variant="standard"
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value === "" ? "" : +e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addVertex()}
        />
        <Button
          variant="contained"
          disabled={coordinates.length < 3 || !name}
          fullWidth
          sx={addButtonStyle}
          onClick={() => addPolygon(name, coordinates)}
        >
          Add polygon
        </Button>
      </Box>
    </Stack>
  );
};
