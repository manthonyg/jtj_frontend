import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Album() {
  const { user } = useAuth();

  return (
    <>
      {!user && <Navigate to="/login" />}
      <div style={{ height: "100vh" }}>
        <AppBar position="relative">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img
                src="/logo.svg"
                alt="logo"
                height={50}
                width={50}
                style={{ color: "#ffffff", fill: "#ffffff" }}
              />
              {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                JUDGE THE JUDGE
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Container sx={{ height: "100vh" }}>
            <Grid
              container
              spacing={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                a
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                b
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                c
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </main>
      </div>
    </>
  );
}
