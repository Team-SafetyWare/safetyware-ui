import React from 'react';
import {GoogleMap, InfoWindow, Marker} from '@react-google-maps/api';
import {LocationReading} from '../organisms/Locations';

const containerStyle = {
    width: '100%',
    height: '100%',
};

interface AccidentDotMapProps {
    accidents?: any;
    startDate?: any;
    endDate?: any;
    center?: any;
    zoom?: any;
}

export const AccidentDotMap: React.FC<AccidentDotMapProps> = (props) => {
    const accidents = props.accidents
    const zoom = props.zoom
    const center = props.center
    const [markerWindows, updateMarkerWindow] = React.useState<LocationReading[]>([]);

    function createMarker(location: LocationReading) {
        return <Marker position={location.coordinates} onClick={() => {
            updateMarkerWindow(markerWindows => [...markerWindows, location])
        }}/>;
    }

    function createMarkerWindow(location: LocationReading) {
        return <InfoWindow position={location.coordinates} onCloseClick={() => deleteMarkerWindow(location)}>
            <div>{location.name}</div>
        </InfoWindow>
    }

    function deleteMarkerWindow(location: LocationReading) {
        let temp = [...markerWindows]
        let index = temp.indexOf(location)
        if (index !== -1) {
            temp.splice(index, 1)
            updateMarkerWindow(temp)
        }
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
            {markerWindows.map((markerWindow) => createMarkerWindow(markerWindow))}
            {accidents.map((accident: LocationReading) => createMarker(accident))}
        </GoogleMap>
    )
}

export default React.memo(AccidentDotMap)