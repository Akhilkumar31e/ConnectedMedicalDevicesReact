import React, { Component } from 'react'
import { Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse, Nav,Button} from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom';


import AuthService from '../services/auth.service';

export default class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoggedOut: false,
            isLoading: false,
            showManagerBoard:false,
            showAdminBoard:false,
            currentUser:undefined
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        const user= AuthService.getCurrentUser();

        if(user){
            this.setState({
                currentUser:user,
                showManagerBoard: user.roles.includes("SERVICE_MANAGER"),
                showAdminBoard: user.roles.includes("SYSTEM_ADMINISTRATOR")
            })
        }
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    handleLogout() {
       AuthService.logout();
       this.setState({
           isLoggedOut:true
       });
       
    }
    render() {
        const {currentUser,showManagerBoard,showAdminBoard} = this.state;
        return (
            <React.Fragment>
             {this.state.isLoggedOut && <Redirect to="/main" />}
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler  onClick={this.toggleNav} />
                    <NavbarBrand className = "mr-auto" href="/home">
                        CMD
                    </NavbarBrand>
                    
                    <Collapse isOpen={this.state.isNavOpen} navbar >
                        <span className="mr-auto" />
                        <Nav navbar>
                             {showManagerBoard && (<NavItem>
                                <NavLink className = "nav-link" to = "/mod">
                                    <span className = "fa fa-search fa-lg"></span> Manager Board
                                </NavLink>
                            </NavItem>)}
                            {showAdminBoard && (<NavItem>
                                <NavLink className = "nav-link" to = "/admin">
                                    <span className = "fa fa-home fa-lg"></span> Admin Board
                                </NavLink>
                            </NavItem>)}

                            {currentUser&&(<NavItem>
                                <NavLink className = "nav-link" to = "/user">
                                    <span className = "fa fa-user fa-lg"></span> Technician
                                </NavLink>
                            </NavItem>)}
                            <NavItem>
                                <NavLink className = "nav-link" to = "/profile">
                                    <span className = "fa fa-user fa-lg"></span> Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                            <Button className="btn bg-light mr-3"  onClick={this.handleLogout}>
                                {this.state.isLoading&& <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary fa-sm"></span>}<span className="fa fa-sign-out fa-lg text-primary"></span> <span className="text-primary"> Log Out</span>
                            </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            </React.Fragment>
        )
    }
};
