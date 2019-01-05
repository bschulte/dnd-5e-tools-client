import * as React from "react";
import { Query } from "react-apollo";

import { Modal } from "../core";
import { GET_SPELL_DETAILS } from "../../graphql/queries";

export interface ISpellDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  spellId: number;
}

export default class SpellDetailsModal extends React.Component<
  ISpellDetailsModalProps,
  any
> {
  public render() {
    const { isOpen, toggle, spellId } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <Query query={GET_SPELL_DETAILS} variables={{ id: spellId }}>
          {({ data, loading, error }: any) => {
            if (loading) return "loading...";
            if (error) return "error";

            console.log("Spell details:", data);
            return <div>Spell details modal, id: {spellId}</div>;
          }}
        </Query>
      </Modal>
    );
  }
}
