import React, { useState } from "react";

import ControlPosition = google.maps.ControlPosition;
import { v4 as uuidV4 } from "uuid";
import { makeStyles } from "@mui/styles";
import { Switch, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import theme from "../../../Theme";

export interface LegendItem {
  color: string;
  text: string;
}

const useStyles = makeStyles({
  container: {
    background: "rgb(255, 255, 255) none repeat scroll 0% 0% padding-box",
    border: "0px none",
    marginLeft: "10px",
    padding: "0px 17px",
    textTransform: "none",
    appearance: "none",
    cursor: "pointer",
    userSelect: "none",
    direction: "ltr",
    overflow: "hidden",
    verticalAlign: "middle",
    color: "rgb(86, 86, 86)",
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: "18px",
    borderBottomRightRadius: "2px",
    borderTopRightRadius: "2px",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
  },
  header: {
    display: "flex",
  },
  togglePadding: {
    width: "18px",
  },
  toggle: {
    margin: "auto 0 auto auto",
  },
  color: {
    height: "16px",
    width: "16px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "8px",
  },
});

interface MapLegendProps {
  items?: LegendItem[];
  map?: google.maps.Map;
  hidden?: boolean;
  defaultCollapsed?: boolean;
}

export const MapLegend: React.FC<MapLegendProps> = (props) => {
  const [elementId] = useState(uuidV4().toString());

  if (props.map) {
    const controls = props.map.controls[ControlPosition.LEFT_TOP];
    const legend = document.getElementById(elementId);
    if (!controls.getArray().includes(legend)) {
      controls.push(legend);
    }
  }

  const [toggle, setToggle] = useState<boolean | undefined>(undefined);
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const defaultExpanded =
    props.defaultCollapsed === undefined ? undefined : !props.defaultCollapsed;
  const expanded = toggle ?? defaultExpanded ?? largeScreen;

  const styles = useStyles();

  return (
    <>
      <div id={elementId} className={styles.container} hidden={props.hidden}>
        <div className={styles.header}>
          <p>Legend</p>
          <div className={styles.togglePadding} />
          <Switch
            className={styles.toggle}
            checked={expanded}
            onChange={(event) => setToggle(event.target.checked)}
          />
        </div>
        <Box sx={{ height: expanded ? undefined : 0, marginTop: "-18px" }}>
          {props.items?.map((item) => {
            return (
              <div key={`${item.color}-${item.text}`}>
                <p>
                  <span
                    className={styles.color}
                    style={{ backgroundColor: item.color }}
                  />
                  {item.text}
                </p>
              </div>
            );
          })}
        </Box>
      </div>
    </>
  );
};
