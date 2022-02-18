import React, {useEffect} from 'react';
import {GoogleMap, HeatmapLayer} from '@react-google-maps/api';
import {LocationReading} from "../organisms/Incidents";
import {useAppSelector} from "../../../store/store";
import {selectLocationPageEndDate, selectLocationPageStartDate} from "../../../store/slices/locationPageSlice";


const containerStyle = {
    width: '100%',
    height: '100%',
};

interface HazardousAreaHeatMapProps {
    accidents: LocationReading[];
    startDate?: any;
    endDate?: any;
    center?: any;
    zoom?: any;
}


export const HazardousAreaHeatMap: React.FC<HazardousAreaHeatMapProps> = (props) => {
    const [accidents, updateAccidents] = React.useState<LocationReading[]>(props.accidents)
    const [filteredAccidents, updateFilteredAccidents] = React.useState<google.maps.LatLng[]>([]);
    const center = props.center
    const zoom = props.zoom
    const startDate = useAppSelector(selectLocationPageStartDate);
    const endDate = useAppSelector(selectLocationPageEndDate);

    function inDateRange(date: Date, start: Date, end: Date): boolean {
        return !(date.getTime() < start.getTime() || date.getTime() > end.getTime());
    }

    useEffect(() => {
        updateAccidents(() => props.accidents)
    }, [props])

    useEffect(() => {
        updateFilteredAccidents([])
        accidents.map((accident: any) => {
            if (!inDateRange(new Date(accident.date), new Date(startDate), new Date(endDate))) {
                return;
            }
            updateFilteredAccidents(filteredAccidents =>
                [
                    ...filteredAccidents,
                    new google.maps.LatLng(
                        accident.coordinates.lat,
                        accident.coordinates.lng
                    )

                ])
        })
    }, [accidents, startDate, endDate])

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
            <HeatmapLayer
                data={filteredAccidents}
            />
        </GoogleMap>
    )
}

export default React.memo(HazardousAreaHeatMap)