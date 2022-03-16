import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import theme from "../../../Theme";
import { TravelMap } from "../molecules/TravelMap";
import { Filter, FilterDialog } from "../molecules/FilterDialog";
import Draggable from "react-draggable";

makeStyles({
  locationsDropdown: {
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
});

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
      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
      <Draggable>
        <div>
          <FilterDialog filter={filter} onChange={filterChange} />
        </div>
      </Draggable>
    </>
  );
};
