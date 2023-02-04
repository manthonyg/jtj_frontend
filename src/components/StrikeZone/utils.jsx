export const gradientAngle = (
  cursorX,
  cursorY,
  elementX,
  elementY,
  width,
  height
) => {
  // Calculate the angle between the cursor and the center of the element using Math.atan2
  const angle = Math.atan2(
    cursorY - (elementY + height / 2),
    cursorX - (elementX + width / 2)
  );

  // Convert the angle from radians to degrees
  const angleDeg = (angle * 180) / Math.PI;

  const shiftedAngle = angleDeg + 180;
  return shiftedAngle;
};

export const orbitalGradient = (
  cursorX,
  cursorY,
  elementX,
  elementY,
  width,
  height,
  orbitRadius
) => {
  // Calculate the distance between the cursor and the center of the element
  const distance = Math.sqrt(
    Math.pow(cursorX - (elementX + width / 2), 2) +
      Math.pow(cursorY - (elementY + height / 2), 2)
  );
  // normalize the distance to the orbit radius range
  const normalizedDistance = distance / orbitRadius;
  // convert the normalized distance to degrees
  const angleDeg = normalizedDistance * 360;

  // modulo 360 to keep it within the range of 0-360
  const angleDegMod = angleDeg % 360;

  return angleDegMod;
};

export const shadeOfRed = (
  cursorX,
  cursorY,
  elementX,
  elementY,
  width,
  height,
  buffer
) => {
  // Calculate distance between cursor and center of element
  const distance =
    Math.sqrt(
      Math.pow(cursorX - (elementX + width / 2), 2) +
        Math.pow(cursorY - (elementY + height / 2), 2)
    ) - buffer;
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
};
