import * as React from "react";

import dragonIcon from "../images/dragon_icon.png";
import { Navbar, NavItem } from "./core";
import { isLoggedIn, logout } from "../util/auth";
import { GET_USER_DATA } from "../graphql/localState/localQueries";
import { Query } from "react-apollo";

export interface IAppNavbarProps {}

export default class AppNavbar extends React.Component<IAppNavbarProps, any> {
  public render() {
    if (!isLoggedIn()) {
      return null;
    }

    return (
      <Query query={GET_USER_DATA}>
        {({ data }) => {
          return (
            <Navbar title="DnD 5e Tools" brandImg={dragonIcon}>
              <div className="flex">
                <NavItem to="/compendium">Compendium</NavItem>
                <NavItem to="/characters">Characters</NavItem>
              </div>
              <div className="flex">
                <span className="mr-3 text-sm">{data.userData.email}</span>
                <i
                  className="far fa-sign-out text-xl cursor-pointer"
                  onClick={() => logout()}
                />
              </div>
            </Navbar>
          );
        }}
      </Query>
    );
  }
}
