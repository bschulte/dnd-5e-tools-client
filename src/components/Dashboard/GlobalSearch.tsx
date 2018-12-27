import * as React from "react";
import { Omnibar } from "@blueprintjs/select";
import { HotKey } from "../core";

export interface IGlobalSearchProps {
  data: any[];
  showOmnibar: boolean;
  toggle: () => void;
}

export default class GlobalSearch extends React.Component<
  IGlobalSearchProps,
  any
> {
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
    const { data, showOmnibar, toggle } = this.props;
    return (
      <React.Fragment>
        {showOmnibar && (
          <HotKey
            hotkey="escape"
            onTrigger={() => {
              console.log("Escape pressed");
              toggle();
            }}
          />
        )}
        <Omnibar
          isOpen={showOmnibar}
          items={this.generateOmnibarItems(data)}
          itemRenderer={(item: any) => (
            <div>
              {item.name} : {item.type}
            </div>
          )}
          onItemSelect={(item: any) => {
            console.log("Item selected: ", item);
            toggle();
          }}
          resetOnSelect
        />
      </React.Fragment>
    );
  }
}
