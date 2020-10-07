
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


    render(){
        const {currentUser} =this.state;

        return(
            <React.Fragment>
                <HomeHeader />
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
        </React.Fragment>
        );
    }
}

export default Profile;