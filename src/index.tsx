import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Person } from "./util/queryService";
import MapRestriction = google.maps.MapRestriction;
import { setContext } from "@apollo/client/link/context";

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
const TOKEN_KEY = "token";

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

export const setCurrentUser = (user: User | undefined): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const sortPeople = <T extends Person>(people: T[]): T[] =>
  people.slice().sort((a, b) => a.name.localeCompare(b.name));

export const modularIndex = <T,>(arr: T[], index: number): T =>
  arr[index % arr.length];

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const setToken = (token: string | undefined): void => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
  // noinspection JSIgnoredPromiseFromCall
  client.resetStore().catch(() => {
    // Ignore.
  });
};

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
