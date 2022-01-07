import React from "react";
import GoogleMapReact from 'google-map-react'
import {render} from "react-dom";

export const GoogleMapsHeatMap = () => {
    const defaultProps = {
        apiKey: "",
        center: {
            lat: 51.049999,
            lng: -114.1283
        },
        zoom: 11
    };

    const heatMapData = {
        positions: [
            {lat: 51.9, lng: -114.9},
            {lat: 51.9, lng: -114.9},
            {lat: 51.8, lng: -114.8},
            {lat: 51.7, lng: -114.7},
            {lat: 51.7, lng: -114.7},
            {lat: 51.6, lng: -114.6},
            {lat: 51.5, lng: -114.5},
            {lat: 51.4, lng: -114.4},
            {lat: 51.3, lng: -114.3},
            {lat: 51.2, lng: -114.2},
            {lat: 51.1, lng: -114.1},
            {lat: 51.0, lng: -114.0},
            {lat: 51.0, lng: -114.0},
            {lat: 51.0, lng: -114.0},
        ],
        options: {
            radius: 20,
            opacity: 0.6
        }
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: defaultProps.apiKey,
                    libraries:['visualization']
                }}
                heatmapLibrary={true}
                heatmap={heatMapData}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            </GoogleMapReact>
        </div>
    );
}