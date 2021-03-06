import * as React from "react";
import { Row, Col } from "../core";
import { client } from "../../graphql/client";
import { UPDATE_CHARACTER } from "../../graphql/mutations";
import CharacterInputModal from "../modals/CharacterInputModal";
import { CharacterList } from "./CharacterList";
import { GET_CHARACTERS } from "../../graphql/queries";
import CharacterTracker from "./CharacterTracker";

interface ICharactersProps {
  data: any;
}

interface ICharacterState {
  showNewCharacterModal: boolean;
}

export default class Characters extends React.Component<
  ICharactersProps,
  ICharacterState
> {
  state = {
    showNewCharacterModal: false
  };

  setActiveCharacter = async (characterId: number) => {
    await client.mutate({
      mutation: UPDATE_CHARACTER,
      variables: { characterId, characterData: { active: true } },
      refetchQueries: [{ query: GET_CHARACTERS }],
      awaitRefetchQueries: true
    });
  };

  public render() {
    const { data } = this.props;
    const { showNewCharacterModal } = this.state;

    const activeChar = data.characters.find((char: any) => char.active);

    return (
      <div>
        <CharacterInputModal
          mode="new"
          isOpen={showNewCharacterModal}
          toggle={() =>
            this.setState({
              showNewCharacterModal: !this.state.showNewCharacterModal
            })
          }
        />
        <Row>
          <Col sm={1}>
            <CharacterList
              characters={data.characters}
              showNewCharModal={() =>
                this.setState({ showNewCharacterModal: true })
              }
              setActiveCharacter={this.setActiveCharacter}
            />
          </Col>

          <Col sm={4}>
            <CharacterTracker
              activeCharId={activeChar ? activeChar.id : null}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
