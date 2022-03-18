import React, { useCallback, useState } from "react";
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

export const Incidents: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({});

  const filterChange = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      setFilter((filter) => updateFilter(filter));
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
              <FilterBar filter={filter} onChange={filterChange} />
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
            <IncidentsMap filter={filter} />
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
            <IncidentsBarGraph filter={filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Incidents table"
          subheader="View individual incidents."
        />
        <CardMedia>
          <IncidentsTable filter={filter} />
        </CardMedia>
      </Card>
    </>
  );
};
