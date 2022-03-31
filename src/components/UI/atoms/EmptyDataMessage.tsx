import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function EmptyDataMessage(): any {
  return (
    <Alert severity="warning">
      <AlertTitle>No data to show</AlertTitle>
      Your filter did not match anything.
    </Alert>
  );
}
