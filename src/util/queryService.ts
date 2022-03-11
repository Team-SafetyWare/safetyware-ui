import { gql } from "@apollo/client";

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

export const GET_PERSONS = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      people {
        id
        name
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      people {
        id
        name
        locationReadings {
          coordinates
          timestamp
        }
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

export const GET_INCIDENT_STATS = gql`
  query ($companyId: ID!, $filter: IncidentStatsFilter) {
    company(id: $companyId) {
      incidentStats(filter: $filter) {
        type
        count
      }
    }
  }
`;
