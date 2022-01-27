import React from "react";
import { CustomAccordion } from "../atoms/CustomAccordion";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import { PageHeader } from "../atoms/PageHeader";
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
  return (
    <>
      <PageHeader
        pageTitle={"Locations"}
        pageDescription={"Description of the Locations and What it Does"}
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Travel History Trail"}
        component={<TravelHistoryTrail center={center} path={path} />}
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
