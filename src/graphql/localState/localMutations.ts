import gql from "graphql-tag";

export const SHOW_DETAILS_MODAL = gql`
  mutation showDetailsModal($type: String!, $databaseId: Int!) {
    showDetailsModal(type: $type, databaseId: $databaseId) @client
  }
`;

export const HIDE_DETAILS_MODAL = gql`
  mutation hideDetailsModal {
    hideDetailsModal @client
  }
`;
