import gql from "graphql-tag";

export const DASHBOARD_QUERY = gql`
  {
    spells {
      id
      name
      level
    }
    monsters {
      id
      name
      cr
    }
    items {
      id
      name
      value
    }
  }
`;

export const GET_SPELL_DETAILS = gql`
  query spell($id: Float!) {
    spell(id: $id) {
      id
      name
      level
      school
      times {
        number
        unit
        condition
      }
      range {
        type
        distanceType
        distanceAmount
      }
      components {
        verbal
        somatic
        materials
      }
      source
      durations {
        type
        durationType
        durationAmount
        condition
        concentration
      }
      ritual
      entries
      entriesHigherLevel
    }
  }
`;
