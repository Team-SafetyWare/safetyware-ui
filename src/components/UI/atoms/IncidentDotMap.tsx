import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import React from "react";
import {LocationReading} from "../organisms/Incidents";
import MarkerIcon from "../../../assets/AccidentDotMapDot.png";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {selectIsDashboard} from "../../../store/slices/dashboard";
import {selectIncidentDotMapEndDate, selectIncidentDotMapStartDate} from "../../../store/slices/incidentDotMap";

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
    const dispatch = useAppDispatch();
    const startDate = useAppSelector(selectIncidentDotMapStartDate);
    const endDate = useAppSelector(selectIncidentDotMapEndDate);

    function createMarker(location: LocationReading) {
        // if (location.)
        return <Marker position={location.coordinates} icon={MarkerIcon} onClick={() => {
            updateMarkerWindow(markerWindows => [...markerWindows, location])
        }}/>;
    }

    function createMarkerWindow(location: LocationReading) {
        return <InfoWindow position={location.coordinates}>
            <div>
                {location.name}
                {location.date}
            </div>
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
