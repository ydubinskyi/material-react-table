import { Box, Container } from "@mui/material";
import { Header } from "./components/header";

function App() {
  return (
    <Box component="main" sx={{ height: "100vh", flexGrow: 1, mt: 8 }}>
      <Header />

      <Container sx={{ py: 4 }}>
        <p>Table</p>
      </Container>
    </Box>
  );
}

export default App;
