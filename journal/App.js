import React from 'react';
import {ApolloClient} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import Navigator from './Navigator'
import {setContext} from 'apollo-link-context'
import {getToken} from './loginUtils'


const authLink = setContext(async(req,{headers}) => {
  const token = await getToken();
  console.log(token)
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  }
});

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjvc7givj2p130124uiclmv0w"
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator/>
      </ApolloProvider>
    );
  }
}
