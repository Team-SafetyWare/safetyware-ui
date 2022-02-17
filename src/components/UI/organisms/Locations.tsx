import React, {useEffect} from "react";
import {CustomAccordion} from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import {useQuery} from "@apollo/client";
import {GET_LOCATIONS} from "../../../util/queryService";
import { HazardousAreaHeatMap } from "../atoms/HazardousAreaHeatMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { TravelHistoryTrail, TravelHistoryPoint } from "../atoms/TravelHistoryTrail";
import { CustomBoxReduced } from "../molecules/CustomBoxReduced";
import { LocationReading } from "./Incidents";

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

const path = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const user = "PersonA";
const view = "User";
const incidentType = "All";
const startDate = new Date("01/01/2022");
const endDate = new Date("01/08/2022");

export const locationPageLabel = "locationPage";

export const Locations: React.FC = () => {
    const [locations, addLocation] = React.useState<LocationReading[]>([]);
    const [travelTrail, updateTravelTrail] = React.useState<TravelHistoryPoint[]>([]);
    const {loading, error, data} = useQuery(
        GET_LOCATIONS,
    );


    useEffect(() => {
        if (!loading && data) {
            data.locationReadings.map(
                (location: any) => {
                    addLocation(locations => [...locations,
                        {coordinates: {lng: location.coordinates[0], lat: location.coordinates[1]}}
                    ])
                    updateTravelTrail(travelTrail => [...travelTrail, {
                        lat: location.coordinates[1],
                        lng: location.coordinates[0],
                        timestamp: location.timestamp
                    }])
                }
            )
        }
    }, [loading, data])

    return (
        <>
            <PageHeader
                pageTitle={"Locations"}
                pageDescription={"Description of the Locations Page and What it Does"}
            />
            <PageSectionHeader
                sectionTitle={"Raw Locations Data"}
                sectionDescription={"Explore and Download Raw Locations Data"}
                download={true}
            />
            <CustomAccordion
                accordionHeight={"auto"}
                accordionWidth={""}
                accordionTitle={"Raw Locations Data Table"}
                component={<CustomCollapsibleTable/>}
            />
            <PageSectionHeader
                sectionTitle={"Locations Visualizations"}
                sectionDescription={"Visualize Locations Data"}
                download={false}
            />
            <CustomAccordion
                accordionHeight={"400px"}
                accordionWidth={""}
                accordionTitle={"Travel History Trail"}
                component={<TravelHistoryTrail center={center} path={travelTrail}/>}
            />
            <CustomAccordion
                accordionHeight={"400px"}
                accordionWidth={""}
                accordionTitle={"Hazardous Area Heat Map"}
                component={
                    <HazardousAreaHeatMap accidents={locations} center={center} zoom={10}/>
                }
            />
            <CustomBoxReduced
                user={user}
                view={view}
                startDate={startDate}
                endDate={endDate}
                pageLabel={locationPageLabel}
            />
        </>
    );
};
