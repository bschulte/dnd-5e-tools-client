import React, { Component } from "react";
import HotKey from "./components/core/Hotkey";
import Modal from "./components/core/Modal";

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
        <Modal isOpen={showModal} toggle={this.toggleModal} />
        App is here!
      </div>
    );
  }
}

export default App;
