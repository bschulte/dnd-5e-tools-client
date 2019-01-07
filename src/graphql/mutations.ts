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

export const UPDATE_CHARACTER = gql`
  mutation updateCharacter(
    $characterId: Float!
    $characterData: CharacterInput!
  ) {
    updateCharacter(
      characterId: $characterId
      newCharacterData: $characterData
    ) {
      id
      name
      active
    }
  }
`;

export const CREATE_CHARACTER = gql`
  mutation createCharacter($characterData: CharacterInput!) {
    createCharacter(newCharacterData: $characterData) {
      id
      name
      active
    }
  }
`;
