import { makeStyles } from "@mui/styles";
import React from "react";
import { CustomAccordion } from "./UI/atoms/CustomAccordion";
import { TravelHistoryTrail } from "./UI/atoms/TravelHistoryTrail";

const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
    marginLeft: "300px",
  },
});

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

const path = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

export const Locations: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.placeholderDiv}>
      <h1>Locations</h1>
      {/* <AccidentDotMap /> */}

      <CustomAccordion
        accordionTitle={"Travel History Trail"}
        component={<TravelHistoryTrail center={center} path={path} />}
      />
    </div>
  );
};
