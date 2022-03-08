import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Nav from './components/Nav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleTrip from './pages/SingleTrip';
import Header from './components/Header';
import Footer from './components/Footer';
import Trip from './pages/Trip'
import Profile from "./pages/profile";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [pages] = useState([
    {
      name: "Log in"
     
    },
    { 
      name: "Sign Up" 
    },
    
  ]);

  const [currentPage, setCurrentPage] = useState(pages[0]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh container-fluid">
        <Header/>
          <div>
            <Route exact path="/">
            
            {/* <Nav
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            ></Nav> */}
           
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/addTrip">
              <Trip />
            </Route>
            <Route exact path="/signup"> 
              <Signup />
            </Route>
            <Route exact path="/trips/:tripId">
              <SingleTrip />
            </Route>
            <Route exact path="/profile"> 
              <Profile />
            </Route>
          </div>
          <Footer />
        </div>
        
      </Router>
    </ApolloProvider>
  );
}

export default App;
