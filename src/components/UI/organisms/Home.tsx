import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { Button } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { makeStyles } from "@mui/styles";
import React, {useEffect} from "react";
import {
  selectIsDashboard,
  setIsDashboard,
} from "../../../store/slices/dashboard";
// Redux
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { DashboardInfo } from "../molecules/DashboardInfo";
import { DashboardSummary } from "../molecules/DashboardSummary";

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
  fab: {
    backgroundColor: "#ad172b",
  },
  greeting: {
    margin: 0,
  },
  date: {
    margin: 0,
  },
  pageLabel: {
    margin: 0,
  },
  pageDescription: {
    margin: 0,
  },
});

// still needs the actual action functions
const actions = [
  { icon: <UndoIcon />, name: "Undo" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <AddIcon />, name: "Add" },
];

export const Home: React.FC = () => {
  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        FabProps={{ style: { backgroundColor: "#ad172b" } }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <DashboardInfo />
      <DashboardSummary />
    </div>
  );
};
