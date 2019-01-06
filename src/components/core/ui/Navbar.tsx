import * as React from "react";
import classNames from "classnames";

interface INavbarProps {
  title: string;
}

export const Navbar: React.SFC<INavbarProps> = ({ children, title }) => {
  return (
    <nav
      className={classNames(
        "flex items-center justify-between",
        "flex-wrap bg-grey-darkest p-6",
        "border-primary border-t-4 shadow-md"
      )}
    >
      <div
        className={classNames(
          "flex text-white mr-6 font-semibold",
          "font-roboto-condensed text-xl"
        )}
      >
        {title}
      </div>
      <div className="block flex-grow flex items-center">{children}</div>
    </nav>
  );
};
