import * as React from "react";
import classNames from "classnames";

interface IRowProps {
  className?: string;
}

export class Row extends React.Component<IRowProps, any> {
  public render() {
    const { children, className } = this.props;
    return (
      <div className={classNames("flex mb-4 flex-wrap", className)}>
        {children}
      </div>
    );
  }
}
