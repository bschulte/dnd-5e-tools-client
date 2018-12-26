import * as React from "react";
import ReactTable, { TableProps } from "react-table";

function filterCaseInsensitive(filter: any, row: any) {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
    : true;
}

interface ITableProps {
  combinedFilter?: boolean;
}

export class Table extends React.Component<
  Partial<TableProps<any, any>> & ITableProps,
  any
> {
  public render() {
    const { columns, data, ...rest } = this.props;
    return (
      <ReactTable
        columns={columns.map(col => ({ ...col, style: { padding: "1rem" } }))}
        data={data}
        defaultFilterMethod={filterCaseInsensitive}
        {...rest}
      />
    );
  }
}
