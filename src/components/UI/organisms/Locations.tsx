import { useQuery } from "@apollo/client";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getCurrentUser, PEOPLE_COLORS } from "../../../index";
import {
  selectLocationPageEndDate,
  selectLocationPagePersonId,
  selectLocationPageStartDate,
} from "../../../store/slices/locationPageSlice";
import { useAppSelector } from "../../../store/store";
import theme from "../../../Theme";
import {
  GET_COMPANY_LOCATIONS,
  GET_PERSON_LOCATIONS,
} from "../../../util/queryService";
import { CustomAccordion } from "../atoms/CustomAccordion";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import LocationsTable from "../atoms/LocationsTable";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { TravelHistoryTrail } from "../atoms/TravelHistoryTrail";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBoxReduced } from "../molecules/CustomBoxReduced";

const TRAIL_SPLIT_MS = 10 * 60 * 1000;

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

export const locationPageLabel = "locationPage";

const accordionHeightInPixels = "600px";

export const Locations: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const user = getCurrentUser();

  const startDate = useAppSelector(selectLocationPageStartDate);
  const endDate = useAppSelector(selectLocationPageEndDate);
  const filterId = useAppSelector(selectLocationPagePersonId);

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
  const [people, setPeople] = useState<any>([]);

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

        const people =
          (personLocationReadingsData && [personLocationReadingsData.person]) ??
          [];

        setLocationReadings(locationReadings);
        setPeople(people);
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

      const people =
        (companyLocationReadingsData &&
          Array.from(companyLocationReadingsData.company.people).sort(
            (p1: any, p2: any) => (p1.personName > p2.personName ? 1 : -1)
          )) ??
        [];

      setLocationReadings(locationReadings);
      setPeople(people);
    }
  }, [
    companyLocationReadingsData,
    personLocationReadingsData,
    startDate,
    endDate,
    filterId,
  ]);

  const travelData: any[] = people.map((person: any, personIndex: number) => {
    const segments = [];
    for (const location of person.locationReadings) {
      const segment = segments[segments.length - 1];
      const prevTime = new Date(
        segment?.[segment.length - 1]?.timestamp
      )?.getTime();
      const nextTime = new Date(location.timestamp)?.getTime();
      if (prevTime + TRAIL_SPLIT_MS > nextTime) {
        segment.push(location);
      } else {
        segments.push([location]);
      }
    }
    const mapped_segments = segments.map((segment: any) => {
      return segment.map((location: any) => {
        return {
          lng: location.coordinates[0],
          lat: location.coordinates[1],
          timestamp: location.timestamp,
        };
      });
    });
    return {
      name: person.name,
      color: PEOPLE_COLORS[personIndex % PEOPLE_COLORS.length],
      segments: mapped_segments,
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
              component={
                <TravelHistoryTrail center={center} data={travelData} />
              }
            />
            <CustomAccordion
              accordionHeight={accordionHeightInPixels}
              accordionWidth={""}
              accordionTitle={visualizations[2]}
              component={
                <HazardousAreaHeatMap
                  accidents={locationReadings}
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
                <TravelHistoryTrail center={center} data={travelData} />
              </div>
            )}
            {visualization == visualizations[2] && (
              <div className={styles.visualization}>
                <HazardousAreaHeatMap
                  accidents={locationReadings}
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
