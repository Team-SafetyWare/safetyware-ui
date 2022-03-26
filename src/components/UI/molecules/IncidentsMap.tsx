import React, { useCallback, useEffect, useState } from "react";
import {
  getCurrentUser,
  MAP_RESTRICTION,
  sortPeople,
  User,
} from "../../../index";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { Filter, shouldFilterPerson } from "./FilterBar";
import {
  Person,
  PersonWithIncidents,
  useCompanyIncidents,
  usePersonIncidents,
} from "../../../util/queryService";
import BatteryIcon from "../../../assets/battery.png";
import FallIcon from "../../../assets/fall.png";
import GasIcon from "../../../assets/gas.png";
import LatchIcon from "../../../assets/latch.png";
import SignalIcon from "../../../assets/signal.png";
import DeathIcon from "../../../assets/death.png";
import GenericIcon from "../../../assets/generic.png";
import { makeStyles } from "@mui/styles";
import LatLngLiteral = google.maps.LatLngLiteral;
import { MapTooltip } from "./MapTooltip";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";
import CircularProgress from "@mui/material/CircularProgress";

export const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.045,
  lng: -114.072,
};
export const DEFAULT_MAP_ZOOM = 11;

interface IncidentMarker {
  person: Person;
  location: LatLngLiteral;
  type: string;
  time: Date;
  icon: string;
}

interface IncidentsMapProps {
  filter?: Filter;
}

const useStyles = makeStyles({
  tooltipText: {
    margin: "8px",
    whiteSpace: "nowrap",
  },
});

export const IncidentsMap: React.FC<IncidentsMapProps> = (props) => {
  const overlayStyles = OverlayStyles();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const people: PersonWithIncidents[] = usePeople(user, filter);
  const markers: IncidentMarker[] = intoMarkers(people);

  const [hoveredMarker, setHoveredMarker] = useState<
    IncidentMarker | undefined
  >();

  const onMarkerMouseOver = useCallback((marker: IncidentMarker) => {
    setHoveredMarker(marker);
  }, []);

  const onMarkerMouseOut = useCallback((marker: IncidentMarker) => {
    setHoveredMarker((prevMarker) =>
      JSON.stringify(marker) === JSON.stringify(prevMarker)
        ? undefined
        : prevMarker
    );
  }, []);

  useEffect(() => {
    if (people.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [people]);

  useEffect(() => {
    if (markers.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [markers]);

  const styles = useStyles();

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={isEmpty || isLoading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {isLoading ? <CircularProgress /> : <EmptyDataMessage />}
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
          {markers.map((marker) => (
            <Marker
              key={markerKey(marker)}
              position={marker.location}
              icon={marker.icon}
              onMouseOver={() => onMarkerMouseOver(marker)}
              onMouseOut={() => onMarkerMouseOut(marker)}
            />
          ))}
          {hoveredMarker && (
            <MapTooltip
              location={hoveredMarker.location}
              hoverDistance={"20px"}
            >
              <h3 className={styles.tooltipText}>
                Incident: {hoveredMarker.type}
              </h3>
              <p className={styles.tooltipText}>
                Name: {hoveredMarker.person.name}
              </p>
              <p className={styles.tooltipText}>
                Time: {hoveredMarker.time.toISOString()}
              </p>
            </MapTooltip>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

const usePeople = (user: User | null, filter: Filter) =>
  sortPeople(
    [
      usePersonAsPeople(
        filter.person?.id || "",
        filter,
        shouldFilterPerson(filter)
      ),
      usePeopleInCompany(
        user?.company.id || "",
        filter,
        !shouldFilterPerson(filter)
      ),
    ].flat()
  );

const usePeopleInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): PersonWithIncidents[] => {
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
  return data?.company.people || [];
};

const usePersonAsPeople = (
  personId: string,
  filter: Filter,
  execute = true
): PersonWithIncidents[] => {
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
  return (data && [data.person]) || [];
};

const intoMarkers = (people: PersonWithIncidents[]): IncidentMarker[] =>
  people
    .map((person) =>
      person.incidents.map((incident) => ({
        person: person,
        location: {
          lat: Number(incident.coordinates[1]),
          lng: Number(incident.coordinates[0]),
        },
        type: incident.type,
        icon: incidentIcon(incident.type),
        time: new Date(incident.timestamp),
      }))
    )
    .flat();

const incidentIcon = (type: string): string => {
  switch (type) {
    case "Low battery": {
      return BatteryIcon;
    }
    case "Fall": {
      return FallIcon;
    }
    case "Gas detected": {
      return GasIcon;
    }
    case "Latch pulled": {
      return LatchIcon;
    }
    case "Signal lost": {
      return SignalIcon;
    }
    case "Death": {
      return DeathIcon;
    }
    default:
      return GenericIcon;
  }
};

const markerKey = (marker: IncidentMarker): string => {
  const personId = marker.person.id;
  const time = marker.time.toISOString();
  const type = marker.type;
  return `${personId}-${time}-${type}`;
};
