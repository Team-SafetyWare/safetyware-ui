import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";
import { TravelMap } from "../atoms/TravelMap";
import { Filter } from "../atoms/CustomBoxUserSelect";

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
  const filter: Filter = {};

  return (
    <StyledEngineProvider injectFirst>
      <div style={{ height: "600px" }}>
        <TravelMap filter={filter} />
      </div>
    </StyledEngineProvider>
  );
};
