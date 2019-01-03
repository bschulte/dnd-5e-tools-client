import ApolloClient from "apollo-boost";

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
    }
    if (networkError) {
      console.log("Caught network error!", networkError);
    }
  }
});
