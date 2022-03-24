import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";
import GenericIcon from "../../../assets/generic.png";
import { Filter, shouldFilterPerson } from "../molecules/FilterBar";
import {
  Person,
  PersonWithGasReadings,
  useCompanyGasReadings,
  usePersonGasReadings,
} from "../../../util/queryService";
import {
  getCurrentUser,
  MAP_RESTRICTION,
  sortPeople,
  User,
} from "../../../index";
import { makeStyles } from "@mui/styles";
import { MapTooltip } from "../molecules/MapTooltip";
import LatLngLiteral = google.maps.LatLngLiteral;

interface GasDotMapProps {
  filter?: Filter;
}

interface GasMarker {
  person: Person;
  location: LatLngLiteral;
  density: string;
  densityUnits: string;
  gas: string;
  time: Date;
  icon: string;
}

const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.03,
  lng: -114.466,
};
const DEFAULT_MAP_ZOOM = 11;

const useStyles = makeStyles({
  tooltipText: {
    margin: "8px",
    whiteSpace: "nowrap",
  },
});

export const GasDotMap: React.FC<GasDotMapProps> = (props) => {
  const styles = useStyles();
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};
  const people: PersonWithGasReadings[] = usePeople(user, filter);

  const markers: GasMarker[] = intoMarkers(people);
  const [hoveredMarker, setHoveredMarker] = useState<GasMarker | undefined>();

  const onMarkerMouseOver = useCallback((marker: GasMarker) => {
    setHoveredMarker(marker);
  }, []);

  const onMarkerMouseOut = useCallback((marker: GasMarker) => {
    setHoveredMarker((prevMarker) =>
      JSON.stringify(marker) === JSON.stringify(prevMarker)
        ? undefined
        : prevMarker
    );
  }, []);

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        options={{
          gestureHandling: "greedy",
          restriction: MAP_RESTRICTION,
        }}
        zoom={DEFAULT_MAP_ZOOM}
        center={DEFAULT_MAP_CENTER}
      >
        {markers.map((marker) => (
          <Marker
            key={markerKey(marker)}
            position={marker.location}
            icon={marker.icon}
            onMouseOver={() => onMarkerMouseOver(marker)}
            onMouseOut={() => onMarkerMouseOut(marker)}
          />
        ))}
        {hoveredMarker && (
          <MapTooltip location={hoveredMarker.location} hoverDistance={"20px"}>
            <h3 className={styles.tooltipText}>Gas: {hoveredMarker.gas}</h3>
            <p className={styles.tooltipText}>
              Name: {hoveredMarker.person.name}
            </p>
            <p className={styles.tooltipText}>
              Time: {hoveredMarker.time.toISOString()}
            </p>
            <p className={styles.tooltipText}>
              Density: {hoveredMarker.density}
              {hoveredMarker.densityUnits}
            </p>
          </MapTooltip>
        )}
      </GoogleMap>
    </>
  );
};

const usePeople = (user: User | null, filter: Filter) =>
  sortPeople(
    [
      usePersonAsPeople(
        filter.person?.id || "",
        filter,
        shouldFilterPerson(filter)
      ),
      useGasReadingsInCompany(
        user?.company.id || "",
        filter,
        !shouldFilterPerson(filter)
      ),
    ].flat()
  );

const usePersonAsPeople = (
  personId: string,
  filter: Filter,
  execute = true
): PersonWithGasReadings[] => {
  const { data } = usePersonGasReadings(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  console.log(data);
  return (data && [data.person]) || [];
};

const useGasReadingsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): PersonWithGasReadings[] => {
  const { data } = useCompanyGasReadings(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return data?.company.people || [];
};

const intoMarkers = (people: PersonWithGasReadings[]): GasMarker[] =>
  people
    .map((person) =>
      person.gasReadings.map((gasReading) => ({
        person: person,
        location: {
          lat: Number(gasReading.coordinates[1]),
          lng: Number(gasReading.coordinates[0]),
        },
        icon: GenericIcon,
        time: new Date(gasReading.timestamp),
        density: gasReading.density,
        densityUnits: gasReading.densityUnits,
        gas: gasReading.gas,
      }))
    )
    .flat();

const markerKey = (marker: GasMarker): string => {
  const personId = marker.person.id;
  const time = marker.time.toISOString();
  return `${personId}-${time}`;
};
