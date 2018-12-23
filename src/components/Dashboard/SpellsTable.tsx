import * as React from "react";
import ReactTable from "react-table";

interface ISpellsTableProps {
  spells: any[];
}

export class SpellsTable extends React.Component<ISpellsTableProps, any> {
  public render() {
    const { spells } = this.props;

    return (
      <ReactTable
        data={spells}
        columns={[
          { Header: "ID", accessor: "_id", filterable: true },
          { Header: "Name", accessor: "name", filterable: true }
        ]}
      />
    );
  }
}
