import {gql, useQuery} from "@apollo/client";
import {QueryResult} from "@apollo/client/react/types/types";

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
      id
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
      id
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
  execute = true
): QueryResult<CompanyLocationsData, GetCompanyLocationsVars> => {
  return useQuery<CompanyLocationsData, GetCompanyLocationsVars>(
    GET_COMPANY_LOCATIONS,
    {
      variables: variables,
      skip: !execute,
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
  execute = true
): QueryResult<PersonLocationsData, GetPersonLocationsVars> => {
  return useQuery<PersonLocationsData, GetPersonLocationsVars>(
    GET_PERSON_LOCATIONS,
    {
      variables: variables,
      skip: !execute,
    }
  );
};

export const GET_COMPANY_INCIDENTS = gql`
  query ($companyId: ID!, $filter: IncidentFilter) {
    company(id: $companyId) {
      id
      people {
        id
        name
        incidents(filter: $filter) {
          id
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
  execute = true
): QueryResult<CompanyIncidentsData, GetCompanyIncidentsVars> => {
  return useQuery<CompanyIncidentsData, GetCompanyIncidentsVars>(
    GET_COMPANY_INCIDENTS,
    {
      variables: variables,
      skip: !execute,
    }
  );
};

export const GET_PERSON_INCIDENTS = gql`
  query ($personId: ID!, $filter: IncidentFilter) {
    person(id: $personId) {
      id
      name
      incidents(filter: $filter) {
        id
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
  execute = true
): QueryResult<PersonIncidentsData, GetPersonIncidentsVars> => {
  return useQuery<PersonIncidentsData, GetPersonIncidentsVars>(
    GET_PERSON_INCIDENTS,
    {
      variables: variables,
      skip: !execute,
    }
  );
};

export const GET_COMPANY_INCIDENT_STATS = gql`
  query ($companyId: ID!, $filter: IncidentStatsFilter) {
    company(id: $companyId) {
      id
      incidentStats(filter: $filter) {
        type
        count
      }
    }
  }
`;

export interface IncidentStat {
  type: string;
  count: number;
}

export interface IncidentStatsFilter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
}

export interface CompanyIncidentStatsData {
  company: {
    incidentStats: IncidentStat[];
  };
}

export interface CompanyIncidentStatsVars {
  companyId: string;
  filter: IncidentStatsFilter;
}

export const useCompanyIncidentStats = (
  variables: GetCompanyIncidentsVars,
  execute = true
): QueryResult<CompanyIncidentStatsData, CompanyIncidentStatsVars> => {
  return useQuery<CompanyIncidentStatsData, CompanyIncidentStatsVars>(
    GET_COMPANY_INCIDENT_STATS,
    {
      variables: variables,
      skip: !execute,
    }
  );
};

export const GET_PERSON_INCIDENT_STATS = gql`
  query ($personId: ID!, $filter: IncidentStatsFilter) {
    person(id: $personId) {
      id
      incidentStats(filter: $filter) {
        type
        count
      }
    }
  }
`;

export interface PersonIncidentStatsData {
  person: {
    incidentStats: IncidentStat[];
  };
}

export interface PersonIncidentStatsVars {
  personId: string;
  filter: IncidentStatsFilter;
}

export const usePersonIncidentStats = (
  variables: GetPersonIncidentsVars,
  execute = true
): QueryResult<PersonIncidentStatsData, PersonIncidentStatsVars> => {
  return useQuery<PersonIncidentStatsData, PersonIncidentStatsVars>(
    GET_PERSON_INCIDENT_STATS,
    {
      variables: variables,
      skip: !execute,
    }
  );
};

export const GET_GAS_READINGS_FOR_COMPANY = gql`
  query ($companyId: ID!, $filter: GasReadingFilter) {
    company(id: $companyId) {
      id
      people {
        id
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

export interface GasReading {
    coordinates: string[];
    timestamp: string;
    density: string;
    densityUnits: string,
    gas: string,
}

export interface PersonWithGasReadings {
    id: string;
    name: string;
    gasReadings: GasReading[]
}

export interface GasReadingFilter {
    minTimestamp?: Date;
    maxTimestamp?: Date;
}

export interface GetCompanyGasReadingVars {
    companyId: string;
    filter: GasReadingFilter;
}

export interface CompanyGasReadingsData {
    company: {
        people: PersonWithGasReadings[];
    };
}

export const useCompanyGasReadings = (
    variables: GetCompanyGasReadingVars,
    execute = true
): QueryResult<CompanyGasReadingsData, GetCompanyGasReadingVars> => {
    return useQuery<CompanyGasReadingsData, GetCompanyGasReadingVars>(
        GET_GAS_READINGS_FOR_COMPANY,
        {
            variables: variables,
            skip: !execute,
        }
    );
};

export const GET_GAS_READINGS_FOR_PERSON = gql`
  query ($personId: ID!, $filter: GasReadingFilter) {
    person(id: $personId) {
      id
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

export interface GetPersonGasReadingVars {
    personId: string;
    filter: GasReadingFilter;
}

export interface PersonGasReadingsData {
    person: PersonWithGasReadings;
}

export const usePersonGasReadings = (
    variables: GetPersonGasReadingVars,
    execute = true
): QueryResult<PersonGasReadingsData, GetPersonGasReadingVars> => {
    return useQuery<PersonGasReadingsData, GetPersonGasReadingVars>(
        GET_GAS_READINGS_FOR_PERSON,
        {
            variables: variables,
            skip: !execute,
        }
    );
};
