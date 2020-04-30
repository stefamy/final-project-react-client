import React from "react";
import userService, {register, areEmailAndUsernameAvailable} from "../../services/UserService";
import {isMatching} from "../../util/passwords";
import {Link} from "react-router-dom";
import userActions from "../../actions/UserActions";
import {connect} from "react-redux";

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    verifyPassword: '',
    email: ''
  }

  handleRegister = (event, user) => {
    event.preventDefault();
    if (!isMatching(user.password, user.verifyPassword)) {
      document.getElementById("passwordValidateInput").setCustomValidity("Passwords don't match");
    } else {
      areEmailAndUsernameAvailable(user).then(result => {
        if (result.email === true && result.username === true) {
          register(user).then(newUser => this.props.history.push('/profile'));
        } else {
          this.setState({
            emailNotAvailable: !result.email,
            usernameNotAvailable: !result.username
          });
        }
      });
    }
  }

  componentDidMount() {
    this.props.findCurrentUser();
  }


  render() {
    return(
        <div className="bg-white border p-5">
          <h1>Register</h1>
          {this.props.user && this.props.user.id &&
          <div className="row">
            <div className="col-md-6 col-lg-8 col">
              <h3>You're already logged in.</h3>
              <ul>
                <li><a href="/profile">Visit your profile</a></li>
                <li><a href="/tasks">View your tasks</a></li>
                <li><a href="/events">View your upcoming events</a></li>
                <li><a href="/invites">View your event invites</a></li>
              </ul>
            </div>
          </div>
          }
          {(!this.props.user || !this.props.user.id) &&
          <div className="row bg-white">
            <div className="col-12">
              <form onSubmit={(e) => this.handleRegister(e, this.state)}>

                {!this.state.usernameNotAvailable &&
                <div className="form-group">
                  <label htmlFor="usernameInput">Username</label>
                  <input
                      id="usernameInput"
                      value={this.state.username}
                      onChange={(e) => this.setState({
                        username: e.target.value
                      })}
                      className="form-control"
                      placeholder="Username"
                      required/>
                </div>
                }

                {this.state.usernameNotAvailable &&
                <div className="form-group">
                  <label htmlFor="usernameInput">Username</label>
                  <input type="text"
                         id="usernameInput"
                         value={this.state.username}
                         onChange={(e) => this.setState({
                           username: e.target.value
                         })}
                         className="form-control  is-invalid"
                         placeholder="Username"
                         required/>
                  <div className="invalid-feedback">
                    That username is already in use. Select another username
                    or <Link to="/login">log in</Link> with that account.
                  </div>
                </div>}

                {this.state.emailNotAvailable &&
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
                  <input type="text"
                         id="emailInput"
                         value={this.state.email}
                         onChange={(e) => this.setState({
                           email: e.target.value
                         })}
                         className="form-control is-invalid"
                         placeholder="Email Address"
                         required/>
                  <div className="invalid-feedback">
                    That email address is already in use. Try <Link to="/login">logging
                    in</Link> instead.
                  </div>
                </div>}

                {!this.state.emailNotAvailable &&
                <div className="form-group">
                  <label htmlFor="emailInput2">Email</label>
                  <input
                      id="emailInput2"
                      value={this.state.email}
                      onChange={(e) => this.setState({
                        email: e.target.value
                      })}
                      className="form-control"
                      placeholder="Email Address"
                      required/>
                </div>}

                <div className="form-group">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                      id="passwordInput"
                      value={this.state.password}
                      onChange={(e) => this.setState({
                        password: e.target.value
                      })}
                      className={`form-control`}
                      type="password"
                      placeholder="password"
                      required/>
                </div>
                <div className="form-group">
                  <label htmlFor="passwordValidateInput">Verify Password</label>
                  <input
                      id="passwordValidateInput"
                      value={this.state.verifyPassword}
                      onChange={(e) => this.setState({
                        verifyPassword: e.target.value
                      })}
                      className={`form-control`}
                      type="password"
                      placeholder="verify password"
                      required/>
                </div>
                <div className="form-group">
                  <button
                      type="submit"
                      className={`btn btn-info btn-block`}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
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
    findCurrentUser: () => {
      userService.findCurrentUser()
      .then(user => dispatch(userActions.findCurrentUser(user)));
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(Register);
