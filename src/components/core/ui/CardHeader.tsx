import * as React from "react";

export interface ICardHeader {
  title: string;
}

export class CardHeader extends React.Component<ICardHeader, any> {
  public render() {
    const { title } = this.props;
    return (
      <div className="font-bold border-b border-grey-light p-3">{title}</div>
    );
  }
}
