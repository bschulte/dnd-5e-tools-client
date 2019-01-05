import * as React from "react";
import classNames from "classnames";

export interface ILabelProps {
  text: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export class Label extends React.Component<ILabelProps, any> {
  public render() {
    const { text, size = "md", className } = this.props;
    return (
      <p
        className={classNames(
          "mb-2 font-bold font-roboto-condensed uppercase",
          {
            "text-xs": size === "xs",
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg"
          },
          className
        )}
      >
        {text}
      </p>
    );
  }
}
