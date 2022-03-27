import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { DashboardWidgetWrapper } from "../atoms/DashboardWidgetWrapper";
import { DashboardInfo } from "../molecules/DashboardInfo";
import { DashboardSummary } from "../molecules/DashboardSummary";

interface HomeProps {
  userName?: string;
}

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  dashboardContent: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        marginLeft: "16px",
        marginRight: "16px",
      },
  },
});

export const Home: React.FC<HomeProps> = (props) => {
  const styles = useStyles();

  const [editDashboardMode, setEditDashboardMode] = useState(false);

  const [summaryWidgets, setSummaryWidgets] = useState([
    {
      summaryName: "New Location Updates",
      summary: "NewLocationUpdates",
    },
    {
      summaryName: "New Incidents",
      summary: "NewIncidents",
    },
    {
      summaryName: "New Gas Readings",
      summary: "NewGasReadings",
    },
  ]);

  const [inactiveWidgets, setInactiveWidgets] = useState([
    {
      widgetName: "Hazardous Area Heat Map",
      widget: "HazardMap",
    },
    {
      widgetName: "Incident Bar Graph",
      widget: "IncidentsBarGraph",
    },
  ]);

  const [activeWidgets, setActiveWidgets] = useState([
    {
      widgetName: "Incident Dot Map",
      widget: "IncidentsMap",
    },
    {
      widgetName: "Travel History Trail",
      widget: "TravelMap",
    },
  ]);

  const saveState = () => {
    const state = JSON.stringify({
      summaryWidgets: summaryWidgets,
      inactiveWidgets: inactiveWidgets,
      activeWidgets: activeWidgets,
    });
    localStorage.setItem("dashboardState", state);
    console.log("Saving State!");
  };

  const loadState = () => {
    console.log("Loading State!");
    const dashboardState = localStorage.getItem("dashboardState");
    if (dashboardState === null) {
      setSummaryWidgets([
        {
          summaryName: "New Location Updates",
          summary: "NewLocationUpdates",
        },
        {
          summaryName: "New Incidents",
          summary: "NewIncidents",
        },
        {
          summaryName: "New Gas Readings",
          summary: "NewGasReadings",
        },
      ]);
      setInactiveWidgets([
        {
          widgetName: "Hazardous Area Heat Map",
          widget: "HazardMap",
        },
        {
          widgetName: "Incident Bar Graph",
          widget: "IncidentsBarGraph",
        },
      ]);
      setActiveWidgets([
        {
          widgetName: "Incident Dot Map",
          widget: "IncidentsMap",
        },
        {
          widgetName: "Travel History Trail",
          widget: "TravelMap",
        },
      ]);
    } else {
      const result = JSON.parse(dashboardState);
      setSummaryWidgets(result["summaryWidgets"]);
      setInactiveWidgets(result["inactiveWidgets"]);
      setActiveWidgets(result["activeWidgets"]);
    }
  };

  useEffect(() => loadState(), []);
  useEffect(
    () => saveState(),
    [editDashboardMode, summaryWidgets, activeWidgets]
  );

  const dashboardEditToggle = () => {
    setEditDashboardMode((prevEditDashboardMode) => !prevEditDashboardMode);
  };

  const addWidget = (selectedWidget: any) => {
    setActiveWidgets([...activeWidgets, selectedWidget]);

    const array = [...inactiveWidgets];
    array.splice(inactiveWidgets.indexOf(selectedWidget), 1);
    setInactiveWidgets(array);
  };

  const removeWidget = (selectedWidget: any) => {
    setInactiveWidgets([...inactiveWidgets, selectedWidget]);

    const array = [...activeWidgets];
    array.splice(activeWidgets.indexOf(selectedWidget), 1);
    setActiveWidgets(array);
  };

  return (
    <div className={styles.dashboardContent}>
      <DashboardInfo
        activeWidgetState={activeWidgets}
        inactiveWidgetState={inactiveWidgets}
        addWidget={addWidget}
        userName={props.userName}
        editDashboardMode={editDashboardMode}
        setEditDashboardMode={dashboardEditToggle}
      />
      <DashboardSummary
        summaryWidgets={summaryWidgets}
        editSummaryWidgets={setSummaryWidgets}
        editDashboardMode={editDashboardMode}
        saveState={saveState}
      />
      <DashboardWidgetWrapper
        widgetState={activeWidgets}
        setWidgetState={setActiveWidgets}
        removeWidget={removeWidget}
        editDashboardMode={editDashboardMode}
        saveState={saveState}
      />
    </div>
  );
};
