import {gql} from "@apollo/client";

export const GET_PERSONS = gql`
  query {
    people {
      id
      name
    }
  }
`;
export const GET_LOCATIONS = gql`
  query {
    locationReadings {
      coordinates
      timestamp
      person {
        id
        name
      }
    }
  }
`;