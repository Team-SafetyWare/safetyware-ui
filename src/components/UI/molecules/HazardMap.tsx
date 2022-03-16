import React from "react";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  getCurrentUser,
} from "../../../index";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";
import { Filter } from "./FilterBar";
import { Incident, useCompanyIncidents } from "../../../util/queryService";
import LatLngLiteral = google.maps.LatLngLiteral;
import WeightedLocation = google.maps.visualization.WeightedLocation;
import LatLng = google.maps.LatLng;

interface HazardMapProps {
  filter?: Filter;
}

export const HazardMap: React.FC<HazardMapProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const incidents: Incident[] = useIncidentsInCompany(
    user?.company.id || "",
    filter,
    !!filter.person
  );

  const points: WeightedLocation[] = intoPoints(incidents);

  return (
    <GoogleMap
      mapContainerStyle={{
        height: "100%",
        width: "100%",
      }}
      options={{ gestureHandling: "greedy" }}
      zoom={DEFAULT_MAP_ZOOM}
      center={DEFAULT_MAP_CENTER}
    >
      <HeatmapLayer
        data={points}
        options={{
          radius: 40,
        }}
      />
    </GoogleMap>
  );
};

export const useIncidentsInCompany = (
  companyId: string,
  filter: Filter,
  skip = false
): Incident[] => {
  const { data } = useCompanyIncidents(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    skip
  );
  return data?.company.people.map((person) => person.incidents).flat() || [];
};

const intoPoints = (incidents: Incident[]): WeightedLocation[] => {
  return incidents.map((incident) => ({
    location: new LatLng(
      Number(incident.coordinates[1]),
      Number(incident.coordinates[0])
    ),
    weight: 1,
  }));
};
