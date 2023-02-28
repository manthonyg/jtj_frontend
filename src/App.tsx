import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Grid } from "@mui/material";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Grid container>
          <h1>My App</h1>
        </Grid>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
