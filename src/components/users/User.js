import React from "react";
import userActions from "../../actions/UserActions";
import userService from "../../services/UserService";
import { connect } from "react-redux";

class User extends React.Component {

  state = {
    userData: {
      id: 1,
      username: 'username',
      firstName: 'Amy',
      lastName: 'S',
      city: 'Seattle',
      state: 'Washington'
    }
  }

  componentDidMount() {
    // this.props.findUser();
    // this.setState({
    //   userData: this.props.publicUser("test")
    // });
  }

  componentDidUpdate() {
    
  }

  render() {
    return(
        <div>
          <h1>Profile</h1>
          <span>User: {this.props.username}</span> <br/>
          <span>Name: {this.state.userData.firstName} {this.state.userData.lastName}.</span> <br/>
          <span>Location: {this.state.userData.city}, {this.state.userData.state}</span> <br/>
        
        {/* private details */ }
        {this.state.userData.username ===  this.props.user.username &&
          <span>Email address: </span>
        }
        
        </div>
          )
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
    findPublicUser: () => {
      userService.findUser("username")
      .then(publicUser => publicUser);
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(User);
