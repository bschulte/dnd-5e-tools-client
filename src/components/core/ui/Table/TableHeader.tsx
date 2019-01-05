import * as React from "react";
import classNames from "classnames";

export const TableHeader: React.SFC<{ className?: string }> = ({
  children,
  className
}) => (
  <th className={classNames("p-2 font-semibold text-sm", className)}>
    {children}
  </th>
);
