import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";
import React from "react";
import { getCurrentUser, MAP_RESTRICTION, User } from "../../../index";
import {
  Incident,
  useCompanyIncidents,
  usePersonIncidents,
} from "../../../util/queryService";
import OverlayStyles from "../../styling/OverlayStyles";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import { Filter, shouldFilterPerson } from "./FilterBar";
import WeightedLocation = google.maps.visualization.WeightedLocation;
import LatLng = google.maps.LatLng;
import LatLngLiteral = google.maps.LatLngLiteral;

const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.045,
  lng: -114.072,
};
const DEFAULT_MAP_ZOOM = 11;

interface HazardMapProps {
  filter?: Filter;
  gestureHandling?: string;
  center?: LatLngLiteral;
  zoom?: number;
}

export const HazardMap: React.FC<HazardMapProps> = (props) => {
  const overlayStyles = OverlayStyles();

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [loading, incidents] = useIncidents(user, filter);
  const points: WeightedLocation[] = intoPoints(incidents);

  const warnNoData = !loading && incidents.length === 0;

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
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        options={{
          gestureHandling: props.gestureHandling
            ? props.gestureHandling
            : "greedy",
          restriction: MAP_RESTRICTION,
        }}
        zoom={props.zoom ?? DEFAULT_MAP_ZOOM}
        center={props.center ?? DEFAULT_MAP_CENTER}
      >
        <HeatmapLayer
          data={points}
          options={{
            radius: 40,
          }}
        />
      </GoogleMap>
    </div>
  );
};

const useIncidents = (
  user: User | null,
  filter: Filter
): [boolean, Incident[]] => {
  const [incidentsInPersonLoading, incidentsInPersonData] =
    useIncidentsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    );
  const [incidentsInCompanyLoading, incidentsInCompanyData] =
    useIncidentsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    );
  return [
    incidentsInPersonLoading || incidentsInCompanyLoading,
    [incidentsInPersonData, incidentsInCompanyData].flat(),
  ];
};

const useIncidentsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): [boolean, Incident[]] => {
  const { loading, data } = useCompanyIncidents(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [
    loading,
    data?.company.people.map((person) => person.incidents).flat() || [],
  ];
};

const useIncidentsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): [boolean, Incident[]] => {
  const { loading, data } = usePersonIncidents(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [loading, data?.person.incidents || []];
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
