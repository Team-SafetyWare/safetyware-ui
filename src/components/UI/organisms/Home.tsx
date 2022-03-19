import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { BarGraphWidget } from "../atoms/BarGraphWidget";
import { DashboardWidgetWrapper } from "../atoms/DashboardWidgetWrapper";
import { DashboardInfo } from "../molecules/DashboardInfo";
import { DashboardSummary } from "../molecules/DashboardSummary";
import { defaultFilter } from "../molecules/FilterBar";
import { HazardMap } from "../molecules/HazardMap";
import { IncidentsMap } from "../molecules/IncidentsMap";
import { TravelMap } from "../molecules/TravelMap";

interface HomeProps {
  userName?: string;
}

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  dashboardContent: {},
});

const barGraphData = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

export const Home: React.FC<HomeProps> = (props) => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const [inactiveWidgets, setInactiveWidgets] = useState([
    {
      widgetName: "Hazardous Area Heat Map",
      widget: <HazardMap filter={defaultFilter()} />,
    },
    {
      widgetName: "Incident Bar Graph",
      widget: <BarGraphWidget data={barGraphData} />,
    },
  ]);

  const [activeWidgets, setActiveWidgets] = useState([
    {
      widgetName: "Incident Dot Map",
      widget: <IncidentsMap filter={defaultFilter()} />,
    },
    {
      widgetName: "Travel History Trail",
      widget: <TravelMap filter={defaultFilter()} />,
    },
  ]);

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
      />
      {matches && <DashboardSummary />}
      <DashboardWidgetWrapper
        widgetState={activeWidgets}
        setWidgetState={setActiveWidgets}
        removeWidget={removeWidget}
      />
    </div>
  );
};
