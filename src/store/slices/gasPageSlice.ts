import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type GasPageState = {
  startDate: string;
  endDate: string;
};

export const gasPageDefaultState: GasPageState = {
  startDate: "",
  endDate: "",
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
  },
});

export const { setGasStartDate, setGasEndDate } = gasPageSlice.actions;

export const selectGasPageStartDate = (state: RootState): any =>
  state.gasPage.startDate;
export const selectGasPageEndDate = (state: RootState): any =>
  state.gasPage.endDate;
