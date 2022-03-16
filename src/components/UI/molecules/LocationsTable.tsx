import React from "react";
import { Filter } from "./FilterBar";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { makeStyles } from "@mui/styles";

interface LocationsTableProps {
  filter?: Filter;
}

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
  },
});

export const LocationsTable: React.FC<LocationsTableProps> = (props) => {
  const styles = useStyles();

  return (
    <TableContainer sx={{ maxHeight: "600px" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow style={{ fontWeight: "bold" }}>
            <TableCell className={styles.header}>Name</TableCell>
            <TableCell className={styles.header}>Time</TableCell>
            <TableCell className={styles.header}>Coordinates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array.from(Array(100).keys())].map((n) => (
            <TableRow key={n}>
              <TableCell>Dylan {n}</TableCell>
              <TableCell>Jones</TableCell>
              <TableCell>123, 123</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
