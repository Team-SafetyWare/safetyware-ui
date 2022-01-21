import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { makeStyles } from "@mui/styles";
import React from "react";
import useDocumentTitle from "../../../util/useDocumentTitle";

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
  fab: {
    backgroundColor: "#ad172b",
  },
});

// still needs the actual action functions
const actions = [
  { icon: <UndoIcon />, name: "Undo" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <AddIcon />, name: "Add" },
];

export const Home: React.FC = () => {
  useDocumentTitle("Blackline Safety | Home");
  const styles = useStyles();

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
      <div className={styles.placeholderDiv}>
        <h1>Home</h1>
      </div>
    </div>
  );
};
