import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
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
