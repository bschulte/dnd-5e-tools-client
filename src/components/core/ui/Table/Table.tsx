import * as React from "react";

export interface ITableProps {}

export const Table: React.SFC<ITableProps> = ({ children, ...otherProps }) => (
  <table {...otherProps}>{children}</table>
);
