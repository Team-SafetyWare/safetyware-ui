import React from "react";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  getCurrentUser,
} from "../../../index";
import { GoogleMap } from "@react-google-maps/api";
import { Filter } from "./FilterBar";
import { Incident, useCompanyIncidents } from "../../../util/queryService";

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
