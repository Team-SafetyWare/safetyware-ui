import {combineReducers} from "@reduxjs/toolkit";
import {dashboardDefaultState, dashboardSlice} from "./slices/dashboard";
import {incidentDotMapSlice} from "./slices/incidentDotMapSlice";

export const initialRootState = {
    dashboard: dashboardDefaultState,
};

export const rootReducer = combineReducers({
    dashboard: dashboardSlice.reducer,
    incidentDotMap: incidentDotMapSlice.reducer,
});
