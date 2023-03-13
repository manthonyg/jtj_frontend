import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import About from "./pages/About";
import theme from "./theme";
import { RecoilRoot } from "recoil";
import { Amplify } from "aws-amplify";

Amplify.configure({
  oauth: {
    domain: process.env.REACT_APP_DOMAIN,
    redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
    responseType: process.env.REACT_APP_RESPONSE_TYPE,
    scope: process.env.REACT_APP_SCOPE.split(","),
  },
  identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // (required) - Amazon Cognito Identity Pool ID
  region: process.env.REACT_APP_REGION, // (required) - Amazon Cognito Region
  userPoolId: process.env.REACT_APP_USER_POOL_ID, // (optional) - Amazon Cognito User Pool ID
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID, // (optional) - Amazon Cognito Web Client ID (App client secret needs to be disabled)
});

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
    path: "/home",
    element: <Login />,
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
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: "#ffffff" }}>
          <RouterProvider router={router} />
        </div>
      </MuiThemeProvider>
    </React.StrictMode>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
