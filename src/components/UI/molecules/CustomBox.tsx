import { makeStyles } from "@mui/styles";
import React from "react";
import Draggable from "react-draggable";
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
    bottom: "20px",
    right: "20px",
    fontSize: "14px",
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    draggable: "true",
  },
});

export const CustomBox: React.FC<CustomBoxProps> = (props) => {
  const styles = useStyles();
  return (
    <Draggable>
      <div className={styles.box}>
        <h3>Customize</h3>
        <CustomBoxDates startDate={props.startDate} endDate={props.endDate} pageLabel={props.pageLabel}/>
        <CustomBoxUserSelect user={props.user} view={props.view} />
        <CustomBoxIncidentSelect incidentType={props.incidentType} />
      </div>
    </Draggable>
  );
};
