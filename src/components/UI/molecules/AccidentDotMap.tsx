import React, { Component } from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

interface AccidentDotMapProps {
  accidents?: any;
  startDate?: any;
  endDate?: any;
}


export const AccidentDotMap: React.FC<AccidentDotMapProps> = (props) => {
  const accidents = props.accidents

  return (
      <LoadScript
          googleMapsApiKey=""
      >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
  )
}

export default React.memo(AccidentDotMap)


// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import GoogleMapReact from "google-map-react";
// import React from "react";

// export function AccidentDotMap(props: any) {
//   const defaultSettings = {
//     apiKey: "",
//     center: {
//       lat: 51.049999,
//       lng: -114.1283,
//     },
//     zoom: 11,
//   };
//
//   return (
//     <div
//       style={{
//         height: "50vh",
//         width: "50%",
//         // Arbitrarily picked value for some extra spacing
//         marginLeft: "260px",
//       }}
//     >
//       <GoogleMapReact
//         bootstrapURLKeys={{
//           key: defaultSettings.apiKey,
//           libraries: ["visualization"],
//         }}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => {
//           handleApiLoaded(map, maps);
//         }}
//         defaultCenter={defaultSettings.center}
//         defaultZoom={defaultSettings.zoom}
//       ></GoogleMapReact>
//     </div>
//   );
// }
//
// const handleApiLoaded = (map: any, maps: any) => {
//   const infoWindows = [];
//
//   const locations = [
//     { lat: 51.9, lng: -114.9 },
//     { lat: 51.9, lng: -114.9 },
//     { lat: 51.8, lng: -114.8 },
//     { lat: 51.7, lng: -114.7 },
//     { lat: 51.7, lng: -114.7 },
//     { lat: 51.6, lng: -114.6 },
//     { lat: 51.5, lng: -114.5 },
//     { lat: 51.4, lng: -114.4 },
//     { lat: 51.3, lng: -114.3 },
//     { lat: 51.2, lng: -114.2 },
//     { lat: 51.1, lng: -114.1 },
//     { lat: 51.0, lng: -114.0 },
//     { lat: 51.0, lng: -114.0 },
//     { lat: 51.0, lng: -114.0 },
//   ];
//
//   const infoWindow = new google.maps.InfoWindow({
//     content: "",
//     disableAutoPan: true,
//   });
//
//   const labels = "ABCDEFGHIJKLMN";
//
//   const markers = locations.map((position, i) => {
//     const label = labels[i % labels.length];
//     const marker = new google.maps.Marker({
//       position,
//       label,
//     });
//     marker.addListener("mouseover", () => {
//       infoWindow.setContent(
//         position.lat.toString() + " " + position.lng.toString()
//       );
//       infoWindow.open(map, marker);
//     });
//     marker.addListener("mouseout", () => {
//       infoWindow.close();
//     });
//
//     return marker;
//   });
//
//   new MarkerClusterer({ markers, map });
// };
