import { useQuery } from "@apollo/client";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import theme from "../../../Theme";
import { GET_INCIDENTS, GET_INCIDENT_STATS } from "../../../util/queryService";
import { BarGraph } from "../atoms/BarGraph";
import { CustomAccordion } from "../atoms/CustomAccordion";
import IncidentDotMap from "../atoms/IncidentDotMap";
import IncidentTable from "../atoms/IncidentTable";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBox } from "../molecules/CustomBox";

const user = "PersonA";
const view = "User";
const incidentType = "All";
const tempStartDate = new Date("01/01/2022");
const tempEndDate = new Date("01/08/2022");

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
    position: "absolute",
    right: 16,
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

export const Incidents: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const [incidents, updateIncidents] = useState<IncidentReadings[]>([]);
  const [incidentStats, updateIncidentStats] = useState<IncidentStat[]>([]);

  const resIncidents = useQuery(GET_INCIDENTS);
  const resIncidentStats = useQuery(GET_INCIDENT_STATS);

  useEffect(() => {
    updateIncidents([]);

    if (!resIncidents.loading && resIncidents.data) {
      resIncidents.data.userAccount.company.people.map((person: any) => {
        person.incidents.map((incident: any) => {
          updateIncidents((incidents) => [
            ...incidents,
            {
              coordinates: {
                lng: incident.coordinates[0],
                lat: incident.coordinates[1],
              },
              personName: incident.person.name,
              timestamp: new Date(incident.timestamp),
              type: incident.type,
              companyName: incident.person.company.name,
            },
          ]);
        });
      });
    }
  }, [resIncidents.loading, resIncidents.data]);

  useEffect(() => {
    updateIncidentStats([]);
    if (!resIncidentStats.loading && resIncidentStats.data) {
      resIncidentStats.data.userAccount.company.incidentStats.map(
        (incidentStat: any) => {
          updateIncidentStats((incidentStats) => [
            ...incidentStats,
            {
              x: incidentStat.type,
              y: incidentStat.count,
            },
          ]);
        }
      );
    }
  }, [resIncidentStats.loading, resIncidentStats.data]);

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
              sectionTitle={"Raw Incidents Data"}
              sectionDescription={
                "Explore raw incidents data through a date-filtered data table."
              }
              download={true}
            />
            <CustomAccordion
              accordionHeight={"auto"}
              accordionWidth={""}
              accordionTitle={visualizations[0]}
              component={<IncidentTable incidents={incidents} />}
            />
            <PageSectionHeader
              sectionTitle={"Incidents Visualizations"}
              sectionDescription={
                "Visualize incidents data through a dot map showing incident type and location, and a bar graph indicating incident frequencies."
              }
              download={false}
            />
            <CustomAccordion
              accordionHeight={"400px"}
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
              accordionHeight={"400px"}
              accordionWidth={""}
              accordionTitle={visualizations[2]}
              component={<BarGraph data={incidentStats} />}
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
                <BarGraph data={incidentStats} />
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
          <CustomBox
            user={user}
            view={view}
            incidentType={incidentType}
            startDate={tempStartDate}
            endDate={tempEndDate}
            pageLabel={incidentPageLabel}
          />
        </Modal>
      </>
    </StyledEngineProvider>
  );
};
