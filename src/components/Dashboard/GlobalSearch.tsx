import * as React from "react";

import { client } from "../../graphql/client";
import { Modal, Badge, DropdownSearch } from "../core";
import { ListItem } from "../core/ui/ListItem";

interface IGlobalSearchProps {
  showOmnibar: boolean;
  toggle: () => void;
  items: any[];
}

interface IGlobalSearchState {}

export default class GlobalSearch extends React.Component<
  IGlobalSearchProps,
  IGlobalSearchState
> {
  handleActiveItemSelect = (activeItem: any) => {
    const { toggle } = this.props;
    client.writeData({
      data: {
        detailsModal: {
          __typename: "DetailsModalData",
          databaseId: activeItem.id,
          type: activeItem.type,
          isOpen: true
        }
      }
    });

    toggle();
  };

  public render() {
    const { showOmnibar, toggle, items } = this.props;

    return (
      <Modal isOpen={showOmnibar} toggle={toggle}>
        <DropdownSearch
          items={items}
          onActiveItemSelect={this.handleActiveItemSelect}
          focusOnMount
          renderItemRow={(item: any, activeItem: any) => (
            <ListItem key={item.key} active={activeItem.key === item.key}>
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
      </Modal>
    );
  }
}
