import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "../../..";
import {
  selectGasPageEndDate,
  selectGasPagePersonId,
  selectGasPageStartDate,
} from "../../../store/slices/gasPageSlice";
import { useAppSelector } from "../../../store/store";
import theme from "../../../Theme";
import {
  GET_GAS_READINGS_FOR_COMPANY,
  GET_GAS_READINGS_FOR_PERSON,
  Person,
  PersonWithGasReadings,
  PersonWithIncidents,
} from "../../../util/queryService";
import { CustomAccordion } from "../atoms/CustomAccordion";
import { GasDotMap } from "../atoms/GasesDotMap";
import GasesTable from "../atoms/GasesTable";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { Filter, FilterBar } from "../molecules/FilterBar";
import LatLngLiteral = google.maps.LatLngLiteral;
import GenericIcon from "../../../assets/generic.png";

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

//remove this later
export interface GasReading {
  coordinates: {
    lat: number;
    lng: number;
  };
  density: number;
  densityUnits: string;
  gas: string;
  personName: string;
  timestamp: Date;
}

const useStyles = makeStyles({
  filterBar: {
    position: "sticky",
    top: "16px",
    zIndex: "1",
    width: "100%",
  },

  gasesDropdown: {
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

  pageCard: {
    marginBottom: "16px",
  },
});

interface GasReadingMarker {
  person: Person;
  location: LatLngLiteral;
  time: Date;
  icon: string;
}

export const GASES_PAGE_LABEL = "gasesPage";

export const Gases: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const user = getCurrentUser();

  const startDate = useAppSelector(selectGasPageStartDate);
  const endDate = useAppSelector(selectGasPageEndDate);
  const filterId = useAppSelector(selectGasPagePersonId);

  const [filter, setFilter] = useState<Filter>({});

  const filterChange = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      setFilter((filter) => updateFilter(filter));
    },
    []
  );

  const { data: companyGasReadingsData } = useQuery(
    GET_GAS_READINGS_FOR_COMPANY,
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

  const { data: personGasReadingsData } = useQuery(
    GET_GAS_READINGS_FOR_PERSON,
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

  const [gasReadings, setGasReadings] = useState<any>([]);

  useEffect(() => {
    if (filterId !== "") {
      if (personGasReadingsData && personGasReadingsData.person !== null) {
        const gasReadings: any[] =
          personGasReadingsData.person.gasReadings
            .map((gasReading: any) => {
              return {
                coordinates: {
                  lat: gasReading.coordinates[1],
                  lng: gasReading.coordinates[0],
                },
                density: gasReading.density,
                densityUnits: gasReading.densityUnits,
                gas: gasReading.gas,
                personName: personGasReadingsData.person.name,
                timestamp: new Date(gasReading.timestamp),
              };
            })
            .flat() ?? [];
        setGasReadings(gasReadings);
      }
    } else {
      const gasReadings: any[] =
        companyGasReadingsData?.company.people
          .map((person: any) =>
            person.gasReadings.map((gasReading: any) => {
              return {
                coordinates: {
                  lat: gasReading.coordinates[1],
                  lng: gasReading.coordinates[0],
                },
                density: gasReading.density,
                densityUnits: gasReading.densityUnits,
                gas: gasReading.gas,
                personName: person.name,
                timestamp: new Date(gasReading.timestamp),
              };
            })
          )
          .flat() ?? [];
      setGasReadings(gasReadings);
    }
  }, [
    companyGasReadingsData,
    personGasReadingsData,
    startDate,
    endDate,
    filterId,
  ]);

  const visualizations = ["Raw Gases Data Table", "Gases Dot Map"];

  const [visualization, setVisualization] = useState(visualizations[0]);

  return (
    <StyledEngineProvider injectFirst>
      <>
        {matches ? (
          <>
            <PageHeader
              pageTitle={"Gases"}
              pageDescription={
                "Analyze data based on gases using a gas dot map."
              }
            />

            <div className={[styles.pageCard, styles.filterBar].join(" ")}>
              <Card elevation={2}>
                <CardContent>
                  <div style={{ marginBottom: "-8px" }}>
                    <FilterBar filter={filter} onChange={filterChange} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className={styles.pageCard}>
              <CardHeader
                title="Gases Dot Map"
                subheader="Become aware of the gas concentrations across multiple locations. "
              />
              <CardMedia>
                <div style={{ height: "600px" }}>
                  <GasDotMap filter={filter} />
                </div>
              </CardMedia>
            </Card>
            <PageSectionHeader
              sectionTitle={"Raw Gases Data"}
              sectionDescription={
                "Explore raw gas readings data through a date-filtered data table."
              }
            />
            <CustomAccordion
              accordionHeight={"auto"}
              accordionWidth={""}
              accordionTitle={visualizations[0]}
              component={<GasesTable gasReadings={gasReadings} />}
            />
          </>
        ) : (
          <>
            <div className={styles.gasesDropdown}>
              <VisualizationSelect
                visualizations={visualizations}
                setVisualization={setVisualization}
              />
            </div>
            {visualization == visualizations[0] && (
              <div className={styles.visualization}>
                <GasesTable gasReadings={gasReadings} />
              </div>
            )}
          </>
        )}
      </>
    </StyledEngineProvider>
  );
};
