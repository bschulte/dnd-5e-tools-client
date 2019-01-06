import * as React from "react";
import classNames from "classnames";

interface INavbarProps {
  title: string;
  brandImg?: string;
  className?: string;
}

export const Navbar: React.SFC<INavbarProps> = ({
  children,
  title,
  brandImg,
  className
}) => {
  return (
    <nav
      className={classNames(
        "flex items-center justify-between",
        "flex-wrap bg-grey-darkest p-2",
        "border-primary border-t-4 shadow-md",
        className
      )}
    >
      {brandImg && (
        <img
          className="flex mr-2 mb-3"
          src={brandImg}
          alt="Icon"
          height="45"
          width="45"
        />
      )}
      <div
        className={classNames(
          "flex text-white mr-6 font-semibold",
          "font-roboto-condensed text-xl"
        )}
      >
        {title}
      </div>
      <div className="block flex-grow flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
};
