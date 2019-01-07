import * as React from "react";
import { Card, CardHeader, Button, CardBody, List } from "../core";
import { ListItem } from "../core/ui/ListItem";

interface ICharacterListProps {
  characters: any[];
  setActiveCharacter: any;
  showNewCharModal: () => void;
}

export const CharacterList: React.SFC<ICharacterListProps> = ({
  characters,
  setActiveCharacter,
  showNewCharModal
}) => {
  return (
    <Card>
      <CardHeader
        title="Characters"
        rightComp={() => (
          <Button icon primary onClick={showNewCharModal}>
            <i className="far fa-plus" />
          </Button>
        )}
      />
      <CardBody noPadding>
        <List>
          {characters.map((character: any, index: number) => (
            <ListItem
              key={index}
              onClick={() => setActiveCharacter(character.id)}
              active={character.active}
              className="cursor-pointer"
            >
              {character.name}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};
