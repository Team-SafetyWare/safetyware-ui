import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { IncidentReadings } from "../organisms/Incidents";

interface IncidentTableProps {
  incidents: IncidentReadings[];
}

function Row(props: { row: IncidentReadings }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.personName}</TableCell>
        <TableCell>{row.timestamp?.toLocaleString()}</TableCell>
        <TableCell>
          {row.coordinates.lng.toFixed(5)}, {row.coordinates.lat.toFixed(5)}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function IncidentTable(props: IncidentTableProps) {
  const rows: IncidentReadings[] = [];

  props.incidents.map((incidentReadings: IncidentReadings) =>
    rows.push(incidentReadings)
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Incident</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Coordinates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
