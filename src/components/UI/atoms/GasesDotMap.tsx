import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import GenericIcon from "../../../assets/generic.png";
import {
  selectGasPageEndDate,
  selectGasPageName,
  selectGasPageStartDate,
} from "../../../store/slices/gasPageSlice";
import { useAppSelector } from "../../../store/store";
import { GasReading } from "../organisms/Gases";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";
import {Filter} from "../molecules/FilterBar";
import {PersonWithLocationReadings} from "../../../util/queryService";
import {sortPeople} from "../../../index";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface GasDotMapProps {
  gases?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
  filter?: Filter;
}

export const GasDotMap: React.FC<GasDotMapProps> = (props) => {
  const filter: Filter = props.filter ?? {};
  // let people: PersonWithLocationReadings[] = [
  //   usePersonAsPeople(filter.person?.id || "", filter, !filter.person),
  //   usePeopleInCompany(user?.company.id || "", filter, !!filter.person),
  // ].flat();
  // people = sortPeople(people);

  return (
    <>

    </>
  );
};

export default React.memo(GasDotMap);
