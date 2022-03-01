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
  name: "incidentPage",
  initialState: incidentPageDefaultState,
  reducers: {
    setIncidentStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setIncidentEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setIncidentStartDate, setIncidentEndDate } =
  incidentPageSlice.actions;

export const selectIncidentPageStartDate = (state: RootState) =>
  state.incidentPage.startDate;
export const selectIncidentPageEndDate = (state: RootState) =>
  state.incidentPage.endDate;