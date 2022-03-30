import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import BatteryIcon from "../../../assets/battery.png";
import DeathIcon from "../../../assets/death.png";
import FallIcon from "../../../assets/fall.png";
import GasIcon from "../../../assets/gas.png";
import GenericIcon from "../../../assets/generic.png";
import LatchIcon from "../../../assets/latch.png";
import SignalIcon from "../../../assets/signal.png";
import {
  getCurrentUser,
  MAP_RESTRICTION,
  sortPeople,
  User,
} from "../../../index";
import {
  Person,
  PersonWithIncidents,
  useCompanyIncidents,
  usePersonIncidents,
} from "../../../util/queryService";
import OverlayStyles from "../../styling/OverlayStyles";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import { Filter, shouldFilterPerson } from "./FilterBar";
import { MapTooltip } from "./MapTooltip";

import LatLngLiteral = google.maps.LatLngLiteral;

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
  gestureHandling?: string;
}

const useStyles = makeStyles({
  tooltipText: {
    margin: "8px",
    whiteSpace: "nowrap",
  },
});

export const IncidentsMap: React.FC<IncidentsMapProps> = (props) => {
  const overlayStyles = OverlayStyles();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [personAsPeopleLoading, peopleInCompanyLoading, people] = usePeople(
    user,
    filter
  );
  const markers: IncidentMarker[] = intoMarkers(people);

  useEffect(() => {
    if (personAsPeopleLoading || peopleInCompanyLoading) {
      setIsLoading(true);
      setIsEmpty(false);
    } else {
      setIsLoading(false);

      if (markers.length === 0) {
        setIsEmpty(true);
      }
    }
  }, [personAsPeopleLoading, peopleInCompanyLoading, markers]);

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

  const styles = useStyles();

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={isLoading || isEmpty}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {isLoading && <CircularProgress />}
          {!isLoading && isEmpty && <EmptyDataMessage />}
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
              <h3 className={styles.tooltipText}>{hoveredMarker.type}</h3>
              <p className={styles.tooltipText}>{hoveredMarker.person.name}</p>
              <p className={styles.tooltipText}>
                {hoveredMarker.time.toLocaleString()}
              </p>
            </MapTooltip>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

const usePeople = (
  user: User | null,
  filter: Filter
): [boolean, boolean, PersonWithIncidents[]] => {
  const [personAsPeopleLoading, personAsPeopleData] = usePersonAsPeople(
    filter.person?.id || "",
    filter,
    shouldFilterPerson(filter)
  );
  const [peopleInCompanyLoading, peopleInCompanyData] = usePeopleInCompany(
    user?.company.id || "",
    filter,
    !shouldFilterPerson(filter)
  );
  return [
    personAsPeopleLoading,
    peopleInCompanyLoading,
    sortPeople([personAsPeopleData, peopleInCompanyData].flat()),
  ];
};

const usePeopleInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): [boolean, PersonWithIncidents[]] => {
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
  return [loading, data?.company.people || []];
};

const usePersonAsPeople = (
  personId: string,
  filter: Filter,
  execute = true
): [boolean, PersonWithIncidents[]] => {
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
  return [loading, (data && [data.person]) || []];
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
