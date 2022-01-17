import React from 'react';
import {GoogleMap, HeatmapLayer} from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '100%',
};

interface HazardousAreaHeatMapProps {
    accidents?: any;
    startDate?: any;
    endDate?: any;
    center?: any;
    zoom?: any;
}


export const HazardousAreaHeatMap: React.FC<HazardousAreaHeatMapProps> = (props) => {
    const accidents = props.accidents == undefined ? [] : props.accidents
    const center = props.center
    const zoom = props.zoom

    function createHeatMapData() {
        let data = []
        for (const accident of accidents) {
            data.push(new google.maps.LatLng(accident.lat, accident.lng))
        }
        return data
    }

    return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                <HeatmapLayer
                    data={createHeatMapData()}
                />
            </GoogleMap>
    )
}

export default React.memo(HazardousAreaHeatMap)