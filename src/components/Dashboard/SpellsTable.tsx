import * as React from "react";
import { DataTable } from "../core";
import { RowInfo } from "react-table";
import { client } from "../../graphql/client";

interface ISpellsTableProps {
  spells: any[];
}

export class SpellsTable extends React.Component<ISpellsTableProps, any> {
  openSpellModal = (row: RowInfo) => {
    client.writeData({
      data: {
        detailsModal: {
          __typename: "DetailsModalData",
          databaseId: row.original.id,
          type: "Spell",
          isOpen: true
        }
      }
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
