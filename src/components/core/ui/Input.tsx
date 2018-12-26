import * as React from "react";
import classNames from "classnames";

export class Input extends React.Component<
  React.HTMLProps<HTMLInputElement>,
  any
> {
  public render() {
    const { className } = this.props;
    return (
      <input
        className={classNames("bg-grey-darker text-grey-light p-3", className)}
        {...this.props}
      />
    );
  }
}
