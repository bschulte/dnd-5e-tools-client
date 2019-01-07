import gql from "graphql-tag";

export const GET_USER = gql`
  {
    user {
      email
    }
  }
`;

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
      classes {
        name
        subclass
        source
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

export const GET_MONSTER_DETAILS = gql`
  query monster($id: Float!) {
    monster(id: $id) {
      id
      name
      size
      type
      source
      alignment
      ac
      hp
      speed
      str
      dex
      con
      int
      wis
      cha
      skills
      immune
      senses
      passive
      languages
      cr
      spells
      legendaryGroup {
        lairActions
        lairActionsTitle
        regionalEffectsTitle
        regionalEffects
      }
      legendaries {
        name
        text
        attack
      }
      traits {
        name
        text
        attack
      }
      actions {
        name
        text
        attack
      }
    }
  }
`;

export const GET_ITEM_DETAILS = gql`
  query item($id: Float!) {
    item(id: $id) {
      id
      name
      type
      rarity
      wondrous
      value
      tier
      ac
      reqAttune
      weight
      source
      page
      entries
      resist
    }
  }
`;

export const GET_CHARACTERS = gql`
  {
    characters {
      id
      name
      active
      spellbook {
        name
        spells {
          name
        }
      }
    }
  }
`;
