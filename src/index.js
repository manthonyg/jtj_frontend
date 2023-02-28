import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Navigate,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import { GoogleOAuthProvider } from "@react-oauth/google";
import About from "./pages/About";
import theme from "./theme";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login test="hi" />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login test="hi" />,
  },
  {
    path: "/policy",
    element: <Navigate to="/privacy.html" />,
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
  <RecoilRoot>
    <GoogleOAuthProvider clientId="573638032527-4r7d005c9v0mtk7nta5ocejjev5fglqq.apps.googleusercontent.com">
      <React.StrictMode>
        <MuiThemeProvider theme={theme}>
          <div style={{ backgroundColor: "#ffffff" }}>
            <RouterProvider router={router} />
          </div>
        </MuiThemeProvider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
