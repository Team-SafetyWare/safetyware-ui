import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";

export const API_URL = "https://func-api-nmisvbwuqreyq.azurewebsites.net";

const CURRENT_USER_KEY = "current_user";

export const getCurrentUser = (): any | null => {
  const json = localStorage.getItem(CURRENT_USER_KEY);
  return json && JSON.parse(json);
};

export const setCurrentUser = (user: any): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

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
