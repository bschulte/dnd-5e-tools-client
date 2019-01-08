import * as React from "react";
import { HotKey } from "../util/Hotkey";
import { Input } from "./Input";
import Fuse from "fuse.js";
import { List } from "./List";

interface IDropdownSearchProps {
  items: any[];
  numItemsToShow?: number;
  filterKeys: string[];
  focusOnMount?: boolean;
  onActiveItemSelect: (activeItem: any) => void;
  renderItemRow: (item: any, activeItem: any) => React.ReactNode;
}

interface IDropdownSearchState {
  searchStr: string;
  filteredItems: any[];
  activeItem: any;
  searchInputFocused: boolean;
}

export class DropdownSearch extends React.Component<
  IDropdownSearchProps,
  IDropdownSearchState
> {
  public static defaultProps = {
    numItemsToShow: 10
  };

  constructor(props: IDropdownSearchProps) {
    super(props);

    this.state = {
      searchStr: "",
      filteredItems: [],
      activeItem: null,
      searchInputFocused: false
    };
  }

  filterItems = (items: any[], searchStr: string) => {
    const { filterKeys } = this.props;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: filterKeys
    };

    const fuse = new Fuse(items, options);

    return fuse.search(searchStr);
  };

  selectNextItem = () => {
    const { filteredItems, activeItem } = this.state;
    const { numItemsToShow } = this.props;

    let previousItemWasActive = false;
    for (const item of filteredItems.slice(0, numItemsToShow)) {
      if (previousItemWasActive) {
        this.setState({ activeItem: item });
        return;
      }

      previousItemWasActive = item.key === activeItem.key;
    }
  };

  selectPreviousItem = () => {
    const { filteredItems, activeItem } = this.state;
    const { numItemsToShow } = this.props;

    let previousItem: any = null;
    for (const item of filteredItems.slice(0, numItemsToShow)) {
      if (item.key === activeItem.key) {
        previousItem && this.setState({ activeItem: previousItem });
        return;
      }

      previousItem = item;
    }
  };

  handleSearchStrChange = (searchStr: string) => {
    const { items } = this.props;

    const filteredItems = this.filterItems(items, searchStr);

    this.setState({ searchStr, filteredItems, activeItem: filteredItems[0] });
  };

  handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onActiveItemSelect } = this.props;
    const { activeItem } = this.state;

    if (e.key === "Enter") {
      console.log("Selecting active element:", activeItem);
      onActiveItemSelect(activeItem);
    }
  };

  public render() {
    const { numItemsToShow, renderItemRow, focusOnMount = false } = this.props;
    const {
      searchStr,
      searchInputFocused,
      filteredItems,
      activeItem
    } = this.state;

    return (
      <div>
        {searchInputFocused && (
          <React.Fragment>
            <HotKey hotkey="n" ctrl onTrigger={this.selectNextItem} />
            <HotKey hotkey="ArrowDown" onTrigger={this.selectNextItem} />
            <HotKey hotkey="p" ctrl onTrigger={this.selectPreviousItem} />
            <HotKey hotkey="ArrowUp" onTrigger={this.selectPreviousItem} />
          </React.Fragment>
        )}
        <Input
          onFocus={() => this.setState({ searchInputFocused: true })}
          onBlur={() => this.setState({ searchInputFocused: false })}
          block
          focusOnMount={focusOnMount}
          value={searchStr}
          onChange={e => this.handleSearchStrChange(e.currentTarget.value)}
          onKeyPress={e => this.handleInputKeyPress(e)}
        />
        <List>
          {filteredItems
            .slice(0, numItemsToShow)
            .map((item: any) => renderItemRow(item, activeItem))}
        </List>
      </div>
    );
  }
}
