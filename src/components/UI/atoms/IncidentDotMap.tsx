import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import React from "react";
import {LocationReading} from "../organisms/Incidents";
import MarkerIcon from "../../../assets/AccidentDotMapDot.png";

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
    const incidents = props.incidents
    const zoom = props.zoom
    const center = props.center
    const [markerWindows, updateMarkerWindow] = React.useState<LocationReading[]>([]);

    function createMarker(location: LocationReading) {
        return <Marker position={location.coordinates} icon={MarkerIcon} onClick={() => {
            updateMarkerWindow(markerWindows => [...markerWindows, location])
        }}/>;
    }

    function createMarkerWindow(location: LocationReading) {
        return <InfoWindow position={location.coordinates}>
            <div>{location.name}</div>
        </InfoWindow>
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
            {markerWindows.map((markerWindow) => createMarkerWindow(markerWindow))}
            {incidents.map((incident: LocationReading) => createMarker(incident))}
        </GoogleMap>
    )
};

export default React.memo(IncidentDotMap);
