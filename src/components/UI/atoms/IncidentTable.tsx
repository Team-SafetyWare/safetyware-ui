import React from "react"
import { useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Fragment, useEffect, useState } from "react";
import {
  selectIncidentPageEndDate,
  selectIncidentPageStartDate,
} from "../../../store/slices/incidentPageSlice";
import { useAppSelector } from "../../../store/store";
import { IncidentReadings } from "../organisms/Incidents";

interface IncidentTableProps {
  incidents: IncidentReadings[];
}

function Row(props: { row: IncidentReadings; matches: boolean }) {
  const row = props.row;

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.type}</TableCell>
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

export default function IncidentTable(props: IncidentTableProps): any {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");

  const [incidents, updateIncidents] = useState<IncidentReadings[]>([]);
  const [filteredIncidents, updateFilteredIncidents] = useState<
    IncidentReadings[]
  >([]);
  const startDate = useAppSelector(selectIncidentPageStartDate);
  const endDate = useAppSelector(selectIncidentPageEndDate);

  function inDateRange(date: Date, start: Date, end: Date): boolean {
    return !(
      date.getTime() < start.getTime() || date.getTime() > end.getTime()
    );
  }

  useEffect(() => {
    updateIncidents(() => props.incidents);
  }, [props]);

  function createIncident(incident: any) {
    return {
      coordinates: {
        lat: incident.coordinates.lat,
        lng: incident.coordinates.lng,
      },
      timestamp: incident.timestamp,
      personName: incident.personName,
      companyName: incident.companyName,
      type: incident.type,
    };
  }

  useEffect(() => {
    updateFilteredIncidents([]);
    incidents.map((incident: any) => {
      if (
        !inDateRange(
          new Date(incident.timestamp),
          new Date(startDate),
          new Date(endDate)
        )
      ) {
        return;
      }
      updateFilteredIncidents((filteredIncidents) => [
        ...filteredIncidents,
        createIncident(incident),
      ]);
    });
  }, [incidents, startDate, endDate]);

  const rows: IncidentReadings[] = [];

  filteredIncidents.map((incidentReadings: IncidentReadings) =>
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
