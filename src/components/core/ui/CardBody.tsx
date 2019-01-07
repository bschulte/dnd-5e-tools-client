import * as React from "react";
import classNames from "classnames";

export interface ICardBodyProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export class CardBody extends React.Component<ICardBodyProps, any> {
  public render() {
    const { children, noPadding = false } = this.props;
    return (
      <div
        className={classNames("border-t border-grey-light", {
          "p-4": !noPadding
        })}
      >
        {children}
      </div>
    );
  }
}
