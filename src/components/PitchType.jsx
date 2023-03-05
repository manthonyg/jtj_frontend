import { Radio } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledRadio = styled(Radio)({
  width: 100,
  borderRadius: 3,
  opacity: 0.5,
  "&:hover": {
    backgroundColor: "transparent",
    opacity: 1,
  },
  "&.Mui-checked": {
    opacity: 1,
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -20,
      margin: "0 auto",
      borderRadius: "50%",
      width: 10,
      height: 10,
      backgroundColor: "red",
    },
  },
});

export const PitchType = ({ imgSrc, ...rest }) => {
  return (
    <StyledRadio
      disableRipple
      checkedIcon={<img src={imgSrc} style={{ width: 100 }} alt="pitch type" />}
      icon={<img src={imgSrc} alt="pitch type" />}
      {...rest}
    />
  );
};
