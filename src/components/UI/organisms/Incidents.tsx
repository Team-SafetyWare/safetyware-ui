import { useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import theme from "../../../Theme";
import { GET_LOCATIONS } from "../../../util/queryService";
import { BarGraph } from "../atoms/BarGraph";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import IncidentDotMap from "../atoms/IncidentDotMap";
import { IncidentsSelect } from "../atoms/IncidentsSelect";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
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
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
  },
});

export interface LocationReading {
  coordinates: {
    lng: number;
    lat: number;
  };
  name?: string;
  date?: Date;
}

export const incidentDotMapLabel = "incidentDotMap";

export const Incidents: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const styles = useStyles();

  const [locations, updateLocations] = useState<LocationReading[]>([]);
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  useEffect(() => {
    updateLocations([])
    if (!loading && data) {
      data.locationReadings.map((location: any) => {
        updateLocations((locations) => [
          ...locations,
          {
            coordinates: {
              lng: location.coordinates[0],
              lat: location.coordinates[1],
            },
            name: location.person.name,
            date: location.timestamp
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
              <IncidentDotMap incidents={locations} center={center} zoom={10} />
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
            pageLabel={incidentDotMapLabel}
          />
        </>
      ) : (
        <>
          <div className={styles.incidentsDropdown}>
            <IncidentsSelect
              visualizations={visualizations}
              setVisualization={setVisualization}
            />
          </div>
          {visualization == visualizations[0] && <CustomCollapsibleTable />}
          {visualization == visualizations[1] && (
            <IncidentDotMap incidents={locations} center={center} zoom={10} />
          )}
          {visualization == visualizations[2] && (
            <BarGraph data={barGraphData} />
          )}
        </>
      )}
    </>
  );
};
