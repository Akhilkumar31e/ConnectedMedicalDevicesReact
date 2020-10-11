import React,{Component} from 'react';
import {Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Display from './DisplayComponent';
import AuthService from '../services/auth.service';

class MainComponent extends Component{
    render(){
        const  currentUser  = AuthService.getCurrentUser();
        return(
        <div >
            {currentUser && <Redirect to="/home" />}
            <Header />
            <Display />
        </div>
        );
    }
}

export default MainComponent;