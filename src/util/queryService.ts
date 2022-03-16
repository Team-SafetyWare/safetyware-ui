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

export interface CompanyLocationData {
  company: {
    people: PersonWithLocationReadings[];
  };
}

export interface PersonWithLocationReadings {
  id: string;
  name: string;
  locationReadings: LocationReading[];
}

export interface LocationReading {
  coordinates: string[];
  timestamp: string;
}

export interface GetCompanyLocationsVars {
  companyId: string;
  filter: {
    minTimestamp?: Date;
    maxTimestamp?: Date;
  };
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
  variables: GetCompanyLocationsVars
): QueryResult<CompanyLocationData, GetCompanyLocationsVars> => {
  return useQuery<CompanyLocationData, GetCompanyLocationsVars>(
    GET_COMPANY_LOCATIONS,
    {
      variables: variables,
    }
  );
};

export const GET_PERSON_LOCATIONS = gql`
  query ($personId: ID!, $filter: LocationReadingFilter) {
    person(id: $personId) {
      name
      locationReadings(filter: $filter) {
        coordinates
        timestamp
      }
    }
  }
`;

export const GET_INCIDENTS_FOR_COMPANY = gql`
  query ($companyId: ID!, $filter: IncidentFilter) {
    company(id: $companyId) {
      name
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

export const GET_INCIDENTS_FOR_PERSON = gql`
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
