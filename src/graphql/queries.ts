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
    }
  }
`;

export const SPELL_DETAILS_QUERY = gql`
  {
    spell(id: "5bfa216faa9325fd9304f99c") {
      name
      level
      school
      time {
        number
        unit
      }
      range {
        type
        distance {
          amount
          type
        }
      }
      components {
        v
        s
        m
      }
      duration
      classes {
        fromSubClass {
          class {
            name
            source
          }
          subclass {
            name
            source
          }
        }
        fromClassList {
          name
          source
        }
      }
      source
      meta {
        ritual
        technomagic
      }
      entries
      entriesHigherLevel {
        type
        name
        entries
      }
    }
  }
`;
