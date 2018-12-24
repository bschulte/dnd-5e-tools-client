import * as React from "react";

export class Row extends React.Component<any, any> {
  public render() {
    const { children } = this.props;
    return <div className="flex mb-4 flex-wrap">{children}</div>;
  }
}
