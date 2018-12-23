import gql from "graphql-tag";
export const getSpells = gql`
  {
    spells {
      _id
      name
    }
  }
`;
