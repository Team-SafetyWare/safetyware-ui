import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { StyledEngineProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";

const headersData = [
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "Logout",
    href: "/logout",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#ffffff",
  },
  menuButton: {
    color: "#d34949",
    marginLeft: "auto",
    marginRight: "30px",
    fontSize: "14px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const blacklineLogo = (
  <img src={logo} alt="Blackline Safety" height="60" width="225" />
);

export const NavBar: React.FC = () => {
  const { header, menuButton, toolbar } = useStyles();
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {blacklineLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <header>
        <AppBar className={header}>{displayDesktop()}</AppBar>
      </header>
    </StyledEngineProvider>
  );
};
