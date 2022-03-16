import { useQuery } from "@apollo/client";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../../index";
import {
  selectIncidentPageEndDate,
  selectIncidentPagePersonId,
  selectIncidentPageStartDate,
} from "../../../store/slices/incidentPageSlice";
import { useAppSelector } from "../../../store/store";
import theme from "../../../Theme";
import {
  GET_INCIDENTS_FOR_COMPANY,
  GET_INCIDENTS_FOR_PERSON,
  GET_INCIDENT_STATS_FOR_COMPANY,
  GET_INCIDENT_STATS_FOR_PERSON,
} from "../../../util/queryService";
import { BarGraph } from "../atoms/BarGraph";
import { CustomAccordion } from "../atoms/CustomAccordion";
import IncidentDotMap from "../atoms/IncidentDotMap";
import IncidentTable from "../atoms/IncidentTable";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBoxReduced } from "../molecules/CustomBoxReduced";

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

  filterButton: {
    backgroundColor: theme.palette.primary.main,
    bottom: 16,
    color: "white",
    position: "fixed",
    right: 16,

    "&:hover": { backgroundColor: theme.palette.primary.light },
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

export interface IncidentStat {
  x: string;
  y: number;
}

export const incidentPageLabel = "incidentPage";
export const incidentBarGraphXAxisTitle = "Type of Incident";
export const incidentBarGraphYAxisTitle = "Number of Incidents";

const accordionHeightInPixels = "600px";

export const Incidents: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const user = getCurrentUser();

  const startDate = useAppSelector(selectIncidentPageStartDate);
  const endDate = useAppSelector(selectIncidentPageEndDate);
  const filterId = useAppSelector(selectIncidentPagePersonId);

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

  const { data: companyIncidentStatsData } = useQuery(
    GET_INCIDENT_STATS_FOR_COMPANY,
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

  const { data: personIncidentStatsData } = useQuery(
    GET_INCIDENT_STATS_FOR_PERSON,
    {
      variables: {
        personId: filterId,
        filter: {
          minTimestamp: startDate !== "" ? new Date(startDate) : null,
          maxTimestamp: endDate !== "" ? new Date(endDate) : null,
        },
      },
    }
  );

  const [incidentStats, setIncidentStats] = React.useState<any>([]);

  useEffect(() => {
    if (filterId !== "") {
      if (personIncidentStatsData && personIncidentStatsData.person !== null) {
        const incidentStats: any[] =
          personIncidentStatsData.person.incidentStats
            .map((incidentStat: any) => {
              return {
                x: incidentStat.type,
                y: incidentStat.count,
              };
            })
            .sort((a: any, b: any) => (a.x > b.x ? 1 : -1)) ?? [];
        setIncidentStats(incidentStats);
      }
    } else {
      const incidentStats: any[] =
        companyIncidentStatsData?.company.incidentStats
          .map((incidentStat: any) => {
            return {
              x: incidentStat.type,
              y: incidentStat.count,
            };
          })
          .sort((a: any, b: any) => (a.x > b.x ? 1 : -1)) ?? [];
      setIncidentStats(incidentStats);
    }
  }, [
    companyIncidentStatsData,
    personIncidentStatsData,
    startDate,
    endDate,
    filterId,
  ]);

  const visualizations = [
    "Raw Incidents Data Table",
    "Incidents Dot Map",
    "Incidents Bar Graph",
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
              pageTitle={"Incidents"}
              pageDescription={
                "Analyze data based on incidents including a dot map and a bar graph showing incident frequencies."
              }
            />
            <PageSectionHeader
              sectionTitle={"Incidents Visualizations"}
              sectionDescription={
                "Visualize incidents data through a dot map showing incident type and location, and a bar graph indicating incident frequencies."
              }
            />
            <CustomAccordion
              defaultExpanded={true}
              accordionHeight={accordionHeightInPixels}
              accordionWidth={""}
              accordionTitle={visualizations[1]}
              component={
                <IncidentDotMap
                  incidents={incidents}
                  center={center}
                  zoom={10}
                />
              }
            />
            <CustomAccordion
              // accordionHeight={accordionHeightInPixels}
              accordionHeight={"auto"}
              accordionWidth={""}
              accordionTitle={visualizations[2]}
              component={
                <BarGraph
                  data={incidentStats}
                  xAxisTitle={incidentBarGraphXAxisTitle}
                  yAxisTitle={incidentBarGraphYAxisTitle}
                />
              }
            />
            <PageSectionHeader
              sectionTitle={"Raw Incidents Data"}
              sectionDescription={
                "Explore raw incidents data through a date-filtered data table."
              }
            />
            <CustomAccordion
              accordionHeight={"auto"}
              accordionWidth={""}
              accordionTitle={visualizations[0]}
              component={<IncidentTable incidents={incidents} />}
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
                <IncidentTable incidents={incidents} />
              </div>
            )}
            {visualization == visualizations[1] && (
              <div className={styles.visualization}>
                <IncidentDotMap
                  incidents={incidents}
                  center={center}
                  zoom={10}
                />
              </div>
            )}
            {visualization == visualizations[2] && (
              <div className={styles.visualization}>
                <BarGraph
                  data={incidentStats}
                  xAxisTitle={incidentBarGraphXAxisTitle}
                  yAxisTitle={incidentBarGraphYAxisTitle}
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
            pageLabel={incidentPageLabel}
          />
        </Modal>
      </>
    </StyledEngineProvider>
  );
};
