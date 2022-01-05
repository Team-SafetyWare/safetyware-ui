import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { StyledEngineProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  sidebar: {
    display: "flex",

    "& .MuiDrawer-root": {
      flexShrink: 0,
      width: 240,
      zIndex: 1,
    },

    "& .MuiListItemIcon-root": {
      color: "white",
    },

    "& .MuiPaper-root": {
      backgroundColor: "#d34949",
      boxSizing: "border-box",
      color: "white",
      width: 240,
    },
  },
  sidebarMenu: {
    overflow: "auto",
  },
  sidebarFooter: {
    marginTop: "auto",
  },
});

export const Sidebar: React.FC = () => {
  const styles = useStyles();

  const sidebarItems = [
    { text: "Dashboard", icon: HomeOutlinedIcon },
    { text: "Locations", icon: ExploreOutlinedIcon },
    { text: "Incidents", icon: BarChartOutlinedIcon },
    { text: "Gases", icon: BubbleChartOutlinedIcon },
  ];
  return (
    <StyledEngineProvider injectFirst>
      <Box className={styles.sidebar}>
        <CssBaseline />
        <Drawer variant="permanent" anchor="left">
          <Toolbar />
          <Box className={styles.sidebarMenu}>
            <List>
              {sidebarItems.map((sidebarItem) => (
                <ListItem button key={sidebarItem.text}>
                  <ListItemIcon>
                    <sidebarItem.icon />
                  </ListItemIcon>
                  <ListItemText primary={sidebarItem.text} />
                </ListItem>
              ))}
            </List>
          </Box>
          <List className={styles.sidebarFooter}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="User Account" />
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </StyledEngineProvider>
  );
};
