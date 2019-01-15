import * as React from "react";
import { Query } from "react-apollo";
import { GET_SPELLBOOK } from "../../graphql/queries";
import { Card, CardHeader, CardBody, List, ListItem, Badge } from "../core";
import { showDetailsModal } from "../../graphql/shared";

export interface IActiveBookSpellsProps {
  activeBookId: number;
}

const sortSpells = (spells: any[]) => {
  return spells.sort((a, b) => {
    if (a.level < b.level) return -1;
    else if (a.level > b.level) return 1;
    else return 0;
  });
};

export default class ActiveBookSpells extends React.Component<
  IActiveBookSpellsProps,
  any
> {
  public render() {
    const { activeBookId } = this.props;

    if (!activeBookId) return null;

    return (
      <Query query={GET_SPELLBOOK} variables={{ bookId: activeBookId }}>
        {({ data, loading }) => {
          if (loading) return "loading...";

          const sortedSpells = sortSpells(data.spellbook.spells);

          return (
            <Card>
              <CardHeader title="Active Spellbook" />

              <CardBody>
                <List style={{ maxHeight: 600 }} className="overflow-auto">
                  {sortedSpells.map((spell: any, index: number) => (
                    <ListItem
                      key={index}
                      onClick={() => showDetailsModal(spell.id, "Spell")}
                      className="cursor-pointer"
                    >
                      <span>{spell.name}</span>
                      <Badge color="teal" className="float-right">
                        Level {spell.level}
                      </Badge>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}
