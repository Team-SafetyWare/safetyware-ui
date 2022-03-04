import { makeStyles } from "@mui/styles";
import React from "react";
import Draggable from "react-draggable";
import { CustomBoxDates } from "../atoms/CustomBoxDates";
import { CustomBoxUserSelect } from "../atoms/CustomBoxUserSelect";

interface CustomBoxReducedProps {
  view?: any;
  user?: any;
  startDate?: any;
  endDate?: any;
  pageLabel?: string;
}

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    height: "400px",
    width: "370px",
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "absolute",
    bottom: "20px",
    right: "20px",
    fontSize: "14px",
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
  },
});

export const CustomBoxReduced: React.FC<CustomBoxReducedProps> = (props) => {
  const styles = useStyles();
  const label = props.pageLabel;

  return (
    <Draggable>
      <div className={styles.box}>
        <h3>Customize</h3>
        <CustomBoxDates pageLabel={label} startDate={props.startDate} endDate={props.endDate} />
        <CustomBoxUserSelect label={props.pageLabel} user={props.user} view={props.view} />
      </div>
    </Draggable>
  );
};
