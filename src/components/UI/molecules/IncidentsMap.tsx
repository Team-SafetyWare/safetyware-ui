import React, { useCallback, useState } from "react";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  getCurrentUser,
  sortPeople,
} from "../../../index";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";

import { Filter } from "./FilterBar";
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
import Paper from "@mui/material/Paper";

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
  tooltip: {
    position: "relative",
    right: "calc(100% / 2)",
    bottom: "152px",
    padding: "8px",
    fontSize: "1rem",
    "& h3": {
      margin: "8px",
    },
    "& p": {
      margin: "8px",
    },
  },
  tooltipArrow: {
    width: "64px",
    height: "64px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 16px 10px -17px rgba(0, 0, 0, 0.5)",
    backgroundColor: "transparent",
    transform: "rotate(180deg)",
    translate: "-50%",
    bottom: "152px",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "32px",
      height: "32px",
      background: "white",
      transform: "rotate(45deg);",
      top: "48px",
      left: "16px",
      boxShadow: "-1px -1px 10px -2px rgba(0, 0, 0, 0.5)",
    },
  },
});

export const IncidentsMap: React.FC<IncidentsMapProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  let people: PersonWithIncidents[] = [
    usePersonAsPeople(filter.person?.id || "", filter, !filter.person),
    usePeopleInCompany(user?.company.id || "", filter, !!filter.person),
  ].flat();
  people = sortPeople(people);

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

  const styles = useStyles();

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        options={{ gestureHandling: "greedy" }}
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
          <OverlayView
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={hoveredMarker.location}
          >
            <div>
              <Paper className={styles.tooltip}>
                <h3>Incident: {hoveredMarker.type}</h3>
                <p>Name: {hoveredMarker.person.name}</p>
                <p>Time: {hoveredMarker.time.toISOString()}</p>
              </Paper>
              <Paper className={styles.tooltipArrow} />
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </>
  );
};

const usePeopleInCompany = (
  companyId: string,
  filter: Filter,
  skip = false
): PersonWithIncidents[] => {
  const { data } = useCompanyIncidents(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    skip
  );
  return data?.company.people || [];
};

const usePersonAsPeople = (
  personId: string,
  filter: Filter,
  skip = false
): PersonWithIncidents[] => {
  const { data } = usePersonIncidents(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    skip
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
