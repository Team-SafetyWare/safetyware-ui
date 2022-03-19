import React from "react";
import { Filter, shouldFilterPerson } from "./FilterBar";
import { BarGraph, BarItem } from "../atoms/BarGraph";
import {
  IncidentStat,
  useCompanyIncidentStats,
  usePersonIncidentStats,
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

  let stats: IncidentStat[] = [
    useStatsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    ),
    useStatsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    ),
  ].flat();
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
  execute = true
): IncidentStat[] => {
  const { data } = useCompanyIncidentStats(
    {
      companyId: companyId,
      filter: filter,
    },
    execute
  );
  return data?.company.incidentStats || [];
};

const useStatsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): IncidentStat[] => {
  const { data } = usePersonIncidentStats(
    {
      personId: personId,
      filter: filter,
    },
    execute
  );
  return data?.person.incidentStats || [];
};

const sortByOccurances = (stats: IncidentStat[]): IncidentStat[] =>
  stats.slice().sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count == b.count) {
      return a.type.localeCompare(b.type);
    }
    return -1;
  });

const intoChartData = (stats: IncidentStat[]): BarItem[] =>
  stats.map((stat) => ({
    x: stat.type,
    y: stat.count,
  }));
