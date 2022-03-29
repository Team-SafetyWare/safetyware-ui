import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import theme from "../../../Theme";
import { GasesMap } from "../atoms/GasesMap";
import { PageHeader } from "../atoms/PageHeader";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { GasesTable } from "../atoms/GasesTable";
import { FilterFab } from "../molecules/FilterFab";
import { FilterModal } from "../molecules/FilterModal";
import { VisualizationSelect } from "../atoms/VisualizationSelect";

export const GASES_PAGE_LABEL = "gasesPage";

const useStyles = makeStyles({
  filterBar: {
    position: "sticky",
    top: "16px",
    zIndex: "1",
    width: "100%",
  },
  filterBarContainer: {
    marginBottom: "-8px",
  },
  topMargin: {
    height: "104px",
  },
  pageCard: {
    marginBottom: "16px",
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

const visualizations = ["Gases Map", "Gases Table"];

export const Gases: React.FC<GasesProps> = (props) => {
  const filterChanged = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      props.onFilterChange(updateFilter);
    },
    []
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [visualization, setVisualization] = useState(visualizations[0]);
  const showFilterBar = useMediaQuery(theme.breakpoints.up("lg"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const styles = useStyles();

  return (
    <>
      {!mobile ? (
        <>
          <PageHeader
            pageTitle={"Gases"}
            pageDescription={"Analyze data based on gases using a gas dot map."}
          />

          {showFilterBar && (
            <div className={[styles.pageCard, styles.filterBar].join(" ")}>
              <Card elevation={2}>
                <CardContent>
                  <div className={styles.filterBarContainer}>
                    <FilterBar filter={props.filter} onChange={filterChanged} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className={styles.pageCard}>
            <CardHeader
              title={visualizations[0]}
              subheader="Become aware of the gas concentrations across multiple locations."
            />
            <CardMedia>
              <div style={{ height: "600px" }}>
                <GasesMap filter={props.filter} />
              </div>
            </CardMedia>
          </Card>

          <Card className={styles.pageCard}>
            <CardHeader
              title={visualizations[1]}
              subheader="View individual gas readings."
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
              <GasesMap filter={props.filter} />
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
            onChange={filterChanged}
            open={filterModalOpen}
            onClose={() => setFilterModalOpen(false)}
          />
        </>
      )}
    </>
  );
};
