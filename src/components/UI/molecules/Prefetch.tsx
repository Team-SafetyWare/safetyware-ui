import React from "react";
import { Filter } from "./FilterBar";
import { useCompanyLocations } from "../../../util/queryService";
import { getCurrentUser } from "../../../index";

interface PrefetchProps {
  filter: Filter;
}

export const Prefetch: React.FC<PrefetchProps> = (props) => {
  const user = getCurrentUser();

  useCompanyLocations({
    companyId: user?.company.id || "",
    filter: props.filter,
  });

  return <></>;
};
