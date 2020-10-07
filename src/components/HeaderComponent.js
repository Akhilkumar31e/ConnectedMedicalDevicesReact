import React,{Component} from 'react';


import { Navbar, NavbarBrand,Nav,NavItem} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';


class Header extends Component{
    render(){
        return(
            <Navbar dark >
                    <NavbarBrand className="mr-auto" href="/React-First-Application/">
                           CMD
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/register">
                                    <span className = "fa fa-signup fa-lg"></span> Register
                                </NavLink>
                            
                                <NavLink className = "nav-link" to = "/login">
                                    <span className = "fa fa-signup fa-lg"></span> Login
                                </NavLink>
                            </NavItem>
                    </Nav>
                   
                </Navbar>
        );
    }
}

export default Header;