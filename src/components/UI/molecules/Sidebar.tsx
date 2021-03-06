import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, useMediaQuery } from "@mui/material";
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
import React, { useCallback } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { setCurrentUser, setToken } from "../../../index";
import theme from "../../../Theme";
import { SidebarUserName } from "../atoms/SidebarUserName";
import { SidebarUserPicture } from "../atoms/SidebarUserPicture";

interface SidebarProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles({
  sidebar: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.primary.main,
    },

    "& .MuiDrawer-root": {
      flexShrink: 0,
      width: 240,
      zIndex: 1,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    "& .MuiListItemIcon-root": {
      color: "white",
    },

    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.main,
      boxSizing: "border-box",
      color: "white",
      width: 240,
    },
  },

  sidebarButton: {
    display: "none",
    padding: 16,
    [theme.breakpoints.down("sm")]: {
      color: "white",
      display: "inline-flex",
    },
  },

  sidebarDrawerMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },

    "& .MuiListItemIcon-root": {
      color: "white",
    },

    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.main,
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
    backgroundColor: theme.palette.secondary.main,

    "&:hover": { backgroundColor: theme.palette.secondary.light },
  },

  sidebarFooter: {
    marginTop: "auto",
  },

  sidebarUser: {
    display: "flex",
    alignItems: "center",
  },
});

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const history = useHistory();

  const onLogout = useCallback(() => {
    setCurrentUser(undefined);
    setToken(undefined);
    history.push("/");
  }, [history]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarHeaderItems = [
    { text: "Dashboard", icon: HomeOutlinedIcon, link: "/dashboard" },
    { text: "Locations", icon: ExploreOutlinedIcon, link: "/locations" },
    { text: "Incidents", icon: BarChartOutlinedIcon, link: "/incidents" },
    { text: "Gases", icon: BubbleChartOutlinedIcon, link: "/gases" },
  ];

  const drawer = (
    <div className={styles.sidebarDiv}>
      <Toolbar>
        <img className={styles.sidebarlogo} src={Logo} alt="SafetyWare" />
      </Toolbar>
      <Box className={styles.sidebarMenu}>
        <List>
          {sidebarHeaderItems.map((sidebarItem) => (
            <ListItemButton
              component={NavLink}
              key={sidebarItem.text}
              to={sidebarItem.link}
              exact
              activeClassName={styles.sidebarItemSelected}
              onClick={!mobile ? undefined : handleDrawerToggle}
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
        <ListItemButton
          component={NavLink}
          to="/profile"
          exact
          activeClassName={styles.sidebarItemSelected}
          onClick={!mobile ? undefined : handleDrawerToggle}
        >
          <div className={styles.sidebarUser}>
            <SidebarUserPicture
              userPhoto={props.userPhoto}
              userName={props.userName}
            />
            <SidebarUserName userName={props.userName} />
          </div>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (!mobile) {
              handleDrawerToggle();
            }
            onLogout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
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
        <Drawer variant="permanent" PaperProps={{ elevation: 5 }} open>
          {drawer}
        </Drawer>
      </Box>
    </StyledEngineProvider>
  );
};
