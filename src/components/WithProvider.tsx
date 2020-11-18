import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import React, { Component } from "react";
import { client, cache } from "../graphql";

export default function WithProviders(WrappedComponent: any, store: any) {
  return class Cp extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <Provider store={store}>
            <WrappedComponent {...this.props} />
          </Provider>
        </ApolloProvider>
      );
    }
  };
}
