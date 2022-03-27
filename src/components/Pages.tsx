import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import { Switch, useLocation } from "react-router-dom";
import { API_URL, getCurrentUser } from "../index";
import theme from "../Theme";
import { Page } from "./UI/atoms/Page";
import { defaultFilter, Filter } from "./UI/molecules/FilterBar";
import { Prefetch } from "./UI/molecules/Prefetch";
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
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
    },
  },
  innerContent: {
    height: "100%",
    width: "100%",
    padding: "16px 24px",
    [theme.breakpoints.down("sm")]: {
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
      <Prefetch filter={filter} />
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
                  render={() => <Home userName={user?.name} />}
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
                  render={() => (
                    <Gases filter={filter} onFilterChange={filterChanged} />
                  )}
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
