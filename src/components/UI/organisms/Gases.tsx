import React from "react";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import { GasesDotMap } from "../atoms/GasesDotMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";

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
      <PageSectionHeader
        sectionTitle={"Raw Gases Data"}
        sectionDescription={"Explore and Download Raw Gases Data"}
        download={true}
      />
      <CustomAccordion
        accordionHeight={"auto"}
        accordionWidth={""}
        accordionTitle={"Raw Gases Data Table"}
        component={<CustomCollapsibleTable />}
      />
      <PageSectionHeader
        sectionTitle={"Gas Visualizations"}
        sectionDescription={"Visualize Gas Data Based on Location"}
        download={false}
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
