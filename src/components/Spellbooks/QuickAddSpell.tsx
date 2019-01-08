import * as React from "react";
import { Query } from "react-apollo";
import { GET_SPELL_LIST } from "../../graphql/queries";
import {
  Card,
  CardHeader,
  CardBody,
  DropdownSearch,
  ListItem,
  Badge
} from "../core";

export interface IQuickAddSpellProps {}

export default class QuickAddSpell extends React.Component<
  IQuickAddSpellProps,
  any
> {
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
                  items={data.spells.map((spell: any, index: any) => ({
                    ...spell,
                    key: index
                  }))}
                  filterKeys={["name"]}
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
                  numItemsToShow={5}
                  onActiveItemSelect={(activeItem: any) =>
                    alert(activeItem.name)
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
