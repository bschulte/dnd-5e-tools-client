import * as React from "react";
import { PageContainer, GraphqlQuery } from "../components/core";
import { GET_CHARACTERS } from "../graphql/queries";
import Characters from "../components/Characters/Characters";

export interface ICharactersPageProps {}

export default class CharactersPage extends React.Component<
  ICharactersPageProps,
  any
> {
  public render() {
    return (
      <PageContainer>
        <GraphqlQuery query={GET_CHARACTERS} component={Characters} />
      </PageContainer>
    );
  }
}
