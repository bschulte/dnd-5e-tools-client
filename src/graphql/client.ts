import ApolloClient from "apollo-boost";

import { history } from "../history";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",

  request: async operation => {
    const token = localStorage.getItem("token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  },

  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log("GraphQL error:", graphQLErrors);
      graphQLErrors.forEach(error => {
        if (error.message.includes("Access denied")) {
          console.log("Logging out user for having access denied!");
          history.push("/login");
        }
      });
    }
    if (networkError) {
      console.log("Caught network error!", networkError);
    }
  }
});
