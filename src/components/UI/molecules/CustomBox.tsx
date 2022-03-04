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
  pageLabel?: string;
}

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    height: "530px",
    width: "370px",
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "absolute",
    fontSize: "14px",
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
});

export const CustomBox: React.FC<CustomBoxProps> = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.box}>
      <h3>Customize</h3>
      <CustomBoxDates
        startDate={props.startDate}
        endDate={props.endDate}
        pageLabel={props.pageLabel}
      />
      <CustomBoxUserSelect label={props.pageLabel} user={props.user} view={props.view} />
      <CustomBoxIncidentSelect incidentType={props.incidentType} />
    </div>
  );
};
