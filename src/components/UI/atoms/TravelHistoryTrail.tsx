import {GoogleMap, InfoWindow, Polyline} from "@react-google-maps/api";
import React from "react";

interface TravelHistoryTrailProps {
    center?: any;
    path?: TravelHistoryPoint[];
}

export interface TravelHistoryPoint {
    lat: number,
    lng: number,
    timestamp: string,
}

export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
    props
) => {
    const path = props.path;
    const center = props.center;
    const [polyLineWindows, updateWindows] = React.useState<TravelHistoryPoint[]>([]);

    const mapContainerStyle = {
        height: "100%",
        width: "100%",
    };

    const options = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: {paths: path},
        zIndex: 1,
    };

    function createTravelTrailWindows(point: TravelHistoryPoint) {
        return <InfoWindow position={{lat: point.lat, lng: point.lng}}>
            <div>{point.timestamp}</div>
        </InfoWindow>
    }

    function showStartEndTimesForTravelTrail() {
        if (path) {
            updateWindows(polyLineWindows => [...polyLineWindows, path[0]])
            updateWindows(polyLineWindows => [...polyLineWindows, path[path.length - 1]])
        }
    }

    return (
        <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
        >
            {polyLineWindows.map((point) => createTravelTrailWindows(point))}
            <Polyline path={path} options={options} onClick={() => showStartEndTimesForTravelTrail()}/>
        </GoogleMap>
    );
};
