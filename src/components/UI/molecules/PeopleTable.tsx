import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import { Person } from "../../../util/queryService";

const NUM_COLS = 2;
const ROWS_PER_PAGE = 8;

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
  },
});

export const PeopleTable: React.FC = () => {
  const people: Person[] = [
    {
      name: "Jack Snow",
      id: "111",
    },
    {
      name: "Carey Hunter",
      id: "222",
    },
    {
      name: "Aren West",
      id: "222",
    },
  ];

  const [page, setPage] = useState(0);

  const pageChanged = useCallback((_: any, page: number) => {
    setPage(page);
  }, []);

  const rowCount = people.length;
  const maxPage = Math.floor(rowCount / ROWS_PER_PAGE);
  const adjustedPage = Math.min(page, maxPage);

  if (adjustedPage < page) {
    setPage(adjustedPage);
  }

  const emptyRowCount = Math.max(
    0,
    (1 + adjustedPage) * ROWS_PER_PAGE - rowCount
  );

  const pagePeople = people.slice(
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
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagePeople.map((person, index) => (
              <TableRow key={index}>
                <TableCell>{person.name}</TableCell>
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
