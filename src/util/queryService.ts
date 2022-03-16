import { gql, useQuery } from "@apollo/client";
import { QueryResult } from "@apollo/client/react/types/types";

export const GET_USERS = gql`
  {
    userAccounts {
      id
      name
      title
      email
      phone
      company {
        id
        name
      }
    }
  }
`;

export interface Person {
  id: string;
  name: string;
}

export interface CompanyPeopleData {
  company: {
    people: Person[];
  };
}

export interface GetCompanyPeopleVars {
  companyId: string;
}

export const GET_COMPANY_PEOPLE = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      people {
        id
        name
      }
    }
  }
`;

export const useCompanyPeople = (
  variables: GetCompanyPeopleVars
): QueryResult<CompanyPeopleData, GetCompanyPeopleVars> => {
  return useQuery<CompanyPeopleData, GetCompanyPeopleVars>(GET_COMPANY_PEOPLE, {
    variables: variables,
  });
};

export interface PersonWithLocationReadings {
  id: string;
  name: string;
  locationReadings: LocationReading[];
}

export interface LocationReading {
  coordinates: string[];
  timestamp: string;
}

export interface LocationReadingFilter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
}

export interface CompanyLocationsData {
  company: {
    people: PersonWithLocationReadings[];
  };
}

export interface GetCompanyLocationsVars {
  companyId: string;
  filter: LocationReadingFilter;
}

export const GET_COMPANY_LOCATIONS = gql`
  query ($companyId: ID!, $filter: LocationReadingFilter) {
    company(id: $companyId) {
      people {
        id
        name
        locationReadings(filter: $filter) {
          coordinates
          timestamp
        }
      }
    }
  }
`;

export const useCompanyLocations = (
  variables: GetCompanyLocationsVars,
  skip = false
): QueryResult<CompanyLocationsData, GetCompanyLocationsVars> => {
  return useQuery<CompanyLocationsData, GetCompanyLocationsVars>(
    GET_COMPANY_LOCATIONS,
    {
      variables: variables,
      skip: skip,
    }
  );
};

export const GET_PERSON_LOCATIONS = gql`
  query ($personId: ID!, $filter: LocationReadingFilter) {
    person(id: $personId) {
      id
      name
      locationReadings(filter: $filter) {
        coordinates
        timestamp
      }
    }
  }
`;

export interface PersonLocationsData {
  person: PersonWithLocationReadings;
}

export interface GetPersonLocationsVars {
  personId: string;
  filter: LocationReadingFilter;
}

export const usePersonLocations = (
  variables: GetPersonLocationsVars,
  skip = false
): QueryResult<PersonLocationsData, GetPersonLocationsVars> => {
  return useQuery<PersonLocationsData, GetPersonLocationsVars>(
    GET_PERSON_LOCATIONS,
    {
      variables: variables,
      skip: skip,
    }
  );
};

export const GET_COMPANY_INCIDENTS = gql`
  query ($companyId: ID!, $filter: IncidentFilter) {
    company(id: $companyId) {
      people {
        name
        incidents(filter: $filter) {
          coordinates
          timestamp
          type
        }
      }
    }
  }
`;

export interface Incident {
  coordinates: string[];
  timestamp: string;
  type: string;
}

export interface PersonWithIncidents {
  id: string;
  name: string;
  incidents: Incident[];
}

export interface IncidentFilter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
}

export interface CompanyIncidentsData {
  company: {
    people: PersonWithIncidents[];
  };
}

export interface GetCompanyIncidentsVars {
  companyId: string;
  filter: IncidentFilter;
}

export const useCompanyIncidents = (
  variables: GetCompanyIncidentsVars,
  skip = false
): QueryResult<CompanyIncidentsData, GetCompanyIncidentsVars> => {
  return useQuery<CompanyIncidentsData, GetCompanyIncidentsVars>(
    GET_COMPANY_INCIDENTS,
    {
      variables: variables,
      skip: skip,
    }
  );
};

export const GET_PERSON_INCIDENTS = gql`
  query ($personId: ID!, $filter: IncidentFilter) {
    person(id: $personId) {
      id
      name
      incidents(filter: $filter) {
        coordinates
        timestamp
        type
      }
    }
  }
`;

export interface PersonIncidentsData {
  person: PersonWithIncidents;
}

export interface GetPersonIncidentsVars {
  personId: string;
  filter: IncidentFilter;
}

export const usePersonIncidents = (
  variables: GetPersonIncidentsVars,
  skip = false
): QueryResult<PersonIncidentsData, GetPersonIncidentsVars> => {
  return useQuery<PersonIncidentsData, GetPersonIncidentsVars>(
    GET_PERSON_INCIDENTS,
    {
      variables: variables,
      skip: skip,
    }
  );
};

export const GET_INCIDENT_STATS_FOR_COMPANY = gql`
  query ($companyId: ID!, $filter: IncidentStatsFilter) {
    company(id: $companyId) {
      incidentStats(filter: $filter) {
        type
        count
      }
    }
  }
`;

export const GET_INCIDENT_STATS_FOR_PERSON = gql`
  query ($personId: ID!, $filter: IncidentStatsFilter) {
    person(id: $personId) {
      name
      incidentStats(filter: $filter) {
        type
        count
      }
    }
  }
`;

export const GET_GAS_READINGS_FOR_COMPANY = gql`
  query ($companyId: ID!, $filter: GasReadingFilter) {
    company(id: $companyId) {
      people {
        name
        gasReadings(filter: $filter) {
          coordinates
          density
          densityUnits
          gas
          timestamp
        }
      }
    }
  }
`;

export const GET_GAS_READINGS_FOR_PERSON = gql`
  query ($personId: ID!, $filter: GasReadingFilter) {
    person(id: $personId) {
      name
      gasReadings(filter: $filter) {
        coordinates
        density
        densityUnits
        gas
        timestamp
      }
    }
  }
`;
