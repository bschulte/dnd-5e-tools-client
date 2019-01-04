import * as React from "react";
import classNames from "classnames";

interface IInputProps {
  icon?: string;
  backgroundColor?: "light" | "dark";
  label?: string;
  block?: boolean;
  inputClassName?: string;
  focusOnMount?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

export class Input extends React.Component<
  React.HTMLProps<HTMLInputElement> & IInputProps,
  any
> {
  private searchInput: React.RefObject<HTMLInputElement>;

  constructor(props: React.HTMLProps<HTMLInputElement> & IInputProps) {
    super(props);

    this.searchInput = React.createRef();
  }

  componentDidMount = () => {
    const { focusOnMount = false } = this.props;
    if (focusOnMount) {
      this.searchInput.current.focus();
    }
  };

  public render() {
    const {
      className,
      inputClassName,
      icon,
      block,
      label,
      backgroundColor = "dark"
    } = this.props;
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
            "p-2 focus:outline-none appearance-none border border-grey rounded shadow focus:shadow-outline",
            inputClassName,
            {
              "w-full": block,
              "bg-grey-darker text-grey-light": backgroundColor === "dark",
              "bg-grey text-black": backgroundColor === "light"
            }
          )}
          {...filteredProps}
          style={{
            textIndent: icon ? 25 : 0,
            transition: "box-shadow 150ms linear"
          }}
          ref={this.searchInput}
        />
      </div>
    );
  }
}
