import React from "react";
import {connect} from "react-redux";
import { push } from 'connected-react-router'
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";

const Header = ({logout, user}) =>
    <header className="bg-white  border-bottom">
      <nav
          className="container navbar navbar-expand navbar-default justify-content-between">
        <div className="navbar-header">
          <a className="navbar-brand-info text-info" href="/">Potluck Party Planner</a>
        </div>
        {user.profile && user.profile.id &&
        <ul className="nav navbar-nav d-flex align-items-center justify-content-between">
          <li><a href="/events" className="nav-link btn">Events You're
            Hosting</a></li>
          <li><a href="/tasks" className="nav-link btn">Tasks</a>
          </li>
          <li><a href="/invites" className="nav-link btn">Invites</a></li>
          <li><a href="/profile" className="`nav-link btn">Profile</a></li>
          <li>
            <button onClick={logout} className="navlink btn">Logout</button>
          </li>
        </ul>
        }
        {!user.profile || !user.profile.id &&
        <ul className="nav navbar-nav d-flex align-items-center justify-content-between">
          <li><a href="/search" className="nav-link btn">Recipe Finder</a></li>
          <li><a href="/login" className="nav-link btn">Log in</a></li>
          <li className="nav-link btn ml-2"><a href="/register" className="nav-link btn">Register</a>
          </li>
        </ul>
        }
      </nav>
    </header>;

const stateToPropertyMapper = state => {
  return {
    user: state.user.user
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
