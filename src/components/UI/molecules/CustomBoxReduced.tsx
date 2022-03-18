import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Draggable from "react-draggable";
import { CustomBoxDates } from "../atoms/CustomBoxDates";
import { CustomBoxUserSelect } from "../atoms/CustomBoxUserSelect";

interface CustomBoxReducedProps {
  user?: any;
  startDate?: any;
  endDate?: any;
  pageLabel?: string;
}

const useStyles = makeStyles({
  box: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    left: "50%",
    padding: "24px",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",

    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        width: "calc(100vw - 60px)",
      },

    "@media only screen and (max-height: 599px)": {
      flexDirection: "row",

      "& > *": {
        marginLeft: "24px",
      },
    },
  },

  boxTitle: {
    fontWeight: "bold",
  },
});

export const CustomBoxReduced: React.FC<CustomBoxReducedProps> = (props) => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const label = props.pageLabel;

  const component = (
    <div className={styles.box}>
      <p className={styles.boxTitle}>Filters</p>
      <CustomBoxDates
        pageLabel={label}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <CustomBoxUserSelect label={props.pageLabel} user={props.user} />
    </div>
  );

  return (
    <>
      {matches ? (
        <Draggable positionOffset={{ x: "-50%", y: "-50%" }}>
          {component}
        </Draggable>
      ) : (
        <>{component}</>
      )}
    </>
  );
};
