import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";
import { HomeGreeting } from "../atoms/HomeGreeting";
import { PageHeader } from "../atoms/PageHeader";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

interface DashboardInfoProps {
  activeWidgetState?: any;
  inactiveWidgetState?: any;
  addWidget?: any;
  userName?: string;
  editDashboardMode?: any;
  setEditDashboardMode?: any;
  date: Date;
}

const useStyles = makeStyles({
  content: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "16px",
      marginRight: "16px",
    },
  },
});

export const DashboardInfo: React.FC<DashboardInfoProps> = (props) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useStyles();

  const content = (
    <div className={styles.content}>
      {!mobile && (
        <PageHeader
          pageTitle={"Dashboard"}
          pageDescription={
            "Welcome to SafetyWare's safety visualization web application. Add widgets to your dashboard, or explore each visualization type individually."
          }
        />
      )}

      <HomeGreeting
        activeWidgetState={props.activeWidgetState}
        inactiveWidgetState={props.inactiveWidgetState}
        addWidget={props.addWidget}
        userName={props.userName?.substring(0, props.userName.indexOf(" "))}
        editDashboardMode={props.editDashboardMode}
        setEditDashboardMode={props.setEditDashboardMode}
        date={props.date}
      />
    </div>
  );

  return mobile ? (
    <Paper
      elevation={2}
      style={{
        borderRadius: "0",
        padding: "16px 0",
        position: "sticky",
        zIndex: 1,
      }}
    >
      <Box sx={{ margin: "-16px 0" }}>{content}</Box>
    </Paper>
  ) : (
    content
  );
};
