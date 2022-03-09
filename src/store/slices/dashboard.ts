import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type DashboardState = {
  // empty: don't know what we need yet!
  // here's a dummy variable we will never use
  // in case anyone wants to see how this works
  isDashboard: boolean;
};

export const dashboardDefaultState: DashboardState = {
  isDashboard: true,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardDefaultState,
  reducers: {
    setIsDashboard: (state, action: PayloadAction<boolean>) => {
      state.isDashboard = action.payload;
    },
  },
});

export const { setIsDashboard } = dashboardSlice.actions;

export const selectIsDashboard = (state: RootState): any =>
  state.dashboard.isDashboard;
