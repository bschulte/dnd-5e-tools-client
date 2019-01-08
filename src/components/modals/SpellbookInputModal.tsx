import * as React from "react";
import { Modal, Divider, Button, Input } from "../core";
import { client } from "../../graphql/client";
import { CREATE_SPELLBOOK } from "../../graphql/mutations";
import { GET_SPELLBOOKS } from "../../graphql/queries";

interface ISpellbookInputModalProps {
  isOpen: boolean;
  toggle: () => void;
  mode: "new" | "edit";
}

interface ISpellbookInputModalState {
  name: string;
  loading: boolean;
}

export default class SpellbookInputModal extends React.Component<
  ISpellbookInputModalProps,
  ISpellbookInputModalState
> {
  state = {
    name: "",
    loading: false
  };

  createSpellbook = async () => {
    const { toggle } = this.props;
    const { name } = this.state;
    console.log("Creating new spellbook");

    this.setState({ loading: true });

    await client.mutate({
      mutation: CREATE_SPELLBOOK,
      variables: { name },
      refetchQueries: [{ query: GET_SPELLBOOKS }],
      awaitRefetchQueries: true
    });

    toggle();
  };

  handleSubmit = () => {
    const { mode } = this.props;

    if (mode === "new") {
      this.createSpellbook();
    }
  };

  public render() {
    const { isOpen, toggle, mode } = this.props;
    const { name } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <h2>{mode === "new" ? "New Spellbook" : "Update Spellbook"}</h2>
        <Divider />

        <Input
          label="Name"
          labelSize="sm"
          value={name}
          onChange={e => this.setState({ name: e.currentTarget.value })}
          className="my-3"
        />

        <Divider />
        <div className="flex justify-end">
          <Button className="mr-3" onClick={toggle}>
            <i className="far fa-times" /> Cancel
          </Button>
          <Button primary onClick={this.handleSubmit}>
            <i className="far fa-arrow-circle-up" /> Submit
          </Button>
        </div>
      </Modal>
    );
  }
}
