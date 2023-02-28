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

  // Clamp values to valid range of 0-255
  red = Math.max(0, Math.min(255, red));
  blue = Math.max(0, Math.min(255, blue));

  return `rgb(${red}, 0, ${blue})`;
};

export const getClosestHexValue = (number) => {
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
};
