import { useQuery } from "@apollo/client";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";
import { getCurrentUser } from "../../../index";
import { setGasName, setGasPersonId } from "../../../store/slices/gasPageSlice";
import {
  setIncidentName,
  setIncidentPersonId,
} from "../../../store/slices/incidentPageSlice";
import {
  setLocationName,
  setLocationPersonId,
} from "../../../store/slices/locationPageSlice";
import { useAppDispatch } from "../../../store/store";
import { GET_COMPANY_PEOPLE } from "../../../util/queryService";
import { gasesPageLabel } from "../organisms/Gases";
import { incidentPageLabel } from "../organisms/Incidents";
import { locationPageLabel } from "../organisms/Locations";

interface CustomBoxUserSelectProps {
  user?: string;
  label?: string;
}

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    marginTop: "24px",
    textAlign: "center",
    width: "100%",

    "& > *": {
      marginBottom: "24px",
    },
  },
});

export const CustomBoxUserSelect: React.FC<CustomBoxUserSelectProps> = (
  props
) => {
  const styles = useStyles();

  const dispatch = useAppDispatch();
  const label = props.label;
  const user = getCurrentUser();

  const { data: personData } = useQuery(GET_COMPANY_PEOPLE, {
    variables: { companyId: user?.company.id },
  });

  const people: any[] = personData?.company.people ?? [];

  function getMenuItemPerson(person: any) {
    return (
      <MenuItem
        value={person.name}
        onClick={() => updateNameAndIdFilter(person.name, person.id)}
      >
        {person.name}
      </MenuItem>
    );
  }

  function updateNameAndIdFilter(name: string, id: string) {
    switch (label) {
      case locationPageLabel:
        dispatch(setLocationName(name));
        dispatch(setLocationPersonId(id));
        break;
      case incidentPageLabel:
        dispatch(setIncidentName(name));
        dispatch(setIncidentPersonId(id));
        break;
      case gasesPageLabel:
        dispatch(setGasName(name));
        dispatch(setGasPersonId(id));
        break;
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.content}>
        <FormControl>
          <InputLabel id="simple-select-label">User</InputLabel>
          <Select
            defaultValue={"All"}
            id="simple-select"
            label="User"
            labelId="simple-select-label"
          >
            {getMenuItemPerson({ name: "All", id: "" })}
            {people.map((person: string) => getMenuItemPerson(person))}
          </Select>
        </FormControl>
      </div>
    </StyledEngineProvider>
  );
};
