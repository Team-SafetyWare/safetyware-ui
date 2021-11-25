import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import React from "react";

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  homeButton: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "red",
    height: 69,
  },
});

export const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <h1>Home</h1>
      {/* you can add custom styling to MUI components using useStyles! yay! */}
      <Button className={classes.homeButton} variant="contained">
        wassup
      </Button>
    </div>
  );
};
