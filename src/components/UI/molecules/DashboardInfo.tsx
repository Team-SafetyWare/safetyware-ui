import { useMediaQuery } from "@mui/material";
import React from "react";
import { HomeGreeting } from "../atoms/HomeGreeting";
import { PageHeader } from "../atoms/PageHeader";

interface DashboardInfoProps {
  activeWidgetState?: any;
  inactiveWidgetState?: any;
  addWidget?: any;
  userName?: string;
  editDashboardMode?: any;
  setEditDashboardMode?: any;
}

export const DashboardInfo: React.FC<DashboardInfoProps> = (props) => {
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
        activeWidgetState={props.activeWidgetState}
        inactiveWidgetState={props.inactiveWidgetState}
        addWidget={props.addWidget}
        userName={props.userName?.substring(0, props.userName.indexOf(" "))}
        editDashboardMode={props.editDashboardMode}
        setEditDashboardMode={props.setEditDashboardMode}
      />
    </>
  );
};
