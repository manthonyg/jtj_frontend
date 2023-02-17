import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D0453A",
      contrastText: "#fff",
    },
    tertiary: {
      main: "#fadabf",
      contrastText: "#fff",
    },
    highlight: {
      main: "#D0453A",
      contrastText: "#fff",
    },
    highlight: {
      main: "#D0453A",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ['"Open Sans"', "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 500,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 300,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 200,
      fontSize: "1rem",
      lineHeight: 1.2,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 300,
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      textTransform: "none",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.625rem",
      textTransform: "uppercase",
    },
  },
  spacing: 8,
});

export default theme;
