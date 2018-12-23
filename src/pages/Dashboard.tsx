import * as React from "react";
import { HotKey, Modal } from "../components/core";

export interface IDashboardProps {}

export default class Dashboard extends React.Component<IDashboardProps, any> {
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
      <div>
        <HotKey hotkey="s" shift onTrigger={this.toggleModal} />
        <Modal isOpen={showModal} toggle={this.toggleModal} />
        App is here! Dashboard
      </div>
    );
  }
}
