import React from 'react';
import {GoogleMap, InfoWindow, Marker} from '@react-google-maps/api';
import MarkerIcon from '../../../assets/AccidentDotMapDot.png';

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
    return <div>loading</div>
}

export default React.memo(AccidentDotMap)