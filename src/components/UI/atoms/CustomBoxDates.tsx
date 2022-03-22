import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";
import { GASES_PAGE_LABEL } from "../organisms/Gases";
import { INCIDENTS_PAGE_LABEL } from "../organisms/Incidents";
import { LOCATION_PAGE_LABEL } from "../organisms/Locations";

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
      case INCIDENTS_PAGE_LABEL:
        return incidentPageStartDate;
      case LOCATION_PAGE_LABEL:
        return locationPageStartDate;
      case GASES_PAGE_LABEL:
        return gasPageStartDate;
    }
  }

  function getEndDateLabel() {
    switch (label) {
      case INCIDENTS_PAGE_LABEL:
        return incidentPageEndDate;
      case LOCATION_PAGE_LABEL:
        return locationPageEndDate;
      case GASES_PAGE_LABEL:
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
