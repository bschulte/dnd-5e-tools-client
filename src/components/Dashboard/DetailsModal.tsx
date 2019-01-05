import * as React from "react";

import { client } from "../../graphql/client";
import { Modal } from "../core";
import { HIDE_DETAILS_MODAL } from "../../graphql/localState/localMutations";
import SpellDetailsModal from "../modals/SpellDetailsModal";
import MonsterDetailsModal from "../modals/MonsterDetailsModal";
import ItemDetailsModal from "../modals/ItemDetailsModal";

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
    if (type === "Spell") {
      return (
        <SpellDetailsModal
          isOpen={isOpen}
          toggle={this.closeModal}
          spellId={databaseId}
        />
      );
    } else if (type === "Monster") {
      return (
        <MonsterDetailsModal
          isOpen={isOpen}
          toggle={this.closeModal}
          monsterId={databaseId}
        />
      );
    } else if (type === "Item") {
      return (
        <ItemDetailsModal
          isOpen={isOpen}
          toggle={this.closeModal}
          itemId={databaseId}
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
