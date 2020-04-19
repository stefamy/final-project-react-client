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
    if (prevProps.user.username !== this.props.username) {
      this.props.findUser();
    }
  }

  render() {
    return (
        <header>
          <div className="width-limiter"><span className="site-title">Potluck Party Organizer</span></div>
          {this.props.user.username && <span>Welcome, {this.props.user.username}!</span>}
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
    updateUser: (user) => {
      userService.updateUser(user)
      .then(user => {
        dispatch(userActions.updateUser(user));
      });
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(HeaderContainer);
