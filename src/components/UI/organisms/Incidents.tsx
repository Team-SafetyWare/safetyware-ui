import React, {useEffect} from "react";
import { BarGraph } from "../atoms/BarGraph";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import IncidentDotMap from "../atoms/IncidentDotMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import {useQuery} from "@apollo/client";
import {GET_LOCATIONS} from "../../../util/queryService";

const barGraphData = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

const incidents = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

export interface LocationReading {
    coordinates: {
        lng: number
        lat: number
    }
    name?: string
}

export const Incidents: React.FC = () => {
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
      <PageHeader
        pageTitle={"Incidents"}
        pageDescription={"Description of the Incidents Page and What it Does"}
      />
      <PageSectionHeader
        sectionTitle={"Raw Incidents Data"}
        sectionDescription={"Explore and Download Raw Incidents Data"}
        download={true}
      />
      <CustomAccordion
        accordionHeight={"auto"}
        accordionWidth={""}
        accordionTitle={"Raw Incidents Data Table"}
        component={<CustomCollapsibleTable />}
      />
      <PageSectionHeader
        sectionTitle={"Incidents Visualizations"}
        sectionDescription={"Visualize Incidents Data"}
        download={false}
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Incident Dot Map"}
        component={
          <IncidentDotMap incidents={locations} center={center} zoom={10} />
        }
      />
      <CustomAccordion
        accordionHeight={"400px"}
        accordionWidth={""}
        accordionTitle={"Incidents Bar Graph"}
        component={<BarGraph data={barGraphData} />}
      />
    </>
  );
};
