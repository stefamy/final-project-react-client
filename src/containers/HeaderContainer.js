import React from "react";
import userService from "../services/UserService";
import userActions from "../actions/UserActions";
import {connect} from "react-redux";

/**
 */
class HeaderContainer extends React.Component {

  componentDidMount() {
     this.props.findUser();
   }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
        <header className="bg-white  border-bottom">

              <nav className="container navbar navbar-expand navbar-default justify-content-between">
                    <div className="navbar-header">
                      <a className="navbar-brand-info text-info" href="/">Potluck Party Planner</a>
                    </div>
                {this.props.user.username &&
                    <ul className="nav navbar-nav d-flex align-items-center justify-content-between">
                      <li><a href="/events" className={`nav-link btn`}>Events You're Hosting</a></li>
                      <li><a href="/assignments" className={`nav-link btn`}>Assignments</a></li>
                      <li><a href="/invites" className={`nav-link btn`}>Invites</a></li>
                      <li><a href="/profile" className={`nav-link btn`}>Profile</a></li>
                      <li><button onClick={this.props.logout} className="nav-link btn">Logout</button></li>
                    </ul>
                }
                {!this.props.user.username &&
                  <ul className="nav navbar-nav d-flex align-items-center justify-content-between">
                    <li><a href="/search" className="nav-link btn">Recipe Finder</a></li>
                    <li><a href="/login" className="nav-link btn">Log in</a></li>
                    <li className="ml-2"><a href="/register" className="nav-link btn" >Register</a></li>
                  </ul>
                  }
              </nav>
        </header>
    );
  }

}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    logout: () => {
      userService.logout()
      .then(() => dispatch(userActions.logout()));
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(HeaderContainer);
