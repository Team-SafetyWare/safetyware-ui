import {combineReducers} from "@reduxjs/toolkit";
import {dashboardDefaultState, dashboardSlice} from "./slices/dashboard";
import {incidentPageSlice} from "./slices/incidentPageSlice";

export const initialRootState = {
    dashboard: dashboardDefaultState,
};

export const rootReducer = combineReducers({
    dashboard: dashboardSlice.reducer,
    incidentDotMap: incidentPageSlice.reducer,
});
