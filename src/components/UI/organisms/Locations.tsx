import React, {useEffect, useState} from "react";
import AccidentDotMap from "../atoms/AccidentDotMap";
import {CustomAccordion} from "../atoms/CustomAccordion";
import {HazardousAreaHeatMap} from "../atoms/HazardousAreaHeatMap";
import {TravelHistoryTrail} from "../atoms/TravelHistoryTrail";
import {useQuery} from "@apollo/client";
import {GET_LOCATIONS} from "../../../util/queryService";

const center = {
    lat: 51.049999,
    lng: -114.1283,
};

const path = [
    {lat: 51.077763, lng: -114.140657},
    {lat: 51.046048773481786, lng: -114.02334120770176},
];

const pathAsLocation = [
    {coordinates: {lat: 51.077763, lng: -114.140657}},
    {coordinates: {lat: 51.046048773481786, lng: -114.02334120770176}},
];

export interface LocationReading {
    coordinates: {
        lng: number
        lat: number
    }
    name?: string
}

export const Locations: React.FC = () => {
    const [locations, addLocation] = React.useState<LocationReading[]>([]);
    const {loading, error, data} = useQuery(
        GET_LOCATIONS,
    );

    useEffect(() => {
        if (!loading && data) {
            data.locationReadings.map(
                (location: any) => {
                    addLocation(locations => [...locations,
                        {coordinates: {lng: location.coordinates[0], lat: location.coordinates[1]},
                            name: location.person.name}
                    ])
                }
            )
        }
    }, [loading, data])

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
