import React, { Component } from "react";
import { HotKey, Modal } from "./components/core";

interface IAppState {
  showModal: boolean;
}

class App extends Component<any, IAppState> {
  state = {
    showModal: false
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="animated fadeIn">
        <HotKey hotkey="s" shift onTrigger={this.toggleModal} />
        <Modal
          isOpen={showModal}
          toggle={this.toggleModal}
          backgroundClickClose={false}
          escapeClose={false}
        />
        App is here!
      </div>
    );
  }
}

export default App;
