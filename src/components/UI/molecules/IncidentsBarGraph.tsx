import React from "react";
import { Filter } from "./FilterBar";
import { BarGraph, BarItem } from "../atoms/BarGraph";
import {
  IncidentStat,
  useCompanyIncidentStats,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";

export const X_AXIS_TITLE = "Incident Type";
export const Y_AXIS_TITLE = "Occurrences";

interface IncidentsBarGraphProps {
  filter?: Filter;
}

export const IncidentsBarGraph: React.FC<IncidentsBarGraphProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  let stats = useStatsInCompany(
    user?.company.id || "",
    filter,
    !!filter.person
  );
  stats = sortByOccurances(stats);

  const graphData = intoChartData(stats);

  return (
    <BarGraph
      data={graphData}
      xAxisTitle={X_AXIS_TITLE}
      yAxisTitle={Y_AXIS_TITLE}
    />
  );
};

const useStatsInCompany = (
  companyId: string,
  filter: Filter,
  skip = false
): IncidentStat[] => {
  const { data } = useCompanyIncidentStats(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    skip
  );
  return data?.company.incidentStats || [];
};

const sortByOccurances = (stats: IncidentStat[]): IncidentStat[] =>
  stats
    .slice()
    .sort((a, b) =>
      a.count > b.count || a.type.localeCompare(b.type) ? 1 : -1
    )
    .reverse();

const intoChartData = (stats: IncidentStat[]): BarItem[] =>
  stats.map((stat) => ({
    x: stat.type,
    y: stat.count,
  }));
