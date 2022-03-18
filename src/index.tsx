import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import LatLngLiteral = google.maps.LatLngLiteral;
import { Person } from "./util/queryService";

export const API_URL = "https://func-api-nmisvbwuqreyq.azurewebsites.net";
export const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.045,
  lng: -114.072,
};
export const DEFAULT_MAP_ZOOM = 11;

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
