import { makeStyles } from "@mui/styles";
import React from "react";
import { CustomBoxDates } from "../atoms/CustomBoxDates";
import { CustomBoxUserSelect } from "../atoms/CustomBoxUserSelect";

interface CustomBoxReducedProps {
  view?: any;
  user?: any;
  startDate?: any;
  endDate?: any;
}

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    height: "40%",
    width: "18%",
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
  const view = props.view;
  const user = props.user;
  const startDate = props.startDate;
  const endDate = props.endDate;
  const styles = useStyles();

  return (
    <div className={styles.box}>
      <h3>Customize</h3>
      <CustomBoxDates startDate={startDate} endDate={endDate} />
      <CustomBoxUserSelect user={user} view={view} />
    </div>
  );
};
