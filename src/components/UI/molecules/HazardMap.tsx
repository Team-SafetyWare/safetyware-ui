import React from "react";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../../index";
import { GoogleMap } from "@react-google-maps/api";
import { Filter } from "./FilterBar";

interface HazardMapProps {
  filter?: Filter;
}

export const HazardMap: React.FC<HazardMapProps> = (props) => {
  return (
    <GoogleMap
      mapContainerStyle={{
        height: "100%",
        width: "100%",
      }}
      options={{ gestureHandling: "greedy" }}
      zoom={DEFAULT_MAP_ZOOM}
      center={DEFAULT_MAP_CENTER}
    />
  );
};
