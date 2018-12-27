import * as React from "react";

import { Row, Col, Card, CardBody, CardHeader, HotKey } from "../core";
import { SpellsTable } from "./SpellsTable";
import MonstersTable from "./MonstersTable";
import GlobalSearch from "./GlobalSearch";

export interface IDashboardProps {
  data: any;
}

export class Dashboard extends React.Component<IDashboardProps, any> {
  state = {
    showOmnibar: false
  };

  toggleOmnibar = () => {
    const { showOmnibar } = this.state;
    this.setState({ showOmnibar: !showOmnibar });
  };

  public render() {
    const { data } = this.props;
    const { showOmnibar } = this.state;

    return (
      <React.Fragment>
        <HotKey hotkey="s" shift onTrigger={this.toggleOmnibar} />

        <GlobalSearch
          data={data}
          showOmnibar={showOmnibar}
          toggle={this.toggleOmnibar}
        />

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
            <Card>
              <CardHeader title="Monsters" />
              <CardBody>
                <MonstersTable monsters={data.monsters} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
