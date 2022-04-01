import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { getCurrentUser, User } from "../../../index";
import {
  IncidentStat,
  useCompanyIncidentStats,
  usePersonIncidentStats,
} from "../../../util/queryService";
import OverlayStyles from "../../styling/OverlayStyles";
import { BarGraph, BarItem } from "../atoms/BarGraph";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import { Filter, shouldFilterPerson } from "./FilterBar";

export const X_AXIS_TITLE = "Incident Type";
export const Y_AXIS_TITLE = "Occurrences";

interface IncidentsBarGraphProps {
  filter?: Filter;
}

export const IncidentsBarGraph: React.FC<IncidentsBarGraphProps> = (props) => {
  const overlayStyles = OverlayStyles();

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [loading, stats] = useIncidentStats(user, filter);
  const graphData = intoChartData(stats);

  const warnNoData = !loading && graphData.length === 0;

  return (
    <div className={overlayStyles.parent}>
      <Backdrop
        className={overlayStyles.backdrop}
        open={loading || warnNoData}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {loading && <CircularProgress />}
        {warnNoData && <EmptyDataMessage />}
      </Backdrop>
      <BarGraph
        data={graphData}
        xAxisTitle={X_AXIS_TITLE}
        yAxisTitle={Y_AXIS_TITLE}
      />
    </div>
  );
};

const useIncidentStats = (
  user: User | null,
  filter: Filter
): [boolean, IncidentStat[]] => {
  const [statsInPersonLoading, statsInPersonData] = useStatsInPerson(
    filter.person?.id || "",
    filter,
    shouldFilterPerson(filter)
  );
  const [statsInCompanyLoading, statsInCompanyData] = useStatsInCompany(
    user?.company.id || "",
    filter,
    !shouldFilterPerson(filter)
  );
  return [
    statsInPersonLoading || statsInCompanyLoading,
    sortByOccurances([statsInPersonData, statsInCompanyData].flat()),
  ];
};

const useStatsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): [boolean, IncidentStat[]] => {
  const { loading, data } = useCompanyIncidentStats(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [loading, data?.company.incidentStats || []];
};

const useStatsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): [boolean, IncidentStat[]] => {
  const { loading, data } = usePersonIncidentStats(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [loading, data?.person.incidentStats || []];
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
