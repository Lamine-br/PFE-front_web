import React from "react";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const trigger = useScrollTrigger({ threshold: 100 });

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleScrollToTop}
        variant="extended"
        size="small"
        sx={{
          position: "fixed",
          bottom: 33,
          right: 33,
          backgroundColor: "#FF584D",
          color: "#fff",
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUp fontSize="medium" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
