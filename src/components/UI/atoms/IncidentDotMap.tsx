import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import GenericIcon from "../../../assets/AccidentDotMapDot.png";
import BatteryIcon from "../../../assets/battery.png";
import DeathIcon from "../../../assets/death.png";
import FallIcon from "../../../assets/fall.png";
import GasIcon from "../../../assets/gas.png";
import LatchIcon from "../../../assets/latch.png";
import SignalIcon from "../../../assets/signal.png";
import {
  selectIncidentPageEndDate,
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
  const [hoverMarker, updateHoverMarker] = React.useState<
    IncidentReadings | undefined
  >(undefined);

  function createMarker(incident: IncidentReadings) {
    let type = incident.type;
    if (type == "Low battery") {
      return (
        <Marker
          position={incident.coordinates}
          icon={BatteryIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    } else if (type == "Fall") {
      return (
        <Marker
          position={incident.coordinates}
          icon={FallIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    } else if (type == "Gas detected") {
      return (
        <Marker
          position={incident.coordinates}
          icon={GasIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    } else if (type == "Latch pulled") {
      return (
        <Marker
          position={incident.coordinates}
          icon={LatchIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    } else if (type == "Signal lost") {
      return (
        <Marker
          position={incident.coordinates}
          icon={SignalIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    } else if (type == "Death") {
      return (
        <Marker
          position={incident.coordinates}
          icon={DeathIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    } else {
      return (
        <Marker
          position={incident.coordinates}
          icon={GenericIcon}
          onClick={() => {
            updateMarkerWindows((markerWindows) => [
              ...markerWindows,
              incident,
            ]);
          }}
          onMouseOver={() => updateHoverMarker(incident)}
        />
      );
    }
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
          <div>Time: {incident.timestamp}</div>
        </div>
      </InfoWindow>
    );
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
    incidents.map((incident: any) => {
      if (
        !inDateRange(
          new Date(incident.date),
          new Date(startDate),
          new Date(endDate)
        )
      ) {
        return;
      }
      updateFilteredIncidents((filteredIncidents) => [
        ...filteredIncidents,
        createIncident(incident),
      ]);
    });
  }, [incidents, startDate, endDate]);

  return (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {/*{markerWindows.map((markerWindow: IncidentReadings) => createMarkerWindow(markerWindow))}*/}
        {filteredIncidents.map((incident: IncidentReadings) =>
          createMarker(incident)
        )}
        {createHoverWindow(hoverMarker)}
      </GoogleMap>
    </>
  );
};

export default React.memo(IncidentDotMap);
