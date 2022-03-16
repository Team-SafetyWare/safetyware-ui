import { useQuery } from "@apollo/client";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../../index";
import {
  selectLocationPageEndDate,
  selectLocationPagePersonId,
  selectLocationPageStartDate,
} from "../../../store/slices/locationPageSlice";
import { useAppSelector } from "../../../store/store";
import theme from "../../../Theme";
import {
  GET_INCIDENTS_FOR_COMPANY,
  GET_INCIDENTS_FOR_PERSON,
  GET_COMPANY_LOCATIONS,
  GET_PERSON_LOCATIONS,
} from "../../../util/queryService";
import { CustomAccordion } from "../atoms/CustomAccordion";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import LocationsTable from "../atoms/LocationsTable";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBoxReduced } from "../molecules/CustomBoxReduced";
import { TravelMap } from "../molecules/TravelMap";
import { Filter } from "../molecules/FilterBar";
const center = {
  lat: 51.049999,
  lng: -114.1283,
};

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
    position: "fixed",
    right: 16,

    "&:hover": { backgroundColor: theme.palette.primary.light },
  },
});

export interface LocationReading {
  coordinates: {
    lat: number;
    lng: number;
  };
  personName: string;
  timestamp: Date;
}

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

export const locationPageLabel = "locationPage";

const accordionHeightInPixels = "600px";

export const Locations: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const user = getCurrentUser();

  const startDate = useAppSelector(selectLocationPageStartDate);
  const endDate = useAppSelector(selectLocationPageEndDate);
  const filterId = useAppSelector(selectLocationPagePersonId);

  const filter: Filter = {
    minTimestamp: startDate.empty ? undefined : new Date(startDate),
    maxTimestamp: startDate.empty ? undefined : new Date(startDate),
  };

  const { data: personIncidentData } = useQuery(GET_INCIDENTS_FOR_PERSON, {
    variables: {
      personId: filterId,
      filter: {
        minTimestamp: startDate !== "" ? new Date(startDate) : null,
        maxTimestamp: endDate !== "" ? new Date(endDate) : null,
      },
    },
  });

  const { data: companyIncidentsData } = useQuery(GET_INCIDENTS_FOR_COMPANY, {
    variables: {
      companyId: user?.company.id,
      filter: {
        minTimestamp: startDate !== "" ? new Date(startDate) : null,
        maxTimestamp: endDate !== "" ? new Date(endDate) : null,
      },
    },
  });

  const [incidents, setIncidents] = React.useState<any>([]);

  const { data: companyLocationReadingsData } = useQuery(
    GET_COMPANY_LOCATIONS,
    {
      variables: {
        companyId: user?.company.id,
        filter: {
          minTimestamp: startDate !== "" ? new Date(startDate) : null,
          maxTimestamp: endDate !== "" ? new Date(endDate) : null,
        },
      },
    }
  );

  const { data: personLocationReadingsData } = useQuery(GET_PERSON_LOCATIONS, {
    variables: {
      personId: filterId,
      filter: {
        minTimestamp: startDate !== "" ? new Date(startDate) : null,
        maxTimestamp: endDate !== "" ? new Date(endDate) : null,
      },
    },
  });

  const [locationReadings, setLocationReadings] = useState<any>([]);

  useEffect(() => {
    if (filterId !== "") {
      if (personIncidentData && personIncidentData.person !== null) {
        const incidents: any[] =
          personIncidentData.person.incidents
            .map((incident: any) => {
              return {
                coordinates: {
                  lng: incident.coordinates[0],
                  lat: incident.coordinates[1],
                },
                personName: personIncidentData.person.name,
                timestamp: new Date(incident.timestamp),
                type: incident.type,
              };
            })
            .flat() ?? [];
        setIncidents(incidents);
      }
    } else {
      const incidents: any[] =
        companyIncidentsData?.company.people
          .map((person: any) =>
            person.incidents.map((incident: any) => {
              return {
                coordinates: {
                  lng: incident.coordinates[0],
                  lat: incident.coordinates[1],
                },
                personName: person.name,
                timestamp: new Date(incident.timestamp),
                type: incident.type,
                companyName: companyIncidentsData.company.name,
              };
            })
          )
          .flat() ?? [];
      setIncidents(incidents);
    }
  }, [companyIncidentsData, personIncidentData, startDate, endDate, filterId]);

  useEffect(() => {
    if (filterId !== "") {
      if (
        personLocationReadingsData &&
        personLocationReadingsData.person !== null
      ) {
        const locationReadings: any[] =
          personLocationReadingsData.person.locationReadings
            .map((locationReading: any) => {
              return {
                coordinates: {
                  lat: locationReading.coordinates[1],
                  lng: locationReading.coordinates[0],
                },
                personName: personLocationReadingsData.person.name,
                timestamp: new Date(locationReading.timestamp),
              };
            })
            .flat() ?? [];

        setLocationReadings(locationReadings);
      }
    } else {
      const locationReadings: any[] =
        companyLocationReadingsData?.company.people
          .map((person: any) =>
            person.locationReadings.map((locationReading: any) => {
              return {
                coordinates: {
                  lat: locationReading.coordinates[1],
                  lng: locationReading.coordinates[0],
                },
                personName: person.name,
                timestamp: new Date(locationReading.timestamp),
              };
            })
          )
          .flat() ?? [];

      setLocationReadings(locationReadings);
    }
  }, [
    companyLocationReadingsData,
    personLocationReadingsData,
    startDate,
    endDate,
    filterId,
  ]);

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
              sectionTitle={"Locations Visualizations"}
              sectionDescription={
                "Visualize locations data through a travel trail and a heat map indicating incident frequency based on location."
              }
            />
            <CustomAccordion
              defaultExpanded={true}
              accordionHeight={accordionHeightInPixels}
              accordionWidth={""}
              accordionTitle={visualizations[1]}
              component={<TravelMap filter={filter} />}
            />
            <CustomAccordion
              accordionHeight={accordionHeightInPixels}
              accordionWidth={""}
              accordionTitle={visualizations[2]}
              component={
                <HazardousAreaHeatMap
                  accidents={incidents}
                  center={center}
                  zoom={10}
                />
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
              component={<LocationsTable locationReadings={locationReadings} />}
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
                <LocationsTable locationReadings={locationReadings} />
              </div>
            )}
            {visualization == visualizations[1] && (
              <div className={styles.visualization}>
                <TravelMap filter={filter} />
              </div>
            )}
            {visualization == visualizations[2] && (
              <div className={styles.visualization}>
                <HazardousAreaHeatMap
                  accidents={incidents}
                  center={center}
                  zoom={10}
                />
              </div>
            )}
          </>
        )}
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
            startDate={startDate}
            endDate={endDate}
            pageLabel={locationPageLabel}
          />
        </Modal>
      </>
    </StyledEngineProvider>
  );
};
