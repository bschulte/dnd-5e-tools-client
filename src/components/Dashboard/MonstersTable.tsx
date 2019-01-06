import * as React from "react";

import { RowInfo, Column } from "react-table";
import { client } from "../../graphql/client";
import { DataTable } from "../core";
import { SHOW_DETAILS_MODAL } from "../../graphql/localState/localMutations";

export interface IMonstersTableProps {
  monsters: any[];
}

export default class MonstersTable extends React.Component<
  IMonstersTableProps,
  any
> {
  openMonsterModal = (row: RowInfo) => {
    client.mutate({
      mutation: SHOW_DETAILS_MODAL,
      variables: { type: "Monster", databaseId: row.original.id }
    });
  };

  public render() {
    const { monsters } = this.props;

    return (
      <DataTable
        data={monsters}
        columns={[
          { Header: "CR", accessor: "cr", width: 75 },
          { Header: "Monster", accessor: "name", className: "cursor-pointer" }
        ]}
        combinedFilter
        combinedFilterColumns={["name"]}
        getTdProps={(_: any, rowInfo: RowInfo, column: Column) => {
          return {
            onClick: () => {
              this.openMonsterModal(rowInfo);
            }
          };
        }}
        showPageSizeOptions={false}
        showPageJump={false}
      />
    );
  }
}
