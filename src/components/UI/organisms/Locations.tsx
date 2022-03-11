import { useQuery } from "@apollo/client";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { GET_LOCATIONS } from "../../../util/queryService";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { TravelHistoryTrail } from "../atoms/TravelHistoryTrail";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBoxReduced } from "../molecules/CustomBoxReduced";
import { getCurrentUser } from "../../../index";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import theme from "../../../Theme";

const center = {
  lat: 51.049999,
  lng: -114.1283,
};
const view = "User";
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

  filterButton: {
    backgroundColor: theme.palette.primary.main,
    bottom: 16,
    color: "white",
    position: "absolute",
    right: 16,
  },
});

export const locationPageLabel = "locationPage";

export const Locations: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const user = getCurrentUser();
  const { data: locationsData } = useQuery(GET_LOCATIONS, {
    variables: { companyId: user?.company.id },
  });

  const people =
    (locationsData &&
      Array.from(locationsData.company.people).sort((p1: any, p2: any) =>
        p1.name > p2.name ? 1 : -1
      )) ??
    [];

  const locations: any[] = people
    .map((person: any) =>
      person.locationReadings.map((location: any) => {
        return {
          coordinates: {
            lng: location.coordinates[0],
            lat: location.coordinates[1],
          },
          timestamp: location.timestamp,
        };
      })
    )
    .flat();

  const travelData: any[] = people.map((person: any) => {
    return {
      name: person.name,
      segments: [
        person.locationReadings.map((location: any) => {
          return {
            lng: location.coordinates[0],
            lat: location.coordinates[1],
            timestamp: location.timestamp,
          };
        }),
      ],
    };
  });

  const visualizations = [
    "Raw Locations Data Table",
    "Travel History Trail",
    "Hazardous Area Heat Map",
  ];

  const [visualization, setVisualization] = useState(visualizations[0]);

  const [openFilterbox, setOpenFilterbox] = useState(false);
  const handleOpenFilterBox = () => setOpenFilterbox(true);
  const handleCloseFilterBox = () => setOpenFilterbox(false);

  return (
    <StyledEngineProvider injectFirst>
      <>
        {matches ? (
          <>
            <PageHeader
              pageTitle={"Locations"}
              pageDescription={
                "Analyze data based on locations including a travel history trail and a heat map of common incident locations."
              }
            />
            <PageSectionHeader
              sectionTitle={"Raw Locations Data"}
              sectionDescription={
                "Explore raw locations data through a date-filtered data table."
              }
            />
            <CustomAccordion
              accordionHeight={"auto"}
              accordionWidth={""}
              accordionTitle={visualizations[0]}
              component={<CustomCollapsibleTable />}
            />
            <PageSectionHeader
              sectionTitle={"Locations Visualizations"}
              sectionDescription={
                "Visualize locations data through a travel trail and a heat map indicating incident frequency based on location."
              }
            />
            <CustomAccordion
              accordionHeight={"400px"}
              accordionWidth={""}
              accordionTitle={visualizations[1]}
              component={
                <TravelHistoryTrail center={center} data={travelData} />
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
            <IconButton
              className={styles.filterButton}
              onClick={handleOpenFilterBox}
              size="large"
            >
              <FilterAltIcon fontSize="inherit" />
            </IconButton>
            <Modal
              open={openFilterbox}
              onClose={handleCloseFilterBox}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <CustomBoxReduced
                user={user}
                view={view}
                startDate={startDate}
                endDate={endDate}
                pageLabel={locationPageLabel}
              />
            </Modal>
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
                <TravelHistoryTrail center={center} data={travelData} />
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
    </StyledEngineProvider>
  );
};
