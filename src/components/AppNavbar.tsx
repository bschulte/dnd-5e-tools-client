import * as React from "react";

import dragonIcon from "../images/dragon_icon.png";
import { Navbar, NavItem } from "./core";
import { isLoggedIn } from "../util/auth";

export interface IAppNavbarProps {}

export default class AppNavbar extends React.Component<IAppNavbarProps, any> {
  public render() {
    if (!isLoggedIn()) {
      return null;
    }

    return (
      <Navbar title="DnD 5e Tools" brandImg={dragonIcon}>
        <div className="flex">
          <NavItem to="/">Compendium</NavItem>
          <NavItem to="/">Characters</NavItem>
        </div>
        <div className="flex">
          <i className="far fa-sign-out text-xl cursor-pointer" />
        </div>
      </Navbar>
    );
  }
}
