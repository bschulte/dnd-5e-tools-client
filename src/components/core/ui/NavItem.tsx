import * as React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface INavItemProps {
  to: string;
}

export const NavItem: React.SFC<INavItemProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className="flex text-grey-light hover:text-primary mr-4 text-sm no-underline"
      activeClassName="border-b-2 border-primary"
      style={{ transition: "all 0.3s ease" }}
    >
      {children}
    </NavLink>
  );
};
