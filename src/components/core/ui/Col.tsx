import * as React from "react";
import classNames from "classnames";

export interface IColProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

export class Col extends React.Component<IColProps, any> {
  public render() {
    const { children, size } = this.props;
    return (
      <div
        className={classNames("px-2", {
          "flex-1": !size,
          "w-1/6": size === 1,
          "w-1/3": size === 2,
          "w-1/2": size === 3,
          "w-2/3": size === 4,
          "w-5/6": size === 5,
          "w-full": size === 6
        })}
      >
        {children}
      </div>
    );
  }
}
