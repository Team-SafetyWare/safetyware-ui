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

export const GET_INCIDENTS = gql`
    query {
      incidents{
        coordinates
        timestamp
        type
        person{
          name
          company{
            name
          }
        }
      }
    }
`;

export const GET_PEOPLE = gql`
    query {
      people{
        id
        name
      }
    }
`;
