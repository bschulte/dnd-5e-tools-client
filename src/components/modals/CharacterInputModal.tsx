import * as React from "react";
import Select from "react-select";

import { CLASSES, LEVELS, VALID_STAT_VALUES } from "../../shared/data";
import { Modal, Row, Col, Input, Divider, Label, Button } from "../core";
import { ValueType } from "react-select/lib/types";
import { client } from "../../graphql/client";
import { CREATE_CHARACTER } from "../../graphql/mutations";
import { GET_CHARACTERS } from "../../graphql/queries";

interface ICharacterInputModalProps {
  mode: "new" | "edit";
  isOpen: boolean;
  toggle: () => void;
}

interface IState {
  first: string;
  last: string;
  className: ValueType<{ value: string; label: string }>;
  level: ValueType<{ value: string; label: string }>;
  str: ValueType<{ value: string; label: string }>;
  dex: ValueType<{ value: string; label: string }>;
  con: ValueType<{ value: string; label: string }>;
  int: ValueType<{ value: string; label: string }>;
  wis: ValueType<{ value: string; label: string }>;
  cha: ValueType<{ value: string; label: string }>;
}

export default class CharacterInputModal extends React.Component<
  ICharacterInputModalProps,
  IState
> {
  state = {
    first: "",
    last: "",
    className: { value: "", label: "" },
    level: { value: "", label: "" },
    str: { value: "", label: "" },
    dex: { value: "", label: "" },
    con: { value: "", label: "" },
    int: { value: "", label: "" },
    wis: { value: "", label: "" },
    cha: { value: "", label: "" }
  };

  createNewCharacter = async () => {
    const { toggle } = this.props;
    const {
      first,
      last,
      className,
      level,
      str,
      dex,
      con,
      int,
      wis,
      cha
    } = this.state;

    await client.mutate({
      mutation: CREATE_CHARACTER,
      variables: {
        characterData: {
          firstName: first,
          lastName: last,
          level: parseInt(level.value, 10),
          className: className.value,
          str: parseInt(str.value, 10),
          dex: parseInt(dex.value, 10),
          con: parseInt(con.value, 10),
          int: parseInt(int.value, 10),
          wis: parseInt(wis.value, 10),
          cha: parseInt(cha.value, 10)
        }
      },
      refetchQueries: [{ query: GET_CHARACTERS }],
      awaitRefetchQueries: true
    });

    toggle();
  };

  handleSubmit = () => {
    const { mode } = this.props;
    if (mode === "new") {
      this.createNewCharacter();
    }
  };

  public render() {
    const { isOpen, toggle, mode } = this.props;
    const {
      first,
      last,
      className,
      level,
      str,
      dex,
      con,
      int,
      wis,
      cha
    } = this.state;

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
              onChange={e => this.setState({ first: e.currentTarget.value })}
            />
          </Col>
          <Col auto>
            <Input
              label="Last"
              labelSize="sm"
              value={last}
              onChange={e => this.setState({ last: e.currentTarget.value })}
            />
          </Col>
        </Row>

        <Row>
          <Col auto>
            <Label size="sm" text="Class" />
            <Select
              options={CLASSES.map(className => ({
                value: className,
                label: className
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => this.setState({ className: newValue })}
              value={className}
            />
          </Col>
          <Col auto>
            <Label size="sm" text="Level" />
            <Select
              options={LEVELS.map(level => ({
                value: level.toString(),
                label: level.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => this.setState({ level: newValue })}
              value={level}
            />
          </Col>
        </Row>
        <Row>
          <Col auto>
            <Label size="sm" text={"STR"} className="uppercase" />
            <Select
              options={VALID_STAT_VALUES.map(statValue => ({
                value: statValue.toString(),
                label: statValue.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => {
                this.setState({ str: newValue });
              }}
              value={str}
            />
          </Col>
          <Col auto>
            <Label size="sm" text={"DEX"} className="uppercase" />
            <Select
              options={VALID_STAT_VALUES.map(statValue => ({
                value: statValue.toString(),
                label: statValue.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => {
                this.setState({ dex: newValue });
              }}
              value={dex}
            />
          </Col>
          <Col auto>
            <Label size="sm" text={"CON"} className="uppercase" />
            <Select
              options={VALID_STAT_VALUES.map(statValue => ({
                value: statValue.toString(),
                label: statValue.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => {
                this.setState({ con: newValue });
              }}
              value={con}
            />
          </Col>
          <Col auto>
            <Label size="sm" text={"INT"} className="uppercase" />
            <Select
              options={VALID_STAT_VALUES.map(statValue => ({
                value: statValue.toString(),
                label: statValue.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => {
                this.setState({ int: newValue });
              }}
              value={int}
            />
          </Col>
          <Col auto>
            <Label size="sm" text={"WIS"} className="uppercase" />
            <Select
              options={VALID_STAT_VALUES.map(statValue => ({
                value: statValue.toString(),
                label: statValue.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => {
                this.setState({ wis: newValue });
              }}
              value={wis}
            />
          </Col>
          <Col auto>
            <Label size="sm" text={"CHA"} className="uppercase" />
            <Select
              options={VALID_STAT_VALUES.map(statValue => ({
                value: statValue.toString(),
                label: statValue.toString()
              }))}
              onChange={(
                newValue: ValueType<{ value: string; label: string }>
              ) => {
                this.setState({ cha: newValue });
              }}
              value={cha}
            />
          </Col>
        </Row>

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
