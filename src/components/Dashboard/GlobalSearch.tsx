import * as React from "react";
import Fuse from "fuse.js";

import { client } from "../../graphql/client";
import { Modal, Input, List, HotKey } from "../core";
import { ListItem } from "../core/ui/ListItem";
import { SHOW_DETAILS_MODAL } from "../../graphql/localState/localMutations";

interface IGlobalSearchProps {
  items: any[];
  showOmnibar: boolean;
  toggle: () => void;
  itemsToShow: number;
}

interface IGlobalSearchState {
  searchStr: string;
  filteredItems: any[];
  activeItem: any;
}

export default class GlobalSearch extends React.Component<
  IGlobalSearchProps,
  IGlobalSearchState
> {
  public static defaultProps = {
    itemsToShow: 10
  };

  constructor(props: IGlobalSearchProps) {
    super(props);

    this.state = {
      searchStr: "",
      filteredItems: [],
      activeItem: null
    };
  }

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

  componentWillReceiveProps = (nextProps: IGlobalSearchProps) => {
    const { showOmnibar } = this.props;
    // We're going to close the modal, so let's reset our state
    if (showOmnibar === true && nextProps.showOmnibar === false) {
      this.setState({ filteredItems: [], searchStr: "" });
    }
  };

  handleSearchStrChange = (searchStr: string) => {
    const { items } = this.props;

    const filteredItems = this.filterItems(items, searchStr);

    this.setState({ searchStr, filteredItems, activeItem: filteredItems[0] });
  };

  handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { activeItem } = this.state;
    const { toggle } = this.props;
    if (e.key === "Enter") {
      console.log("Selecting active element:", activeItem);
      client.mutate({
        mutation: SHOW_DETAILS_MODAL,
        variables: { type: activeItem.type, id: activeItem.id }
      });
      toggle();
    }
  };

  selectNextItem = () => {
    const { filteredItems, activeItem } = this.state;
    const { itemsToShow } = this.props;

    let previousItemWasActive = false;
    for (const item of filteredItems.slice(0, itemsToShow)) {
      if (previousItemWasActive) {
        this.setState({ activeItem: item });
        return;
      }

      previousItemWasActive = item.key === activeItem.key;
    }
  };

  selectPreviousItem = () => {
    const { filteredItems, activeItem } = this.state;
    const { itemsToShow } = this.props;

    let previousItem: any = null;
    for (const item of filteredItems.slice(0, itemsToShow)) {
      if (item.key === activeItem.key) {
        previousItem && this.setState({ activeItem: previousItem });
        return;
      }

      previousItem = item;
    }
  };

  public render() {
    const { showOmnibar, toggle, itemsToShow } = this.props;
    const { searchStr, filteredItems, activeItem } = this.state;

    return (
      <Modal isOpen={showOmnibar} toggle={toggle}>
        {showOmnibar && (
          <React.Fragment>
            <HotKey hotkey="n" ctrl onTrigger={this.selectNextItem} />
            <HotKey hotkey="ArrowDown" onTrigger={this.selectNextItem} />
            <HotKey hotkey="p" ctrl onTrigger={this.selectPreviousItem} />
            <HotKey hotkey="ArrowUp" onTrigger={this.selectPreviousItem} />
          </React.Fragment>
        )}
        <Input
          block
          focusOnMount
          value={searchStr}
          onChange={e => this.handleSearchStrChange(e.currentTarget.value)}
          onKeyPress={e => this.handleInputKeyPress(e)}
        />
        <List>
          {filteredItems.slice(0, itemsToShow).map(item => (
            <ListItem key={item.key} active={activeItem.key === item.key}>
              {item.name}
            </ListItem>
          ))}
        </List>
      </Modal>
    );
  }
}
