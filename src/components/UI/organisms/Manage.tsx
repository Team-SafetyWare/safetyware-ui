import React from "react";
import { PageHeader } from "../atoms/PageHeader";
import { Card, CardHeader, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PeopleTable } from "../molecules/PeopleTable";

const useStyles = makeStyles({
  pageCard: {
    marginBottom: "16px",
  },
});

export const Manage: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <PageHeader
        pageTitle={"Manage"}
        pageDescription={"Manage people and devices."}
      />

      <Card className={styles.pageCard}>
        <CardHeader
          title={"People"}
          subheader="Register people to include their information."
        />
        <CardMedia>
          <PeopleTable />
        </CardMedia>
      </Card>
    </>
  );
};
