import React, { useCallback, useState } from "react";
import { TravelMap } from "../molecules/TravelMap";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { PageHeader } from "../atoms/PageHeader";
import { HazardMap } from "../molecules/HazardMap";
import { LocationsTable } from "../molecules/LocationsTable";

const useStyles = makeStyles({
  filterBar: {
    position: "sticky",
    top: "16px",
    zIndex: "1",
    width: "100%",
  },
  topMargin: {
    height: "104px",
  },
  pageCard: {
    marginBottom: "16px",
  },
});

export const LocationsNext: React.FC = () => {
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
        pageTitle={"Locations"}
        pageDescription={
          "Analyze data based on locations including a travel history trail and a heat map of common incident locations."
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
          title="Travel history"
          subheader="Understand how people move through your facility."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <TravelMap filter={filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Hazardous areas"
          subheader="See where incidents occur most frequently."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <HazardMap filter={filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Locations table"
          subheader="View individual location readings."
        />
        <CardMedia>
          <LocationsTable filter={filter} />
        </CardMedia>
      </Card>
    </>
  );
};
