import { makeStyles } from "@mui/styles";
import React from "react";
import { Switch, useLocation } from "react-router-dom";
import ProfilePicture from "../assets/profilePicture.png";
import theme from "../Theme";
import { Page } from "./UI/atoms/Page";
import { Sidebar } from "./UI/molecules/Sidebar";
import { Gases } from "./UI/organisms/Gases";
import { Home } from "./UI/organisms/Home";
import { Incidents } from "./UI/organisms/Incidents";
import { Locations } from "./UI/organisms/Locations";
import { Login } from "./UI/organisms/Login";
import { UserAccount } from "./UI/organisms/UserAccount";

const useStyles = makeStyles({
  content: {
    height: "100vh",
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "240px",
    },
  },
  innerContent: {
    height: "100%",
    width: "100%",
    padding: "10px 25px",
  },
});

export const Pages: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ? (
        <Page
          exact
          path="/login"
          title="Blackline Safety | Login"
          component={Login}
        />
      ) : (
        <>
          <Sidebar userName="Jane Doe" userPhoto={ProfilePicture} />
          <div className={styles.content}>
            <div className={styles.innerContent}>
              <Switch>
                <Page
                  exact
                  path="/"
                  title="Blackline Safety | Home"
                  component={Home}
                />
                <Page
                  exact
                  path="/locations"
                  title="Blackline Safety | Locations"
                  component={Locations}
                />
                <Page
                  exact
                  path="/incidents"
                  title="Blackline Safety | Incidents"
                  component={Incidents}
                />
                <Page
                  exact
                  path="/gases"
                  title="Blackline Safety | Gases"
                  component={Gases}
                />
                <Page
                  exact
                  path="/user-account"
                  title="Blackline Safety | My Account"
                  component={UserAccount}
                />
              </Switch>
            </div>
          </div>
        </>
      )}
    </>
  );
};
