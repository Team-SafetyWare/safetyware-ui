import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import React, {useEffect} from "react";
import {LocationReading} from "../organisms/Incidents";
import MarkerIcon from "../../../assets/AccidentDotMapDot.png";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {selectIsDashboard, setIsDashboard} from "../../../store/slices/dashboard";
import {
    selectIncidentDotMapEndDate,
    selectIncidentDotMapStartDate, setEndDate,
    setStartDate
} from "../../../store/slices/incidentDotMapSlice";
import {Button} from "@mui/material";

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
    const dispatch = useAppDispatch();
    const startDate = useAppSelector(selectIncidentDotMapStartDate);
    const endDate = useAppSelector(selectIncidentDotMapEndDate);

    //Maybe pass in the filtered dates into a graphql query => this might be the best way to do it
    //Or do the filtering one level up on the incidents page
    //this would require a new query every time
    //Use effect then depends on the new query and should theoretically update

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

    useEffect(() => {
        updateIncidents(incidents => props.incidents)
    }, [props])

    useEffect(() => {
        updateFilteredIncidents([])
        updateMarkerWindows([])
        incidents.map((incident: any) => {
            if (startDate && incident.date) {
                const min = new Date(startDate).getDate()
                if (new Date(incident.date).getDate() < min) {
                    return
                }
            }
            if (endDate && incident.date) {
                const max = new Date(endDate).getDate()
                if (new Date(incident.date).getDate() > max) {
                    return
                }
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
