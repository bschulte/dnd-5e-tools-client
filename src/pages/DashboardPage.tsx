import * as React from "react";

import { HotKey, Modal, PageContainer, GraphqlQuery } from "../components/core";
import { Dashboard } from "../components/Dashboard/Dashboard";

import { dashboardQuery } from "../graphql/queries";

export interface IDashboardProps {}

export default class DashboardPage extends React.Component<
  IDashboardProps,
  any
> {
  state = {
    showModal: false
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  public render() {
    const { showModal } = this.state;
    return (
      <PageContainer>
        <HotKey hotkey="s" shift onTrigger={this.toggleModal} />
        <Modal isOpen={showModal} toggle={this.toggleModal} />

        <GraphqlQuery query={dashboardQuery} component={Dashboard} />
      </PageContainer>
    );
  }
}
