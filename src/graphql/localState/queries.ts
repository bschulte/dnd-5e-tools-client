import gql from "graphql-tag";

export const GET_DETAILS_MODAL = gql`
  {
    detailsModal @client {
      isOpen
      type
      databaseId
    }
  }
`;
