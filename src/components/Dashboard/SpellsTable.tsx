import * as React from "react";
import { Table } from "../core";
import { Column } from "react-table";

interface ISpellsTableProps {
  spells: any[];
}

export class SpellsTable extends React.Component<ISpellsTableProps, any> {
  public render() {
    const { spells } = this.props;

    return (
      <Table
        data={spells}
        columns={[
          { Header: "Level", accessor: "level", width: 50 },
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
