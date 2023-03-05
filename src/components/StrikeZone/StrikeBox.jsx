import { useRef, useState, useEffect } from "react";
import { useTrail, useSpring, animated, to } from "@react-spring/web";
import { styled } from "@mui/system";
import { useHover, useMove, useGesture } from "react-use-gesture";
import PubSub from "pubsub-js";
import { gradientAngle, orbitalGradient, shadeOfRed } from "./utils";

const FrontBox = styled(animated.div)({
  position: "relative",
  width: "100px",
  height: "112.5px",
  color: "#ffffff",
  borderRadius: 5,
  boxSizing: "border-box",
  border: "2px solid #00000050",
  willChange: "transform",
  overflow: "hidden",
  touchAction: "none",
});

export const StrikeBox = ({ zone }) => {
  const [_rotateX, setRotateX] = useState(0);
  const [_rotateY, setRotateY] = useState(0);
  const [_pos, _setPos] = useState({ x: 0, y: 0 });
  const [_perspective, setPerspective] = useState(1000);
  const [_scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [gradient, setGradient] = useState(0);
  const [_gradientAngle, setGradientAngle] = useState(0);
  const [_orbitalGradient, setOrbitalGradient] = useState(0);
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
  }, [ref, _pos]);

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, hoverApi] =
    useSpring(() => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 3, tension: 150, friction: 5 },
    }));

  const tiltEffectSettings = {
    max: 20, // max tilt rotation (degrees (deg))
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

    setRotateX(rotateX);
    setRotateY(rotateY);

    const isCursor = isCursorInBounds(
      x,
      y,
      cardLeft,
      cardTop,
      cardWidth,
      cardHeight,
      50
    );

    const gradientAngleOf = gradientAngle(
      x,
      y,
      cardLeft,
      cardTop,
      cardWidth,
      cardHeight
    );

    const calculatedGradient = shadeOfRed(
      x,
      y,
      cardLeft,
      cardTop,
      cardWidth,
      cardHeight,
      100
    );

    setGradient(calculatedGradient);
    setIsHovered(isCursor);
    setGradientDirection(gradientDirection);

    if (isCursor) {
      PubSub.publish("zoneSelected", zone);
      return hoverApi({
        x,
        y,
        rotateX: rotateX,
        rotateY: rotateY,
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
    onPinch: ({ offset: [d, a] }) => hoverApi({ zoom: d / 200, rotateZ: a }),
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
    onDrag: ({ down, movement: [mx, my] }) => {
      return (
        down &&
        hoverApi({
          rotateX: _rotateX,
          rotateY: _rotateY,
          scale: 1,
        })
      );
    },
    onHover: ({ hovering }) => {
      hovering &&
        hoverApi({
          rotateX: _rotateX,
          rotateY: _rotateY,
          scale: 1,
        });
    },
  });
  return (
    <FrontBox
      ref={ref}
      {...bind()}
      onMouseLeave={mouseLeave}
      style={{
        transform: "perspective(600px)",
        transition: "opacity 0.5s ease",
        scale: 1,
        rotateX: to([rotateX, rotateZ], (r, z) => `${-r}deg`),
        rotateY: to([rotateY, rotateZ], (r, z) => `${-r}deg`),
        rotateZ,
        opacity: 1,
        background: isHovered ? gradient : "#3c52c3",
      }}
    >
      <p
        {...bind()}
        style={{
          opacity: isHovered ? 1 : 0,
          transform: "perspective(600px)",
          rotateX,
          rotateY,
          rotateZ,
          scale: 5,
        }}
      >
        {zone}
      </p>
    </FrontBox>
  );
};
