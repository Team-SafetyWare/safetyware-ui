import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type IncidentDotMapState = {
  startDate: string;
  endDate: string;
};

export const incidentDotMapDefaultState: IncidentDotMapState = {
  startDate: "",
  endDate: "",
};

export const incidentDotMapSlice = createSlice({
  name: "incidentDotMap",
  initialState: incidentDotMapDefaultState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = incidentDotMapSlice.actions;

export const selectIncidentDotMapStartDate = (state: RootState) =>
  state.incidentDotMap.startDate;
export const selectIncidentDotMapEndDate = (state: RootState) =>
    state.incidentDotMap.endDate;
