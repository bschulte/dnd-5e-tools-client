import * as React from "react";
import Fuse from "fuse.js";
import classNames from "classnames";
import { debounce } from "../../util";

import { Modal, Input } from "../core";

interface IGlobalSearchProps {
  data: any;
  showOmnibar: boolean;
  toggle: () => void;
}

interface IGlobalSearchState {
  searchStr: string;
  items: any[];
  activeItem: any;
}

export default class GlobalSearch extends React.Component<
  IGlobalSearchProps,
  IGlobalSearchState
> {
  constructor(props: IGlobalSearchProps) {
    super(props);

    this.state = {
      searchStr: "",
      items: [],
      activeItem: null
    };
  }

  componentWillUpdate(nextProps: IGlobalSearchProps) {
    const { data } = nextProps;
    const { items } = this.state;
    if (
      data.spells.length > 0 &&
      data.monsters.length > 0 &&
      items.length === 0
    ) {
      this.setState({ items: this.generateOmnibarItems(data) });
    }
  }

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
    const items = data.items.map((item: any) => ({
      name: item.name,
      type: "Item"
    }));

    return [].concat(spells, monsters, items);
  };

  filterItems = (items: any[], searchStr: string) => {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name", "type"]
    };

    const fuse = new Fuse(items, options);

    return fuse.search(searchStr);
  };

  handleSearchStrChange = (searchStr: string) => {
    console.log("Setting search str:", searchStr);
    this.setState({ searchStr });
  };

  handleActiveItemChange = (activeItem: any) => {
    console.log("Setting active item:", activeItem);
    this.setState({ activeItem });
  };

  public render() {
    const { showOmnibar, toggle } = this.props;
    const { searchStr, items, activeItem } = this.state;

    const filteredItems = this.filterItems(items, searchStr);

    return (
      <Modal isOpen={showOmnibar} toggle={toggle}>
        <Input backgroundColor="light" block focusOnMount />
        {/* <Omnibar
          isOpen={showOmnibar}
          items={filteredItems}
          itemRenderer={(item: any, { modifiers }: any) => {
            return (
              <div
                className={classNames("py-2 px-1 border-b-2 flex", {
                  "bg-grey-dark text-white": modifiers.active
                })}
                key={item.name + item.type}
              >
                <div>{item.name}</div>
                <Badge
                  color={
                    item.type === "Monster"
                      ? "blue"
                      : item.type === "Spell"
                      ? "purple"
                      : "teal"
                  }
                  className="ml-4"
                >
                  {item.type}
                </Badge>
              </div>
            );
          }}
          onItemSelect={(item: any) => {
            console.log("Item selected: ", item);
            toggle();
          }}
          resetOnSelect
          query={searchStr}
          onQueryChange={this.handleSearchStrChange}
          activeItem={activeItem || filteredItems[0]}
          onActiveItemChange={this.handleActiveItemChange}
        /> */}
      </Modal>
    );
  }
}
