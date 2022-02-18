import {GoogleMap, InfoWindow, Polyline} from "@react-google-maps/api";
import React, {useEffect} from "react";
import {useAppSelector} from "../../../store/store";
import {selectLocationPageEndDate, selectLocationPageStartDate} from "../../../store/slices/locationPageSlice";

interface TravelHistoryTrailProps {
    center?: any;
    path: TravelHistoryPoint[];
}

export interface TravelHistoryPoint {
    lat: number,
    lng: number,
    timestamp: string,
}

export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
    props
) => {
    const [path, updatePath] = React.useState<TravelHistoryPoint[]>(props.path);
    const [filteredPath, updateFilteredPath] = React.useState<TravelHistoryPoint[]>([])
    const center = props.center;
    const [polyLineWindows, updateWindows] = React.useState<TravelHistoryPoint[]>([]);
    const startDate = useAppSelector(selectLocationPageStartDate);
    const endDate = useAppSelector(selectLocationPageEndDate);

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

    function inDateRange(date: Date, start: Date, end: Date): boolean {
        return !(date.getTime() < start.getTime() || date.getTime() > end.getTime());
    }

    useEffect(() => {
        updatePath(() => props.path)
    }, [props])

    useEffect(() => {
        updateFilteredPath([])
        updateWindows([])
        path.map((history: any) => {
                if (!inDateRange(new Date(history.timestamp), new Date(startDate), new Date(endDate))) {
                    return;
                }
                updateFilteredPath(filteredPath =>
                    [
                        ...filteredPath,
                        history,
                    ])
            }
        )
    }, [path, startDate, endDate])

    function createTravelTrailWindows(point: TravelHistoryPoint) {
        return <InfoWindow position={{lat: point.lat, lng: point.lng}}>
            <div>{point.timestamp}</div>
        </InfoWindow>
    }

    function showStartEndTimesForTravelTrail() {
        if (filteredPath) {
            updateWindows(polyLineWindows => [...polyLineWindows, filteredPath[0]])
            updateWindows(polyLineWindows => [...polyLineWindows, filteredPath[filteredPath.length - 1]])
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
            <Polyline path={filteredPath} options={options} onClick={() => showStartEndTimesForTravelTrail()}/>
        </GoogleMap>
    );
};
