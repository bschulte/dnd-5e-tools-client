import * as React from "react";

import { Row, Col, Card, CardBody, CardHeader, HotKey } from "../core";
import { SpellsTable } from "./SpellsTable";
import MonstersTable from "./MonstersTable";
import GlobalSearch from "./GlobalSearch";
import ItemsTable from "./ItemsTable";

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
    if (!("spells" in data) || !("monsters" in data) || !("items" in data)) {
      return [];
    }

    const spells = data.spells.map((spell: any, index: number) => ({
      id: spell.id,
      name: spell.name,
      type: "Spell"
    }));
    const monsters = data.monsters.map((monster: any, index: number) => ({
      id: monster.id,
      name: monster.name,
      type: "Monster"
    }));
    const items = data.items.map((item: any, index: number) => ({
      id: item.id,
      name: item.name,
      type: "Item"
    }));

    return []
      .concat(spells, monsters, items)
      .map((item, index: number) => ({ ...item, key: index }));
  };

  public render() {
    const { data } = this.props;
    const { showOmnibar } = this.state;

    const items = this.generateOmnibarItems(data);

    return (
      <React.Fragment>
        <HotKey hotkey="s" shift onTrigger={this.toggleOmnibar} />

        <GlobalSearch
          items={items}
          showOmnibar={showOmnibar}
          toggle={this.toggleOmnibar}
        />

        <Row>
          <Col sm={6} lg={2}>
            <Card>
              <CardHeader title="Spells" />
              <CardBody>
                <SpellsTable spells={data.spells} />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={2}>
            <Card>
              <CardHeader title="Monsters" />
              <CardBody>
                <MonstersTable monsters={data.monsters} />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={2}>
            <Card>
              <CardHeader title="Items" />
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
