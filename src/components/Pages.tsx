import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import { Switch, useLocation } from "react-router-dom";
import { Page } from "./UI/atoms/Page";
import { Sidebar } from "./UI/molecules/Sidebar";
import { Gases } from "./UI/organisms/Gases";
import { Home } from "./UI/organisms/Home";
import { Login } from "./UI/organisms/Login";
import { UserAccount } from "./UI/organisms/UserAccount";
import { API_URL, getCurrentUser } from "../index";
import { Locations } from "./UI/organisms/Locations";
import { Incidents } from "./UI/organisms/Incidents";
import { defaultFilter, Filter } from "./UI/molecules/FilterBar";

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
    padding: "16px 24px",
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        padding: "0",
      },
  },
});

export const Pages: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();

  const user = getCurrentUser();
  const profileImageUrl =
    (user && `${API_URL}/v1/userAccount/${user.id}/profile.png`) || undefined;

  const [filter, setFilter] = useState<Filter>(defaultFilter());

  const filterChanged = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      setFilter((filter) => updateFilter(filter));
    },
    []
  );

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
          <Sidebar userName={user?.name} userPhoto={profileImageUrl} />
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
                  render={() => (
                    <Locations filter={filter} onFilterChange={filterChanged} />
                  )}
                />
                <Page
                  exact
                  path="/incidents"
                  title="Blackline Safety | Incidents"
                  render={() => (
                    <Incidents filter={filter} onFilterChange={filterChanged} />
                  )}
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
