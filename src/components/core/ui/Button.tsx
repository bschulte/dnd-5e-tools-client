import * as React from "react";
import classNames from "classnames";

export interface IButtonProps {
  primary?: boolean;
  block?: boolean;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  icon?: boolean;
}

export function Button(
  props: IButtonProps & React.HTMLProps<HTMLButtonElement>
) {
  const {
    children,
    primary,
    className,
    block,
    loading,
    icon,
    ...other
  } = props;

  let colorProps = "";
  if (primary) {
    colorProps =
      "bg-primary hover:bg-primary-darker focus:bg-primary-darker border-primary-darker text-grey-light";
  } else {
    colorProps =
      "bg-grey hover:bg-grey-dark focus:bg-grey-dark border-grey-dark text-grey-darkest";
  }

  return (
    <button
      className={classNames(
        className,
        "font-semibold border",
        "rounded shadow ",
        "focus:outline-none",
        {
          "py-2 px-4": !icon,
          "h-8 w-8 rounded-full flex items-center justify-center": icon,
          "w-full": block
        },
        colorProps
      )}
      {...other}
      style={{
        transition: "background-color 150ms linear"
      }}
    >
      {loading ? <i className="fas fa-circle-notch fa-spin" /> : children}
    </button>
  );
}
