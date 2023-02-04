import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Grid } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <h1>My App</h1>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
