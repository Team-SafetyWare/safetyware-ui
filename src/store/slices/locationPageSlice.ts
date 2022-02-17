import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";

type LocationPageState = {
    startDate: string;
    endDate: string;
};

export const locationPageDefaultState: LocationPageState = {
    startDate: "",
    endDate: "",
};

export const locationPageSlice = createSlice({
    name: "locationPage",
    initialState: locationPageDefaultState,
    reducers: {
        setStartDate: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.endDate = action.payload;
        },
    }
});

export const {setStartDate, setEndDate} = locationPageSlice.actions;

export const selectLocationPageStartDate = (state: RootState) =>
    state.locationPage.startDate;
export const selectLocationPageEndDate = (state: RootState) =>
    state.locationPage.endDate;
