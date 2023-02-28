import { atom } from "recoil";

export const pitchesState = atom({
  key: "pitches", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const pitchState = atom({
  key: "pitch", // unique ID (with respect to other atoms/selectors)
  default: {
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
    homeTeam: {
      logo: "https://content.mlb.com/documents/7/7/4/267274774/116.svg",
      name: "Tigers",
      abbreviation: "DET",
      colors: {
        primary: "#0C2340",
        secondary: "#FA4616",
      },
    },
    awayTeam: {
      logo: "http://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/nyy.png&h=150&w=150",
      name: "Yankees",
      abbreviation: "NYY",
      colors: {
        primary: "#003087",
        secondary: "#FFFFFF",
      },
    },
    homeScore: 0,
    awayScore: 0,
    prediction: 0,
  }, // default value (aka initial value)
});
