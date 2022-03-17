import { makeStyles } from "@mui/styles";

const OverlayStyles = makeStyles({
  parent: {
    position: "relative",
    height: "600px",
    zIndex: 0,
  },
  backdrop: {
    position: "absolute",
  },
});

export default OverlayStyles;
