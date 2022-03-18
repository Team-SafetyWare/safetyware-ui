import React, { useCallback } from "react";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { PageHeader } from "../atoms/PageHeader";
import { makeStyles } from "@mui/styles";
import { IncidentsMap } from "../molecules/IncidentsMap";
import { IncidentsBarGraph } from "../molecules/IncidentsBarGraph";
import { IncidentsTable } from "../molecules/IncidentsTable";

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
});

export const INCIDENTS_PAGE_LABEL = "incidentsPage";

interface IncidentsProps {
  filter: Filter;
  onFilterChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

export const Incidents: React.FC<IncidentsProps> = (props) => {
  const filterChanged = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      props.onFilterChange(updateFilter);
    },
    []
  );

  const styles = useStyles();

  return (
    <>
      <PageHeader
        pageTitle={"Incidents"}
        pageDescription={
          "Analyze incidents data including an incident map and a graph of incident frequencies."
        }
      />

      <div className={[styles.pageCard, styles.filterBar].join(" ")}>
        <Card elevation={2}>
          <CardContent>
            <div className={styles.filterBarContainer}>
              <FilterBar filter={props.filter} onChange={filterChanged} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Incident map"
          subheader="Investigate field incidents that may have put your people at risk."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <IncidentsMap filter={props.filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Incidents bar graph"
          subheader="Understand what incidents are affecting your team most frequently."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <IncidentsBarGraph filter={props.filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Incidents table"
          subheader="View individual incidents."
        />
        <CardMedia>
          <IncidentsTable filter={props.filter} />
        </CardMedia>
      </Card>
    </>
  );
};
