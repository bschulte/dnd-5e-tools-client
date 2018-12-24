import * as React from "react";

import { Row, Col, Card, CardBody, CardHeader } from "../core";
import { SpellsTable } from "./SpellsTable";

export interface IDashboardProps {
  data: any;
}

export class Dashboard extends React.Component<IDashboardProps, any> {
  public render() {
    const { data } = this.props;
    return (
      <Row>
        <Col sm={6} lg={3}>
          <Card>
            <CardHeader title="Spells" />
            <CardBody>
              <SpellsTable spells={data.spells} />
            </CardBody>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          Testing
        </Col>
      </Row>
    );
  }
}
