import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import { GoogleOAuthProvider } from "@react-oauth/google";

import theme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login test="hi" />,
  },
  {
    path: "/strikezone",
    element: <Main />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="573638032527-4r7d005c9v0mtk7nta5ocejjev5fglqq.apps.googleusercontent.com">
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </MuiThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
