import { gql } from "@apollo/client";

// APOLLO CALLS
export const GET_USERS = gql`
  query {
    people {
      id
      name
    }
  }
`;
