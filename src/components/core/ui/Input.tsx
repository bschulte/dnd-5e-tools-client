import * as React from "react";
import classNames from "classnames";

export class Input extends React.Component<
  React.HTMLProps<HTMLInputElement>,
  any
> {
  public render() {
    const { className } = this.props;
    const filteredProps = { ...this.props };
    delete filteredProps.className;

    return (
      <input
        className={classNames(
          "bg-grey-darker text-grey-light p-3 focus:outline-none appearance-none border border-grey rounded shadow focus:shadow-outline",
          className
        )}
        {...filteredProps}
      />
    );
  }
}
