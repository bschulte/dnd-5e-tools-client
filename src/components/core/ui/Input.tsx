import * as React from "react";
import classNames from "classnames";

interface IInputProps {
  icon?: string;
  label?: string;
  block?: boolean;
  inputClassName?: string;
}

export class Input extends React.Component<
  React.HTMLProps<HTMLInputElement> & IInputProps,
  any
> {
  public render() {
    const { className, inputClassName, icon, block, label } = this.props;
    const filteredProps = { ...this.props };
    delete filteredProps.className;

    return (
      <div
        className={classNames(className, {
          "w-full": block
        })}
      >
        {label && (
          <p className="mb-2 font-bold font-roboto-condensed uppercase">
            {label}
          </p>
        )}
        {icon && (
          <i
            className={classNames(icon, "absolute ml-3")}
            style={{ marginTop: "0.6rem" }}
          />
        )}
        <input
          className={classNames(
            "bg-grey-darker text-grey-light p-2 focus:outline-none appearance-none border border-grey rounded shadow focus:shadow-outline",
            inputClassName,
            {
              "w-full": block
            }
          )}
          {...filteredProps}
          style={{
            textIndent: icon ? 25 : 0,
            transition: "box-shadow 150ms linear"
          }}
        />
      </div>
    );
  }
}
