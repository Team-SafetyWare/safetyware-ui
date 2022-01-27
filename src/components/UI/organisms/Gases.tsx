import React from "react";
import { CustomAccordion } from "../atoms/CustomAccordion";
import GasesDotMap from "../atoms/GasesDotMap";

const gases = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

export const Gases: React.FC = () => {
  return (
    <>
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Gases"}
        component={<GasesDotMap gases={gases} center={center} zoom={10} />}
      />
    </>
  );
};
