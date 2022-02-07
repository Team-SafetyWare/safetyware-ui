import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import React from "react";
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
    const incidents = props.incidents
    const zoom = props.zoom
    const center = props.center
    const [markerWindows, updateMarkerWindow] = React.useState<LocationReading[]>([]);
    const dispatch = useAppDispatch();
    const startDate = useAppSelector(selectIncidentDotMapStartDate);
    const endDate = useAppSelector(selectIncidentDotMapEndDate);

    const setAllDates = () => {
        dispatch(setStartDate(""));
        dispatch(setEndDate(""));
        console.log("Resetting Dates", startDate, endDate);
    };

    const setFilteredDates = () => {
        dispatch(setStartDate("2021-05-18T08:00:00+00:00"))
        dispatch(setEndDate("2021-05-18T12:00:00+00:00"))
        console.log("filtered dates", startDate, endDate)
    }

    function createMarker(location: LocationReading) {
        // if (location.)
        return <Marker position={location.coordinates} icon={MarkerIcon} onClick={() => {
            updateMarkerWindow(markerWindows => [...markerWindows, location])
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

    return (
        <>
            <Button variant="contained" onClick={() => setAllDates()}>
                <p>All Dates</p>
            </Button>
            <Button variant="contained" onClick={() => setFilteredDates()}>
                <p>Filter Dates</p>
            </Button>
            <GoogleMap
                mapContainerStyle={containerStyle}

                center={center}
                zoom={zoom}
            >
                {markerWindows.map((markerWindow) => createMarkerWindow(markerWindow))}
                {incidents.map((incident: LocationReading) => createMarker(incident))}
            </GoogleMap>
        </>
    )
};

export default React.memo(IncidentDotMap);
