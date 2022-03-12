import { useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { Fragment } from "react";
import { GasReading } from "../organisms/Gases";

interface GasesTableProps {
  gasReadings: GasReading[];
}

function Row(props: { row: GasReading; matches: boolean }) {
  const row = props.row;

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.gas}</TableCell>
        <TableCell>
          {row.density} {row.densityUnits}
        </TableCell>
        <TableCell>{row.personName}</TableCell>
        <TableCell>
          {row.timestamp?.toLocaleString([], {
            dateStyle: props.matches ? "full" : "medium",
            timeStyle: props.matches ? "short" : undefined,
          })}
        </TableCell>
        {props.matches && (
          <TableCell>
            {row.coordinates.lng.toFixed(5)}, {row.coordinates.lat.toFixed(5)}
          </TableCell>
        )}
      </TableRow>
    </Fragment>
  );
}

export default function GasesTable(props: GasesTableProps): any {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");

  const rows: GasReading[] = [];

  props.gasReadings.map((gasReading: GasReading) => rows.push(gasReading));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Gas</TableCell>
            <TableCell>Density</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Time</TableCell>
            {matches && <TableCell>Coordinates</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            // eslint-disable-next-line react/jsx-key
            <Row row={row} matches={matches} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
