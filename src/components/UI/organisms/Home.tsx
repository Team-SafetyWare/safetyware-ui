import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { DashboardWidgetWrapper } from "../atoms/DashboardWidgetWrapper";
import { DashboardInfo } from "../molecules/DashboardInfo";
import { DashboardSummary } from "../molecules/DashboardSummary";
import { defaultFilter } from "../molecules/FilterBar";
import { HazardMap } from "../molecules/HazardMap";
import { IncidentsBarGraph } from "../molecules/IncidentsBarGraph";
import { IncidentsMap } from "../molecules/IncidentsMap";
import { TravelMap } from "../molecules/TravelMap";

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

  const [inactiveWidgets, setInactiveWidgets] = useState([
    {
      widgetName: "Hazardous Area Heat Map",
      widget: <HazardMap filter={defaultFilter()} />,
    },
    {
      widgetName: "Incident Bar Graph",
      widget: <IncidentsBarGraph filter={defaultFilter()} />,
    },
  ]);

  const [activeWidgets, setActiveWidgets] = useState([
    {
      widgetName: "Incident Dot Map",
      widget: <IncidentsMap filter={defaultFilter()} />,
    },
    {
      widgetName: "Travel History Trail",
      widget: (
        <TravelMap
          filter={defaultFilter()}
          legendDefaultCollapsed={true}
          legendCompact={true}
        />
      ),
    },
  ]);

  const dashboardEditToggle = () => {
    setEditDashboardMode((prevEditDashboardMode) => !prevEditDashboardMode);
    console.log(editDashboardMode);
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
      <DashboardSummary editDashboardMode={editDashboardMode} />
      <DashboardWidgetWrapper
        widgetState={activeWidgets}
        setWidgetState={setActiveWidgets}
        removeWidget={removeWidget}
        editDashboardMode={editDashboardMode}
      />
    </div>
  );
};
