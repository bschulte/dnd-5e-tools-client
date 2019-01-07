import * as React from "react";
import { Row } from "../core";

export interface ISpellBooksProps {
  data: any[];
}

export default class SpellBooks extends React.Component<ISpellBooksProps, any> {
  public render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Row>Spellbooks</Row>
        <Row>Add to spellbook</Row>
      </React.Fragment>
    );
  }
}
