import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import theme from "../../../Theme";
import { DashboardWidgetWrapper } from "../atoms/DashboardWidgetWrapper";
import { DashboardInfo } from "../molecules/DashboardInfo";
import { DashboardSummary } from "../molecules/DashboardSummary";
import { Box } from "@mui/system";

interface HomeProps {
  userName?: string;
}

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  scrollableContent: {
    [theme.breakpoints.down("sm")]: {
      maxHeight: "calc(100vh - 202.5px)",
      overflow: "auto",
    },
  },
});

export const Dashboard: React.FC<HomeProps> = (props) => {
  const styles = useStyles();

  const [editDashboardMode, setEditDashboardMode] = useState(false);

  // Is there a way to just leave this state as empty?
  // If we do leave the state as empty, it throws an error saying that every mapped object
  // in different components need to have keys
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

  // Is there a way to just leave this state as empty?
  // If we do leave the state as empty, it throws an error saying that every mapped object
  // in different components need to have keys
  const [inactiveWidgets, setInactiveWidgets] = useState([
    {
      widgetName: "Hazardous Areas",
      widget: "HazardMap",
    },
    {
      widgetName: "Incidents Bar Graph",
      widget: "IncidentsBarGraph",
    },
    {
      widgetName: "Gases Map",
      widget: "GasesMap",
    },
  ]);

  // Is there a way to just leave this state as empty?
  // If we do leave the state as empty, it throws an error saying that every mapped object
  // in different components need to have keys
  const [activeWidgets, setActiveWidgets] = useState([
    {
      widgetName: "Incidents Map",
      widget: "IncidentsMap",
    },
    {
      widgetName: "Travel History",
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
  };

  const loadState = () => {
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
          widgetName: "Hazardous Areas",
          widget: "HazardMap",
        },
        {
          widgetName: "Incidents Bar Graph",
          widget: "IncidentsBarGraph",
        },
        {
          widgetName: "Gases Map",
          widget: "GasesMap",
        },
      ]);
      setActiveWidgets([
        {
          widgetName: "Incidents Map",
          widget: "IncidentsMap",
        },
        {
          widgetName: "Travel History",
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
    <>
      <DashboardInfo
        activeWidgetState={activeWidgets}
        inactiveWidgetState={inactiveWidgets}
        addWidget={addWidget}
        userName={props.userName}
        editDashboardMode={editDashboardMode}
        setEditDashboardMode={dashboardEditToggle}
      />
      <div className={styles.scrollableContent}>
        <Box sx={{ height: { xs: "16px", sm: 0 } }} />
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
    </>
  );
};
