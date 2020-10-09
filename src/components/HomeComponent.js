import React, { Component } from "react";

import UserService from "../services/user.service";
import HomeHeader from './HomeHeaderComponent';



class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            content : ""
            
        };
    }
    componentDidMount() {
        
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
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
                <HomeHeader />
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </React.Fragment>
        )
    }
}

export default Home;