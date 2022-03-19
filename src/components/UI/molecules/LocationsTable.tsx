import React, { useCallback, useEffect, useState } from "react";
import { Filter, shouldFilterPerson } from "./FilterBar";
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
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";

const NUM_COORD_DIGITS = 5;
const NUM_COLS = 3;
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
  const overlayStyles = OverlayStyles();
  const [isEmpty, setIsEmpty] = React.useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const locations: PersonLocation[] = [
    useLocationsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    ),
    useLocationsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    ),
  ].flat();

  // eslint-disable-next-line prefer-const
  let [page, setPage] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageChanged = useCallback((_: any, page: number) => {
    setPage(page);
  }, []);

  const rowCount = locations.length;
  const maxPage = Math.floor(rowCount / ROWS_PER_PAGE);
  const adjustedPage = Math.min(page, maxPage);

  if (adjustedPage < page) {
    setPage(adjustedPage);
  }

  const emptyRowCount = Math.max(
    0,
    (1 + adjustedPage) * ROWS_PER_PAGE - rowCount
  );

  const pageLocations = locations.slice(
    adjustedPage * ROWS_PER_PAGE,
    adjustedPage * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const colWidth = `${100 / NUM_COLS}%`;

  const styles = useStyles();

  useEffect(() => {
    if (locations.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [locations]);

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={isEmpty}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <EmptyDataMessage />
        </Backdrop>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={styles.header} width={colWidth}>
                  Name
                </TableCell>
                <TableCell className={styles.header} width={colWidth}>
                  Time
                </TableCell>
                <TableCell className={styles.header} width={colWidth}>
                  Coordinates
                </TableCell>
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
              {emptyRowCount > 0 && (
                <TableRow style={{ height: 53 * emptyRowCount }}>
                  <TableCell colSpan={NUM_COLS} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[ROWS_PER_PAGE]}
          rowsPerPage={ROWS_PER_PAGE}
          count={rowCount}
          onPageChange={pageChanged}
          page={adjustedPage}
        />
      </div>
    </>
  );
};

const useLocationsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): PersonLocation[] => {
  const { data } = useCompanyLocations(
    {
      companyId: companyId,
      filter: filter,
    },
    execute
  );
  return sortPeople(data?.company.people || [])
    .map((person) =>
      person.locationReadings
        .slice()
        .reverse()
        .map((location) => ({
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
  execute = true
): PersonLocation[] => {
  const { data } = usePersonLocations(
    {
      personId: personId,
      filter: filter,
    },
    execute
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
