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

export const People: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <PageHeader
        pageTitle={"People"}
        pageDescription={"Manage people and devices."}
      />

      <Card className={styles.pageCard}>
        <CardHeader
          title={"People"}
          subheader="Register people to analyze their information."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <PeopleTable />
          </div>
        </CardMedia>
      </Card>
    </>
  );
};
