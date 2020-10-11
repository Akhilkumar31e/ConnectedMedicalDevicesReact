
import React ,{Component} from 'react';
import HomeHeader from './HomeHeaderComponent';
import {Jumbotron} from 'reactstrap';

import AuthService from '../services/auth.service';

class Profile extends Component{
    constructor(props){
        super(props);

        this.state ={
            currentUser : AuthService.getCurrentUser()
        };
        
    }
    componentDidMount(){
        console.log(this.state.currentUser);
    }


    render(){
        const {currentUser} =this.state;

        return(
            <React.Fragment>
                <HomeHeader />
                <div className="main">
            <div className="profileheader">
            <Jumbotron>
            <div className="row row-header"> 
                <div className="col-12 col-sm-2">
                    <img className="img-fluid img-thumbnail"  src="/assets/images/profile_pic.png" alt="Profile pic" />
                </div>
                <div className="col-12 col-sm-3 ">
                    <h1>{currentUser.username}</h1>
                    
                </div>
            </div>
            </Jumbotron>
            </div>
            <div className="container">
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-2">
                            <h4>Username : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {currentUser.username} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-2">
                            <h4>Email </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {currentUser.email} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-2">
                            <h4>Role : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {currentUser.roles[0]} </h4>
                        </div>
                    </div>
                   
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default Profile;