import { gql } from "@apollo/client";

// APOLLO CALLS
export const GET_PERSONS = gql`
  query {
    people {
      id
      name
    }
  }
`;
