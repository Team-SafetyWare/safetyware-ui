import React, { useState } from "react";

import ControlPosition = google.maps.ControlPosition;
import { v4 as uuidV4 } from "uuid";
import { makeStyles } from "@mui/styles";

export interface LegendItem {
  color: string;
  text: string;
}

const useStyles = makeStyles({
  legend: {
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
  legendColor: {
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

  const styles = useStyles();

  return (
    <>
      <div id={elementId} className={styles.legend} hidden={props.hidden}>
        <p>Legend</p>
        {props.items?.map((item) => {
          return (
            <div key={`${item.color}-${item.text}`}>
              <p>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: item.color }}
                />
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
