import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { IncidentStat } from "../organisms/Incidents";

interface CustomCollapsibleTableProps {
  data?: IncidentStat[];
}

function createData(type: string, count: number) {
  return {
    type,
    count,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.type}
        </TableCell>
        <TableCell>{row.count}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CustomCollapsibleTable(
  props: CustomCollapsibleTableProps
) {
  const rows: IncidentStat[] = [];

  props.data?.map((datum: IncidentStat) =>
    rows.push(createData(datum.type, datum.count))
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.type} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
