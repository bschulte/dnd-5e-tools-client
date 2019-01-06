import * as React from "react";
import classNames from "classnames";

export interface IHRProps {
  vertical?: boolean;
}

export class Divider extends React.Component<IHRProps, any> {
  public render() {
    const { vertical = false } = this.props;

    return (
      <div
        className={classNames("text-white border-r-2 border-b-2 border-grey", {
          "flex height-full mx-2": vertical,
          "my-2": !vertical
        })}
      />
    );
  }
}
