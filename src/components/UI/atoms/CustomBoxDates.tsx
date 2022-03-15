import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";
import { gasesPageLabel } from "../organisms/Gases";
import { incidentPageLabel } from "../organisms/Incidents";
import { locationPageLabel } from "../organisms/Locations";

interface CustomBoxDatesProps {
  pageLabel?: string;
  startDate?: any;
  endDate?: any;
}

export const incidentPageStartDate = "incidentPageStartDate";
export const incidentPageEndDate = "incidentPageEndDate";
export const locationPageStartDate = "locationPageStartDate";
export const locationPageEndDate = "locationPageEndDate";
export const gasPageStartDate = "gasPageStartDate";
export const gasPageEndDate = "gasPageEndDate";

export const CustomBoxDates: React.FC<CustomBoxDatesProps> = (props) => {
  const label = props.pageLabel;

  function getStartDateLabel() {
    switch (label) {
      case incidentPageLabel:
        return incidentPageStartDate;
      case locationPageLabel:
        return locationPageStartDate;
      case gasesPageLabel:
        return gasPageStartDate;
    }
  }

  function getEndDateLabel() {
    switch (label) {
      case incidentPageLabel:
        return incidentPageEndDate;
      case locationPageLabel:
        return locationPageEndDate;
      case gasesPageLabel:
        return gasPageEndDate;
    }
  }

  return (
    <>
      <p>Start Date</p>
      <BasicDatePicker label={getStartDateLabel()} />
      <p>End Date</p>
      <BasicDatePicker label={getEndDateLabel()} />
    </>
  );
};
