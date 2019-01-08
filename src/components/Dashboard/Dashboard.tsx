import * as React from "react";

import { Row, Col, Card, CardBody, CardHeader, HotKey } from "../core";
import { SpellsTable } from "./SpellsTable";
import MonstersTable from "./MonstersTable";
import ItemsTable from "./ItemsTable";

export interface IDashboardProps {
  data: any;
}

export class Dashboard extends React.Component<IDashboardProps, any> {
  public render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col sm={6} lg={2}>
            <Card>
              <CardHeader title="Spells" accentColor="black" />
              <CardBody>
                <SpellsTable spells={data.spells} />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={2}>
            <Card>
              <CardHeader title="Monsters" accentColor="black" />
              <CardBody>
                <MonstersTable monsters={data.monsters} />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={2}>
            <Card>
              <CardHeader title="Items" accentColor="black" />
              <CardBody>
                <ItemsTable items={data.items} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
