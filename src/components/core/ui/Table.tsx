import * as React from "react";
import ReactTable, { TableProps } from "react-table";

function filterCaseInsensitive(filter: any, row: any) {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
    : true;
}

export class Table extends React.Component<Partial<TableProps<any, any>>, any> {
  public render() {
    const { columns, data, ...rest } = this.props;
    return (
      <ReactTable
        columns={columns}
        data={data}
        defaultFilterMethod={filterCaseInsensitive}
        {...rest}
      />
    );
  }
}
