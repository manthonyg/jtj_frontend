import { LegendThreshold } from "@vx/legend";
import { scaleThreshold } from "@vx/scale";

const threshold = scaleThreshold({
  domain: [2, 3.5, 4.0, 4.5, 5],
  range: ["#8000f8", "#8000d1", "#8000b6", "#80008e", "#d2005b", "#ff0000"],
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
