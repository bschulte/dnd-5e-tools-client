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

export const IS_MODAL_OPEN = gql`
  {
    modalOpen @client
  }
`;
