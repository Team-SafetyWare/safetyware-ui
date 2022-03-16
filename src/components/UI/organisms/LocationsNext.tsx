import React, { useCallback, useState } from "react";
import { TravelMap } from "../molecules/TravelMap";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { makeStyles } from "@mui/styles";

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
        <FilterBar filter={filter} onChange={filterChange} />
      </div>
      <div className={styles.topMargin} />
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
      <div style={{ height: "16px" }} />

      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
    </>
  );
};
