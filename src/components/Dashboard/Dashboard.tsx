import * as React from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  HotKey,
  GraphqlQuery
} from "../core";
import { SpellsTable } from "./SpellsTable";
import MonstersTable from "./MonstersTable";
import GlobalSearch from "./GlobalSearch";
import ItemsTable from "./ItemsTable";
import {
  GET_DETAILS_MODAL,
  IS_MODAL_OPEN
} from "../../graphql/localState/localQueries";
import { Query } from "react-apollo";
import DetailsModal from "./DetailsModal";

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

    const spells = data.spells.map((spell: any) => ({
      id: spell.id,
      name: spell.name,
      type: "Spell"
    }));
    const monsters = data.monsters.map((monster: any) => ({
      id: monster.id,
      name: monster.name,
      type: "Monster"
    }));
    const items = data.items.map((item: any) => ({
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
        <Query query={IS_MODAL_OPEN}>
          {({ data }) => (
            <React.Fragment>
              {!data.modalOpen && (
                <HotKey hotkey="s" shift onTrigger={this.toggleOmnibar} />
              )}
            </React.Fragment>
          )}
        </Query>

        <GlobalSearch
          items={items}
          showOmnibar={showOmnibar}
          toggle={this.toggleOmnibar}
        />

        <Query query={GET_DETAILS_MODAL}>
          {({ data }) => {
            const { isOpen, databaseId, type } = data.detailsModal;
            return (
              <DetailsModal
                isOpen={isOpen}
                type={type}
                databaseId={databaseId}
              />
            );
          }}
        </Query>

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
