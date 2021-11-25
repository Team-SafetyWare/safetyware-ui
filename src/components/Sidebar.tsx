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
import React from "react";

export const Sidebar: React.FC = () => {
  const sidebarItems = [
    { text: "Dashboard", icon: HomeOutlinedIcon },
    { text: "Locations", icon: ExploreOutlinedIcon },
    { text: "Incidents", icon: BarChartOutlinedIcon },
    { text: "Gases", icon: BubbleChartOutlinedIcon },
  ];
  return (
    <StyledEngineProvider injectFirst>
      <Box className="sidebar">
        <CssBaseline />
        <Drawer variant="permanent" anchor="left">
          <Toolbar />
          <Box className="sidebar-menu">
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
          <List className="sidebar-footer">
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
