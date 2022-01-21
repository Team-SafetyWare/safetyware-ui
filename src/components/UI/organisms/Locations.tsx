import React, {useState} from "react";
import AccidentDotMap from "../atoms/AccidentDotMap";
import {CustomAccordion} from "../atoms/CustomAccordion";
import {HazardousAreaHeatMap} from "../atoms/HazardousAreaHeatMap";
import {TravelHistoryTrail} from "../atoms/TravelHistoryTrail";
import {useQuery} from "@apollo/client";
import {GET_LOCATIONS} from "../../../queryService";

const center = {
    lat: 51.049999,
    lng: -114.1283,
};

const path = [
    {lat: 51.077763, lng: -114.140657},
    {lat: 51.046048773481786, lng: -114.02334120770176},
];

interface Location {
    lat: number
    lng: number
}

export const Locations: React.FC = () => {
    const [locations, addLocation] = React.useState<Location[]>([]);
    const {loading, error, data} = useQuery(
        GET_LOCATIONS,
        {
            onCompleted: () => {
                data.locationReadings.map(
                    (location: any) => {
                        addLocation([...locations, {lat: location.coordinates[1], lng: location.coordinates[0]}])
                        // locations.push({lat: location.coordinates[1], lng: location.coordinates[0]})
                    }
                )
            }
        }
    );

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
                component={
                    <AccidentDotMap accidents={locations} center={center} zoom={10}/>
                }
            />
            <CustomAccordion
                accordionHeight={"400px"}
                accordionWidth={""}
                accordionTitle={"Hazardous Area Heat Map"}
                component={
                    <HazardousAreaHeatMap accidents={path} center={center} zoom={10}/>
                }
            />
        </>
    );
};
