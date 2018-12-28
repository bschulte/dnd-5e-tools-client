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
}

export class Badge extends React.Component<IBadgeProps, any> {
  public render() {
    const { children, color } = this.props;
    return (
      <div
        className={classNames(
          "px-2 py-1 rounded-full uppercase font-bold mx-1 bg-blue-dark text-white text-xs",
          {
            "bg-grey": color === "grey",
            "bg-red": color === "red",
            "bg-orange-dark": color === "orange",
            "bg-yellow-dark": color === "yellow",
            "bg-green": color === "green",
            "bg-teal": color === "teal",
            "bg-blue": color === "blue",
            "bg-indigo": color === "indigo",
            "bg-purple": color === "purple",
            "bg-pink": color === "pink"
          }
        )}
      >
        {children}
      </div>
    );
  }
}
