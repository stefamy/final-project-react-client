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
        <header className="bg-pattern">
          <div className="container">
            <div className="pt-2 pb-2 row">
              <div className="col site-title">Potluck Party Organizer</div>
            {this.props.user.username && <div className="col text-right"> Welcome, {this.props.user.username}!</div>}
            </div>
          </div>
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
