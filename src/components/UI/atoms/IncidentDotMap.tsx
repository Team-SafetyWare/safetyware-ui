import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import React, {useEffect} from "react";
import {LocationReading} from "../organisms/Incidents";
import MarkerIcon from "../../../assets/AccidentDotMapDot.png";
import {useAppSelector} from "../../../store/store";
import {
    selectIncidentDotMapEndDate,
    selectIncidentDotMapStartDate,
} from "../../../store/slices/incidentDotMapSlice";

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
    const [incidents, updateIncidents] = React.useState<LocationReading[]>([])
    const zoom = props.zoom
    const center = props.center
    const [markerWindows, updateMarkerWindows] = React.useState<LocationReading[]>([]);
    const [filteredIncidents, updateFilteredIncidents] = React.useState<LocationReading[]>([]);
    const startDate = useAppSelector(selectIncidentDotMapStartDate);
    const endDate = useAppSelector(selectIncidentDotMapEndDate);

    function createMarker(location: LocationReading) {
        return <Marker position={location.coordinates} icon={MarkerIcon} onClick={() => {
            updateMarkerWindows(markerWindows => [...markerWindows, location])
        }}/>;
    }

    function createMarkerWindow(location: LocationReading) {
        return <InfoWindow position={location.coordinates}>
            <div>
                <div>
                    {location.name}
                </div>
                <div>
                    {location.date}
                </div>
                <div>
                    {startDate}
                </div>
                <div>
                    {endDate}
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
                        date: incident.date
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
                {markerWindows.map((markerWindow: LocationReading) => createMarkerWindow(markerWindow))}
                {filteredIncidents.map((incident: LocationReading) => createMarker(incident))}
            </GoogleMap>
        </>
    )
};

export default React.memo(IncidentDotMap);
