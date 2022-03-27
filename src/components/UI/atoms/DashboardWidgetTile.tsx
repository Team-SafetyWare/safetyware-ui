import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { keyframes, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

interface DashboardSummaryTileProps {
  widget?: any;
  removeWidget?: any;
  editDashboardMode?: any;
}

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  padding: "6px 12px",
  border: ".5px solid",
  borderColor: "black",
  color: "black",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});

const useStyles = makeStyles({
  widgetTile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "400px",
    width: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0px 16px 16px 16px",
  },
  widgetTileAnimated: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "400px",
    width: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0px 16px 16px 16px",
    animation: "$shake .25s infinite",
  },
  widgetInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  widgetName: {
    fontWeight: "bold",
    fontSize: "24px",
    margin: "12px 0px 12px 8px",
  },
  removeButton: {},
  widget: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  "@keyframes shake": {
    "0%": { transform: "translate(0px, 0px) rotate(.25deg)" },
    "50%": { transform: "translate(0px, 0px) rotate(-.25deg) " },
  },
});

export const DashboardWidgetTile: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();

  return (
    <>
      <div
        className={
          props.editDashboardMode
            ? styles.widgetTileAnimated
            : styles.widgetTile
        }
      >
        <div className={styles.widgetInfo}>
          <p className={styles.widgetName}>{props.widget.widgetName}</p>
          {props.editDashboardMode && (
            <div className={styles.removeButton}>
              <BootstrapButton
                variant="outlined"
                endIcon={<RemoveIcon />}
                onClick={() => props.removeWidget(props.widget)}
              >
                Remove Widget
              </BootstrapButton>
            </div>
          )}
        </div>
        {props.widget.widget}
      </div>
    </>
  );
};
