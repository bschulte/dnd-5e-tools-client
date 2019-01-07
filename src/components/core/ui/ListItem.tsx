import * as React from "react";
import classNames from "classnames";

export interface IListItemProps {
  active?: boolean;
}

export class ListItem extends React.Component<
  IListItemProps & React.HTMLProps<HTMLLIElement>,
  any
> {
  public render() {
    const { children, active, className, ...otherProps } = this.props;
    return (
      <li
        className={classNames(
          "px-2 py-4 border-b",
          {
            "bg-primary": active
          },
          className
        )}
        style={{
          transition: "all 0.3s ease"
        }}
        {...otherProps}
      >
        {children}
      </li>
    );
  }
}
