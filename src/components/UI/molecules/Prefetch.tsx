import React from "react";
import { Filter, shouldFilterPerson } from "./FilterBar";
import {
  useCompanyIncidents,
  useCompanyIncidentStats,
  useCompanyLocations,
  usePersonIncidents,
  usePersonIncidentStats,
  usePersonLocations,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";

interface PrefetchProps {
  filter: Filter;
}

export const Prefetch: React.FC<PrefetchProps> = (props) => {
  const user = getCurrentUser();

  usePersonLocations(
    {
      personId: props.filter.person?.id || "",
      filter: {
        minTimestamp: props.filter.minTimestamp,
        maxTimestamp: props.filter.maxTimestamp,
      },
    },
    shouldFilterPerson(props.filter)
  );

  useCompanyLocations(
    {
      companyId: user?.company.id || "",
      filter: props.filter,
    },
    !shouldFilterPerson(props.filter)
  );

  usePersonIncidents(
    {
      personId: props.filter.person?.id || "",
      filter: {
        minTimestamp: props.filter.minTimestamp,
        maxTimestamp: props.filter.maxTimestamp,
      },
    },
    shouldFilterPerson(props.filter)
  );

  useCompanyIncidents(
    {
      companyId: user?.company.id || "",
      filter: props.filter,
    },
    !shouldFilterPerson(props.filter)
  );

  usePersonIncidentStats(
    {
      personId: props.filter.person?.id || "",
      filter: {
        minTimestamp: props.filter.minTimestamp,
        maxTimestamp: props.filter.maxTimestamp,
      },
    },
    shouldFilterPerson(props.filter)
  );

  useCompanyIncidentStats(
    {
      companyId: user?.company.id || "",
      filter: props.filter,
    },
    !shouldFilterPerson(props.filter)
  );

  return <></>;
};
