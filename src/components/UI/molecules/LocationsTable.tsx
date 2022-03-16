import React, { useCallback, useState } from "react";
import { Filter } from "./FilterBar";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { makeStyles } from "@mui/styles";
import {
  useCompanyLocations,
  usePersonLocations,
} from "../../../util/queryService";
import { getCurrentUser, sortPeople } from "../../../index";
import { TablePagination } from "@mui/material";

const NUM_COORD_DIGITS = 5;
const ROWS_PER_PAGE = 10;

interface PersonLocation {
  name: string;
  time: string;
  coordinates: string;
}

interface LocationsTableProps {
  filter?: Filter;
}

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
  },
});

export const LocationsTable: React.FC<LocationsTableProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [page, setPage] = useState(0);

  const locations: PersonLocation[] = [
    useLocationsInPerson(filter.person?.id || "", filter, !filter.person),
    useLocationsInCompany(user?.company.id || "", filter, !!filter.person),
  ].flat();

  const pageLocations = locations.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageChanged = useCallback((_: any, page: number) => {
    setPage(page);
  }, []);

  const styles = useStyles();

  return (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ fontWeight: "bold" }}>
              <TableCell className={styles.header}>Name</TableCell>
              <TableCell className={styles.header}>Time</TableCell>
              <TableCell className={styles.header}>Coordinates</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageLocations.map((location, index) => (
              <TableRow key={index}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.time}</TableCell>
                <TableCell>{location.coordinates}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        rowsPerPage={ROWS_PER_PAGE}
        count={locations.length}
        onPageChange={pageChanged}
        page={page}
      />
    </>
  );
};

const useLocationsInCompany = (
  companyId: string,
  filter: Filter,
  skip = false
): PersonLocation[] => {
  const { data } = useCompanyLocations(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    skip
  );
  return sortPeople(data?.company.people ?? [])
    .map((person) =>
      person.locationReadings.map((location) => ({
        name: person.name,
        time: new Date(location.timestamp).toISOString(),
        coordinates: formatCoordinates(location.coordinates),
      }))
    )
    .flat();
};

const useLocationsInPerson = (
  personId: string,
  filter: Filter,
  skip = false
): PersonLocation[] => {
  const { data } = usePersonLocations(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    skip
  );
  return (
    data?.person.locationReadings.map((location) => ({
      name: data.person.name,
      time: new Date(location.timestamp).toISOString(),
      coordinates: formatCoordinates(location.coordinates),
    })) ?? []
  );
};

const formatCoordinates = (coordinates: string[]): string =>
  `${Number(coordinates[1]).toFixed(NUM_COORD_DIGITS)},
  ${Number(coordinates[0]).toFixed(NUM_COORD_DIGITS)}`;
