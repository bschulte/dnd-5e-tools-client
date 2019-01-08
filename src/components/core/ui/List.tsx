import * as React from "react";
import classNames from "classnames";

export interface IListProps {
  className?: string;
}

export class List extends React.Component<
  IListProps & React.HTMLProps<HTMLUListElement>,
  any
> {
  public render() {
    const { children, className, ...otherProps } = this.props;
    return (
      <ul className={classNames("list-reset mt-2", className)} {...otherProps}>
        {children}
      </ul>
    );
  }
}
