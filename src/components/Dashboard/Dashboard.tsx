import * as React from "react";

import { Row, Col } from "../core";
import { SpellsTable } from "./SpellsTable";

export interface IDashboardProps {
  data: any;
}

export class Dashboard extends React.Component<IDashboardProps, any> {
  public render() {
    const { data } = this.props;
    return (
      <Row>
        <Col>
          <SpellsTable spells={data.spells} />
        </Col>
        <Col>Testing</Col>
      </Row>
    );
  }
}
