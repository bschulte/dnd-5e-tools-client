import * as React from "react";
import classNames from "classnames";

export interface IBadgeProps {
  children: React.ReactNode;
  color?:
    | "grey"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  className?: string;
}

export class Badge extends React.Component<IBadgeProps, any> {
  public render() {
    const { children, color = "blue", className } = this.props;
    return (
      <span
        className={classNames(
          "px-2 py-1 rounded-full uppercase font-bold mx-1 text-xs",
          `bg-${color}-dark`,
          className
        )}
      >
        {children}
      </span>
    );
  }
}
