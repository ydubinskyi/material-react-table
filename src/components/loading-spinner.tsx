import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      display: "grid",
      placeContent: "center",
      zIndex: 5,
    }}
  >
    <CircularProgress color="primary" size={60} />
  </Box>
);
