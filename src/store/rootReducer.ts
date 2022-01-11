import { combineReducers } from "@reduxjs/toolkit";
import { dashboardDefaultState, dashboardSlice } from "./slices/dashboard";

export const initialRootState = {
  dashboard: dashboardDefaultState,
};

export const rootReducer = combineReducers({
  dashboard: dashboardSlice.reducer,
});
