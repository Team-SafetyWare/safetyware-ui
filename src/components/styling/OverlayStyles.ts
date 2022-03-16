import { makeStyles } from "@mui/styles";

const OverlayStyles = makeStyles({
  parent: {
    position: "relative",
    height: "575px",
    zIndex: 0,
  },
  backdrop: {
    position: "absolute",
  },
});

export default OverlayStyles;
