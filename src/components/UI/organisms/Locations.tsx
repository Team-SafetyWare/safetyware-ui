import React from "react";
import useDocumentTitle from "../../../util/useDocumentTitle";
import AccidentDotMap from "../atoms/AccidentDotMap";
import { CustomAccordion } from "../atoms/CustomAccordion";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import { TravelHistoryTrail } from "../atoms/TravelHistoryTrail";

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

const path = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

export const Locations: React.FC = () => {
  useDocumentTitle("Blackline Safety | Locations");

  return (
    <>
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Travel History Trail"}
        component={<TravelHistoryTrail center={center} path={path} />}
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Accident Dot Map"}
        component={
          <AccidentDotMap accidents={path} center={center} zoom={10} />
        }
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Hazardous Area Heat Map"}
        component={
          <HazardousAreaHeatMap accidents={path} center={center} zoom={10} />
        }
      />
    </>
  );
};
