import * as React from "react";
import { Omnibar } from "@blueprintjs/select";

import { Row, Col, Card, CardBody, CardHeader, HotKey } from "../core";
import { SpellsTable } from "./SpellsTable";
import MonstersTable from "./MonstersTable";

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

  generateOmnibarItems = (data: any) => {
    if (!("spells" in data) || !("monsters" in data)) {
      return [];
    }

    const spells = data.spells.map((spell: any) => ({
      name: spell.name,
      type: "Spell"
    }));
    const monsters = data.monsters.map((monster: any) => ({
      name: monster.name,
      type: "Monster"
    }));

    return [].concat(spells, monsters);
  };

  public render() {
    const { data } = this.props;
    const { showOmnibar } = this.state;

    return (
      <React.Fragment>
        <HotKey hotkey="s" shift onTrigger={this.toggleOmnibar} />

        <Omnibar
          isOpen={showOmnibar}
          items={this.generateOmnibarItems(data)}
          itemRenderer={item => (
            <div>
              {item.name} : {item.type}
            </div>
          )}
          onItemSelect={item => {
            console.log("Item selected: ", item);
            this.toggleOmnibar();
          }}
          resetOnSelect
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
