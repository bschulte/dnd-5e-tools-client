import * as React from "react";
import ReactTable, { TableProps, Column } from "react-table";
import { Input } from "..";
import Fuse from "fuse.js";

const filterCaseInsensitive = (filter: any, row: any) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
    : true;
};

const singleFilter = (
  searchStr: string,
  data: any[],
  combinedFilterColumns: string[]
): any[] => {
  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: combinedFilterColumns
  };

  const fuse = new Fuse(data, options);

  return fuse.search(searchStr);
};

interface ITableProps {
  combinedFilter?: boolean;
  // We can specify column keys that should be used for the combined filter
  // These can be nested accessors (i.e "name.lastName")
  combinedFilterColumns?: string[];
}

export class DataTable extends React.Component<
  Partial<TableProps<any, any>> & ITableProps,
  any
> {
  state = {
    searchStr: ""
  };

  public render() {
    const { searchStr } = this.state;
    const {
      columns,
      data,
      combinedFilter,
      combinedFilterColumns,
      ...rest
    } = this.props;

    if (data === undefined) {
      return null;
    }

    const filteredData =
      combinedFilter && searchStr
        ? singleFilter(searchStr, data, combinedFilterColumns)
        : data;

    return (
      <React.Fragment>
        {combinedFilter && (
          <div className="flex justify-end mb-2">
            <Input
              value={searchStr}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.setState({ searchStr: e.currentTarget.value })
              }
              icon="fas fa-search"
            />
          </div>
        )}
        <ReactTable
          columns={columns.map(col => ({ ...col, style: { padding: "1rem" } }))}
          data={filteredData}
          pageSize={10}
          defaultFilterMethod={filterCaseInsensitive}
          {...rest}
        />
      </React.Fragment>
    );
  }
}
