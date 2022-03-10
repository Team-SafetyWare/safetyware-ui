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
  {
    userAccount(id: "1fh2ktnk5gd01c040d0vbc1z") {
      company {
        incidentStats {
          type
          count
        }
      }
    }
  }
`;
