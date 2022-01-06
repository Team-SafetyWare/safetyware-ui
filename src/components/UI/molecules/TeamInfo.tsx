import { makeStyles } from "@mui/styles";
import React from "react";
import { TeamSelect } from "../atoms/TeamSelect";
import { TeamTable } from "../atoms/TeamTable";

interface TeamInfoProps {}

const useStyles = makeStyles({});

export const TeamInfo: React.FC<TeamInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <TeamSelect></TeamSelect>
      <TeamTable></TeamTable>
    </>
  );
};
