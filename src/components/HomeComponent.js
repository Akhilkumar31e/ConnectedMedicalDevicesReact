import React, { Component } from "react";

import UserService from "../services/user.service";
import HomeHeader from './HomeHeaderComponent';
import AuthService from '../services/auth.service';
import {Redirect} from 'react-router-dom';



class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            content : "",
            showManagerBoard:false,
            showAdminBoard:false,
            currentUser:undefined,
            showTechnician:false
            
        };
    }
    componentDidMount() {
        const user= AuthService.getCurrentUser();

        if(user){
            this.setState({
                currentUser:user,
                showManagerBoard: user.roles.includes("SERVICE_MANAGER"),
                showAdminBoard: user.roles.includes("SYSTEM_ADMINISTRATOR"),
                showTechnician: user.roles.includes("SERVICE_TECHNICIAN")
            })
        }
        
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data.deviecName
                });
            },
            error => {
                this.setState({
                    content:
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString()
                  });
            }
        );
    }

    render(){
        
        return(
            <React.Fragment>
                {this.state.showAdminBoard && <Redirect to="/admin" />}
                {this.state.showManagerBoard && <Redirect to="/manager" />}
                {this.state.showTechnician && <Redirect to="/technician" />}
                <HomeHeader />
                <div className="main">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;