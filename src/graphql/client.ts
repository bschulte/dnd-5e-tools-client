import ApolloClient, { InMemoryCache } from "apollo-boost";

import { history } from "../history";
import { Cache, ApolloCache } from "apollo-cache";

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
  },

  clientState: {
    defaults: {
      detailsModal: {
        __typename: "DetailsModalData",
        isOpen: false,
        type: null,
        id: null
      }
    },
    resolvers: {
      Mutation: {
        showDetailsModal: (
          _: any,
          { id, type }: any,
          { cache }: { cache: ApolloCache<InMemoryCache> }
        ): void => {
          const data = {
            detailsModal: {
              __typename: "DetailsModalData",
              id,
              type,
              isOpen: true
            }
          };
          cache.writeData({ data });
          return null;
        }
      }
    }
  }
});
