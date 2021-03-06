import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type IncidentPageState = {
  startDate: string;
  endDate: string;
  name: string;
  personId: string;
};

export const incidentPageDefaultState: IncidentPageState = {
  startDate: "",
  endDate: "",
  name: "",
  personId: "",
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
    setIncidentName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIncidentPersonId: (state, action: PayloadAction<string>) => {
      state.personId = action.payload;
    },
  },
});

export const {
  setIncidentStartDate,
  setIncidentEndDate,
  setIncidentName,
  setIncidentPersonId,
} = incidentPageSlice.actions;

export const selectIncidentPageStartDate = (state: RootState): any =>
  state.incidentPage.startDate;
export const selectIncidentPageEndDate = (state: RootState): any =>
  state.incidentPage.endDate;
export const selectIncidentPageName = (state: RootState): any =>
  state.incidentPage.name;
export const selectIncidentPagePersonId = (state: RootState): any =>
  state.incidentPage.personId;
