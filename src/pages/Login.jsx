import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import { SocialIcon } from "react-social-icons";
import { createButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { FederatedSignIn } from "../components/FederatedSignIn";
import { useRecoilState } from "recoil";

function Copyright(props) {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "courier",
        }}
        color="text.secondary"
        align="center"
        {...props}
      >
        What is this?
      </Typography>
      <Typography>
        This is a tool that utilizes machine learning to predict the chance
        Aaron Judge, #99 for the New York Yankees, will hit a home run.{" "}
        <Link
          sx={{ cursor: "pointer" }}
          onClick={(event) => {
            event.preventDefault();
            return navigate("/about");
          }}
        >
          Learn more about this project
        </Link>
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <SocialIcon url="https://www.linkedin.com/in/michael-grandori/" />
        <SocialIcon url="https://medium.com/@grandorimichael" />
        <SocialIcon url="https://github.com/manthonyg" />
      </Box>
    </>
  );
}

export const Login = () => {
  const { user, loading, login, demoLogin, logout } = useAuth();

  const config = {
    text: "Demo Login",
    icon: "facebook",
    iconFormat: (name) => `fa fa-${name}`,
    style: { paddingLeft: 40, background: "#d0453a" },
    activeStyle: { background: "#d0453a50" },
  };

  const CustomLoginButton = createButton(config);

  return (
    <>
      {user && <Navigate to="/strikezone" />}
      <Grid
        container
        component="main"
        sx={{ height: "100vh", backgroundColor: (t) => t.palette.primary.main }}
      >
        <CssBaseline />
        {/* <button onClick={() => handleLogin()}>Click</button> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.primary.main
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/swing.svg)",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "url(/icon.svg)",
            }}
          >
            <Avatar
              sx={{
                m: 5,
                p: 4,
                bgcolor: "secondary.main",
                width: 100,
                height: 100,
              }}
            >
              <img src="/logo.svg" alt="judge the judge logo" />
            </Avatar>
            <Typography
              sx={{
                fontFamily: "courier",
              }}
              component="h1"
              variant="h5"
            >
              JUDGE THE JUDGE
            </Typography>

            <Box
              sx={{
                mt: 5,
                width: 300,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 5,
              }}
              noValidate
            >
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: "url(https://source.unsplash.com/random)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid item xs={12}>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    {/* <LockOutlinedIcon /> */}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={() => console.log("clicked")}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
              <FederatedSignIn />

              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
