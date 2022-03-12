import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type GasPageState = {
  startDate: string;
  endDate: string;
  name: string;
  personId: string;
};

export const gasPageDefaultState: GasPageState = {
  startDate: "",
  endDate: "",
  name: "",
  personId: "",
};

export const gasPageSlice = createSlice({
  name: "gasPage",
  initialState: gasPageDefaultState,
  reducers: {
    setGasStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setGasEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setGasName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setGasPersonId: (state, action: PayloadAction<string>) => {
      state.personId = action.payload;
    },
  },
});

export const { setGasStartDate, setGasEndDate, setGasName, setGasPersonId } =
  gasPageSlice.actions;

export const selectGasPageStartDate = (state: RootState): any =>
  state.gasPage.startDate;
export const selectGasPageEndDate = (state: RootState): any =>
  state.gasPage.endDate;
export const selectGasPageName = (state: RootState): any => state.gasPage.name;
export const selectGasPagePersonId = (state: RootState): any =>
  state.gasPage.personId;
