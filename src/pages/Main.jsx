import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  InputBase,
  Input,
  Autocomplete,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import { StrikeZone } from "../components/StrikeZone/StrikeZone.jsx";
import { styled } from "@mui/material/styles";
import { PubSub } from "pubsub-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import CircularSlider from "@fseehawer/react-circular-slider";
import { PitchType } from "../components/PitchType";
import { IMaskInput } from "react-imask";
import { useLocation } from "react-router-dom";
import {
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  CartesianAxis,
  ScatterChart,
  ZAxis,
  Scatter,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import {
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  RadioGroup,
  FormLabel,
  Radio,
  Button,
  FormGroup,
  FormHelperText,
  Slider,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";

const baseballTeams = require("../models/baseball_teams.json");
export const Bases = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 45,
  left: 122,
  gridArea: "bases",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "65px",
  height: "65px",
  marginTop: "50px",
  transform: "rotate(45deg)",
}));

export const Base = styled("div")(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "2px",
  background: "#3c52c3",
  boxShadow: `2px 2px 0px #2f4098, -2px -2px 0px #4964ee`,
  zIndex: 1,
  width: "50px",
  height: "50px",
}));

export const OnBase = styled("div")(({ theme }) => ({
  cursor: "pointer",
  background: "red",
  boxShadow: `2px 2px 0px #2f4098, -2px -2px 0px #4964ee`,
  width: "50px",
  height: "50px",
}));

export const Scoreboard = styled("div")(({ theme }) => ({
  gridArea: "scoreboard",
  display: "grid",
  borderRadius: "14px",
  transform: "scale(1.25)",
  background: "#3c52c3",
  boxShadow: `5px 5px 0px #2f4098, -5px -5px 0px #4964ee`,
  gridTemplateColumns: "1fr 1fr 1fr",
  color: "#ffffff",
  width: "300px",
  height: "100%",
}));

export const ScoreboardSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const TeamSection = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  height: 75,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const GameSection = styled("div")(({ theme }) => ({
  width: "100%",
  gridArea: "game",
  height: 75,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
}));

export const InningSection = styled("div")(({ theme }) => ({
  gridColumn: "1 / 3",
  gridRow: "1 / 2",
}));

export const TopInningIndicator = styled("div")(({ theme }) => ({
  cursor: "pointer",
  width: 0,
  height: 0,
  borderLeft: "10px solid transparent",
  borderRight: "10px solid transparent",
  borderBottom: "20px solid red",
}));

export const Inning = styled("p")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

export const BottomInningIndicator = styled("div")(({ theme }) => ({
  cursor: "pointer",
  width: 0,
  height: 0,
  borderLeft: "10px solid transparent",
  borderRight: "10px solid transparent",
  borderTop: "20px solid red",
}));

export const GameInning = styled("div")(({ theme }) => ({
  gridColumn: "1 / 2",
  gridRow: "1 / 2",
  height: 55,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

export const GameOuts = styled("div")(({ theme }) => ({
  gridColumn: "1 / 3",
  gridRow: "2 / 3",
  height: 10,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
}));

export const Outs = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

export const GameCount = styled("div")(({ theme }) => ({
  gridColumn: "2 / 3",
  gridRow: "1 / 2",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
}));

export const Count = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

export const TeamName = styled("div")(({ theme }) => ({
  width: "100%",
  fontSize: "1.5rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
}));

export const TeamScore = styled("div")(({ theme }) => ({
  width: "100%",
  fontSize: "2rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PitchButton = styled(Button)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: "100%",
  backgroundColor: "red",
}));

export const Score = styled("div")(({ theme }) => ({
  background: "black",
  color: "white",
  width: "100px",
  height: "100px",
}));

export const PitchButtonRevamped = styled("button")(({ theme }) => ({
  "--b": "3px",
  "--s": ".45em",
  "--color": "#e2e2e2",
  fontWeight: "bold",
  fontFamily: "monospace",
  cursor: "pointer",
  fontWeight: 700,
  padding: "calc(.5em + var(--s)) calc(.9em + var(--s))",
  color: "var(--color)",
  "--_p": "var(--s)",
  background: `conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
      var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p))`,
  transition: `.3s linear, color 0s, background-color 0s`,
  outline: `var(--b) solid #0000`,
  outlineOffset: "2em",
  fontSize: `40px`,
  border: 0,
  userSelect: `none`,
  touchAction: `manipulation`,
  "&:hover": {
    "--_p": "0px",
    outlineColor: "#ffffff",
    outlineOffset: ".05em",
  },
  "&:active": {
    background: "#ffffff",
    color: "#000000",
  },
}));

export const CountInputMask = React.forwardRef(function TextMaskCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="s-b"
      definitions={{
        s: /[0-2]/,
        b: /[0-3]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function Main(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log(baseballTeams.mlbColors.map((x) => x.name));
  console.log({ props });
  // const { user } = props.location.state;
  const location = useLocation();
  const { user } = location.state;
  console.log(user);

  const [teams, setTeams] = useState([]);

  const [pitch, setPitch] = useState({
    pitchType: 1,
    pitchSpeed: 88.5,
    pitchHand: 1,
    balls: 0,
    strikes: 0,
    runnerOnThird: 0,
    runnerOnSecond: 0,
    runnerOnFirst: 0,
    outs: 0,
    inning: 0,
    topInning: true,
    pitchNumber: 1,
    homeTeam: "Yankees",
    homeScore: 0,
    awayScore: 0,
    prediction: 0,
  });

  const [values, setValues] = React.useState({
    countmask: "0-0",
  });
  const [pitches, setPitches] = useState([]);
  const [zone, setZone] = useState(0);
  const [rawData, setRawData] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [editing, setIsEditing] = useState(null);

  const normalizePitches = (pitches) => {
    const t = pitches.map((p, idx) => {
      console.log({ p });
      return {
        x: idx,
        y: p.prediction,
        z: p.prediction,
      };
    });

    return t;
  };
  useEffect(() => {
    const token = PubSub.subscribe("zoneSelected", (msg, data) => {
      console.log({ msg, data });
      setPitch({
        ...pitch,
        zone: data,
      });
      setZone(data);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    fetch(baseballTeams, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", { data });
        setTeams(data.mlbColors);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  function toPercentage(number) {
    return (Math.round(number * 100 * 10) / 10).toFixed(1);
  }

  const notifySuccess = (successMessage) =>
    toast.success(successMessage, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (errorMessage) =>
    toast.error(errorMessage, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await fetch("http://localhost:3002/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pitch, zone }),
      });

      const dataJson = await data.json();

      setRawData(dataJson);
      console.log({ dataJson });
      setPitch({
        ...pitch,
        prediction: toPercentage(dataJson.data[11]),
      });

      setPitches([...pitches, pitch]);
      notifySuccess("Pitch Submitted!");
    } catch (error) {
      notifyError("Error Submitting Pitch!");
      console.log({ error });
    }
  };

  const handleEditing = (field) => {
    setIsEditing(field);
  };

  const handleChange = (event) => {
    if (event.target.name === "count") {
      const [strikes, balls] = event.target.value.split("-");
      setPitch({
        ...pitch,
        strikes,
        balls,
      });
    }
    if (event.target.type === "checkbox") {
      const name = event.target.name;
      const value = event.target.checked ? 1 : 0;

      setPitch({
        ...pitch,
        [name]: value,
      });
      return;
    } else {
      const name = event.target.name;
      const value = event.target.value;

      setPitch({
        ...pitch,
        [name]: value,
      });
    }
  };

  const steps = [
    {
      label: "Input game data",
      description: `Every piece of information will have some outcome on the pitch.`,
      component: (
        <div style={{ position: "relative", height: 75 }}>
          <Scoreboard>
            <ScoreboardSection>
              <TeamSection>
                {editing === "homeTeam" ? (
                  <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 100 }}
                    size="small"
                    disableClearable
                    options={baseballTeams.mlbColors}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={option.logo}
                          alt=""
                        />
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ color: "#ffffff", fontWeight: 700 }}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: "#ffffff",
                            fontWeight: 700,
                          },
                          disableUnderline: true,
                        }}
                        small
                        variant="standard"
                      />
                    )}
                  />
                ) : (
                  <TeamName onClick={() => handleEditing("homeTeam")}>
                    Home
                  </TeamName>
                )}

                {editing === "homeScore" ? (
                  <InputBase
                    autoFocus
                    onBlur={() => handleEditing(null)}
                  ></InputBase>
                ) : (
                  <TeamScore onClick={() => handleEditing("homeScore")}>
                    {pitch.homeScore}
                  </TeamScore>
                )}
              </TeamSection>
            </ScoreboardSection>
            <ScoreboardSection>
              <GameSection>
                <GameInning>
                  {pitch.topInning ? (
                    <TopInningIndicator
                      onClick={() =>
                        setPitch({
                          ...pitch,
                          topInning: !pitch.topInning,
                        })
                      }
                    />
                  ) : (
                    <BottomInningIndicator
                      onClick={() =>
                        setPitch({
                          ...pitch,
                          topInning: !pitch.topInning,
                        })
                      }
                    />
                  )}
                  {editing === "inning" ? (
                    <InputBase
                      style={{
                        width: "20px",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "2rem",
                      }}
                      value={pitch.inning}
                      name="inning"
                      onChange={handleChange}
                      autoFocus
                      onBlur={() => handleEditing(null)}
                    ></InputBase>
                  ) : (
                    <Inning onClick={() => handleEditing("inning")}>
                      {pitch.inning}
                    </Inning>
                  )}
                </GameInning>
                <GameCount>
                  {editing === "count" ? (
                    <Input
                      autoFocus
                      onBlur={() => handleEditing(null)}
                      name="count"
                      onChange={handleChange}
                      value={`${pitch.strikes}-${pitch.balls}`}
                      disableUnderline
                      style={{
                        width: 30,
                        color: "white",
                        height: 56,
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                      id="formatted-text-mask-input"
                      inputComponent={CountInputMask}
                    />
                  ) : (
                    <Count onClick={() => handleEditing("count")}>
                      {pitch.strikes}-{pitch.balls}
                    </Count>
                  )}
                </GameCount>
                <GameOuts>
                  {editing === "outs" ? (
                    <>
                      <InputBase
                        disableUnderline
                        style={{
                          width: 15,
                          color: "white",
                          fontWeight: 700,
                        }}
                        name="outs"
                        onChange={handleChange}
                        autoFocus
                        onBlur={() => handleEditing(null)}
                      ></InputBase>
                      <Outs onClick={() => handleEditing("outs")}>Outs</Outs>
                    </>
                  ) : (
                    <Outs onClick={() => handleEditing("outs")}>
                      {pitch.outs} Outs
                    </Outs>
                  )}
                </GameOuts>
              </GameSection>
            </ScoreboardSection>
            <ScoreboardSection>
              <TeamSection>
                {editing === "awayTeam" ? (
                  <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 100 }}
                    size="small"
                    disableClearable
                    options={baseballTeams.mlbColors}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={option.logo}
                          alt=""
                        />
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ color: "#ffffff", fontWeight: 700 }}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: "#ffffff",
                            fontWeight: 700,
                          },
                          disableUnderline: true,
                        }}
                        small
                        variant="standard"
                      />
                    )}
                  />
                ) : (
                  <TeamName onClick={() => handleEditing("awayTeam")}>
                    Away
                  </TeamName>
                )}
                <TeamScore>{pitch.awayScore}</TeamScore>
              </TeamSection>
            </ScoreboardSection>
          </Scoreboard>
          <Bases>
            {pitch.runnerOnFirst ? (
              <OnBase
                onClick={() =>
                  setPitch({
                    ...pitch,
                    runnerOnFirst: !pitch.runnerOnFirst,
                  })
                }
              />
            ) : (
              <Base
                onClick={() =>
                  setPitch({
                    ...pitch,
                    runnerOnFirst: !pitch.runnerOnFirst,
                  })
                }
              />
            )}
            {pitch.runnerOnSecond ? (
              <OnBase
                onClick={() =>
                  setPitch({
                    ...pitch,
                    runnerOnSecond: !pitch.runnerOnSecond,
                  })
                }
              />
            ) : (
              <Base
                onClick={() =>
                  setPitch({
                    ...pitch,
                    runnerOnSecond: !pitch.runnerOnSecond,
                  })
                }
              />
            )}
            {pitch.runnerOnThird ? (
              <OnBase
                onClick={() =>
                  setPitch({
                    ...pitch,
                    runnerOnThird: !pitch.runnerOnThird,
                  })
                }
              />
            ) : (
              <Base
                onClick={() =>
                  setPitch({
                    ...pitch,
                    runnerOnThird: !pitch.runnerOnThird,
                  })
                }
              />
            )}
          </Bases>
        </div>
      ),
    },
    {
      label: "Input pitch data",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
      component: (
        <FormControl component="fieldset">
          <RadioGroup
            name="pitchType"
            value="fastball"
            onChange={(event) =>
              setPitch({ ...pitch, pitchType: event.target.value })
            }
          >
            {/* <FormLabel id="demo-radio-buttons-group-label">
                      Pitch Type
                    </FormLabel> */}

            <Grid
              container
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={4}>
                <FormControlLabel
                  value={1}
                  checked={pitch.pitchType == 1}
                  control={<PitchType imgSrc={"/curveball.svg"} />}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  value={2}
                  checked={pitch.pitchType == 2}
                  control={<PitchType imgSrc="/fastball.svg" />}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  value={3}
                  checked={pitch.pitchType == 3}
                  control={<PitchType imgSrc="/curveball.svg" />}
                />
              </Grid>

              <Grid item xs={4} style={{ marginTop: 100 }}>
                <FormControlLabel
                  value={4}
                  checked={pitch.pitchType == 4}
                  control={<PitchType imgSrc="/cutter.svg" />}
                />
              </Grid>

              <Grid item xs={4} style={{ marginTop: 100 }}>
                <FormControlLabel
                  value={5}
                  checked={pitch.pitchType == 5}
                  control={<PitchType imgSrc="/sinker.svg" />}
                />
              </Grid>

              <Grid item xs={4} style={{ marginTop: 100 }}>
                <FormControlLabel
                  value={6}
                  checked={pitch.pitchType == 6}
                  control={<PitchType imgSrc="/2seam.svg" />}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      label: "Time to pitch",
      description: `Try out different locations. Aaron Judge historically likes to swing at high pitches.`,
      component: <StrikeZone />,
    },
  ];

  return (
    <>
      <Header {...{ user }} />
      <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box
                  style={{
                    width: 500,
                    height: 500,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {step.component}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Pitch" : "Next"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>RESULTS</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
      {activeStep === 3 && (
        <Grid container display={"flex"} alignItems={"center"}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <LineChart
                width={730}
                height={250}
                // data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </Grid>
            <Grid item xs={12}>
              <BarChart
                width={730}
                height={250}
                data={normalizePitches(pitches)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="y" fill="#8884d8" />
              </BarChart>
            </Grid>

            <Grid item xs={12}>
              <ScatterChart
                width={730}
                height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Pitch" unit="#" />
                <YAxis dataKey="y" name="Homerun" unit="%" />
                <ZAxis dataKey="z" name="Homerun" unit="%" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }}>
                  <p>Lol</p>
                </Tooltip>
                <Legend />
                <Scatter
                  name="Pitches"
                  data={normalizePitches(pitches)}
                  fill="#8884d8"
                />
              </ScatterChart>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>

    // <div style={{ backgroundColor: "#212121" }}>
    //   <ToastContainer
    //     position="bottom-center"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //   />

    //   <Header {...{ user }} />
    //   <Grid
    //     container
    //     spacing={1}
    //     display={"flex"}
    //     justifyContent={"center"}
    //     alignItems={"center"}
    //     style={{
    //       borderRadius: "14px",
    //       height: "100vh",
    //     }}
    //   >
    //     <Grid item xs={12} sm={6} md={4} lg={4}>
    //       <Grid container style={{ display: "flex", justifyContent: "center" }}>
    //         <Grid
    //           style={{ display: "flex", justifyContent: "center" }}
    //           item
    //           xs={12}
    //         ></Grid>
    //         <Grid
    //           item
    //           xs={12}
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             marginTop: 20,
    //           }}
    //         >
    //           <Slider
    //             color="secondary"
    //             aria-label="Temperature"
    //             orientation="vertical"
    //             valueLabelDisplay="auto"
    //             defaultValue={30}
    //           />
    //           <StrikeZone />
    //           <Slider
    //             color="secondary"
    //             aria-label="Temperature"
    //             orientation="vertical"
    //             valueLabelDisplay="auto"
    //             defaultValue={30}
    //           />
    //         </Grid>
    //       </Grid>
    //     </Grid>

    //     <Grid item xs={12} sm={6} md={4} lg={4}>
    //       <Grid container spacing={5}>
    //         <Grid
    //           item
    //           xs={12}
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             marginTop: 20,
    //           }}
    //         >
    //           <div style={{ position: "relative" }}>
    //             <Scoreboard>
    //               <ScoreboardSection>
    //                 <TeamSection>
    //                   {editing === "homeTeam" ? (
    //                     <Autocomplete
    //                       id="country-select-demo"
    //                       sx={{ width: 100 }}
    //                       size="small"
    //                       disableClearable
    //                       options={baseballTeams.mlbColors}
    //                       autoHighlight
    //                       getOptionLabel={(option) => option.name}
    //                       renderOption={(props, option) => (
    //                         <Box
    //                           component="li"
    //                           sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
    //                           {...props}
    //                         >
    //                           <img
    //                             loading="lazy"
    //                             width="20"
    //                             src={option.logo}
    //                             alt=""
    //                           />
    //                           {option.name}
    //                         </Box>
    //                       )}
    //                       renderInput={(params) => (
    //                         <TextField
    //                           {...params}
    //                           style={{ color: "#ffffff", fontWeight: 700 }}
    //                           InputProps={{
    //                             ...params.InputProps,
    //                             style: {
    //                               color: "#ffffff",
    //                               fontWeight: 700,
    //                             },
    //                             disableUnderline: true,
    //                           }}
    //                           small
    //                           variant="standard"
    //                         />
    //                       )}
    //                     />
    //                   ) : (
    //                     <TeamName onClick={() => handleEditing("homeTeam")}>
    //                       Home
    //                     </TeamName>
    //                   )}

    //                   {editing === "homeScore" ? (
    //                     <InputBase
    //                       autoFocus
    //                       onBlur={() => handleEditing(null)}
    //                     ></InputBase>
    //                   ) : (
    //                     <TeamScore onClick={() => handleEditing("homeScore")}>
    //                       {pitch.homeScore}
    //                     </TeamScore>
    //                   )}
    //                 </TeamSection>
    //               </ScoreboardSection>
    //               <ScoreboardSection>
    //                 <GameSection>
    //                   <GameInning>
    //                     {pitch.topInning ? (
    //                       <TopInningIndicator
    //                         onClick={() =>
    //                           setPitch({
    //                             ...pitch,
    //                             topInning: !pitch.topInning,
    //                           })
    //                         }
    //                       />
    //                     ) : (
    //                       <BottomInningIndicator
    //                         onClick={() =>
    //                           setPitch({
    //                             ...pitch,
    //                             topInning: !pitch.topInning,
    //                           })
    //                         }
    //                       />
    //                     )}
    //                     {editing === "inning" ? (
    //                       <InputBase
    //                         style={{
    //                           width: "20px",
    //                           color: "#ffffff",
    //                           fontWeight: 700,
    //                           fontSize: "2rem",
    //                         }}
    //                         value={pitch.inning}
    //                         name="inning"
    //                         onChange={handleChange}
    //                         autoFocus
    //                         onBlur={() => handleEditing(null)}
    //                       ></InputBase>
    //                     ) : (
    //                       <Inning onClick={() => handleEditing("inning")}>
    //                         {pitch.inning}
    //                       </Inning>
    //                     )}
    //                   </GameInning>
    //                   <GameCount>
    //                     {editing === "count" ? (
    //                       <Input
    //                         autoFocus
    //                         onBlur={() => handleEditing(null)}
    //                         name="count"
    //                         onChange={handleChange}
    //                         value={`${pitch.strikes}-${pitch.balls}`}
    //                         disableUnderline
    //                         style={{
    //                           width: 30,
    //                           color: "white",
    //                           height: 56,
    //                           fontWeight: 700,
    //                           fontSize: "1rem",
    //                         }}
    //                         id="formatted-text-mask-input"
    //                         inputComponent={CountInputMask}
    //                       />
    //                     ) : (
    //                       <Count onClick={() => handleEditing("count")}>
    //                         {pitch.strikes}-{pitch.balls}
    //                       </Count>
    //                     )}
    //                   </GameCount>
    //                   <GameOuts>
    //                     {editing === "outs" ? (
    //                       <>
    //                         <InputBase
    //                           disableUnderline
    //                           style={{
    //                             width: 15,
    //                             color: "white",
    //                             fontWeight: 700,
    //                           }}
    //                           name="outs"
    //                           onChange={handleChange}
    //                           autoFocus
    //                           onBlur={() => handleEditing(null)}
    //                         ></InputBase>
    //                         <Outs onClick={() => handleEditing("outs")}>
    //                           Outs
    //                         </Outs>
    //                       </>
    //                     ) : (
    //                       <Outs onClick={() => handleEditing("outs")}>
    //                         {pitch.outs} Outs
    //                       </Outs>
    //                     )}
    //                   </GameOuts>
    //                 </GameSection>
    //               </ScoreboardSection>
    //               <ScoreboardSection>
    //                 <TeamSection>
    //                   {editing === "awayTeam" ? (
    //                     <Autocomplete
    //                       id="country-select-demo"
    //                       sx={{ width: 100 }}
    //                       size="small"
    //                       disableClearable
    //                       options={baseballTeams.mlbColors}
    //                       autoHighlight
    //                       getOptionLabel={(option) => option.name}
    //                       renderOption={(props, option) => (
    //                         <Box
    //                           component="li"
    //                           sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
    //                           {...props}
    //                         >
    //                           <img
    //                             loading="lazy"
    //                             width="20"
    //                             src={option.logo}
    //                             alt=""
    //                           />
    //                           {option.name}
    //                         </Box>
    //                       )}
    //                       renderInput={(params) => (
    //                         <TextField
    //                           {...params}
    //                           style={{ color: "#ffffff", fontWeight: 700 }}
    //                           InputProps={{
    //                             ...params.InputProps,
    //                             style: {
    //                               color: "#ffffff",
    //                               fontWeight: 700,
    //                             },
    //                             disableUnderline: true,
    //                           }}
    //                           small
    //                           variant="standard"
    //                         />
    //                       )}
    //                     />
    //                   ) : (
    //                     <TeamName onClick={() => handleEditing("awayTeam")}>
    //                       Away
    //                     </TeamName>
    //                   )}
    //                   <TeamScore>{pitch.awayScore}</TeamScore>
    //                 </TeamSection>
    //               </ScoreboardSection>
    //             </Scoreboard>
    //             <Bases>
    //               {pitch.runnerOnFirst ? (
    //                 <OnBase
    //                   onClick={() =>
    //                     setPitch({
    //                       ...pitch,
    //                       runnerOnFirst: !pitch.runnerOnFirst,
    //                     })
    //                   }
    //                 />
    //               ) : (
    //                 <Base
    //                   onClick={() =>
    //                     setPitch({
    //                       ...pitch,
    //                       runnerOnFirst: !pitch.runnerOnFirst,
    //                     })
    //                   }
    //                 />
    //               )}
    //               {pitch.runnerOnSecond ? (
    //                 <OnBase
    //                   onClick={() =>
    //                     setPitch({
    //                       ...pitch,
    //                       runnerOnSecond: !pitch.runnerOnSecond,
    //                     })
    //                   }
    //                 />
    //               ) : (
    //                 <Base
    //                   onClick={() =>
    //                     setPitch({
    //                       ...pitch,
    //                       runnerOnSecond: !pitch.runnerOnSecond,
    //                     })
    //                   }
    //                 />
    //               )}
    //               {pitch.runnerOnThird ? (
    //                 <OnBase
    //                   onClick={() =>
    //                     setPitch({
    //                       ...pitch,
    //                       runnerOnThird: !pitch.runnerOnThird,
    //                     })
    //                   }
    //                 />
    //               ) : (
    //                 <Base
    //                   onClick={() =>
    //                     setPitch({
    //                       ...pitch,
    //                       runnerOnThird: !pitch.runnerOnThird,
    //                     })
    //                   }
    //                 />
    //               )}
    //             </Bases>
    //           </div>
    //         </Grid>
    //         <Grid
    //           item
    //           xs={12}
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             marginTop: 100,
    //           }}
    //         >
    //           {/* <PitchButtonRevamped>Pitch</PitchButtonRevamped> */}
    //         </Grid>
    //       </Grid>
    //     </Grid>

    //     <Grid
    //       item
    //       xs={12}
    //       sm={6}
    //       md={4}
    //       lg={4}
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         marginTop: 20,
    //       }}
    //     >
    //       <form onSubmit={handleSubmit}>
    //         <FormGroup style={{ display: "flex", gap: 25 }}>
    //           <FormControl component="fieldset">
    //             <RadioGroup
    //               name="pitchType"
    //               value="fastball"
    //               onChange={(event) =>
    //                 setPitch({ ...pitch, pitchType: event.target.value })
    //               }
    //             >
    //               {/* <FormLabel id="demo-radio-buttons-group-label">
    //                   Pitch Type
    //                 </FormLabel> */}

    //               <Grid
    //                 container
    //                 style={{ display: "flex", justifyContent: "center" }}
    //               >
    //                 <Grid item xs={4}>
    //                   <FormControlLabel
    //                     value={1}
    //                     checked={pitch.pitchType == 1}
    //                     control={<PitchType imgSrc={"/curveball.svg"} />}
    //                   />
    //                 </Grid>

    //                 <Grid item xs={4}>
    //                   <FormControlLabel
    //                     value={2}
    //                     checked={pitch.pitchType == 2}
    //                     control={<PitchType imgSrc="/fastball.svg" />}
    //                   />
    //                 </Grid>

    //                 <Grid item xs={4}>
    //                   <FormControlLabel
    //                     value={3}
    //                     checked={pitch.pitchType == 3}
    //                     control={<PitchType imgSrc="/curveball.svg" />}
    //                   />
    //                 </Grid>

    //                 <Grid item xs={4} style={{ marginTop: 100 }}>
    //                   <FormControlLabel
    //                     value={4}
    //                     checked={pitch.pitchType == 4}
    //                     control={<PitchType imgSrc="/cutter.svg" />}
    //                   />
    //                 </Grid>

    //                 <Grid item xs={4} style={{ marginTop: 100 }}>
    //                   <FormControlLabel
    //                     value={5}
    //                     checked={pitch.pitchType == 5}
    //                     control={<PitchType imgSrc="/sinker.svg" />}
    //                   />
    //                 </Grid>

    //                 <Grid item xs={4} style={{ marginTop: 100 }}>
    //                   <FormControlLabel
    //                     value={6}
    //                     checked={pitch.pitchType == 6}
    //                     control={<PitchType imgSrc="/2seam.svg" />}
    //                   />
    //                 </Grid>
    //               </Grid>
    //             </RadioGroup>
    //           </FormControl>

    //           {/* <FormControl>
    //               <Slider
    //                 aria-label="Always visible"
    //                 value={pitch.pitchNumber}
    //                 name="pitchNumber"
    //                 onChange={handleChange}
    //                 label={(label) => label}
    //                 getAriaValueText={() => "text"}
    //                 step={1}
    //                 min={1}
    //                 max={12}
    //                 marks={[
    //                   { value: 1, label: 1 },
    //                   { value: 2, label: 2 },
    //                   { value: 3, label: 3 },
    //                   { value: 4, label: 4 },
    //                   { value: 5, label: 5 },
    //                   { label: 6, value: 6 },
    //                   { value: 7, label: 7 },
    //                   { value: 8, label: 8 },
    //                   { value: 9, label: 9 },
    //                   { value: 10, label: 10 },
    //                   { value: 11, label: 11 },
    //                   { value: 12, label: 12 },
    //                 ]}
    //                 valueLabelDisplay="auto"
    //               />
    //               <FormHelperText>Pitch Number</FormHelperText>
    //             </FormControl> */}

    //           {/*}
    //             <FormControl>
    //               <Slider
    //                 aria-label="Always visible"
    //                 value={pitch.homeScore}
    //                 name="homeScore"
    //                 onChange={handleChange}
    //                 getAriaValueText={() => "text"}
    //                 step={1}
    //                 min={1}
    //                 max={12}
    //                 marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
    //                 valueLabelDisplay="auto"
    //               />
    //               <FormHelperText>Home Score</FormHelperText>
    //             </FormControl>

    //             <FormControl>
    //               <Slider
    //                 aria-label="Always visible"
    //                 value={pitch.awayScore}
    //                 name="awayScore"
    //                 onChange={handleChange}
    //                 getAriaValueText={() => "text"}
    //                 step={1}
    //                 min={1}
    //                 max={12}
    //                 marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
    //                 valueLabelDisplay="auto"
    //               />
    //               <FormHelperText>Away Score</FormHelperText>
    //             </FormControl>

    //             <Grid
    //               container
    //               justifyContent={"space-between"}
    //               alignItems={"center"}
    //             >
    //               <Grid item xs={6}>
    //                 <FormGroup>
    //                   <FormControlLabel
    //                     value={!!pitch.runnerOnFirst}
    //                     name="runnerOnFirst"
    //                     onChange={handleChange}
    //                     control={<Switch />}
    //                     label="Runner on First"
    //                   />
    //                   <FormControlLabel
    //                     value={!!pitch.runnerOnSecond}
    //                     name="runnerOnSecond"
    //                     onChange={handleChange}
    //                     control={<Switch />}
    //                     label="Runner on Second"
    //                   />
    //                   <FormControlLabel
    //                     value={!!pitch.runnerOnThird}
    //                     name="runnerOnThird"
    //                     onChange={handleChange}
    //                     control={<Switch />}
    //                     label="Runner on Third"
    //                   />
    //                 </FormGroup>
    //               </Grid>

    //               <Grid item xs={12}>
    //                 <FormControl>
    //                   <FormLabel id="demo-row-radio-buttons-group-label">
    //                     Outs
    //                   </FormLabel>
    //                   <RadioGroup
    //                     value={pitch.outs}
    //                     onChange={handleChange}
    //                     row
    //                     aria-labelledby="demo-row-radio-buttons-group-label"
    //                     name="row-radio-buttons-group"
    //                   >
    //                     <FormControlLabel
    //                       value="0"
    //                       control={<Radio />}
    //                       label="0"
    //                     />
    //                     <FormControlLabel
    //                       value="1"
    //                       control={<Radio />}
    //                       label="1"
    //                     />
    //                     <FormControlLabel
    //                       value="2"
    //                       control={<Radio />}
    //                       label="2"
    //                     />
    //                   </RadioGroup>
    //                 </FormControl>
    //               </Grid>

    //               <Grid item xs={12}>
    //                 <FormControl>
    //                   <FormLabel id="demo-row-radio-buttons-group-label">
    //                     Strikes
    //                   </FormLabel>
    //                   <RadioGroup
    //                     name={"strikes"}
    //                     value={pitch.strikes}
    //                     onChange={handleChange}
    //                     row
    //                     aria-labelledby="demo-row-radio-buttons-group-label"
    //                   >
    //                     <FormControlLabel
    //                       value="0"
    //                       control={<Radio />}
    //                       label="0"
    //                     />
    //                     <FormControlLabel
    //                       value="1"
    //                       control={<Radio />}
    //                       label="1"
    //                     />
    //                     <FormControlLabel
    //                       value="2"
    //                       control={<Radio />}
    //                       label="2"
    //                     />
    //                   </RadioGroup>
    //                 </FormControl>
    //               </Grid>

    //               <Grid item xs={12}>
    //                 <FormControl>
    //                   <FormLabel id="demo-row-radio-buttons-group-label">
    //                     Balls
    //                   </FormLabel>
    //                   <RadioGroup
    //                     name="balls"
    //                     value={pitch.balls}
    //                     onChange={handleChange}
    //                     row
    //                     aria-labelledby="demo-row-radio-buttons-group-label"
    //                   >
    //                     <FormControlLabel
    //                       value="0"
    //                       control={<Radio />}
    //                       label="0"
    //                     />
    //                     <FormControlLabel
    //                       value="1"
    //                       control={<Radio />}
    //                       label="1"
    //                     />
    //                     <FormControlLabel
    //                       value="2"
    //                       control={<Radio />}
    //                       label="2"
    //                     />
    //                     <FormControlLabel
    //                       value="3"
    //                       control={<Radio />}
    //                       label="3"
    //                     />
    //                   </RadioGroup>
    //                 </FormControl>
    //               </Grid>

    //               <Grid item xs={12}>
    //                 <FormControl>
    //                   <FormLabel id="demo-row-radio-buttons-group-label">
    //                     Pitch Hand
    //                   </FormLabel>
    //                   <RadioGroup
    //                     name="pitchHand"
    //                     value={pitch.pitchHand}
    //                     onChange={handleChange}
    //                     row
    //                     aria-labelledby="demo-row-radio-buttons-group-label"
    //                   >
    //                     <FormControlLabel
    //                       value="1"
    //                       control={<Radio />}
    //                       label="Left"
    //                     />
    //                     <FormControlLabel
    //                       value="2"
    //                       control={<Radio />}
    //                       label="Right"
    //                     />
    //                   </RadioGroup>
    //                 </FormControl>
    //               </Grid>
    //             </Grid> */}
    //           {/* <Button type="submit" variant="contained" color="primary">
    //               Pitch
    //             </Button> */}
    //         </FormGroup>
    //       </form>
    //     </Grid>

    //     {/* <pre>{JSON.stringify(pitch, null, 2)}</pre>

    //         <pre>{JSON.stringify(rawData, null, 2)}</pre> */}
    //     <Grid container display={"flex"} alignItems={"center"}>
    //       <Grid item xs={12}>
    //         {/* <Grid item xs={12}>
    //           <LineChart
    //             width={730}
    //             height={250}
    //             data={data}
    //             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    //           >
    //             <CartesianGrid strokeDasharray="3 3" />
    //             <XAxis dataKey="name" />
    //             <YAxis />
    //             <Tooltip />
    //             <Legend />
    //             <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    //             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    //           </LineChart>
    //         </Grid> */}
    //         {/*
    //           <Grid item xs={12}>
    //             <BarChart
    //               width={730}
    //               height={250}
    //               data={normalizePitches(pitches)}
    //             >
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="name" />
    //               <YAxis />
    //               <Tooltip />
    //               <Legend />
    //               <Bar dataKey="y" fill="#8884d8" />
    //             </BarChart>
    //           </Grid> */}

    //         {/* <Grid item xs={12}>
    //             <ScatterChart
    //               width={730}
    //               height={250}
    //               margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
    //             >
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="x" name="Pitch" unit="#" />
    //               <YAxis dataKey="y" name="Homerun" unit="%" />
    //               <ZAxis dataKey="z" name="Homerun" unit="%" />
    //               <Tooltip cursor={{ strokeDasharray: "3 3" }}>
    //                 <p>Lol</p>
    //               </Tooltip>
    //               <Legend />
    //               <Scatter
    //                 name="Pitches"
    //                 data={normalizePitches(pitches)}
    //                 fill="#8884d8"
    //               />
    //             </ScatterChart>
    //           </Grid> */}
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </div>
  );
}
