import { Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  button: {
    borderColor: "white",
    color: "white",
    height: "56px",
    marginTop: "24px",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
});

interface LoginProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

export const LoginButton: React.FC<LoginProps> = (props) => {
  const styles = useStyles();

  return (
    <Button
      className={styles.button}
      variant="outlined"
      onClick={props.loading ? undefined : props.onClick}
    >
      {props.loading ? (
        <CircularProgress size={24} sx={{ color: "white" }} />
      ) : (
        props.text
      )}
    </Button>
  );
};
