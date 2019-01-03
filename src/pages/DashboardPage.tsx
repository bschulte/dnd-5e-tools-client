import * as React from "react";

import { PageContainer, GraphqlQuery } from "../components/core";
import { Dashboard } from "../components/Dashboard/Dashboard";

import { DASHBOARD_QUERY } from "../graphql/queries";

export interface IDashboardProps {}

export default class DashboardPage extends React.Component<
  IDashboardProps,
  any
> {
  public render() {
    return (
      <PageContainer>
        <GraphqlQuery query={DASHBOARD_QUERY} component={Dashboard} />
      </PageContainer>
    );
  }
}
