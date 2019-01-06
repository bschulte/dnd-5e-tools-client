import * as React from "react";
import { DataTable } from "../core";
import { RowInfo } from "react-table";
import { client } from "../../graphql/client";
import { SHOW_DETAILS_MODAL } from "../../graphql/localState/localMutations";

interface ISpellsTableProps {
  spells: any[];
}

export class SpellsTable extends React.Component<ISpellsTableProps, any> {
  openSpellModal = (row: RowInfo) => {
    client.mutate({
      mutation: SHOW_DETAILS_MODAL,
      variables: { type: "Spell", databaseId: row.original.id }
    });
  };

  public render() {
    const { spells } = this.props;

    return (
      <DataTable
        data={spells}
        columns={[
          { Header: "Level", accessor: "level", width: 50 },
          { Header: "Spell", accessor: "name", className: "cursor-pointer" }
        ]}
        combinedFilter
        combinedFilterColumns={["name"]}
        getTdProps={(_: any, rowInfo: RowInfo, _column: any) => {
          return {
            onClick: () => {
              this.openSpellModal(rowInfo);
            }
          };
        }}
        showPageSizeOptions={false}
        showPageJump={false}
      />
    );
  }
}
