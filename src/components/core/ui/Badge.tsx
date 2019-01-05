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
  size?: "xs" | "sm" | "md" | "lg";
  rounded?: boolean;
}

export class Badge extends React.Component<IBadgeProps, any> {
  public render() {
    const {
      children,
      color = "blue",
      className,
      size = "xs",
      rounded = true
    } = this.props;
    return (
      <span
        className={classNames(
          "px-2 py-1 uppercase font-bold mx-1",
          `text-${size}`,
          `bg-${color}-dark`,
          {
            rounded: !rounded,
            "rounded-full": rounded
          },
          className
        )}
      >
        {children}
      </span>
    );
  }
}
