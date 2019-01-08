import * as React from "react";
import { Query } from "react-apollo";
import { GET_SPELL_LIST } from "../../graphql/queries";
import { Card, CardHeader, CardBody } from "../core";

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
              <CardBody>{data.spells.length}</CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}
