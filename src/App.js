import React from 'react';

import './App.css';
import MainComponent from './components/MainComponent';
import { Switch, Route,Redirect } from "react-router-dom";

import Register from './components/RegisterComponent';

import Login from './components/LoginComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import Profile from './components/ProfileComponent';
import Admin from './components/AdminComponent';

function App() {
  const PrivateRoute= ({component: Component,...rest}) => {
    return(
    <Route {...rest} render = {(props) => (
        localStorage.getItem('user')!=null
        ? <Component {...props} />
        : <Redirect  to="/login" />
    )} />
    )
}
  return (
    <div className="app">
      <Switch>
        <Route exact path="/main" component={MainComponent} />
        <PrivateRoute exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component = {Login} />
        <PrivateRoute exact path="/profile" component = {Profile} />
        <PrivateRoute exact path="/admin" component = {Admin} />
        <Redirect to="/main" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
