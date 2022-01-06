import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { makeStyles } from "@mui/styles";
import React from "react";

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
  fab: {
    backgroundColor: "#d34949",
  },
});

// still needs the actual action functions
const actions = [
  { icon: <UndoIcon />, name: "Undo" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <AddIcon />, name: "Add" },
];

export const Home: React.FC = () => {
  const styles = useStyles();

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        FabProps={{ style: { backgroundColor: "#d34949" } }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <div className={styles.placeholderDiv}>
        <h1>Home</h1>
      </div>
    </div>
  );
};
