import React from "react";
import {register} from "../../services/UserService";
import {isMatching} from "../../util/passwords";

export default class Register extends React.Component {
    state = {
        username: '',
        password: '',
        verifyPassword: ''
    }
    handleRegister = (event, user) => {
      event.preventDefault();
      if (!isMatching(user.password, user.verifyPassword)) {
        document.getElementById("passwordValidateInput").setCustomValidity("Passwords don't match");
      } else {
        register(user)
        .then(newUser => this.props.history.push('/profile'));
      }
    }

    render() {
        return(
            <div>
              <h1>Register</h1>
              <div className="row">
                <div className="col-md-4 col-lg-6 col">
                  <form onSubmit={(e) => this.handleRegister(e, this.state)}>
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
                          required />
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
                          className={`btn btn-primary btn-block`}>
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        )
    }
}
