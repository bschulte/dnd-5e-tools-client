import gql from "graphql-tag";

export const SHOW_DETAILS_MODAL = gql`
  mutation showDetailsModal($type: String!, $id: Int!) {
    showDetailsModal(type: $type, id: $id) @client
  }
`;
