import * as React from "react";
import { Table } from "../core";

export interface IMonstersTableProps {
  monsters: any[];
}

export default class MonstersTable extends React.Component<
  IMonstersTableProps,
  any
> {
  public render() {
    const { monsters } = this.props;

    return (
      <Table
        data={monsters}
        columns={[
          { Header: "CR", accessor: "cr", width: 75 },
          { Header: "Name", accessor: "name" }
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
