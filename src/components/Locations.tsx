import React from "react";
import {CustomAccordion} from "./UI/atoms/CustomAccordion";
import {TravelHistoryTrail} from "./UI/atoms/TravelHistoryTrail";
import AccidentDotMap from "./UI/atoms/AccidentDotMap";

const center = {
    lat: 51.049999,
    lng: -114.1283,
};

const path = [
    {lat: 51.077763, lng: -114.140657},
    {lat: 51.046048773481786, lng: -114.02334120770176},
];

export const Locations: React.FC = () => {
    return (
        <>
            <CustomAccordion
                accordionHeight={"400px"}
                accordionWidth={""}
                accordionTitle={"Travel History Trail"}
                component={<TravelHistoryTrail center={center} path={path}/>}
            />
            <CustomAccordion
                accordionHeight={"400px"}
                accordionWidth={""}
                accordionTitle={"Accident Dot Map"}
                component={<AccidentDotMap accidents={path} center={center} zoom={10}/>}
            />
        </>
    );
};
