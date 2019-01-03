import gql from "graphql-tag";

const USER_INPUT = gql`
  input UserInput {
    email: String!
    password: String!
  }
`;

export const LOGIN = gql`
  mutation login($userData: UserInput!) {
    login(userData: $userData)
  }
`;
