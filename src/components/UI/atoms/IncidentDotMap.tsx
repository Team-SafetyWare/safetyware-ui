import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import BatteryIcon from "../../../assets/battery.png";
import DeathIcon from "../../../assets/death.png";
import FallIcon from "../../../assets/fall.png";
import GasIcon from "../../../assets/gas.png";
import GenericIcon from "../../../assets/generic.png";
import LatchIcon from "../../../assets/latch.png";
import SignalIcon from "../../../assets/signal.png";
import {
  selectIncidentPageEndDate,
  selectIncidentPageName,
  selectIncidentPageStartDate,
} from "../../../store/slices/incidentPageSlice";
import { useAppSelector } from "../../../store/store";
import { IncidentReadings } from "../organisms/Incidents";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface IncidentDotMapProps {
  incidents?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

export const IncidentDotMap: React.FC<IncidentDotMapProps> = (props) => {
  const [incidents, updateIncidents] = React.useState<IncidentReadings[]>([]);
  const zoom = props.zoom;
  const center = props.center;
  const [markerWindows, updateMarkerWindows] = React.useState<
    IncidentReadings[]
  >([]);
  const [filteredIncidents, updateFilteredIncidents] = React.useState<
    IncidentReadings[]
  >([]);
  const startDate = useAppSelector(selectIncidentPageStartDate);
  const endDate = useAppSelector(selectIncidentPageEndDate);
  const filterName = useAppSelector(selectIncidentPageName);
  const [hoverMarker, updateHoverMarker] = React.useState<
    IncidentReadings | undefined
  >(undefined);

  function createMarker(incident: IncidentReadings) {
    const type = incident.type;
    let markerIcon = GenericIcon;
    switch (type) {
      case "Low battery": {
        markerIcon = BatteryIcon;
        break;
      }
      case "Fall": {
        markerIcon = FallIcon;
        break;
      }
      case "Gas detected": {
        markerIcon = GasIcon;
        break;
      }
      case "Latch pulled": {
        markerIcon = LatchIcon;
        break;
      }
      case "Signal lost": {
        markerIcon = SignalIcon;
        break;
      }
      case "Death": {
        markerIcon = DeathIcon;
        break;
      }
      default:
        markerIcon = GenericIcon;
    }
    return (
      <Marker
        position={incident.coordinates}
        icon={markerIcon}
        onClick={() => {
          updateMarkerWindows((markerWindows) => [...markerWindows, incident]);
        }}
        onMouseOver={() => updateHoverMarker(incident)}
      />
    );
  }

  function createHoverWindow(incident?: IncidentReadings) {
    if (incident) return createMarkerWindow(incident);
  }

  function createMarkerWindow(incident: IncidentReadings) {
    return (
      <InfoWindow
        position={incident.coordinates}
        onCloseClick={() => updateHoverMarker(undefined)}
      >
        <div>
          <p>
            <b>Incident: {incident.type}</b>
          </p>
          <div>Name: {incident.personName}</div>
          <div>Time: {incident.timestamp?.toLocaleString()}</div>
        </div>
      </InfoWindow>
    );
  }

  function matchesPerson(name: string): boolean {
    return name === filterName || filterName === "All";
  }

  function inDateRange(date: Date, start: Date, end: Date): boolean {
    return !(
      date.getTime() < start.getTime() || date.getTime() > end.getTime()
    );
  }

  useEffect(() => {
    updateIncidents(() => props.incidents);
  }, [props]);

  function createIncident(incident: any) {
    return {
      coordinates: {
        lat: incident.coordinates.lat,
        lng: incident.coordinates.lng,
      },
      timestamp: incident.timestamp,
      personName: incident.personName,
      companyName: incident.companyName,
      type: incident.type,
    };
  }

  useEffect(() => {
    updateFilteredIncidents([]);
    updateMarkerWindows([]);
    updateHoverMarker(undefined);
    incidents.map((incident: any) => {
      if (
        !inDateRange(
          new Date(incident.timestamp),
          new Date(startDate),
          new Date(endDate)
        )
      ) {
        return;
      }
      if (!matchesPerson(incident.personName)) {
        return;
      }
      updateFilteredIncidents((filteredIncidents) => [
        ...filteredIncidents,
        createIncident(incident),
      ]);
    });
  }, [incidents, startDate, endDate, filterName]);

  return (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {filteredIncidents.map((incident: IncidentReadings) =>
          createMarker(incident)
        )}
        {createHoverWindow(hoverMarker)}
      </GoogleMap>
    </>
  );
};

export default React.memo(IncidentDotMap);
