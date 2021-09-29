import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LayoutContextProvider } from './contexts/layoutContext'
import { AuthProvider } from './contexts/amplifyContext'
import { ConfigureAmplifyStore } from './stores/amplify-store'
import { ApolloProvider } from "@apollo/client";
import { client } from "./stores/apollo-clent";

const providersList = [
  LayoutContextProvider,
  AuthProvider,
];

const configured = ConfigureAmplifyStore()

const ContextProvidersComponent = props => providersList.reduce((acc, Component) => (
  <Component>
    {acc}
  </Component>), props.children);

export default ContextProvidersComponent;

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextProvidersComponent>
      <App />
    </ContextProvidersComponent>
  </ApolloProvider>,
  document.getElementById('root')
);

