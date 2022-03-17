import React from "react";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  getCurrentUser,
  sortPeople,
} from "../../../index";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { Filter } from "./FilterBar";
import {
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
import LatLngLiteral = google.maps.LatLngLiteral;

interface IncidentMarker {
  location: LatLngLiteral;
  icon: string;
}

interface IncidentsMapProps {
  filter?: Filter;
}

export const IncidentsMap: React.FC<IncidentsMapProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  let people: PersonWithIncidents[] = [
    usePersonAsPeople(filter.person?.id || "", filter, !filter.person),
    usePeopleInCompany(user?.company.id || "", filter, !!filter.person),
  ].flat();
  people = sortPeople(people);

  const markers: IncidentMarker[] = intoMarkers(people);

  return (
    <GoogleMap
      mapContainerStyle={{
        height: "100%",
        width: "100%",
      }}
      options={{ gestureHandling: "greedy" }}
      zoom={DEFAULT_MAP_ZOOM}
      center={DEFAULT_MAP_CENTER}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.location} icon={marker.icon} />
      ))}
    </GoogleMap>
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
        location: {
          lat: Number(incident.coordinates[1]),
          lng: Number(incident.coordinates[0]),
        },
        icon: incidentIcon(incident.type),
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
