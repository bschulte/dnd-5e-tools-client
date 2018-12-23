import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import { client } from "./graphql/client";

import Dashboard from "./pages/Dashboard";

class App extends Component<any, any> {
  render() {
    return (
      <div className="animated fadeIn">
        <ApolloProvider client={client}>
          <Router>
            <Route path="/" exact component={Dashboard} />
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
