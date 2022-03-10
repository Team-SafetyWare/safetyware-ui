import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Switch, useLocation } from "react-router-dom";
import ProfilePicture from "../assets/profilePicture.png";
import { GET_USER_ACCOUNT } from "../util/queryService";
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
    paddingLeft: "240px",
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        paddingLeft: "0",
      },
  },
  innerContent: {
    height: "100%",
    width: "100%",
    padding: "10px 25px",
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        padding: "0",
      },
  },
});

export const Pages: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();

  // https://www.apollographql.com/docs/react/data/queries/
  // TO-DO: handle loading and error
  const { data: userAccountData } = useQuery(GET_USER_ACCOUNT);
  const userAccount = userAccountData?.userAccount;

  return (
    <>
      {location.pathname === "/" ? (
        <Page
          exact
          path="/"
          title="Blackline Safety | Login"
          component={Login}
        />
      ) : (
        <>
          <Sidebar userName={userAccount?.name} userPhoto={ProfilePicture} />
          <div className={styles.content}>
            <div className={styles.innerContent}>
              <Switch>
                <Page
                  exact
                  path="/home"
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
