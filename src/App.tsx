import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { history } from "./history";

import { client } from "./graphql/client";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AppNavbar from "./components/AppNavbar";
import { getToken, login, logout } from "./util/auth";
import { GET_USER } from "./graphql/queries";

class App extends Component<any, any> {
  componentDidMount = async () => {
    // Perform an initial query on the users info. This is to check
    // if the stored token is still valid (the user's session is still active)
    const token = getToken();
    if (token) {
      const { data } = await client.query({ query: GET_USER });
      if (data) {
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
              <AppNavbar />
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/" exact component={DashboardPage} />
              </Switch>
            </div>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
