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
  {
    people {
      id
      name
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

export const GET_INCIDENTS = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      name
      people {
        name
        incidents {
          coordinates
          timestamp
          type
        }
      }
    }
  }
`;

export const GET_INCIDENT_STATS = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      incidentStats {
        type
        count
      }
    }
  }
`;
