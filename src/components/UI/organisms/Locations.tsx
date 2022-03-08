import { useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { GET_LOCATIONS } from "../../../util/queryService";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import {
  TravelHistoryPoint,
  TravelHistoryTrail,
} from "../atoms/TravelHistoryTrail";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBoxReduced } from "../molecules/CustomBoxReduced";
import { IncidentReadings } from "./Incidents";

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

const path = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const user = "PersonA";
const view = "User";
const incidentType = "All";
const startDate = new Date("01/01/2022");
const endDate = new Date("01/08/2022");

const useStyles = makeStyles({
  locationsDropdown: {
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

export const locationPageLabel = "locationPage";

export const Locations: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const [locations, updateLocations] = React.useState<IncidentReadings[]>([]);
  const [travelTrail, updateTravelTrail] = React.useState<TravelHistoryPoint[]>(
    []
  );
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  useEffect(() => {
    updateLocations([]);
    if (!loading && data) {
      data.locationReadings.map((location: any) => {
        updateLocations((locations) => [
          ...locations,
          {
            coordinates: {
              lng: location.coordinates[0],
              lat: location.coordinates[1],
            },
            timestamp: location.timestamp,
          },
        ]);
        updateTravelTrail((travelTrail) => [
          ...travelTrail,
          {
            lat: location.coordinates[1],
            lng: location.coordinates[0],
            timestamp: location.timestamp,
          },
        ]);
      });
    }
  }, [loading, data]);

  const visualizations = [
    "Raw Locations Data Table",
    "Travel History Trail",
    "Hazardous Area Heat Map",
  ];

  const [visualization, setVisualization] = useState(visualizations[0]);

  return (
    <>
      {matches ? (
        <>
          <PageHeader
            pageTitle={"Locations"}
            pageDescription={
              "Description of the Locations Page and What it Does"
            }
          />
          <PageSectionHeader
            sectionTitle={"Raw Locations Data"}
            sectionDescription={"Explore Raw Locations Data"}
          />
          <CustomAccordion
            accordionHeight={"auto"}
            accordionWidth={""}
            accordionTitle={visualizations[0]}
            component={<CustomCollapsibleTable />}
          />
          <PageSectionHeader
            sectionTitle={"Locations Visualizations"}
            sectionDescription={"Visualize Locations Data"}
          />
          <CustomAccordion
            accordionHeight={"400px"}
            accordionWidth={""}
            accordionTitle={visualizations[1]}
            component={
              <TravelHistoryTrail center={center} path={travelTrail} />
            }
          />
          <CustomAccordion
            accordionHeight={"400px"}
            accordionWidth={""}
            accordionTitle={visualizations[2]}
            component={
              <HazardousAreaHeatMap
                accidents={locations}
                center={center}
                zoom={10}
              />
            }
          />
          <CustomBoxReduced
            user={user}
            view={view}
            startDate={startDate}
            endDate={endDate}
            pageLabel={locationPageLabel}
          />
        </>
      ) : (
        <>
          <div className={styles.locationsDropdown}>
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
              <TravelHistoryTrail center={center} path={travelTrail} />
            </div>
          )}
          {visualization == visualizations[2] && (
            <div className={styles.visualization}>
              <HazardousAreaHeatMap
                accidents={locations}
                center={center}
                zoom={10}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
