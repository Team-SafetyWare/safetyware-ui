import {GoogleMap, HeatmapLayer, InfoWindow, Marker} from "@react-google-maps/api";
import React, {useEffect} from "react";
import GenericIcon from "../../../assets/generic.png";
import {
    selectGasPageEndDate,
    selectGasPageName,
    selectGasPageStartDate,
} from "../../../store/slices/gasPageSlice";
import {useAppSelector} from "../../../store/store";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";
import {Filter} from "../molecules/FilterBar";
import {
    GasReading, Incident, Person,
    useCompanyGasReadings
} from "../../../util/queryService";
import {DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, getCurrentUser, sortPeople} from "../../../index";
import LatLngLiteral = google.maps.LatLngLiteral;

interface GasDotMapProps {
    filter?: Filter;
}

interface GasReadingPoint {
    gasReading: GasReading;
    person: Person;
}

export const GasDotMap: React.FC<GasDotMapProps> = (props) => {
    const user = getCurrentUser();
    const filter: Filter = props.filter ?? {};
    let gasReadingPoints: GasReadingPoint[] = [
        //   usePersonAsPeople(filter.person?.id || "", filter, !filter.person),
        useGasReadingsInCompany(user?.company.id || "", filter, !!filter.person),
    ].flat();

    console.log(gasReadingPoints)

    // const points: GasPoint[] = intoPoints(incidents);

    return (
        <>
            <GoogleMap
                mapContainerStyle={{
                    height: "100%",
                    width: "100%",
                }}
                options={{gestureHandling: "greedy"}}
                zoom={DEFAULT_MAP_ZOOM}
                center={DEFAULT_MAP_CENTER}
            >
            </GoogleMap>
        </>
    );
};

export default React.memo(GasDotMap);

const useGasReadingsInCompany = (
    companyId: string,
    filter: Filter,
    skip = false
): GasReadingPoint[] => {
    const {data} = useCompanyGasReadings(
        {
            companyId: companyId,
            filter: {
                minTimestamp: filter.minTimestamp,
                maxTimestamp: filter.maxTimestamp,
            },
        },
        skip
    );
    return data?.company.people.map((person) => {
        return person.gasReadings.map((gasReading) => (
            {
                gasReading: gasReading,
                person: {
                    id: person.id,
                    name: person.name,
                }
            }
        ))
    }).flat() || [];
};

// const intoPoints = (gasReadings: GasReading[]): GasPoint[] => {
//     return gasReadings.map((gasReading) => ({
//         location: new LatLng(
//             Number(gasReading.coordinates[1]),
//             Number(gasReading.coordinates[0])
//         )
//     }));
// };