import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import Button from "@mui/material/Button";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { makeStyles } from "@mui/styles";
import React from "react";

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  homeButton: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "red",
    height: 69,
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
  const classes = useStyles();

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
      <h1>Home</h1>
      {/* you can add custom styling to MUI components using useStyles! yay! */}
      <Button className={classes.homeButton} variant="contained">
        wassup
      </Button>
    </div>
  );
};
