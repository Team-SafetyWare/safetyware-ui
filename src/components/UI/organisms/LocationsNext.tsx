import React, { useCallback, useState } from "react";
import { TravelMap } from "../molecules/TravelMap";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

const useStyles = makeStyles({
  filterBar: {
    position: "fixed",
    zIndex: "1",
    width: "calc(100% - 48px - 240px)",
  },
  topMargin: {
    height: "104px",
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
      <div className={styles.filterBar}>
        <Card elevation={2}>
          <CardContent>
            <div style={{ marginBottom: "-8px" }}>
              <FilterBar filter={filter} onChange={filterChange} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={styles.topMargin} />
      <Card>
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

      <div style={{ height: "16px" }} />
      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
      <div style={{ height: "16px" }} />

      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
      <div style={{ height: "16px" }} />

      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
    </>
  );
};
