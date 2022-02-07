import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type IncidentDotMapState = {
  startDate: String;
  endDate: String;
};

export const incidentDotMapDefaultState: IncidentDotMapState = {
  startDate: "",
  endDate: "",
};

export const incidentDotMapSlice = createSlice({
  name: "incidentDotMap",
  initialState: incidentDotMapDefaultState,
  reducers: {
    setStartDate: (state, action: PayloadAction<String>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<String>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = incidentDotMapSlice.actions;

export const selectIncidentDotMapStartDate = (state: RootState) =>
  state.incidentDotMap.startDate;
export const selectIncidentDotMapEndDate = (state: RootState) =>
    state.incidentDotMap.endDate;
