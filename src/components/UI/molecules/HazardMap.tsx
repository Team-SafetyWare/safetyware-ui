import React, { useEffect } from "react";
import { getCurrentUser, MAP_RESTRICTION, User } from "../../../index";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";
import { Filter, shouldFilterPerson } from "./FilterBar";
import {
  Incident,
  useCompanyIncidents,
  usePersonIncidents,
} from "../../../util/queryService";
import WeightedLocation = google.maps.visualization.WeightedLocation;
import LatLng = google.maps.LatLng;
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";
import LatLngLiteral = google.maps.LatLngLiteral;

export const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.045,
  lng: -114.072,
};
export const DEFAULT_MAP_ZOOM = 11;

interface HazardMapProps {
  filter?: Filter;
}

export const HazardMap: React.FC<HazardMapProps> = (props) => {
  const overlayStyles = OverlayStyles();
  const [isEmpty, setIsEmpty] = React.useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const incidents: Incident[] = useIncidents(user, filter);
  const points: WeightedLocation[] = intoPoints(incidents);

  useEffect(() => {
    if (incidents.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [incidents]);

  return (
    <div className={overlayStyles.parent}>
      <Backdrop
        className={overlayStyles.backdrop}
        open={isEmpty}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <EmptyDataMessage />
      </Backdrop>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        options={{
          gestureHandling: "greedy",
          restriction: MAP_RESTRICTION,
        }}
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
    </div>
  );
};

const useIncidents = (user: User | null, filter: Filter) =>
  [
    useIncidentsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    ),
    useIncidentsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    ),
  ].flat();

const useIncidentsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): Incident[] => {
  const { data } = useCompanyIncidents(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return data?.company.people.map((person) => person.incidents).flat() || [];
};

const useIncidentsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): Incident[] => {
  const { data } = usePersonIncidents(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return data?.person.incidents || [];
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
