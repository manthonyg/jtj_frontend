import { Radio } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledRadio = styled(Radio)({
  width: 100,
  borderRadius: 3,
  opacity: 0.5,
  "&:hover": {
    transform: "scale(1.2)",
    backgroundColor: "transparent",
    // boxShadow: `19px 19px 39px #0d0d0d,
    //          -19px -19px 39px #353535`,
    opacity: 1,
  },
  // "&$checked": {
  //   color: "primary",
  //   border: "2px solid black",
  // },
  "&.Mui-checked": {
    // boxShadow: `19px 19px 39px #0d0d0d,
    //          -19px -19px 39px #353535`,
    transform: "scale(1.1)",
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
      // border: "2px solid #0000ff",
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
