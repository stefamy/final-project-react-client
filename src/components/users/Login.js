import React from "react";
import {login} from "../../services/UserService";

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleLogin = (event, user) => {
    event.preventDefault();
    login(user)
    .then(currentUser => this.props.history.push('/profile'))
  }

  render() {
    return(
        <div>
          <h1>Login</h1>
          <div className="row">
            <div className="col-md-4 col-lg-6 col">
              <form onSubmit={(e) => this.handleLogin(e, this.state)}>
                <div className="form-group">
                  <label htmlFor="usernameInput">Username</label>
                  <input
                      id="usernameInput"
                      required="required"
                      value={this.state.username}
                      onChange={(e) => this.setState({
                        username: e.target.value
                      })}
                      className={`form-control`}
                      placeholder="username"
                      required/>
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                      id="passwordInput"
                      required="required"
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
                  <button
                      type="submit"
                      className={`btn btn-primary btn-block`}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
}
