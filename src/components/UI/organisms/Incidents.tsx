import React from "react";
import { BarGraph } from "../atoms/BarGraph";
import { CustomAccordion } from "../atoms/CustomAccordion";
import { CustomBox } from "../molecules/CustomBox";

const data = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

const user = "PersonA";
const view = "User";
const incidentType = "All";
const startDate = new Date("01/01/2022");
const endDate = new Date("01/08/2022");

export const Incidents: React.FC = () => {
  return (
    <>
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Incidents Bar Graph"}
        component={<BarGraph data={data} />}
      />
      <CustomBox
        user={user}
        view={view}
        incidentType={incidentType}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};
