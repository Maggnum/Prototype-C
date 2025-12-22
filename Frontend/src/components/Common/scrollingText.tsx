import { Box, Typography, type SxProps } from "@mui/material";
import { type FC, useLayoutEffect, useRef, useState } from "react";

const textContainerStyle: SxProps = {
  overflow: "hidden",
  whiteSpace: "nowrap",
};

export const ScrollingText: FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const textStyle: SxProps = {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: shouldScroll
      ? "scroll-text 16s linear infinite alternate"
      : "none",
    "@keyframes scroll-text": {
      "0%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(-100%)" },
    },
    "&:hover": {
      animationPlayState: "paused",
    },
  };

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    setShouldScroll(
      textRef.current.scrollWidth > containerRef.current.clientWidth
    );
  }, [text]);

  return (
    <Box ref={containerRef} sx={textContainerStyle}>
      <Typography ref={textRef} component="div" sx={textStyle}>
        {text}
      </Typography>
    </Box>
  );
};
