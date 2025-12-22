import { useState, type FC } from "react";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Switch,
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
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";

import { usePolygonsControl } from "./usePolygonsControl";
import { MapMode } from "@/models";
import { useMapMode } from "./useMapMode";
import { PolygonAddForm } from "@/components/PolygonAddForm";
import { EditInlineText } from "@/components/Common";

const modalStyle: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  p: 3,
  borderRadius: 2,
};

const deleteIconStyle: SxProps = {
  opacity: 0,
  transition: "opacity 0.15s",
};

const rowStyle: SxProps = {
  "&:hover .row-actions": { opacity: 1 },
};

export const PolygonsTable: FC = () => {
  const { polygons, deletePolygon, editPolygonName, markPolygon } =
    usePolygonsControl();
  const [useMapEdit, setUseMapEdit] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setMapMode = useMapMode();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="caption" color="text.secondary">
          Edit mode:
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Form
          </Typography>
          <Switch
            checked={useMapEdit}
            onChange={() => setUseMapEdit((p) => !p)}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            Map
          </Typography>
        </Stack>
      </Stack>

      <Divider />

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>

          <TableBody>
            {polygons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No polygons added
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              polygons.map((polygon, index) => (
                <TableRow
                  key={polygon.id ?? index}
                  hover
                  sx={rowStyle}
                  onMouseEnter={() => markPolygon(`${polygon.id}`)}
                  onMouseLeave={() => markPolygon(undefined)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <EditInlineText
                      initialValue={polygon.properties?.name ?? polygon.id}
                      commitEdit={editPolygonName(index)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      className="row-actions"
                      onClick={deletePolygon(polygon.id as string)}
                      sx={deleteIconStyle}
                      disabled={useMapEdit}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
        {useMapEdit ? (
          <>
            <IconButton
              color="primary"
              onClick={() => setMapMode(MapMode.DRAW)}
            >
              <EditLocationAltIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => setMapMode(MapMode.DELETE)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <IconButton color="primary" onClick={() => setIsModalOpen(true)}>
            <AddIcon />
          </IconButton>
        )}
      </Stack>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={modalStyle}>
          <PolygonAddForm />
        </Box>
      </Modal>
    </>
  );
};
