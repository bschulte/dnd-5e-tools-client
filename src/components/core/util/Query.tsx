import * as React from "react";
import { Query } from "react-apollo";

export interface IQueryProps {
  query: any;
  component: React.ComponentClass<any>;
}

export class GraphqlQuery extends React.Component<IQueryProps, any> {
  public render() {
    const { component: Component, query } = this.props;
    return (
      <Query query={query}>
        {({ data, loading, refetch }) => {
          if (loading) return "loading...";

          return <Component data={data} refetch={refetch} />;
        }}
      </Query>
    );
  }
}
