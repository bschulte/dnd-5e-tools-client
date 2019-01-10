import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider, Query } from "react-apollo";
import { history } from "./history";

import { client } from "./graphql/client";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AppNavbar from "./components/AppNavbar";
import { getToken, login, logout, getUser } from "./util/auth";
import CharactersPage from "./pages/CharactersPage";
import SpellbooksPage from "./pages/SpellbooksPage";
import GlobalSearch from "./components/Dashboard/GlobalSearch";
import { GET_DETAILS_MODAL } from "./graphql/localState/localQueries";
import DetailsModal from "./components/Dashboard/DetailsModal";

class App extends Component<any, any> {
  componentDidMount = async () => {
    // Perform an initial query on the users info. This is to check
    // if the stored token is still valid (the user's session is still active)
    const token = getToken();
    if (token) {
      const user = await getUser();
      if (user) {
        login(token);
      } else {
        logout();
      }
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <ApolloProvider client={client}>
          <Router history={history}>
            <div>
              <GlobalSearch />
              <Query query={GET_DETAILS_MODAL}>
                {({ data }) => {
                  const { isOpen, databaseId, type } = data.detailsModal;
                  return (
                    <DetailsModal
                      isOpen={isOpen}
                      type={type}
                      databaseId={databaseId}
                    />
                  );
                }}
              </Query>
              <AppNavbar />
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/compendium" component={DashboardPage} />
                <Route path="/characters" component={CharactersPage} />
                <Route path="/spellbooks" component={SpellbooksPage} />
                <Redirect from="/" to="/compendium" />
              </Switch>
            </div>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
