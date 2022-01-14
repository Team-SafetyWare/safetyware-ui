import React, { Component } from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {MarkerClusterer} from "@react-google-maps/api";

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

  function createMarker(location: google.maps.LatLng | google.maps.LatLngLiteral) {
    return <Marker position={location} />;
  }

  return (
      <LoadScript
          googleMapsApiKey="AIzaSyDhIdO6e613tOUvdV737val1-HWbmoL4s4"
      >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
          {accidents.map((accident: google.maps.LatLng | google.maps.LatLngLiteral) => createMarker(accident))}
        </GoogleMap>
      </LoadScript>
  )
}

export default React.memo(AccidentDotMap)