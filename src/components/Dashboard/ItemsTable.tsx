import * as React from "react";
import { DataTable } from "../core";
import { RowInfo } from "react-table";
import { client } from "../../graphql/client";

export interface IItemsTableProps {
  items: any[];
}

export default class ItemsTable extends React.Component<IItemsTableProps, any> {
  openItemModal = (row: RowInfo) => {
    client.writeData({
      data: {
        detailsModal: {
          __typename: "DetailsModalData",
          databaseId: row.original.id,
          type: "Item",
          isOpen: true
        }
      }
    });
  };

  public render() {
    const { items } = this.props;
    return (
      <DataTable
        data={items}
        columns={[
          { Header: "Item", accessor: "name", className: "cursor-pointer" },
          { Header: "Value", accessor: "value", width: 100 }
        ]}
        combinedFilter
        combinedFilterColumns={["name"]}
        getTdProps={(_: any, rowInfo: any, column: any) => {
          return {
            onClick: () => {
              this.openItemModal(rowInfo);
            }
          };
        }}
        showPageSizeOptions={false}
        showPageJump={false}
      />
    );
  }
}
