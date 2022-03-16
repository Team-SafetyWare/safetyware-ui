import React, { useCallback, useState } from "react";
import { TravelMap } from "../molecules/TravelMap";
import { Filter, FilterBar } from "../molecules/FilterBar";

export const LocationsNext: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({});

  const filterChange = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      setFilter((filter) => updateFilter(filter));
    },
    []
  );

  return (
    <>
      <FilterBar filter={filter} onChange={filterChange} />
      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
    </>
  );
};
