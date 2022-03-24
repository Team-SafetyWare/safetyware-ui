import {Card, CardContent, CardHeader, CardMedia,} from "@mui/material";
import {StyledEngineProvider} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import React, {useCallback, useState} from "react";
import theme from "../../../Theme";
import {GasDotMap} from "../atoms/GasesDotMap";
import {PageHeader} from "../atoms/PageHeader";
import {PageSectionHeader} from "../atoms/PageSectionHeader";
import {Filter, FilterBar} from "../molecules/FilterBar";
import {GasesTable} from "../atoms/GasesTable";

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

interface GasesProps {
    filter: Filter;
    onFilterChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

export const GASES_PAGE_LABEL = "gasesPage";

export const Gases: React.FC<GasesProps> = (props) => {
  const styles = useStyles();

  const [filter, setFilter] = useState<Filter>({});

  const filterChange = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      setFilter((filter) => updateFilter(filter));
    },
    []
  );

  return (
    <StyledEngineProvider injectFirst>
      <>
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
            <Card className={styles.pageCard}>
              <CardHeader
                  title="Gases table"
                  subheader="View individual gas reading data."
              />
              <CardMedia>
                <GasesTable filter={filter} />
              </CardMedia>
            </Card>
          </>
      </>
    </StyledEngineProvider>
  );
};
