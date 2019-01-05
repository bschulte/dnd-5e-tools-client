import * as React from "react";
import { DataTable } from "../core";

interface ISpellsTableProps {
  spells: any[];
}

export class SpellsTable extends React.Component<ISpellsTableProps, any> {
  public render() {
    const { spells } = this.props;

    return (
      <DataTable
        data={spells}
        columns={[
          { Header: "Level", accessor: "level", width: 50 },
          { Header: "Spell", accessor: "name" }
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
