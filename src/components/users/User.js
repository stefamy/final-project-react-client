import React from "react";
import userActions from "../../actions/UserActions";
import userService from "../../services/UserService";
import { connect } from "react-redux";

class User extends React.Component {

  state = {
    userData: { }
  }

  componentDidMount() {
    userService.findPublicProfile(this.props.id)
    .then(profile =>
      this.setState({userData: profile} ));
  }

  componentDidUpdate() {
    
  }

  render() {
    return(
        <div>
          <h1>Profile</h1>
          <span> You are: {this.props.user.firstName} </span><br/>

          <hr />
          <span>VIEWING </span>
          <span>User: {this.props.username}</span> <br/>
          {this.state.userData && <>
          <span>Name: {this.state.userData.firstName} {this.state.userData.lastName}.</span> <br/>
        </>}
        </div>)
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
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(User);
