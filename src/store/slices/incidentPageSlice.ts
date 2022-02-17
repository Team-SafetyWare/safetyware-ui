import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type IncidentPageState = {
  startDate: string;
  endDate: string;
};

export const incidentPageDefaultState: IncidentPageState = {
  startDate: "",
  endDate: "",
};

export const incidentPageSlice = createSlice({
  name: "incidentDotMap",
  initialState: incidentPageDefaultState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = incidentPageSlice.actions;

export const selectIncidentPageStartDate = (state: RootState) =>
  state.incidentDotMap.startDate;
export const selectIncidentPageEndDate = (state: RootState) =>
    state.incidentDotMap.endDate;
