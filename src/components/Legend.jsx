import { LegendThreshold } from "@vx/legend";
import { scaleThreshold } from "@vx/scale";

const threshold = scaleThreshold({
  domain: [0.02, 0.04, 0.06, 0.08, 0.1],
  range: [
    "#f2f0f7",
    "#dadaeb",
    "#bcbddc",
    "#9e9ac8",
    "#756bb1",
    "rgb(169, 0, 86)",
  ],
});

export default function Legend() {
  return (
    <LegendThreshold
      scale={threshold}
      direction="column-reverse"
      itemDirection="row-reverse"
      labelMargin="0 20px 0 0"
      shapeMargin="1px 0 0"
    />
  );
}
