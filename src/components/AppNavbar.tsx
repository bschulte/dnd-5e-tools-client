import * as React from "react";
import { Navbar, NavItem } from "./core";

export interface IAppNavbarProps {}

export default class AppNavbar extends React.Component<IAppNavbarProps, any> {
  public render() {
    return (
      <Navbar title="DnD 5e Tools">
        <NavItem to="/">Testing</NavItem>
      </Navbar>
    );
  }
}
