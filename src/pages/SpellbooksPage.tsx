import * as React from "react";
import { PageContainer, GraphqlQuery } from "../components/core";
import { GET_SPELLBOOKS } from "../graphql/queries";
import SpellBooks from "../components/Characters/SpellBooks";

export interface ISpellbooksPageProps {}

export default class SpellbooksPage extends React.Component<
  ISpellbooksPageProps,
  any
> {
  public render() {
    return (
      <PageContainer>
        <GraphqlQuery query={GET_SPELLBOOKS} component={SpellBooks} />
      </PageContainer>
    );
  }
}
