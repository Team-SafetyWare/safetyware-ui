import { CircularProgress, TablePagination } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { getCurrentUser, sortPeople, User } from "../../../index";
import {
  useCompanyLocations,
  usePersonLocations,
} from "../../../util/queryService";
import OverlayStyles from "../../styling/OverlayStyles";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import { Filter, shouldFilterPerson } from "./FilterBar";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [locationsInPersonLoading, locationsInCompanyLoading, locations] =
    useLocations(user, filter);

  useEffect(() => {
    if (locationsInPersonLoading || locationsInCompanyLoading) {
      setIsLoading(true);
      setIsEmpty(false);
    } else {
      setIsLoading(false);

      if (locations.length === 0) {
        setIsEmpty(true);
      }
    }
  }, [locationsInPersonLoading, locationsInCompanyLoading, locations]);

  const [page, setPage] = useState(0);

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

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={isLoading || isEmpty}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {isLoading && <CircularProgress />}
          {!isLoading && isEmpty && <EmptyDataMessage />}
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

const useLocations = (
  user: User | null,
  filter: Filter
): [boolean, boolean, PersonLocation[]] => {
  const [locationsInPersonLoading, locationsInPersonData] =
    useLocationsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    );
  const [locationsInCompanyLoading, locationsInCompanyData] =
    useLocationsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    );
  return [
    locationsInPersonLoading,
    locationsInCompanyLoading,
    [locationsInPersonData, locationsInCompanyData].flat(),
  ];
};

const useLocationsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): [boolean, PersonLocation[]] => {
  const { loading, data } = useCompanyLocations(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [
    loading,
    sortPeople(data?.company.people || [])
      .map((person) =>
        person.locationReadings
          .slice()
          .reverse()
          .map((location) => ({
            name: person.name,
            time: new Date(location.timestamp).toLocaleString(),
            coordinates: formatCoordinates(location.coordinates),
          }))
      )
      .flat(),
  ];
};

const useLocationsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): [boolean, PersonLocation[]] => {
  const { loading, data } = usePersonLocations(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [
    loading,
    data?.person.locationReadings.map((location) => ({
      name: data.person.name,
      time: new Date(location.timestamp).toLocaleString(),
      coordinates: formatCoordinates(location.coordinates),
    })) ?? [],
  ];
};

const formatCoordinates = (coordinates: string[]): string =>
  `${Number(coordinates[1]).toFixed(NUM_COORD_DIGITS)},
  ${Number(coordinates[0]).toFixed(NUM_COORD_DIGITS)}`;
