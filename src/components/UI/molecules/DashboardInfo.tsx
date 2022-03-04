import { useMediaQuery } from "@mui/material";
import React from "react";
import { HomeGreeting } from "../atoms/HomeGreeting";
import { PageHeader } from "../atoms/PageHeader";

export const DashboardInfo: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");

  return (
    <>
      {matches && (
        <PageHeader
          pageTitle={"Home"}
          pageDescription={
            "Welcome to Blackline Safety's safety visualization web application. Add widgets to your dashboard, or explore each visualization type individually."
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
