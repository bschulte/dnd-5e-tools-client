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
  return (
    <button
      className={classNames(
        className,
        "font-semibold border",
        "rounded shadow text-grey-light",
        "focus:outline-none",
        {
          "py-2 px-4": !icon,
          "h-8 w-8 rounded-full flex items-center justify-center": icon,
          "w-full": block,
          "bg-primary hover:bg-primary-darker focus:bg-primary-darker border-primary-darker": primary
        }
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
