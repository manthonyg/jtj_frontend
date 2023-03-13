import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  InputBase,
  Input,
  Autocomplete,
  TextField,
  Slider,
  Chip,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import Barchart from "../components/Barchart";
import {
  Scoreboard,
  ScoreboardSection,
  TeamSection,
  TeamName,
  TeamScore,
  GameSection,
  GameInning,
  GameCount,
  Count,
  GameOuts,
  TopInningIndicator,
  BottomInningIndicator,
  OnBase,
  Base,
  Bases,
  Outs,
  Inning,
} from "../StyledComponents";
import { Auth, Hub } from "aws-amplify";

import { createButton } from "react-social-login-buttons";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Slide from "@mui/material/Slide";
import { getClosestHexValue } from "../components/StrikeZone/utils";
import { StrikeZone } from "../components/StrikeZone/StrikeZone.jsx";
import { PubSub } from "pubsub-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { PitchType } from "../components/PitchType";
import { IMaskInput } from "react-imask";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import Legend from "../components/Legend";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { pitchesState, pitchState, authTokenState } from "../models/atoms";
import { useEffect } from "react";
import { Router } from "../components/service/routes";
import ReactLoading from "react-loading";

const CustomChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  height: 20,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const baseballTeams = require("../models/baseball_teams.json");

export const CountInputMask = React.forwardRef(function TextMaskCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="b-2"
      definitions={{
        b: /[0-3]/,
        s: /[0-2]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const ScoreMask = React.forwardRef(function ScoreMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="s"
      definitions={{
        s: /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value } })
      }
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

  const { user, login, profile, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [pitch, setPitch] = useRecoilState(pitchState);

  const [pitches, setPitches] = useRecoilState(pitchesState);

  const [zone, setZone] = useState(0);
  const [rawData, setRawData] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [editing, setIsEditing] = useState(null);
  const [prediction, setPrediction] = useState(0);
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [localStoragePitches, setLocalStoragePitches] = useLocalStorage(
    "pitches",
    []
  );

  const notifyError = (errorMessage) =>
    toast.error(errorMessage, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifySuccess = (successMessage) =>
    toast.success(successMessage, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        const sesh = await Auth.currentSession();
        const idToken = sesh.getIdToken().getJwtToken();
        setAuthToken(idToken);
      } catch (error) {
        notifyError(
          "You must be logged in to use this app. Please login or create an account."
        );
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        console.log({ error });
      }
    })();
  }, []);

  useEffect(() => {
    const token = PubSub.subscribe("zoneSelected", (msg, data) => {
      setPitch({
        ...pitch,
        zone: data,
      });
      setZone(data);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, [pitch, setPitch, setPitches]);

  useEffect(() => {
    setPitches(localStoragePitches);
  }, []);

  function toPercentage(number) {
    return (number * 100).toFixed(2);
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      PubSub.publish("pitchThrown", pitch);
      const _pitch = {
        ...pitch,
        homeTeam: null,
        awayTeam: null,
        runnerOnFirst: pitch.runenrOnFirst ? 1 : 0,
        runnerOnSecond: pitch.runnerOnSecond ? 1 : 0,
        runnerOnThird: pitch.runnerOnThid ? 1 : 0,
        pitchNumber: parseInt(pitch.balls) + parseInt(pitch.strikes),
        pitchType: parseInt(pitch.pitchType),
        zone: parseInt(zone),
      };

      const data = await fetch(Router.getRoute("prediction", "v1"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(_pitch),
      });

      const rawData = await data.json();

      const dataJson = JSON.parse(rawData.body);

      setRawData(dataJson);
      const newPitch = {
        ...pitch,
        prediction: toPercentage(dataJson[11]),
      };
      setPitch(newPitch);
      setPrediction(toPercentage(dataJson[11]));

      setPitches([...pitches, newPitch]);
      setLocalStoragePitches([...pitches, newPitch]);
      setIsLoading(false);
      // notifySuccess("Pitch Submitted!");
    } catch (error) {
      console.error({ error });
      notifyError("Error Submitting Pitch!");
    }
  };

  const handleEditing = (field) => {
    setIsEditing(field);
  };

  const dataByZone = pitches.map((pitch) => {
    return {
      label: "Zone: " + pitch.zone,
      data: [
        {
          pitch: pitch.zone,
          prediction: pitch.prediction,
        },
      ],
    };
  });

  const dataBySpeed = pitches.map((pitch) => {
    return {
      label: "Pitch Speed (MPH): " + pitch.pitchSpeed,
      data: [
        {
          pitch: pitch.pitchSpeed,
          prediction: pitch.prediction,
        },
      ],
    };
  });

  const dataByPitchType = pitches.map((pitch) => {
    return {
      label: "Pitch Type: " + pitch.pitchType,
      data: [
        {
          pitch: pitch.pitchType,
          prediction: pitch.prediction,
        },
      ],
    };
  });

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
      description: `Use the interactive scoreboard to change the game situation`,
      component: (
        <Grid container>
          <Grid item xs={12}>
            <CustomChip
              small
              color="secondary"
              sx={{ margin: "20px" }}
              label="Game Data"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", height: 75 }}>
              <Scoreboard>
                <ScoreboardSection>
                  <TeamSection>
                    {editing === "homeTeam" ? (
                      <Autocomplete
                        name="homeTeam"
                        sx={{ width: 100 }}
                        size="small"
                        openOnFocus
                        blurOnSelect
                        disableClearable
                        value={pitch.homeTeam}
                        options={baseballTeams.mlbColors}
                        autoHighlight
                        onBlur={() => handleEditing(null)}
                        getOptionLabel={(option) => option.abbreviation}
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
                            {option.abbreviation}
                          </Box>
                        )}
                        onChange={(e, v) => {
                          if (v.abbreviation === "NYY") {
                            if (pitch.awayTeam.abbreviation === "NYY") {
                              setPitch({
                                ...pitch,
                                awayTeam: baseballTeams.mlbColors[0],
                                homeTeam: v,
                              });
                            }
                          } else {
                            if (pitch.awayTeam.abbreviation !== "NYY") {
                              notifyError(
                                'Either Home or Away has to be the "Yankees"!'
                              );
                              setPitch({
                                ...pitch,
                                homeTeam: baseballTeams.mlbColors.find(
                                  (x) => x.abbreviation === "NYY"
                                ),
                              });
                            } else {
                              setPitch({
                                ...pitch,
                                homeTeam: v,
                              });
                            }
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            autoFocus
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
                        {pitch.homeTeam.abbreviation}
                      </TeamName>
                    )}

                    {editing === "homeScore" ? (
                      <InputBase
                        name="homeScore"
                        style={{
                          width: 40,
                          height: 48,
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "2rem",
                        }}
                        autoFocus
                        value={String(pitch.homeScore) || "0"}
                        inputComponent={ScoreMask}
                        onChange={handleChange}
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
                          value={String(pitch.inning) || "1"}
                          name="inning"
                          onChange={handleChange}
                          inputComponent={ScoreMask}
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
                          onChange={(e) => {
                            const strikes = e.target.value.split("-")[0];
                            const balls = e.target.value.split("-")[1];
                            setPitch({
                              ...pitch,
                              strikes: strikes,
                              balls: balls,
                            });
                          }}
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
                          <Outs onClick={() => handleEditing("outs")}>
                            Outs
                          </Outs>
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
                        name="awayTeam"
                        sx={{ width: 100 }}
                        size="small"
                        disableClearable
                        blurOnSelect
                        value={pitch.homeTeam}
                        openOnFocus
                        options={baseballTeams.mlbColors}
                        autoHighlight
                        onBlur={() => handleEditing(null)}
                        getOptionLabel={(option) => option.abbreviation}
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
                            {option.abbreviation}
                          </Box>
                        )}
                        onChange={(e, v) => {
                          if (v.abbreviation === "NYY") {
                            if (pitch.homeTeam.abbreviation === "NYY") {
                              setPitch({
                                ...pitch,
                                homeTeam: baseballTeams.mlbColors[0],
                                awayTeam: v,
                              });
                            }
                          } else {
                            if (pitch.homeTeam.abbreviation !== "NYY") {
                              notifyError(
                                'Either Home or Away has to be the "Yankees"!'
                              );
                              setPitch({
                                ...pitch,
                                awayTeam: baseballTeams.mlbColors.find(
                                  (x) => x.abbreviation === "NYY"
                                ),
                              });
                            } else {
                              setPitch({
                                ...pitch,
                                awayTeam: v,
                              });
                            }
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            autoFocus
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
                        {pitch.awayTeam.abbreviation}
                      </TeamName>
                    )}
                    {editing === "awayScore" ? (
                      <InputBase
                        style={{
                          width: 40,
                          height: 48,
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "2rem",
                        }}
                        inputComponent={ScoreMask}
                        name={"awayScore"}
                        value={String(pitch.awayScore) || "0"}
                        autoFocus
                        onChange={handleChange}
                        onBlur={() => handleEditing(null)}
                      ></InputBase>
                    ) : (
                      <TeamScore onClick={() => handleEditing("awayScore")}>
                        {pitch.awayScore}
                      </TeamScore>
                    )}
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
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Input pitch data",
      description: "Pick a type of pitch and the speed it is thrown at.",
      component: (
        <Grid container>
          <Grid item xs={12}>
            <CustomChip
              small
              color="secondary"
              sx={{ marginBottom: "20px" }}
              label="Pitch Type"
            />
          </Grid>

          <FormControl component="fieldset">
            <RadioGroup
              name="pitchType"
              value="fastball"
              onChange={(event) =>
                setPitch({ ...pitch, pitchType: event.target.value })
              }
            >
              <Grid container sx={{ maxWidth: 600 }}>
                <Grid item xs={4}>
                  <Box>
                    <Typography>Curveball</Typography>
                    <FormControlLabel
                      value={7}
                      checked={pitch.pitchType == 7}
                      control={<PitchType imgSrc={"/curveball.svg"} />}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography>Fastball</Typography>
                    <FormControlLabel
                      value={5}
                      checked={pitch.pitchType == 5}
                      control={<PitchType imgSrc="/fastball.svg" />}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography>Slider</Typography>
                    <FormControlLabel
                      value={2}
                      checked={pitch.pitchType == 2}
                      control={<PitchType imgSrc="/slider.svg" />}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4} style={{ marginTop: 100 }}>
                  <Box>
                    <Typography>Cutter</Typography>
                    <FormControlLabel
                      value={6}
                      checked={pitch.pitchType == 6}
                      control={<PitchType imgSrc="/cutter.svg" />}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4} style={{ marginTop: 100 }}>
                  <Box>
                    <Typography>Sinker</Typography>
                    <FormControlLabel
                      value={3}
                      checked={pitch.pitchType == 3}
                      control={<PitchType imgSrc="/sinker.svg" />}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4} style={{ marginTop: 100 }}>
                  <Box>
                    <Typography>Changeup</Typography>
                    <FormControlLabel
                      value={1}
                      checked={pitch.pitchType == 1}
                      control={<PitchType imgSrc="/changeup.svg" />}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <CustomChip
                    small
                    color="secondary"
                    sx={{ marginBottom: "20px", marginTop: "40px" }}
                    label="Pitch Speed"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      step={1}
                      name="pitchSpeed"
                      onChange={handleChange}
                      value={pitch.pitchSpeed}
                      marks
                      min={70}
                      max={105}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <CustomChip
                    small
                    color="secondary"
                    sx={{ marginBottom: "20px", marginTop: "40px" }}
                    label="Pitch Number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      name="pitchNumber"
                      onChange={handleChange}
                      value={pitch.pitchNumber}
                      step={1}
                      marks
                      min={1}
                      max={15}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      ),
    },
    {
      label: "Time to pitch",
      description: `Drag the ball to try out different locations.`,
      component: (
        <Grid container>
          <Grid item xs={12}>
            <CustomChip
              size="small"
              label="Pitch Location"
              color="secondary"
              sx={{ margin: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <StrikeZone />
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      {/* {!user && <Navigate to="/login" />} */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header {...{ user }} />
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              width: "100vw",
              m: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                  <Step key={step.label}>
                    <StepLabel
                      optional={index === activeStep && step.description}
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Box
                        sx={{ m: 2, p: 2 }}
                        style={{
                          minHeight: 500,
                          margin: 0,
                          padding: 0,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {isLoading && <CircularProgress color="secondary" />}
                        {!isLoading && step.component}
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={
                              index === steps.length - 1
                                ? (e) => {
                                    handleSubmit(e);
                                    handleNext();
                                  }
                                : handleNext
                            }
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
                </Slide>
              ))}
            </Stepper>
          </Box>
          {activeStep === steps.length && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              {isLoading && (
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Predicting...
                </Typography>
              )}
              {!isLoading && (
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Result
                </Typography>
              )}
              {isLoading && (
                <ReactLoading
                  type={"cubes"}
                  color={"#8000f850"}
                  height={"10%"}
                  width={"10%"}
                />
              )}
              {!isLoading && (
                <>
                  <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Avatar
                      sx={{
                        width: 175,
                        height: 175,
                        m: 2,
                        border: `20px solid #8000f850`,
                        backgroundColor: getClosestHexValue(prediction),
                      }}
                    >
                      {prediction}%
                    </Avatar>
                  </Slide>
                </>
              )}
              <Legend />

              <Button
                sx={{ m: 2 }}
                style={{
                  width: 200,
                  backgroundColor: "#3c52c3",
                  color: "#ffffff",
                }}
                onClick={() => setActiveStep(0)}
              >
                Reset
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} lg={6} display="flex">
          {pitches.length > 0 && (
            <Grid container display={"flex"} alignItems={"center"}>
              <Grid item xs={12}>
                <Grid item xs={12} style={{ margin: 20 }}>
                  <Typography>Predictions by Zone</Typography>
                  <Barchart data={dataByZone} />
                </Grid>
                <Grid item xs={12} style={{ margin: 20 }}>
                  <Typography>Predictions by Speed</Typography>
                  <Barchart data={dataBySpeed} />
                </Grid>
                <Grid item xs={12} style={{ margin: 20 }}>
                  <Typography>Predictions by Pitch Type</Typography>
                  <Barchart data={dataByPitchType} />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
