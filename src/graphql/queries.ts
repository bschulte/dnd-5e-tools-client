import gql from "graphql-tag";

export const dashboardQuery = gql`
  {
    spells {
      _id
      name
      level
    }
    monsters {
      _id
      name
      cr
    }
  }
`;
