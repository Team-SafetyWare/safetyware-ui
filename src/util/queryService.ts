import {gql} from "@apollo/client";

export const GET_PEOPLE = gql`
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
      }
    }
`;