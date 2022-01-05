import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    display: "flex",

    "& .MuiDrawer-root": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
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

  sidebarButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    padding: 16,
  },

  sidebarDrawerMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
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

  sidebarDiv: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  sidebarMenu: {
    overflow: "auto",
  },

  sidebarFooter: {
    marginTop: "auto",
  },
}));

export const Sidebar: React.FC = () => {
  const styles = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarItems = [
    { text: "Home", icon: HomeOutlinedIcon, link: "/" },
    { text: "Locations", icon: ExploreOutlinedIcon, link: "/locations" },
    { text: "Incidents", icon: BarChartOutlinedIcon, link: "/incidents" },
    { text: "Gases", icon: BubbleChartOutlinedIcon, link: "/gases" },
  ];

  const drawer = (
    <div className={styles.sidebarDiv}>
      <Toolbar />
      <Box className={styles.sidebarMenu}>
        <List>
          {sidebarItems.map((sidebarItem) => (
            <ListItemButton
              component={RouterLink}
              key={sidebarItem.text}
              to={sidebarItem.link}
            >
              <ListItemIcon>
                <sidebarItem.icon />
              </ListItemIcon>
              <ListItemText primary={sidebarItem.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <List className={styles.sidebarFooter}>
        <ListItemButton component={RouterLink} to="/user-account">
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="User Account" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <StyledEngineProvider injectFirst>
      <Box className={styles.sidebar}>
        <CssBaseline />
        <IconButton
          className={styles.sidebarButton}
          onClick={handleDrawerToggle}
          size="large"
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <Drawer
          className={styles.sidebarDrawerMobile}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
        <Drawer variant="permanent" open>
          {drawer}
        </Drawer>
      </Box>
    </StyledEngineProvider>
  );
};
