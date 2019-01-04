import * as React from "react";

export interface IListProps {}

export class List extends React.Component<IListProps, any> {
  public render() {
    const { children, ...otherProps } = this.props;
    return (
      <ul className="list-reset mt-2" {...otherProps}>
        {children}
      </ul>
    );
  }
}
