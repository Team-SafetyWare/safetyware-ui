import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
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
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

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
      backgroundColor: "#ad172b",
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
      backgroundColor: "#ad172b",
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

  sidebarlogo: {
    width: "100%",
  },

  sidebarMenu: {
    overflow: "auto",
  },

  sidebarItemSelected: {
    backgroundColor: "#d34949",

    "&:hover": { backgroundColor: "#d3494980" },
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

  const sidebarTopItems = [
    { text: "Home", icon: HomeOutlinedIcon, link: "/" },
    { text: "Locations", icon: ExploreOutlinedIcon, link: "/locations" },
    { text: "Incidents", icon: BarChartOutlinedIcon, link: "/incidents" },
    { text: "Gases", icon: BubbleChartOutlinedIcon, link: "/gases" },
  ];

  const sidebarBottomItems = [
    {
      text: "User Account",
      icon: AccountCircleOutlinedIcon,
      link: "/user-account",
    },
    { text: "Log Out", icon: LogoutIcon, link: "/login" },
  ];

  const drawer = (
    <div className={styles.sidebarDiv}>
      <Toolbar>
        <img className={styles.sidebarlogo} src={logo} alt="Blackline Safety" />
      </Toolbar>
      <Box className={styles.sidebarMenu}>
        <List>
          {sidebarTopItems.map((sidebarItem) => (
            <ListItemButton
              component={NavLink}
              key={sidebarItem.text}
              to={sidebarItem.link}
              exact
              activeClassName={styles.sidebarItemSelected}
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
        {sidebarBottomItems.map((sidebarItem) => (
          <ListItemButton
            component={NavLink}
            key={sidebarItem.text}
            to={sidebarItem.link}
            exact
            activeClassName={styles.sidebarItemSelected}
          >
            <ListItemIcon>
              <sidebarItem.icon />
            </ListItemIcon>
            <ListItemText primary={sidebarItem.text} />
          </ListItemButton>
        ))}
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
