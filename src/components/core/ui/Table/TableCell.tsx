import * as React from "react";
import classNames from "classnames";

interface ITableCellProps {
  center?: boolean;
  className?: string;
}

export const TableCell: React.SFC<ITableCellProps> = ({
  children,
  className,
  center = false
}) => (
  <td className={classNames("p-2", { "text-center": center }, className)}>
    {children}
  </td>
);
