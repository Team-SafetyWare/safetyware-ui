import { useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import {GET_INCIDENTS} from "../../../util/queryService";
import { BarGraph } from "../atoms/BarGraph";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import IncidentDotMap from "../atoms/IncidentDotMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBox } from "../molecules/CustomBox";

const barGraphData = [
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
const tempStartDate = new Date("01/01/2022");
const tempEndDate = new Date("01/08/2022");
const incidents = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

const useStyles = makeStyles({
  incidentsDropdown: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        display: "flex",
        justifyContent: "center",
        left: "50%",
        marginBottom: "20px",
        position: "absolute",
        top: "calc(0.5 * 60px)",
        transform: "translate(-50%, -50%)",
      },
  },

  visualization: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        height: "calc(100vh - 60px)",
        left: "0",
        position: "absolute",
        top: "60px",
        width: "100vw",
      },
  },
});

export interface IncidentReadings {
  coordinates: {
    lng: number;
    lat: number;
  };
  personName?: string;
  timestamp?: Date;
  type?: string;
  companyName?: string;
}

export const incidentPageLabel = "incidentPage";

export const Incidents: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const [incidents, updateIncidents] = useState<IncidentReadings[]>([]);
  const { loading, error, data } = useQuery(GET_INCIDENTS);

  useEffect(() => {
    updateIncidents([]);
    if (!loading && data) {
      console.log(data.incidents)
      data.incidents.map((incident: any) => {
        updateIncidents((incidents) => [
          ...incidents,
          {
            coordinates: {
              lng: incident.coordinates[0],
              lat: incident.coordinates[1],
            },
            personName: incident.person.name,
            timestamp: incident.timestamp,
            type: incident.type,
            companyName: incident.person.company.name,
          },
        ]);
      });
    }
  }, [loading, data]);

  const visualizations = [
    "Raw Incidents Data Table",
    "Incidents Dot Map",
    "Incidents Bar Graph",
  ];

  const [visualization, setVisualization] = useState(visualizations[0]);

  return (
    <>
      {matches ? (
        <>
          <PageHeader
            pageTitle={"Incidents"}
            pageDescription={
              "Description of the Incidents Page and What it Does"
            }
          />
          <PageSectionHeader
            sectionTitle={"Raw Incidents Data"}
            sectionDescription={"Explore and Download Raw Incidents Data"}
            download={true}
          />
          <CustomAccordion
            accordionHeight={"auto"}
            accordionWidth={""}
            accordionTitle={visualizations[0]}
            component={<CustomCollapsibleTable />}
          />
          <PageSectionHeader
            sectionTitle={"Incidents Visualizations"}
            sectionDescription={"Visualize Incidents Data"}
            download={false}
          />
          <CustomAccordion
            accordionHeight={"400px"}
            accordionWidth={""}
            accordionTitle={visualizations[1]}
            component={
              <IncidentDotMap incidents={incidents} center={center} zoom={10} />
            }
          />
          <CustomAccordion
            accordionHeight={"400px"}
            accordionWidth={""}
            accordionTitle={visualizations[2]}
            component={<BarGraph data={barGraphData} />}
          />
          <CustomBox
            user={user}
            view={view}
            incidentType={incidentType}
            startDate={tempStartDate}
            endDate={tempEndDate}
            pageLabel={incidentPageLabel}
          />
        </>
      ) : (
        <>
          <div className={styles.incidentsDropdown}>
            <VisualizationSelect
              visualizations={visualizations}
              setVisualization={setVisualization}
            />
          </div>
          {visualization == visualizations[0] && (
            <div className={styles.visualization}>
              <CustomCollapsibleTable />
            </div>
          )}
          {visualization == visualizations[1] && (
            <div className={styles.visualization}>
              <IncidentDotMap incidents={incidents} center={center} zoom={10} />
            </div>
          )}
          {visualization == visualizations[2] && (
            <div className={styles.visualization}>
              <BarGraph data={barGraphData} />
            </div>
          )}
        </>
      )}
    </>
  );
};
