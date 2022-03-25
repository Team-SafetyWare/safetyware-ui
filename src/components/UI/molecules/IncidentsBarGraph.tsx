import React, { useEffect } from "react";
import { Filter, shouldFilterPerson } from "./FilterBar";
import { BarGraph, BarItem } from "../atoms/BarGraph";
import {
  IncidentStat,
  useCompanyIncidentStats,
  usePersonIncidentStats,
} from "../../../util/queryService";
import { getCurrentUser, User } from "../../../index";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";

export const X_AXIS_TITLE = "Incident Type";
export const Y_AXIS_TITLE = "Occurrences";

interface IncidentsBarGraphProps {
  filter?: Filter;
}

export const IncidentsBarGraph: React.FC<IncidentsBarGraphProps> = (props) => {
  const overlayStyles = OverlayStyles();
  const [isEmpty, setIsEmpty] = React.useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const stats: IncidentStat[] = useIncidentStats(user, filter);
  const graphData = intoChartData(stats);

  useEffect(() => {
    if (graphData.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [graphData]);

  return (
    <div className={overlayStyles.parent}>
      <Backdrop
        className={overlayStyles.backdrop}
        open={isEmpty}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <EmptyDataMessage />
      </Backdrop>
      <BarGraph
        data={graphData}
        xAxisTitle={X_AXIS_TITLE}
        yAxisTitle={Y_AXIS_TITLE}
      />
    </div>
  );
};

const useIncidentStats = (user: User | null, filter: Filter) =>
  sortByOccurances(
    [
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
    ].flat()
  );

const useStatsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): IncidentStat[] => {
  const { data } = useCompanyIncidentStats(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
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
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
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
