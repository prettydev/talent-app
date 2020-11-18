import SInfo from "react-native-sensitive-info";
import Config from "react-native-config";
import { InMemoryCache, ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";

let token: any;

const getToken = async () => {
  if (token != null) {
    return token;
  }

  token = await SInfo.getItem("ACCESS_TOKEN", {});
  return token;
};

export const cache = new InMemoryCache();

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: Config.SUBSCRIPTION_SERVER,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({ uri: Config.GRAPHQL_SERVER });

const authLink = setContext(async (_, { headers }) => {
  await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const linkConcated = authLink.concat(httpLink);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  linkConcated
);

export const client = new ApolloClient({
  link,
  cache,
});
