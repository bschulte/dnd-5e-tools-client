import * as React from "react";

export interface ICardProps {
  children: React.ReactNode;
}

export class Card extends React.Component<ICardProps, any> {
  public render() {
    const { children } = this.props;
    return <div className="shadow-md bg-grey-darkest">{children}</div>;
  }
}
