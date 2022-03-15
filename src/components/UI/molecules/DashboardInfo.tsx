import { useMediaQuery } from "@mui/material";
import React from "react";
import { HomeGreeting } from "../atoms/HomeGreeting";
import { PageHeader } from "../atoms/PageHeader";

interface DashboardInfoProps {
  activeWidgetState?: any;
  inactiveWidgetState?: any;
  updateWidgetStates?: any;
  userName?: string;
  time?: string;
  date?: string;
  day?: string;
}

export const DashboardInfo: React.FC<DashboardInfoProps> = (props) => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");

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
        activeWidgetState={props.activeWidgetState}
        inactiveWidgetState={props.inactiveWidgetState}
        userName={"Jane"}
        time={"Afternoon"}
        date={"January 27th, 2022"}
        day={"Thursday"}
      />
    </>
  );
};
