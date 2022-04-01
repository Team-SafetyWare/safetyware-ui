import { CircularProgress, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import { Person, useCompanyPeople } from "../../../util/queryService";
import { getCurrentUser, sortPeople } from "../../../index";
import OverlayStyles from "../../styling/OverlayStyles";
import Backdrop from "@mui/material/Backdrop";

const NUM_COLS = 2;
const ROWS_PER_PAGE = 8;

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
  },
});

export const PeopleTable: React.FC = () => {
  const overlayStyles = OverlayStyles();
  const user = getCurrentUser();

  const [loading, people] = usePeople(user?.company.id ?? "");

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
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
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
      </div>
    </>
  );
};

const usePeople = (companyId: string): [boolean, Person[]] => {
  const { loading, data } = useCompanyPeople({
    companyId: companyId,
  });
  return [loading, sortPeople(data?.company.people ?? [])];
};
