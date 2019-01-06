import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloCache } from "apollo-cache";

import { logout, getToken } from "../util/auth";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",

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
      console.log("Caught network error:", networkError);
      logout();
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
      modalOpen: false
    },

    resolvers: {
      Mutation: {
        hideDetailsModal: (
          _: any,
          _args: any,
          { cache }: { cache: ApolloCache<InMemoryCache> }
        ): void => {
          const data = {
            detailsModal: {
              __typename: "DetailsModalData",
              isOpen: false
            },
            modalOpen: false
          };

          cache.writeData({ data });
          return null;
        },

        showDetailsModal: (
          _: any,
          { databaseId, type }: any,
          { cache }: { cache: ApolloCache<InMemoryCache> }
        ): void => {
          const data = {
            detailsModal: {
              __typename: "DetailsModalData",
              databaseId,
              type,
              isOpen: true
            },
            modalOpen: true
          };
          cache.writeData({ data });
          return null;
        }
      }
    }
  }
});
