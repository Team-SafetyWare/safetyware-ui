import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type LocationPageState = {
  startDate: string;
  endDate: string;
  name: string;
  personId: string;
};

export const locationPageDefaultState: LocationPageState = {
  startDate: "",
  endDate: "",
  name: "",
  personId: "",
};

export const locationPageSlice = createSlice({
  name: "locationPage",
  initialState: locationPageDefaultState,
  reducers: {
    setLocationStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setLocationEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setLocationName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLocationPersonId: (state, action: PayloadAction<string>) => {
      state.personId = action.payload;
    },
  },
});

export const {
  setLocationStartDate,
  setLocationEndDate,
  setLocationName,
  setLocationPersonId,
} = locationPageSlice.actions;

export const selectLocationPageStartDate = (state: RootState): any =>
  state.locationPage.startDate;
export const selectLocationPageEndDate = (state: RootState): any =>
  state.locationPage.endDate;
export const selectLocationPageName = (state: RootState): any =>
  state.locationPage.name;
export const selectLocationPagePersonId = (state: RootState): any =>
  state.locationPage.personId;
