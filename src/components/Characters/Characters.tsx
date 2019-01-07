import * as React from "react";
import { Row, Col, Card, CardHeader, CardBody, List, Button } from "../core";
import { ListItem } from "../core/ui/ListItem";
import { client } from "../../graphql/client";
import { UPDATE_CHARACTER } from "../../graphql/mutations";

export interface ICharactersProps {
  data: any;
}

export default class Characters extends React.Component<ICharactersProps, any> {
  setActiveCharacter = async (characterId: number) => {
    await client.mutate({
      mutation: UPDATE_CHARACTER,
      variables: { characterId, characterData: { active: true } }
    });
  };

  public render() {
    const { data } = this.props;
    console.log("data", data);
    return (
      <div>
        <Row>
          <Col sm={1}>
            <Card>
              <CardHeader
                title="Characters"
                rightComp={() => (
                  <Button icon primary>
                    <i className="far fa-plus" />
                  </Button>
                )}
              />
              <CardBody noPadding>
                <List>
                  {data.characters.map((character: any, index: number) => (
                    <ListItem
                      key={index}
                      onClick={() => this.setActiveCharacter(character.id)}
                      active={character.active}
                    >
                      {character.active && (
                        <i className="fas fa-circle text-xs" />
                      )}{" "}
                      {character.name}
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
