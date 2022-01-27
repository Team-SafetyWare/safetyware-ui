import { makeStyles } from "@mui/styles";
import React from "react";
import { CustomBoxDates } from "../atoms/CustomBoxDates";
import { CustomBoxIncidentSelect } from "../atoms/CustomBoxIncidentSelect";
import { CustomBoxUserSelect } from "../atoms/CustomBoxUserSelect";

interface CustomBoxProps {
  view?: any;
  user?: any;
  incidentType?: any;
  startDate?: any;
  endDate?: any;
}

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    height: "52%",
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

export const CustomBox: React.FC<CustomBoxProps> = (props) => {
  const view = props.view;
  const user = props.user;
  const incidentType = props.incidentType;
  const startDate = props.startDate;
  const endDate = props.endDate;
  const styles = useStyles();

  return (
    <div className={styles.box}>
      <h3>Customize</h3>
      <CustomBoxDates startDate={startDate} endDate={endDate} />
      <CustomBoxUserSelect user={user} view={view} />
      <CustomBoxIncidentSelect incidentType={incidentType} />
    </div>
  );
};
