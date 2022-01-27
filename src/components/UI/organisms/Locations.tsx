import React, {useEffect} from "react";
import {CustomAccordion} from "../atoms/CustomAccordion";
import {HazardousAreaHeatMap} from "../atoms/HazardousAreaHeatMap";
import {TravelHistoryTrail} from "../atoms/TravelHistoryTrail";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import { PageHeader } from "../atoms/PageHeader";
import {PageSectionHeader} from "../atoms/PageSectionHeader";
import {useQuery} from "@apollo/client";
import {GET_LOCATIONS} from "../../../util/queryService";
import {LocationReading} from "./Incidents";

const center = {
    lat: 51.049999,
    lng: -114.1283,
};

const path = [
    {lat: 51.077763, lng: -114.140657},
    {lat: 51.046048773481786, lng: -114.02334120770176},
];

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
                        {coordinates: {lng: location.coordinates[0], lat: location.coordinates[1]}}
                    ])
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
        component={<CustomCollapsibleTable />}
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
        component={<TravelHistoryTrail center={center} path={path} />}
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Hazardous Area Heat Map"}
        component={
          <HazardousAreaHeatMap accidents={locations} center={center} zoom={10} />
        }
      />
    </>
  );
};
