import { useRef, useState, useEffect } from "react";
import { useTrail, useSpring, animated, to } from "@react-spring/web";
import { styled } from "@mui/system";
import { useHover, useMove, useGesture, useDrag } from "react-use-gesture";
import PubSub from "pubsub-js";

const BallContainer = styled(animated.div)({
  width: "50px",
  height: "50px",
  backgroundColor: "white",
  backgroundSize: "cover",
  backgroundImage: `url('/ball.png')`,
  borderRadius: "50%",
  boxShadow: "2px 2px 5px #888888",
  position: "absolute",
  cursor: "grab",
  zIndex: 999,
});

export const Ball = () => {
  const [strikeZoneBounds, setStrikeZoneBounds] = useState(null);
  console.log("ok");
  useEffect(() => {
    const token = PubSub.subscribe("strike-zone-bounds", (msg, bounds) => {
      setStrikeZoneBounds(bounds);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, offset: [ox, oy], xy: [x, y], event: { clientX, clientY } }) => {
      PubSub.publish("ball-position", { x: x, y: y });
      api.start({ x: ox, y: oy });
    },
    {
      bounds: {
        // left: strikeZoneBounds?.left - 100,
        // right: strikeZoneBounds?.right - 100,
        // top: strikeZoneBounds?.top - 100,
        // bottom: strikeZoneBounds?.bottom - 100,
      },
      rubberband: true,
    }
  );
  return <BallContainer {...bind()} style={{ x, y }} />;
};
