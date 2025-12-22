import { TextField, Typography, type SxProps } from "@mui/material";
import { useState, type FC } from "react";

const typographyStyle: SxProps = {
  cursor: "pointer",
  "&:hover": { textDecoration: "underline" },
};

interface editInlineTextProps {
  initialValue: string;
  commitEdit: (value: string) => void;
}

export const EditInlineText: FC<editInlineTextProps> = ({
  initialValue,
  commitEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(initialValue);

  const cancelEdit = () => {
    setDraft(initialValue);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    setIsEditing(false);
    commitEdit(draft);
  };

  return isEditing ? (
    <TextField
      variant="standard"
      value={draft}
      autoFocus
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => commitEdit(draft)}
      onKeyDown={(e) => {
        if (e.key === "Enter") finishEditing();
        if (e.key === "Escape") cancelEdit();
      }}
    />
  ) : (
    <Typography variant="body2" sx={typographyStyle} onClick={startEditing}>
      {draft}
    </Typography>
  );
};
