import * as React from "react";
import { Query } from "react-apollo";
import { GET_SPELLBOOK } from "../../graphql/queries";
import { Card, CardHeader, CardBody } from "../core";

export interface IActiveBookSpellsProps {
  activeBookId: number;
}

export default class ActiveBookSpells extends React.Component<
  IActiveBookSpellsProps,
  any
> {
  public render() {
    const { activeBookId } = this.props;

    return (
      <Query query={GET_SPELLBOOK} variables={{ bookId: activeBookId }}>
        {({ data, loading }) => {
          if (loading) return "loading...";

          return (
            <Card>
              <CardHeader title="Active Spellbook" />

              <CardBody>
                {data.spellbook.spells.map((spell: any, index: number) => (
                  <div key={index}>{spell.name}</div>
                ))}
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}
