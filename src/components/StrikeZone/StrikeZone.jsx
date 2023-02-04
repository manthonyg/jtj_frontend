import { useEffect, useRef } from "react";
import { useTrail, useSpring, animated, to } from "@react-spring/web";
import { styled } from "@mui/system";
import { useHover, useMove, useGesture } from "react-use-gesture";
import PubSub from "pubsub-js";
import { useState } from "react";
import { StrikeBox } from "./StrikeBox";
import { BallBox } from "./BallBox";
import { Ball } from "./Ball";
import { gradientAngle, orbitalGradient } from "./utils";
import { SettingsPowerSharp } from "@mui/icons-material";
import { createDocumentRegistry } from "typescript";
import Legend from "../Legend";
import Box from "@mui/material/Box";

const Container = styled(animated.div)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  zIndex: 9,
  gap: 15,
  width: 630,
  height: 670,
  transform: "scale(0.8)",
  flexDirection: "row",
  justifyContent: "center",
});

const strikeZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const StrikeZone = () => {
  const [zone, setZone] = useState(null);
  const [_pos, setPos] = useState({ x: 0, y: 0 });

  const domRef = useRef(null);

  useEffect(() => {
    const token = PubSub.subscribe("zoneSelected", (msg, data) => {
      console.log({ msg, data });
      setZone(data);
    });

    const token2 = PubSub.subscribe("ball-position", (msg, { x, y }) => {
      setPos({ x, y });
    });

    if (domRef.current) {
      PubSub.publish(
        "strike-zone-bounds",
        domRef.current.getBoundingClientRect()
      );
    }

    return () => {
      PubSub.unsubscribe(token);
      PubSub.unsubscribe(token2);
    };
  }, []);

  const [trail, api] = useTrail(
    strikeZones.length,
    ({ x, y, rotateX, rotateY }) => ({
      rotateX,
      x,
      y,
    })
  );

  const handleWave = ({ x, y }) => {
    console.log("handle wwave");
    api.start({
      rotateX: 180,
      x: x + 50,
      y: 50,
    });
  };

  return (
    <Container ref={domRef}>
      <Ball />

      {trail.map(({ rotateX, x, y }, zone) => {
        return <StrikeBox style={{ x, rotateX }} zone={strikeZones[zone]} />;
      })}
      <Box
        style={{
          width: 500,
          border: "2px solid #cccccc",
          borderRadius: 10,
          margin: 10,
          padding: 10,
        }}
      >
        <Legend />
      </Box>
    </Container>
  );
};
