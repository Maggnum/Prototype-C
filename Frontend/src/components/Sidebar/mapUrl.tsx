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
  type SxProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSetAtom } from "jotai";
import { chosenUrlAtom } from "@/states";
import { ScrollingText } from "@/components/Common";
import mapProviders from "@/config/mapProviders.json";

interface MapSource {
  name: string;
  url: string;
}

const radioStyle: SxProps = {
  alignItems: "flex-start",
  mb: 1,
  width: "100%",
  maxWidth: "100%",
  overflow: "hidden",
  "& .MuiFormControlLabel-label": {
    width: "100%",
    minWidth: 0,
  },
};

export const MapUrl: FC = () => {
  const setChosenUrl = useSetAtom(chosenUrlAtom);
  const [sources, setSources] = useState<MapSource[]>(mapProviders);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!name || !url) return;

    setSources((prev) => [...prev, { name, url }]);
    setName("");
    setUrl("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChosenUrl(event.currentTarget.value);

  return (
    <Box>
      <FormControl fullWidth>
        <RadioGroup
          defaultValue={sources[0].url}
          name="map-source"
          onChange={handleChange}
        >
          {sources.map((source) => (
            <FormControlLabel
              key={source.url}
              value={source.url}
              control={<Radio size="small" />}
              sx={radioStyle}
              label={
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {source.name}
                  </Typography>
                  <Typography
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
