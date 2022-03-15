import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

interface DashboardSummaryTileProps {
  widgetName?: string;
  widget?: any;
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
  widgetInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  widgetName: {
    fontWeight: "bold",
    fontSize: "24px",
    margin: "12px 0px 12px 10px",
  },
  widgetButtons: {
    display: "flex",
  },
  removeButton: {
    marginRight: "10px",
  },
  filterButton: {},
  widget: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
});

export const DashboardWidgetTile: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.widgetTile}>
        <div className={styles.widgetInfo}>
          <p className={styles.widgetName}>{props.widgetName}</p>
          <div className={styles.widgetButtons}>
            <div className={styles.removeButton}>
              <BootstrapButton variant="outlined" endIcon={<RemoveIcon />}>
                Remove Widget
              </BootstrapButton>
            </div>
            <div className={styles.filterButton}>
              <BootstrapButton
                variant="outlined"
                endIcon={<FilterAltOutlinedIcon />}
              >
                Filter
              </BootstrapButton>
            </div>
          </div>
        </div>
        <div className={styles.widget}>{props.widget}</div>
      </div>
    </>
  );
};
