import { GoogleMap, Polyline } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import ControlPosition = google.maps.ControlPosition;
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';

interface TravelHistoryTrailProps {
  center?: any;
  data: any;
}
export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
  props
) => {
  const segments = props.data
    .map((person: any) => {
      return person.segments
        .map((segment: any) => {
          return {
            path: segment,
            color: person.color,
          };
        })
        .flat();
    })
    .flat();
  const center = props.center;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const [showLegend, setShowLegend] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress size={200} />
      </Backdrop>
      <div
        id={"travel-legend"}
        hidden={!showLegend}
        style={{
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
        }}
      >
        <p>Legend</p>
        {props.data.map((person: any) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <p>
              <span
                style={{
                  height: "16px",
                  width: "16px",
                  backgroundColor: person.color,
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
              />
              {person.name}
            </p>
          </div>
        ))}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={{ gestureHandling: "greedy" }}
        onLoad={(map) => {
          setLoading(true);
          const controls = map.controls[ControlPosition.LEFT_TOP];
          const legend = document.getElementById("travel-legend");
          controls.push(legend);
        }}
        onTilesLoaded={() => {
          setShowLegend(true);
          setLoading(false);
        }}
      >
        {segments.map((segment: any) => (
          // eslint-disable-next-line react/jsx-key
          <Polyline
            path={segment.path}
            options={{
              strokeColor: segment.color,
              strokeOpacity: 1,
              strokeWeight: 3,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};
