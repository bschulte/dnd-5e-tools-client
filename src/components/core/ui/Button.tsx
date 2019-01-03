import * as React from "react";
import classNames from "classnames";

export interface IButtonProps {
  primary?: boolean;
  block?: boolean;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function Button(
  props: IButtonProps & React.HTMLProps<HTMLButtonElement>
) {
  const { children, primary, className, block, loading, ...other } = props;
  return (
    <button
      className={classNames(
        className,
        "font-semibold py-2 px-4 border",
        "rounded shadow text-grey-light",
        "focus:outline-none",
        {
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
