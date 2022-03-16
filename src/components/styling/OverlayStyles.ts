import { makeStyles } from "@mui/styles";

const OverlayStyles = makeStyles({
  parent: {
    position: "relative",
    height: "575px",
    zIndex: 0,
  },
  parentTable: {
    position: "relative",
    // edit this for the raw data table empty
    height: "575px",
    zIndex: 0,
  },
  backdrop: {
    position: "absolute",
  },
});

export default OverlayStyles;
