import React from "react";
import {connect} from "react-redux";
import { push } from 'connected-react-router'
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const Header = ({logout, userId, profile}) =>
    <header className="bg-white border-bottom">
      <div className="container">
      <Navbar collapseOnSelect expand="md" bg="white" variant="light" className="pl-0 pr-0">
        <Navbar.Brand href="/">Potluck Party Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {userId && <>
          <Nav className="mr-auto">
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
            <Nav.Link href="/invites">Invites</Nav.Link>
          </Nav>
          <Nav className="mr-0">
            <Nav.Link href={`/profile/${profile.username}`}>Profile</Nav.Link>
            <Nav.Item><button className="btn text-muted" onClick={logout}>Logout</button></Nav.Item>
          </Nav>
          </> }
          {!userId && <>
            <Nav className="col-12 justify-content-end">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav> </> }
        </Navbar.Collapse>
      </Navbar>
      </div>
    </header>;

const stateToPropertyMapper = state => {
  return {
    userId: state.user.userId,
    profile: state.user.profile
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    logout: () => {
      userService.logout().then(user => {
        dispatch(userActions.logout());
        dispatch(push('/login'))
      });
    }
  }
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(Header);
