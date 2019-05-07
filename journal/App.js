import React from 'react';
import {ApolloClient} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import Navigator from './Navigator'


const client = new ApolloClient({
  link: new HttpLink ({
    uri: "https://api.graph.cool/simple/v1/cjvc7givj2p130124uiclmv0w"
  }),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator/>
      </ApolloProvider>
    );
  }
}
