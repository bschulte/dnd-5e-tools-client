import * as React from "react";

import { client } from "../../graphql/client";
import { Modal } from "../core";
import { HIDE_DETAILS_MODAL } from "../../graphql/localState/localMutations";
import SpellDetailsModal from "../modals/SpellDetailsModal";

export interface IDetailsModalProps {
  type?: "Monster" | "Spell" | "Item";
  databaseId?: number;
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
    const { isOpen, type, databaseId } = this.props;
    console.log("Type:", type);
    if (type === "Spell") {
      return (
        <SpellDetailsModal
          isOpen={isOpen}
          toggle={this.closeModal}
          spellId={databaseId}
        />
      );
    } else {
      return (
        <Modal isOpen={isOpen} toggle={this.closeModal}>
          <div>Testing out inside this modal!</div>
        </Modal>
      );
    }
  }
}
