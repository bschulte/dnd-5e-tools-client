import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import { client } from "./graphql/client";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

class App extends Component<any, any> {
  render() {
    return (
      <div className="animated fadeIn">
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/" exact component={DashboardPage} />
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
