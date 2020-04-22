import React from "react";
import {login} from "../../services/UserService";

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleLogin(event, user) {
    event.preventDefault();
    login(user).then(currentUser => {
      this.props.history.push('/');
    })
  }

  render() {
    return(
        <div className="bg-white border p-5">
          <h1>Login</h1>
          <div className="row">
            <div className="col-md-6 col-lg-8 col">
              <form onSubmit={(e) => this.handleLogin(e, this.state)}>
                <div className="form-group">
                  <label htmlFor="usernameInput">Username</label>
                  <input
                      id="usernameInput"
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
                      className={`btn btn-info btn-block`}>
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
