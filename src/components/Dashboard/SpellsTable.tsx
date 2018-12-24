import * as React from "react";
import { Table } from "../core";

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
          { Header: "Name", accessor: "name", filterable: true }
        ]}
        showPageSizeOptions={false}
        showPageJump={false}
      />
    );
  }
}
