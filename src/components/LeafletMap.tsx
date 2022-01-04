import * as React from 'react';
import {render} from "react-dom";

import {MapContainer} from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

export const LeafletMap = () => {
    return (
        <div>
            <MapContainer
                style={{height: "500px", width: "500px"}}
                zoom={13}
                center={[10, 10]}
            >
                <ReactLeafletGoogleLayer/>
            </MapContainer>
        </div>
    );
};