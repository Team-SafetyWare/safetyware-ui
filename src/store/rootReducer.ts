import { combineReducers } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { dashboardDefaultState, dashboardSlice } from "./slices/dashboard";
import { gasPageSlice } from "./slices/gasPageSlice";
import { incidentPageSlice } from "./slices/incidentPageSlice";
import { locationPageSlice } from "./slices/locationPageSlice";

export const initialRootState = {
  dashboard: dashboardDefaultState,
};

const appReducer = combineReducers({
  dashboard: dashboardSlice.reducer,
  incidentPage: incidentPageSlice.reducer,
  locationPage: locationPageSlice.reducer,
  gasPage: gasPageSlice.reducer,
});

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
): any => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
