import React from "react";
import { CustomAccordion } from "../atoms/CustomAccordion";
import GasesDotMap from "../atoms/GasesDotMap";
import { PageHeader } from "../atoms/PageHeader";

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
      <PageHeader
        pageTitle={"Gases"}
        pageDescription={"Description of the Gases Page and What it Does"}
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Gases"}
        component={<GasesDotMap gases={gases} center={center} zoom={10} />}
      />
    </>
  );
};
