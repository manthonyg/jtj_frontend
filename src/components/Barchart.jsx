import React from "react";
import ResizableBox from "./ResizableBox";
import { Chart } from "react-charts";

import { useRecoilState } from "recoil";
import { pitchesState } from "../models/atoms";

export default function Bar({ data }) {
  const [pitches, setPitches] = useRecoilState(pitchesState);

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum?.pitch,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => parseInt(datum?.prediction),
        elementType: "bubble",
      },
    ],
    []
  );

  function getClosestHexValue(number) {
    let red, green, blue;
    if (number <= 0) {
      // If the number is less than or equal to 0, return pure blue
      red = 0;
      green = 0;
      blue = 255;
    } else if (number < 5) {
      // If the number is less than 5, return a shade of purple
      red = 128;
      green = 0;
      blue = 255 - Math.floor((number / 5) * 128);
    } else if (number < 10) {
      // If the number is less than 10, return a shade between red and blue
      red = 255 - Math.floor(((number - 5) / 5) * 128);
      green = 0;
      blue = Math.floor(((number - 5) / 5) * 255);
    } else {
      // If the number is greater than or equal to 10, return pure red
      red = 255;
      green = 0;
      blue = 0;
    }
    // Construct and return the hex value
    return (
      "#" +
      red.toString(16).padStart(2, "0") +
      green.toString(16).padStart(2, "0") +
      blue.toString(16).padStart(2, "0")
    );
  }

  return (
    <>
      <ResizableBox
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pitches.length > 0 && (
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              getDatumStyle: (datum) => {
                return {
                  circle: {
                    r: 5 + datum.originalDatum?.prediction * 1.5,
                    fill: getClosestHexValue(datum?.originalDatum?.prediction),
                    stroke: getClosestHexValue(
                      datum?.originalDatum?.prediction
                    ),
                  },
                };
              },
            }}
          />
        )}
      </ResizableBox>
    </>
  );
}
