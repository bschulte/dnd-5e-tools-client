import * as React from "react";
import { Omnibar } from "@blueprintjs/select";
import Fuse from "fuse.js";
import classNames from "classnames";
import { Grid, Row, Col } from "react-flexbox-grid";

import { HotKey, Badge } from "../core";

interface IGlobalSearchProps {
  data: any;
  showOmnibar: boolean;
  toggle: () => void;
}

interface IGlobalSearchState {
  searchStr: string;
  items: any[];
}

export default class GlobalSearch extends React.Component<
  IGlobalSearchProps,
  IGlobalSearchState
> {
  state: Readonly<IGlobalSearchState> = {
    searchStr: "",
    items: []
  };

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

    return [].concat(spells, monsters);
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

  public render() {
    const { showOmnibar, toggle, data } = this.props;
    const { searchStr, items } = this.state;

    const filteredItems = this.filterItems(items, searchStr);

    return (
      <React.Fragment>
        {showOmnibar && (
          <HotKey
            hotkey="escape"
            onTrigger={() => {
              toggle();
            }}
          />
        )}
        <Omnibar
          isOpen={showOmnibar}
          items={filteredItems}
          itemRenderer={(item: any, { modifiers }: any) => {
            return (
              <div
                className={classNames("py-2 px-1 border-b-2 flex", {
                  "bg-grey-dark text-white": modifiers.active
                })}
                key={item.name}
              >
                <div>{item.name}</div>
                <Badge
                  color={item.type === "Monster" ? "blue" : "purple"}
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
          onQueryChange={(searchStr: string) => this.setState({ searchStr })}
        />
      </React.Fragment>
    );
  }
}
