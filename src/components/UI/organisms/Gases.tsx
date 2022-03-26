import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import theme from "../../../Theme";
import { GasDotMap } from "../atoms/GasesDotMap";
import { PageHeader } from "../atoms/PageHeader";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { GasesTable } from "../atoms/GasesTable";
import { FilterFab } from "../molecules/FilterFab";
import { FilterModal } from "../molecules/FilterModal";
import { VisualizationSelect } from "../atoms/VisualizationSelect";

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

  filterBarContainer: {
    marginBottom: "-8px",
  },

  fabPadding: {
    height: "56px",
  },
  mobileVisualizationDropdown: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      left: "50%",
      marginBottom: "20px",
      position: "absolute",
      top: "calc(0.5 * 60px)",
      transform: "translate(-50%, -50%)",
    },
  },
  mobileVisualization: {
    height: "calc(100vh - 60px)",
    left: "0",
    position: "absolute",
    top: "60px",
    width: "100vw",
  },
});

interface GasesProps {
  filter: Filter;
  onFilterChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

export const GASES_PAGE_LABEL = "gasesPage";

const visualizations = ["Gases map", "Gases table"];

export const Gases: React.FC<GasesProps> = (props) => {
  const styles = useStyles();
  const onFilterChange = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      props.onFilterChange(updateFilter);
    },
    []
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [visualization, setVisualization] = useState(visualizations[0]);
  const showFilterBar = useMediaQuery(theme.breakpoints.up("lg"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledEngineProvider injectFirst>
      <>
        {!mobile ? (
          <>
            <PageHeader
              pageTitle={"Gases"}
              pageDescription={
                "Analyze data based on gases using a gas dot map."
              }
            />

            {showFilterBar && (
              <div className={[styles.pageCard, styles.filterBar].join(" ")}>
                <Card elevation={2}>
                  <CardContent>
                    <div className={styles.filterBarContainer}>
                      <FilterBar
                        filter={props.filter}
                        onChange={onFilterChange}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card className={styles.pageCard}>
              <CardHeader
                title={visualizations[0]}
                subheader="Become aware of the gas concentrations across multiple locations. "
              />
              <CardMedia>
                <div style={{ height: "600px" }}>
                  <GasDotMap filter={props.filter} />
                </div>
              </CardMedia>
            </Card>
            <Card className={styles.pageCard}>
              <CardHeader
                title={visualizations[1]}
                subheader="View individual gas reading data."
              />
              <CardMedia>
                <GasesTable filter={props.filter} />
              </CardMedia>
            </Card>
          </>
        ) : (
          <>
            <div className={styles.mobileVisualizationDropdown}>
              <VisualizationSelect
                visualizations={visualizations}
                setVisualization={setVisualization}
              />
            </div>
            {visualization == visualizations[0] && (
              <div className={styles.mobileVisualization}>
                <GasDotMap filter={props.filter} />
              </div>
            )}
            {visualization == visualizations[1] && (
              <div className={styles.mobileVisualization}>
                <GasesTable filter={props.filter} />
              </div>
            )}
          </>
        )}
        {!showFilterBar && (
          <>
            <div className={styles.fabPadding} />
            <FilterFab onClick={() => setFilterModalOpen(true)} />
            <FilterModal
              filter={props.filter}
              onChange={onFilterChange}
              open={filterModalOpen}
              onClose={() => setFilterModalOpen(false)}
            />
          </>
        )}
      </>
    </StyledEngineProvider>
  );
};
