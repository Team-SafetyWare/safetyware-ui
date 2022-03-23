import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Person } from "./util/queryService";
import MapRestriction = google.maps.MapRestriction;
import { useMediaQuery } from "@mui/material";
import theme from "./Theme";

export const API_URL = "https://func-api-nmisvbwuqreyq.azurewebsites.net";
export const MAP_RESTRICTION: MapRestriction = {
  latLngBounds: {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  },
  strictBounds: true,
};

const CURRENT_USER_KEY = "current_user";

export interface User {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  company: {
    id: string;
    name: string;
  };
}

export const getCurrentUser = (): User | null => {
  const json = localStorage.getItem(CURRENT_USER_KEY);
  return json && JSON.parse(json);
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const sortPeople = <T extends Person>(people: T[]): T[] =>
  people.slice().sort((a, b) => a.name.localeCompare(b.name));

export const modularIndex = <T,>(arr: T[], index: number): T =>
  arr[index % arr.length];

export const useMapGestureHandling = () =>
  useMediaQuery(theme.breakpoints.down("md")) ? "cooperative" : "greedy";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
