import { Radio } from "@mui/material";
import { styled } from "@mui/material/styles";

// const StyledRadio = styled(Radio)({
//   color: "#b6b6b6",
//   "&.Mui-checked": {
//     transform: "scale(1.2)",
//     color: "#3f51b5",
//   },
// });

export const PitchType = ({ imgSrc, ...rest }) => {
  return (
    <Radio
      checkedIcon={<img src={imgSrc} alt="pitch type" />}
      icon={<img src={imgSrc} alt="pitch type" />}
      {...rest}
    />
  );
};
