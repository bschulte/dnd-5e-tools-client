import ApolloClient from "apollo-boost";

import { logout, getToken } from "../util/auth";

export const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  uri: "https://dnd-v2.cromox.org/graphql",

  request: async operation => {
    const token = getToken();
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  },

  onError: ({ graphQLErrors, networkError }: any) => {
    if (graphQLErrors) {
      console.log("GraphQL error:", graphQLErrors);
      graphQLErrors.forEach((error: any) => {
        if (error.message.includes("Access denied")) {
          console.log("Logging out user for having access denied!");
          logout();
        }
      });
    }
    if (networkError) {
      console.log("Caught network error:", networkError.statusCode);
      logout();
      if (networkError.statusCode === 401) {
      }
    }
  },

  clientState: {
    defaults: {
      detailsModal: {
        __typename: "DetailsModalData",
        isOpen: false,
        type: null,
        databaseId: null
      },
      // Flag to track globally if there is a modal open or not
      modalOpen: false,
      userData: false
    },

    resolvers: {}
  }
});
