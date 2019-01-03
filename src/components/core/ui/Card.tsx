import * as React from "react";
import classNames from "classnames";

export interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

export class Card extends React.Component<
  ICardProps & React.HTMLProps<HTMLDivElement>,
  any
> {
  public render() {
    const { children, className, ...other } = this.props;
    return (
      <div
        className={classNames(className, "shadow-md bg-grey-darkest")}
        {...other}
      >
        {children}
      </div>
    );
  }
}
