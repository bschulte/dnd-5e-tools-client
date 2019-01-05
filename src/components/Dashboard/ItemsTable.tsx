import * as React from "react";
import { DataTable } from "../core";

export interface IItemsTableProps {
  items: any[];
}

export default class ItemsTable extends React.Component<IItemsTableProps, any> {
  public render() {
    const { items } = this.props;
    return (
      <DataTable
        data={items}
        columns={[
          { Header: "Item", accessor: "name" },
          { Header: "Value", accessor: "value", width: 100 }
        ]}
        combinedFilter
        combinedFilterColumns={["name"]}
        getTdProps={(_: any, rowInfo: any, column: any) => {
          return {
            onClick: () => {
              console.log("Row was clicked:", rowInfo);
            }
          };
        }}
        showPageSizeOptions={false}
        showPageJump={false}
      />
    );
  }
}
