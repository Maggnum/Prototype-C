import { useState, type FC } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ScrollingText } from "../ScrollingText";

interface MapSource {
  name: string;
  url: string;
}

export const MapUrl: FC = () => {
  const [sources, setSources] = useState<MapSource[]>([
    {
      name: "OpenStreetMap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
  ]);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!name || !url) return;

    setSources((prev) => [...prev, { name, url }]);
    setName("");
    setUrl("");
  };

  return (
    <Box>
      <FormControl fullWidth>
        <RadioGroup defaultValue={sources[0].url} name="map-source">
          {sources.map((source) => (
            <FormControlLabel
              key={source.url}
              value={source.url}
              control={<Radio size="small" />}
              sx={{ alignItems: "flex-start", mb: 1, width: "100px" }}
              label={
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {source.name}
                  </Typography>
                  <Typography
                    sx={{ width: "65%" }}
                    variant="caption"
                    color="text.secondary"
                    component="div"
                  >
                    <ScrollingText text={source.url} />
                  </Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <TextField
          variant="standard"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          variant="standard"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <IconButton color="primary" onClick={handleAdd} sx={{ mt: 1 }}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
