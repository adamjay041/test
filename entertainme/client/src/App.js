import React from 'react';
import Navbar from './components/navbar'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Movie from './components/moive'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Movie />
      </Router>
    </ApolloProvider>
  );
}

export default App;
