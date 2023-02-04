import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { StrikeZone } from "../components/StrikeZone/StrikeZone.jsx";
import { styled } from "@mui/material/styles";
import { PubSub } from "pubsub-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import CircularSlider from "@fseehawer/react-circular-slider";
import { PitchType } from "../components/PitchType";
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
import { useEffect } from "react";

const Bases = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 35,
  left: 122,
  gridArea: "bases",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "60px",
  height: "60px",
  marginTop: "50px",
  transform: "rotate(45deg)",
}));

const Base = styled("div")(({ theme }) => ({
  borderRadius: "2px",
  background: "#3c52c3",
  boxShadow: `2px 2px 0px #2f4098, -2px -2px 0px #4964ee`,
  zIndex: 1,
  width: "25px",
  height: "25px",
}));

const OnBase = styled("div")(({ theme }) => ({
  background: "purple",
  width: "25px",
  height: "25px",
}));

const Scoreboard = styled("div")(({ theme }) => ({
  gridArea: "scoreboard",
  display: "grid",
  borderRadius: "14px",
  background: "#3c52c3",
  boxShadow: `10px 10px 0px #2f4098, -10px -10px 0px #4964ee`,
  gridTemplateColumns: "1fr 1fr 1fr",
  width: "300px",
  height: "100%",
  position: "relative",
}));

const ScoreboardSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const TeamSection = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  height: 75,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const GameSection = styled("div")(({ theme }) => ({
  width: "100%",
  gridArea: "game",
  height: 75,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
}));

const InningSection = styled("div")(({ theme }) => ({
  gridColumn: "1 / 3",
  gridRow: "1 / 2",
}));

const TopInningIndicator = styled("div")(({ theme }) => ({
  width: 0,
  height: 0,
  borderLeft: "10px solid transparent",
  borderRight: "10px solid transparent",
  borderBottom: "20px solid red",
}));

const Inning = styled("p")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const BottomInningIndicator = styled("div")(({ theme }) => ({
  width: 0,
  height: 0,
  borderLeft: "10px solid transparent",
  borderRight: "10px solid transparent",
  borderTop: "20px solid red",
}));

const GameInning = styled("div")(({ theme }) => ({
  gridColumn: "1 / 2",
  gridRow: "1 / 2",
  height: 55,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const GameOuts = styled("div")(({ theme }) => ({
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

const Outs = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const GameCount = styled("div")(({ theme }) => ({
  gridColumn: "2 / 3",
  gridRow: "1 / 2",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
}));

const Count = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const TeamName = styled("div")(({ theme }) => ({
  width: "100%",
  fontSize: "1.5rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
}));

const TeamScore = styled("div")(({ theme }) => ({
  width: "100%",
  fontSize: "2rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Score = styled("div")(({ theme }) => ({
  background: "black",
  color: "white",
  width: "100px",
  height: "100px",
}));

export default function Main() {
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
    pitchNumber: 1,
    homeScore: 0,
    awayScore: 0,
    prediction: 0,
  });

  const [pitches, setPitches] = useState([]);
  const [zone, setZone] = useState(0);
  const [rawData, setRawData] = useState({});
  const [isDragging, setIsDragging] = useState(false);

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

  const handleChange = (event) => {
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

  return (
    <>
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
      <Header>
        <div style={{ position: "relative" }}>
          <Scoreboard>
            <ScoreboardSection>
              <TeamSection>
                <TeamName>Home</TeamName>
                <TeamScore>{pitch.homeScore}</TeamScore>
              </TeamSection>
            </ScoreboardSection>
            <ScoreboardSection>
              <GameSection>
                <GameInning>
                  <TopInningIndicator />
                  <Inning>8</Inning>
                </GameInning>
                <GameCount>
                  <Count>2-3</Count>
                </GameCount>
                <GameOuts>
                  <Outs>2 Outs</Outs>
                </GameOuts>
              </GameSection>
            </ScoreboardSection>
            <ScoreboardSection>
              <TeamSection>
                <TeamName>Away</TeamName>
                <TeamScore>{pitch.awayScore}</TeamScore>
              </TeamSection>
            </ScoreboardSection>
          </Scoreboard>
          <Bases>
            {pitch.runnerOnFirst ? <OnBase /> : <Base />}
            {pitch.runnerOnSecond ? <OnBase /> : <Base />}
            {pitch.runnerOnThird ? <OnBase /> : <Base />}
          </Bases>
        </div>
      </Header>
      <Grid
        container
        style={{ height: "100vh", width: "100vw" }}
        spacing={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <div>
            <StrikeZone />
          </div>
        </Grid>

        {/* <RadioGroup
                  name="pitchType"
                  value="fastball"
                  onChange={() => console.log("changed")}
                > */}
        <FormLabel id="demo-radio-buttons-group-label">Pitch Type</FormLabel>

        <Radio
          checkedIcon={<img src="/curveball.svg" alt="curveball" />}
          icon={<img src="/curveball.svg" alt="curveball" />}
        />
        {/* </RadioGroup> */}

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <form onSubmit={handleSubmit}>
            <FormGroup style={{ display: "flex", gap: 25 }}>
              <FormControl component="fieldset">
                {/* <RadioGroup
                  name="pitchType"
                  value="fastball"
                  onChange={() => console.log("changed")}
                > */}
                <FormLabel id="demo-radio-buttons-group-label">
                  Pitch Type
                </FormLabel>

                <FormControlLabel
                  label="curve"
                  value="curveball"
                  control={
                    <Radio
                      checkedIcon={<img src="/curveball.svg" alt="curveball" />}
                      icon={<img src="/curveball.svg" alt="curveball" />}
                    />
                  }
                />
                {/* </RadioGroup> */}
              </FormControl>

              <Grid container spacing={1}>
                <Grid item xs={2}>
                  {/* <RadioGroup>
                      <FormControlLabel
                        label="pitch type"
                        control={<PitchType imgSrc="/fastball.svg" />}
                      />
                      <FormControlLabel
                        label="curveball"
                        control={<PitchType imgSrc="/curveball.svg" />}
                      />
                    </RadioGroup> */}
                </Grid>

                <Grid item xs={2}>
                  <img
                    src="/changeup.svg"
                    alt="changeup"
                    style={{ width: 100, height: 100 }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <img
                    src="/sinker.svg"
                    alt="sinker"
                    style={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <img
                    src="/slider.svg"
                    alt="slider"
                    style={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <img
                    src="/curveball.svg"
                    alt="curveball"
                    style={{ width: 100, height: 100 }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <img
                    src="/cutter.svg"
                    alt="cutter"
                    style={{ width: 100, height: 100 }}
                  />
                </Grid>
              </Grid>

              <div style={{ transform: "scale(1)" }}>
                <CircularSlider
                  min={70}
                  max={105}
                  direction={2}
                  label="Pitch Speed"
                  knobPosition="right"
                  appendToValue="mph"
                  valueFontSize="2rem"
                  trackColor="#eeeeee"
                  progressColorFrom={isDragging ? "#F0A367" : "#00bfbd"}
                  progressColorTo={isDragging ? "#F65749" : "#009c9a"}
                  labelColor={isDragging ? "#F0A367" : "#00bfbd"}
                  knobColor={isDragging ? "#F0A367" : "#00bfbd"}
                  isDragging={(value) => setIsDragging(value)}
                />
              </div>
              <Slider
                aria-label="Always visible"
                value={pitch.pitchSpeed}
                name="pitchSpeed"
                onChange={handleChange}
                getAriaValueText={() => "text"}
                step={0.5}
                min={70}
                label={(label) => label}
                max={105}
                marks={[
                  { value: 70, label: 70 },
                  { value: 80, label: 80 },
                  { value: 90, label: 90 },
                  { value: 100, label: 100 },
                ]}
                valueLabelDisplay="auto"
              />
              <FormHelperText>Pitch Speed</FormHelperText>

              <FormControl>
                <Slider
                  aria-label="Always visible"
                  value={pitch.pitchNumber}
                  name="pitchNumber"
                  onChange={handleChange}
                  label={(label) => label}
                  getAriaValueText={() => "text"}
                  step={1}
                  min={1}
                  max={12}
                  marks={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                    { value: 5, label: 5 },
                    { label: 6, value: 6 },
                    { value: 7, label: 7 },
                    { value: 8, label: 8 },
                    { value: 9, label: 9 },
                    { value: 10, label: 10 },
                    { value: 11, label: 11 },
                    { value: 12, label: 12 },
                  ]}
                  valueLabelDisplay="auto"
                />
                <FormHelperText>Pitch Number</FormHelperText>
              </FormControl>

              <FormControl>
                <Slider
                  aria-label="Always visible"
                  value={pitch.homeScore}
                  name="homeScore"
                  onChange={handleChange}
                  getAriaValueText={() => "text"}
                  step={1}
                  min={1}
                  max={12}
                  marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  valueLabelDisplay="auto"
                />
                <FormHelperText>Home Score</FormHelperText>
              </FormControl>

              <FormControl>
                <Slider
                  aria-label="Always visible"
                  value={pitch.awayScore}
                  name="awayScore"
                  onChange={handleChange}
                  getAriaValueText={() => "text"}
                  step={1}
                  min={1}
                  max={12}
                  marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  valueLabelDisplay="auto"
                />
                <FormHelperText>Away Score</FormHelperText>
              </FormControl>

              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      value={!!pitch.runnerOnFirst}
                      name="runnerOnFirst"
                      onChange={handleChange}
                      control={<Switch />}
                      label="Runner on First"
                    />
                    <FormControlLabel
                      value={!!pitch.runnerOnSecond}
                      name="runnerOnSecond"
                      onChange={handleChange}
                      control={<Switch />}
                      label="Runner on Second"
                    />
                    <FormControlLabel
                      value={!!pitch.runnerOnThird}
                      name="runnerOnThird"
                      onChange={handleChange}
                      control={<Switch />}
                      label="Runner on Third"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Outs
                    </FormLabel>
                    <RadioGroup
                      value={pitch.outs}
                      onChange={handleChange}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="0"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="1"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Strikes
                    </FormLabel>
                    <RadioGroup
                      name={"strikes"}
                      value={pitch.strikes}
                      onChange={handleChange}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="0"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="1"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Balls
                    </FormLabel>
                    <RadioGroup
                      name="balls"
                      value={pitch.balls}
                      onChange={handleChange}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="0"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="1"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Pitch Hand
                    </FormLabel>
                    <RadioGroup
                      name="pitchHand"
                      value={pitch.pitchHand}
                      onChange={handleChange}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Left"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Right"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" color="primary">
                Pitch
              </Button>
            </FormGroup>
          </form>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <pre>{JSON.stringify(pitch, null, 2)}</pre>

          <pre>{JSON.stringify(rawData, null, 2)}</pre>
          <Grid container display={"flex"} alignItems={"center"}>
            {/* <Grid item xs={12}>
            <LineChart
              width={730}
              height={250}
              data={data}
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
          </Grid> */}

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
                {/* <Bar dataKey="x" fill="#8884d8" /> */}
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
                {/* <Scatter name="B school" data={data02} fill="#82ca9d" /> */}
              </ScatterChart>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
