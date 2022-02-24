import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import React, {useEffect} from "react";
import {IncidentReadings} from "../organisms/Incidents";
import MarkerIcon from "../../../assets/AccidentDotMapDot.png";
import {useAppSelector} from "../../../store/store";
import {
    selectIncidentPageEndDate,
    selectIncidentPageStartDate,
} from "../../../store/slices/incidentPageSlice";

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
    const [incidents, updateIncidents] = React.useState<IncidentReadings[]>([])
    const zoom = props.zoom
    const center = props.center
    const [markerWindows, updateMarkerWindows] = React.useState<IncidentReadings[]>([]);
    const [filteredIncidents, updateFilteredIncidents] = React.useState<IncidentReadings[]>([]);
    const startDate = useAppSelector(selectIncidentPageStartDate);
    const endDate = useAppSelector(selectIncidentPageEndDate);

    function createMarker(incident: IncidentReadings) {
        return <Marker position={incident.coordinates} icon={MarkerIcon} onClick={() => {
            updateMarkerWindows(markerWindows => [...markerWindows, incident])
        }}/>;
    }

    function createMarkerWindow(incident: IncidentReadings) {
        return <InfoWindow position={incident.coordinates}>
            <div>
                <p>
                    <b>Incident: {incident.type}</b>
                </p>
                <div>
                    Name: {incident.personName}
                </div>
                <div>
                    Time: {incident.timestamp}
                </div>
            </div>
        </InfoWindow>
    }

    function inDateRange(date: Date, start:Date, end:Date): boolean {
        return !(date.getTime() < start.getTime() || date.getTime() > end.getTime());
    }

    useEffect(() => {
        updateIncidents(() => props.incidents)
    }, [props])

    useEffect(() => {
        updateFilteredIncidents([])
        updateMarkerWindows([])
        incidents.map((incident: any) => {
            if (!inDateRange(new Date(incident.date), new Date(startDate), new Date(endDate))) {
                return;
            }
            updateFilteredIncidents(filteredIncidents =>
                [
                    ...filteredIncidents,
                    {
                        coordinates: {
                            lat: incident.coordinates.lat,
                            lng: incident.coordinates.lng,
                        },
                        timestamp: incident.timestamp,
                        personName: incident.personName,
                        companyName: incident.companyName,
                        type: incident.type,
                    },
                ]
            )
        })
    }, [incidents, startDate, endDate])

    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                {markerWindows.map((markerWindow: IncidentReadings) => createMarkerWindow(markerWindow))}
                {filteredIncidents.map((incident: IncidentReadings) => createMarker(incident))}
            </GoogleMap>
        </>
    )
};

export default React.memo(IncidentDotMap);
