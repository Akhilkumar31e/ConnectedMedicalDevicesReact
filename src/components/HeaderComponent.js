import React,{Component} from 'react';


import { Navbar, NavbarBrand,Nav,NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component{
    render(){
        return(
            <Navbar dark >
                    <NavbarBrand className="mr-auto" href="/main">
                           CMD
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/register">
                                    <span className = "fa fa-user-plus fa-lg"></span> Register
                                </NavLink>
                            
                                <NavLink className = "nav-link" to = "/login">
                                    <span className = "fa fa-sign-in fa-lg"></span> Login
                                </NavLink>
                            </NavItem>
                    </Nav>
                   
                </Navbar>
        );
    }
}

export default Header;