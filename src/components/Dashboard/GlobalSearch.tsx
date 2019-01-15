import * as React from "react";
import { Query } from "react-apollo";

import { Modal, Badge, DropdownSearch, HotKey, ListItem } from "../core";
import { showDetailsModal } from "../../graphql/shared";
import { DASHBOARD_QUERY } from "../../graphql/queries";
import { IS_MODAL_OPEN } from "../../graphql/localState/localQueries";
import { isLoggedIn } from "../../util/auth";

interface IGlobalSearchProps {}

interface IGlobalSearchState {}

export default class GlobalSearch extends React.Component<
  IGlobalSearchProps,
  IGlobalSearchState
> {
  state = {
    showOmnibar: false
  };

  toggle = () => {
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

  handleActiveItemSelect = (activeItem: any) => {
    showDetailsModal(activeItem.id, activeItem.type);

    this.toggle();
  };

  public render() {
    const { showOmnibar } = this.state;

    return (
      <div>
        <Query query={IS_MODAL_OPEN}>
          {({ data }) => (
            <React.Fragment>
              {!data.modalOpen && isLoggedIn() && (
                <HotKey hotkey="s" shift onTrigger={this.toggle} />
              )}
            </React.Fragment>
          )}
        </Query>
        <Modal isOpen={showOmnibar} toggle={this.toggle}>
          <Query query={DASHBOARD_QUERY}>
            {({ data, loading }) => {
              if (loading) return "loading...";

              const items = this.generateOmnibarItems(data);

              return (
                <DropdownSearch
                  items={items}
                  onActiveItemSelect={this.handleActiveItemSelect}
                  focusOnMount
                  renderItemRow={(item: any, activeItem: any) => (
                    <ListItem
                      key={item.key}
                      active={activeItem.key === item.key}
                    >
                      <span>{item.name}</span>
                      <Badge
                        className="float-right"
                        color={
                          item.type === "Spell"
                            ? "teal"
                            : item.type === "Monster"
                            ? "purple"
                            : "pink"
                        }
                      >
                        {item.type}
                      </Badge>
                    </ListItem>
                  )}
                  filterKeys={["type", "name"]}
                />
              );
            }}
          </Query>
        </Modal>
      </div>
    );
  }
}
