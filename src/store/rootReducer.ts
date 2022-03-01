import { combineReducers } from "@reduxjs/toolkit";
import { dashboardDefaultState, dashboardSlice } from "./slices/dashboard";
import { incidentPageSlice } from "./slices/incidentPageSlice";
import { locationPageSlice } from "./slices/locationPageSlice";

export const initialRootState = {
  dashboard: dashboardDefaultState,
};

export const rootReducer = combineReducers({
  dashboard: dashboardSlice.reducer,
  incidentPage: incidentPageSlice.reducer,
  locationPage: locationPageSlice.reducer,
});
