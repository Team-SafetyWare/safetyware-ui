import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import GenericIcon from "../../../assets/generic.png";
import {
  selectGasPageEndDate,
  selectGasPageName,
  selectGasPageStartDate,
} from "../../../store/slices/gasPageSlice";
import { useAppSelector } from "../../../store/store";
import { GasReading } from "../organisms/Gases";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface GasDotMapProps {
  gases?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

export const GasDotMap: React.FC<GasDotMapProps> = (props) => {
  const [gases, updateGases] = React.useState<GasReading[]>([]);
  const zoom = props.zoom;
  const center = props.center;
  const [, updateMarkerWindows] = React.useState<GasReading[]>([]);
  const [filteredGases, updateFilteredGases] = React.useState<GasReading[]>([]);
  const startDate = useAppSelector(selectGasPageStartDate);
  const endDate = useAppSelector(selectGasPageEndDate);
  const filterName = useAppSelector(selectGasPageName);
  const [hoverMarker, updateHoverMarker] = React.useState<
    GasReading | undefined
  >(undefined);

  function createMarker(gas: GasReading) {
    const markerIcon = GenericIcon;
    return (
      <Marker
        position={gas.coordinates}
        icon={markerIcon}
        onClick={() => {
          updateMarkerWindows((markerWindows) => [...markerWindows, gas]);
        }}
        onMouseOver={() => updateHoverMarker(gas)}
      />
    );
  }

  function createHoverWindow(gas?: GasReading) {
    if (gas) return createMarkerWindow(gas);
  }

  function createMarkerWindow(gas: GasReading) {
    return (
      <InfoWindow
        position={gas.coordinates}
        onCloseClick={() => updateHoverMarker(undefined)}
      >
        <div>
          <p>
            <b>Gas: {gas.gas}</b>
          </p>
          <div>Name: {gas.personName}</div>
          <div>Density: {gas.density + " " + gas.densityUnits}</div>
          <div>Time: {gas.timestamp?.toLocaleString()}</div>
        </div>
      </InfoWindow>
    );
  }

  useEffect(() => {
    updateGases(() => props.gases);
  }, [props]);

  function createGas(gas: any) {
    return {
      coordinates: {
        lat: gas.coordinates.lat,
        lng: gas.coordinates.lng,
      },
      density: gas.density,
      densityUnits: gas.densityUnits,
      gas: gas.gas,
      timestamp: gas.timestamp,
      personName: gas.personName,
    };
  }

  useEffect(() => {
    updateFilteredGases([]);
    updateMarkerWindows([]);
    updateHoverMarker(undefined);
    gases.map((gas: any) => {
      updateFilteredGases((filteredGases) => [
        ...filteredGases,
        createGas(gas),
      ]);
    });
  }, [gases, startDate, endDate, filterName]);

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{ gestureHandling: "greedy" }}
      >
        {filteredGases.map((gas: GasReading) => createMarker(gas))}
        {createHoverWindow(hoverMarker)}
      </GoogleMap>
    </>
  );
};

export default React.memo(GasDotMap);
