import { useRef, useState, useEffect } from "react";
import { useTrail, useSpring, animated, to } from "@react-spring/web";
import { styled } from "@mui/system";
import { useHover, useMove, useGesture } from "react-use-gesture";
import PubSub from "pubsub-js";
import Grid from "@mui/material/Grid";

const Box = styled(animated.div)({
  position: "relative",
  zIndex: -1,
  width: "400px",
  height: "400px",
  margin: 5,
  opacity: 0.5,
  boxShadow: "5px 5px 20px #ffffff50, -5px -5px 20px #ffffff50",
  transition: "box-shadow 0.5s, opacity 0.5s",
  willChange: "transform",
  cursor: "grab",
  overflow: "hidden",
  touchAction: "none",
});

const strikeZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const BallBox = ({ zone }) => {
  const [_rotateX, setRotateX] = useState(0);
  const [_rotateY, setRotateY] = useState(0);
  const [_pos, _setPos] = useState({ x: 0, y: 0 });
  const [_perspective, setPerspective] = useState(1000);
  const [_scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [gradient, setGradient] = useState(0);
  const [gradientDirection, setGradientDirection] = useState("none");

  const ref = useRef(null);
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    const token = PubSub.subscribe("ball-position", (msg, { x, y }) => {
      _setPos({ x, y });
      mouseEnter({ x, y });
    });
    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
      PubSub.unsubscribe(token);
    };
  }, [ref]);

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, hoverApi] =
    useSpring(() => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 1000, friction: 40 },
    }));

  const tiltEffectSettings = {
    max: 25, // max tilt rotation (degrees (deg))
    perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1.0, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)", // easing (transition-timing-function) of the enter/exit transition
  };

  const isCursorInBounds = (
    cursorX,
    cursorY,
    elementX,
    elementY,
    elementWidth,
    elementHeight,
    buffer
  ) => {
    return (
      cursorX >= elementX - buffer &&
      cursorX <= elementX + elementWidth + buffer &&
      cursorY >= elementY - buffer &&
      cursorY <= elementY + elementHeight + buffer
    );
  };

  const getGradientDirection = (
    ballX,
    ballY,
    gridX,
    gridY,
    gridWidth,
    gridHeight
  ) => {
    let direction = "";
    if (ballX < gridX + gridWidth / 3) {
      direction += "left ";
    } else if (ballX > gridX + (gridWidth / 3) * 2) {
      direction += "right ";
    }

    if (ballY < gridY + gridHeight / 3) {
      direction += "top ";
    } else if (ballY > gridY + (gridHeight / 3) * 2) {
      direction += "bottom ";
    }

    if (direction === "top " || direction === "bottom ") {
      direction += "bottom ";
    } else if (direction === "left " || direction === "right ") {
      direction += "right ";
    }

    return direction;
  };

  const mouseEnter = ({ x, y }) => {
    const card = ref.current;
    const cardWidth = card.getBoundingClientRect().width;
    const cardHeight = card.getBoundingClientRect().height;
    const cardLeft = card.getBoundingClientRect().left;
    const cardTop = card.getBoundingClientRect().top;
    const centerX = card.getBoundingClientRect().left + cardWidth / 2;
    const centerY = card.getBoundingClientRect().top + cardHeight / 2;
    const mouseX = x - centerX;
    const mouseY = y - centerY;
    const rotateXUncapped =
      (+1 * tiltEffectSettings.max * mouseY) / (cardHeight / 2 + 100);
    const rotateYUncapped =
      (-1 * tiltEffectSettings.max * mouseX) / (cardWidth / 2 + 100);
    const rotateX =
      rotateXUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateXUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateXUncapped;
    const rotateY =
      rotateYUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateYUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateYUncapped;

    console.log({ rotateX, rotateY });
    setRotateX(rotateX);
    setRotateY(rotateY);

    const isCursor = isCursorInBounds(
      x,
      y,
      cardLeft,
      cardTop,
      cardWidth,
      cardHeight,
      100
    );

    function shadeOfRed(
      cursorX,
      cursorY,
      elementX,
      elementY,
      width,
      height,
      buffer
    ) {
      // Calculate distance between cursor and center of element
      const distance = Math.sqrt(
        Math.pow(cursorX - (elementX + width / 2), 2) +
          Math.pow(cursorY - (elementY + height / 2), 2)
      );
      let red, blue;
      // Normalize distance to a value between 0 and 1
      const normalizedDistance =
        distance / (Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2);

      // Calculate the RGB values
      red = Math.round(255 * (1 - normalizedDistance));
      blue = Math.round(255 * normalizedDistance);

      // // Clamp values to valid range of 0-255
      red = Math.max(0, Math.min(255, red));
      blue = Math.max(0, Math.min(255, blue));

      return `rgb(${red}, 0, ${blue})`;
    }

    const gradientDirection = getGradientDirection(
      x,
      y,
      cardWidth,
      cardHeight,
      cardWidth * 3,
      cardHeight * 3
    );

    const calculatedGradient = shadeOfRed(
      x + cardLeft / 6,
      y + cardTop / 6,
      cardLeft,
      cardTop,
      cardWidth,
      cardHeight,
      300
    );

    setGradient(calculatedGradient);

    setIsHovered(isCursor);

    if (isCursor) {
      setGradientDirection(gradientDirection);
      return hoverApi({
        x,
        y,
        rotateX: 0,
        rotateY: 0,
        scale: 1.0,
      });
    } else {
      return hoverApi({
        x,
        y,
        rotateX: 0,
        rotateY: 0,
        scale: 1.0,
      });
    }
  };

  const mouseLeave = (event) => {
    setRotateX(0);
    setRotateY(0);
    setPerspective(0);
    setScale(1);
  };

  const bind = useGesture({
    // onDrag: ({ active, offset: [x, y] }) =>
    // api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
    // onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
    onMove: ({ xy: [px, py], dragging }) => {
      return (
        !dragging &&
        hoverApi({
          rotateX: _rotateX,
          rotateY: _rotateY,
          scale: 1,
        })
      );
    },
    onHover: ({ hovering }) => {
      return !hovering && hoverApi({ rotateX: 0, rotateY: 0, scale: 1 });
    },
  });
  return (
    <Box
      ref={ref}
      {...bind()}
      onMouseLeave={mouseLeave}
      onClick={() => console.log("clicked")}
      style={{
        transform: "perspective(600px)",
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX: to([rotateX, rotateZ], (r, z) => `${-r}deg`),
        rotateY: to([rotateY, rotateZ], (r, z) => `${-r}deg`),
        rotateZ,
      }}
    ></Box>
  );
};
