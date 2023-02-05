import { AppBar, Typography } from "@mui/material";

export const Header: React.FC = () => (
  <AppBar
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      minHeight: 64,
      px: 3,
    }}
  >
    <Typography component="h1" variant="h6">
      MaterialUI React table
    </Typography>
  </AppBar>
);
