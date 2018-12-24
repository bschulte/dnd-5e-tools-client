import * as React from "react";

export interface ICardBodyProps {
  children: React.ReactNode;
}

export class CardBody extends React.Component<ICardBodyProps, any> {
  public render() {
    const { children } = this.props;
    return <div className="p-4">{children}</div>;
  }
}
