import { useMediaQuery } from "@mui/material";
import React from "react";
import { HomeGreeting } from "../atoms/HomeGreeting";
import { PageHeader } from "../atoms/PageHeader";

export const DashboardInfo: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <>
      {matches && (
        <PageHeader
          pageTitle={"Home"}
          pageDescription={
            "Description of the Home Page (Dashboard) and What it Does"
          }
        />
      )}
      <HomeGreeting
        userName={"Jane"}
        time={"Afternoon"}
        date={"January 27th, 2022"}
        day={"Thursday"}
      />
    </>
  );
};
