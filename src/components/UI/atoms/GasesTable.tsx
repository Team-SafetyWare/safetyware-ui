import React, { useCallback, useState } from "react";
import { Filter, shouldFilterPerson } from "../molecules/FilterBar";
import { makeStyles } from "@mui/styles";
import { getCurrentUser, User } from "../../../index";
import {
  useCompanyGasReadings,
  usePersonGasReadings,
} from "../../../util/queryService";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { TablePagination } from "@mui/material";

const NUM_COORD_DIGITS = 5;
const NUM_COLS = 5;
const ROWS_PER_PAGE = 10;

interface PersonGasReading {
  name: string;
  gas: string;
  time: string;
  coordinates: string;
  density: string;
  densityUnits: string;
}

interface GasesTableProps {
  filter?: Filter;
}

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
  },
});

export const GasesTable: React.FC<GasesTableProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};
  const gasReadings: PersonGasReading[] = useGasReadings(user, filter);

  const [page, setPage] = useState(0);
  const pageChanged = useCallback((_: any, page: number) => {
    setPage(page);
  }, []);

  const rowCount = gasReadings.length;
  const maxPage = Math.floor(rowCount / ROWS_PER_PAGE);
  const adjustedPage = Math.min(page, maxPage);

  if (adjustedPage < page) {
    setPage(adjustedPage);
  }

  const emptyRowCount = Math.max(
    0,
    (1 + adjustedPage) * ROWS_PER_PAGE - rowCount
  );

  const pageGasReadings = gasReadings.slice(
    adjustedPage * ROWS_PER_PAGE,
    adjustedPage * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const colWidth = `${100 / NUM_COLS}%`;

  const styles = useStyles();

  return (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={styles.header} width={colWidth}>
                Time
              </TableCell>
              <TableCell className={styles.header} width={colWidth}>
                Gas
              </TableCell>
              <TableCell className={styles.header} width={colWidth}>
                Density
              </TableCell>
              <TableCell className={styles.header} width={colWidth}>
                Name
              </TableCell>
              <TableCell className={styles.header} width={colWidth}>
                Coordinates
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageGasReadings.map((gasReading, index) => (
              <TableRow key={index}>
                <TableCell>{gasReading.time}</TableCell>
                <TableCell>{gasReading.gas}</TableCell>
                <TableCell>
                  {gasReading.density + " " + gasReading.densityUnits}
                </TableCell>
                <TableCell>{gasReading.name}</TableCell>
                <TableCell>{gasReading.coordinates}</TableCell>
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
    </>
  );
};

const useGasReadings = (user: User | null, filter: Filter) =>
  [
    useGasReadingsInPerson(
      filter.person?.id || "",
      filter,
      shouldFilterPerson(filter)
    ),
    useGasReadingsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    ),
  ].flat();

const useGasReadingsInPerson = (
  personId: string,
  filter: Filter,
  execute = true
): PersonGasReading[] => {
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
  return (
    data?.person.gasReadings.map((gasReading) => ({
      name: data.person.name,
      gas: gasReading.gas,
      time: gasReading.timestamp,
      coordinates: formatCoordinates(gasReading.coordinates),
      density: gasReading.density,
      densityUnits: gasReading.densityUnits,
    })) ?? []
  );
};

const useGasReadingsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): PersonGasReading[] => {
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
  return (
    data?.company.people
      .map((person) =>
        person.gasReadings.map((gasReading) => ({
          name: person.name,
          gas: gasReading.gas,
          time: gasReading.timestamp,
          coordinates: formatCoordinates(gasReading.coordinates),
          density: gasReading.density,
          densityUnits: gasReading.densityUnits,
        }))
      )
      .flat()
      .reverse() ?? []
  );
};

const formatCoordinates = (coordinates: string[]): string =>
  `${Number(coordinates[1]).toFixed(NUM_COORD_DIGITS)},
  ${Number(coordinates[0]).toFixed(NUM_COORD_DIGITS)}`;
