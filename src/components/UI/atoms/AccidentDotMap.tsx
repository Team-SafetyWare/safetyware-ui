import React from 'react';
import {GoogleMap, InfoWindow, Marker} from '@react-google-maps/api';
import {setFlagsFromString} from "v8";
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
  const [markerWindowLat, updateWindowLat] = React.useState(51.049999)
  const [markerWindowLng, updateWindowLng] = React.useState(-114.1283)
  const [markerWindowText, updateWindowText] = React.useState("Test")
  // const [markerWindows, updateMarkerWindows] = React.useState([])

  const handleHover = (location: any) => {
    console.log("nothing")
  }


  function createMarker(location: LocationReading) {
    return <Marker position={location.coordinates}/>;
  }

  function createMarkerWindow(location: any) {

  }


  return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
          {accidents.map((accident: LocationReading) => createMarker(accident))}
        </GoogleMap>
  )
}

export default React.memo(AccidentDotMap)