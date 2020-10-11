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
import Device from './components/DeviceComponent';
import Technician from './components/TechnicianComponent';
import TechDevice from './components/TechDeviceComponent';
import Manager from './components/ManagerComponent';
import Hospital from './components/HospitalComponent';
import MDevice from './components/MDeviceComponent';
import AllHospitals from './components/AllHospitalsComponent';

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
const SelectedDevice = ({match}) => {
  return(
    <Device id={match.params.deviceID} />
  );
}
const SelectedTechDevice = ({match}) => {
  return(
    <TechDevice id={match.params.deviceID} />
  );
}
const SelectedMDevice = ({match}) => {
  return(
    <MDevice id={match.params.deviceID} />
  );
}
const SelectedHospital = ({match}) => {
  return(
    <Hospital id={match.params.hospitalID} />
  );
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
        <PrivateRoute  path="/device/:deviceID" component={SelectedDevice} />
        <PrivateRoute  path="/techdevice/:deviceID" component={SelectedTechDevice} />
        <PrivateRoute  path="/mdevice/:deviceID" component={SelectedMDevice} />
        <PrivateRoute  exact path="/technician" component = {Technician} />
        <PrivateRoute  exact path="/allhospitals" component = {AllHospitals} />
        <PrivateRoute exact path="/manager" component = {Manager} />
        <PrivateRoute exact path="/hospital/:hospitalID" component = {SelectedHospital} />
        <Redirect to="/main" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
