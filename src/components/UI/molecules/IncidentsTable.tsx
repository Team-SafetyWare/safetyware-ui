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
import { getCurrentUser, User } from "../../../index";
import {
  useCompanyIncidents,
  usePersonIncidents,
} from "../../../util/queryService";
import OverlayStyles from "../../styling/OverlayStyles";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import { Filter, shouldFilterPerson } from "./FilterBar";

const NUM_COORD_DIGITS = 5;
const NUM_COLS = 4;
const ROWS_PER_PAGE = 10;

interface PersonIncident {
  name: string;
  incident: string;
  time: string;
  coordinates: string;
}

interface IncidentsTableProps {
  filter?: Filter;
}

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
  },
});

export const IncidentsTable: React.FC<IncidentsTableProps> = (props) => {
  const overlayStyles = OverlayStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [incidentsInPersonLoading, incidentsInCompanyLoading, incidents] =
    useIncidents(user, filter);

  // eslint-disable-next-line prefer-const
  let [page, setPage] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageChanged = useCallback((_: any, page: number) => {
    setPage(page);
  }, []);

  const rowCount = incidents.length;
  const maxPage = Math.floor(rowCount / ROWS_PER_PAGE);
  const adjustedPage = Math.min(page, maxPage);

  if (adjustedPage < page) {
    setPage(adjustedPage);
  }

  const emptyRowCount = Math.max(
    0,
    (1 + adjustedPage) * ROWS_PER_PAGE - rowCount
  );

  const pageIncidents = incidents.slice(
    adjustedPage * ROWS_PER_PAGE,
    adjustedPage * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const colWidth = `${100 / NUM_COLS}%`;

  const styles = useStyles();

  useEffect(() => {
    if (incidentsInPersonLoading || incidentsInCompanyLoading) {
      setIsLoading(true);
      setIsEmpty(false);
    } else {
      setIsLoading(false);

      if (incidents.length === 0) {
        setIsEmpty(true);
      }
    }
  }, [incidentsInPersonLoading, incidentsInCompanyLoading, incidents]);

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
                  Incident
                </TableCell>
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
              {pageIncidents.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell>{incident.incident}</TableCell>
                  <TableCell>{incident.name}</TableCell>
                  <TableCell>{incident.time}</TableCell>
                  <TableCell>{incident.coordinates}</TableCell>
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

const useIncidents = (
  user: User | null,
  filter: Filter
): [boolean, boolean, PersonIncident[]] => {
  const [incidentsInPersonLoading, incidentsInPersonData] =
    useIncidentsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    );
  const [incidentsInCompanyLoading, incidentsInCompanyData] =
    useIncidentsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    );
  return [
    incidentsInPersonLoading,
    incidentsInCompanyLoading,
    [incidentsInPersonData, incidentsInCompanyData].flat(),
  ];
};

const useIncidentsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): [boolean, PersonIncident[]] => {
  const { loading, data } = useCompanyIncidents(
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
    data?.company.people
      .map((person) =>
        person.incidents.map((incident) => ({
          name: person.name,
          incident: incident.type,
          time: new Date(incident.timestamp).toLocaleString(),
          coordinates: formatCoordinates(incident.coordinates),
        }))
      )
      .flat()
      .reverse() ?? [],
  ];
};

const useIncidentsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): [boolean, PersonIncident[]] => {
  const { loading, data } = usePersonIncidents(
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
    data?.person.incidents.map((incident) => ({
      name: data.person.name,
      incident: incident.type,
      time: new Date(incident.timestamp).toLocaleString(),
      coordinates: formatCoordinates(incident.coordinates),
    })) ?? [],
  ];
};

const formatCoordinates = (coordinates: string[]): string =>
  `${Number(coordinates[1]).toFixed(NUM_COORD_DIGITS)},
  ${Number(coordinates[0]).toFixed(NUM_COORD_DIGITS)}`;
