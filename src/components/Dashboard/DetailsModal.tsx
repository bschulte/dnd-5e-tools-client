import * as React from "react";

import { client } from "../../graphql/client";
import { Modal } from "../core";
import { HIDE_DETAILS_MODAL } from "../../graphql/localState/localMutations";

export interface IDetailsModalProps {
  type?: "Monster" | "Spell" | "Item";
  id?: number;
  isOpen: boolean;
}

export default class DetailsModal extends React.Component<
  IDetailsModalProps,
  any
> {
  closeModal = () => {
    client.mutate({ mutation: HIDE_DETAILS_MODAL });
  };

  public render() {
    const { isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={this.closeModal}>
        <div>Testing out inside this modal!</div>
      </Modal>
    );
  }
}
