import * as React from "react";
import { Query } from "react-apollo";
import { GET_SPELL_LIST, GET_SPELLBOOK } from "../../graphql/queries";
import {
  Card,
  CardHeader,
  CardBody,
  DropdownSearch,
  ListItem,
  Badge
} from "../core";
import { client } from "../../graphql/client";
import { TOGGLE_SPELL } from "../../graphql/mutations";

export interface IQuickAddSpellProps {}

export default class QuickAddSpell extends React.Component<
  IQuickAddSpellProps,
  any
> {
  toggleSpell = async (spellItem: any) => {
    await client.mutate({
      mutation: TOGGLE_SPELL,
      variables: { spellId: spellItem.id },
      refetchQueries: [{ query: GET_SPELLBOOK }]
    });
  };

  public render() {
    return (
      <Query query={GET_SPELL_LIST}>
        {({ data, loading }) => {
          if (loading) return "loading...";

          return (
            <Card>
              <CardHeader title="Quick Add Spell" />
              <CardBody>
                <DropdownSearch
                  filterKeys={["name"]}
                  numItemsToShow={5}
                  items={data.spells.map((spell: any, index: any) => ({
                    ...spell,
                    key: index
                  }))}
                  renderItemRow={(item: any, activeItem: any) => (
                    <ListItem
                      key={item.key}
                      active={activeItem.key === item.key}
                    >
                      <span>{item.name}</span>
                      <Badge className="float-right" color={"teal"}>
                        Level {item.level}
                      </Badge>
                    </ListItem>
                  )}
                  onActiveItemSelect={(activeItem: any) =>
                    this.toggleSpell(activeItem)
                  }
                />
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}
