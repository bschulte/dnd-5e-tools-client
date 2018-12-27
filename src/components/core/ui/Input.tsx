import * as React from "react";
import classNames from "classnames";

interface IInputProps {
  icon?: string;
}

export class Input extends React.Component<
  React.HTMLProps<HTMLInputElement> & IInputProps,
  any
> {
  public render() {
    const { className, icon } = this.props;
    const filteredProps = { ...this.props };
    delete filteredProps.className;

    return (
      <div>
        {icon && (
          <i
            className={classNames(icon, "absolute ml-3")}
            style={{ marginTop: "0.6rem" }}
          />
        )}
        <input
          className={classNames(
            "bg-grey-darker text-grey-light p-2 focus:outline-none appearance-none border border-grey rounded shadow focus:shadow-outline",
            className
          )}
          {...filteredProps}
          style={{
            textIndent: icon ? 25 : 0
          }}
        />
      </div>
    );
  }
}
