import { combineReducers } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { dashboardDefaultState, dashboardSlice } from "./slices/dashboard";
import { incidentPageSlice } from "./slices/incidentPageSlice";
import { locationPageSlice } from "./slices/locationPageSlice";

export const initialRootState = {
  dashboard: dashboardDefaultState,
};

const appReducer = combineReducers({
  dashboard: dashboardSlice.reducer,
  incidentPage: incidentPageSlice.reducer,
  locationPage: locationPageSlice.reducer,
});

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
