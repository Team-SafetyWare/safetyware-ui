import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type IncidentDotMapState = {
  startDate?: Date;
  endDate?: Date;
};

export const incidentDotMapDefaultState: IncidentDotMapState = {
  startDate: undefined,
  endDate: undefined,
};

export const incidentDotMapSlice = createSlice({
  name: "incidentDotMap",
  initialState: incidentDotMapDefaultState,
  reducers: {
    startDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    endDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
  },
});

export const { startDate, endDate } = incidentDotMapSlice.actions;

export const selectIncidentDotMapStartDate = (state: RootState) =>
  state.incidentDotMap.startDate;
export const selectIncidentDotMapEndDate = (state: RootState) =>
    state.incidentDotMap.endDate;
