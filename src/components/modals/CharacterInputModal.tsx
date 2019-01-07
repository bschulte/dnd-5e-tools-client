import * as React from "react";
import { Modal, Row, Col, Input, Divider } from "../core";

interface ICharacterInputModalProps {
  mode: "new" | "edit";
  isOpen: boolean;
  toggle: () => void;
}

interface ICharacterInputModalState {
  first: string;
  last: string;
}

export default class CharacterInputModal extends React.Component<
  ICharacterInputModalProps,
  ICharacterInputModalState
> {
  state = {
    first: "",
    last: ""
  };

  setTextValue = (stateKey: string, newValue: string) => {
    this.setState({ [stateKey]: newValue } as Pick<
      ICharacterInputModalState,
      keyof ICharacterInputModalState
    >);
  };

  public render() {
    const { isOpen, toggle, mode } = this.props;
    const { first, last } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <h2>{mode === "new" ? "New Character" : "Update Character"}</h2>
        <Divider />

        <Row>
          <Col auto>
            <Input
              label="First"
              labelSize="sm"
              value={first}
              onChange={e => this.setTextValue("first", e.currentTarget.value)}
            />
          </Col>
          <Col auto>
            <Input
              label="Last"
              labelSize="sm"
              value={last}
              onChange={e => this.setTextValue("last", e.currentTarget.value)}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}
