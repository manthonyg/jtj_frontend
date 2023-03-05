import { useEffect, useRef } from "react";
import { useTrail, animated } from "@react-spring/web";
import { styled } from "@mui/system";
import { useGesture } from "react-use-gesture";
import PubSub from "pubsub-js";
import { useState } from "react";
import { StrikeBox } from "./StrikeBox";
import { Ball } from "./Ball";

const Container = styled(animated.div)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  zIndex: 9,
  gap: 5,
  width: 400,
  height: 350,
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

  return (
    <div>
      <Container ref={domRef}>
        <Ball />
        {trail.map(({ rotateX, x, y }, zone) => {
          return <StrikeBox style={{ x, rotateX }} zone={strikeZones[zone]} />;
        })}
      </Container>
    </div>
  );
};
