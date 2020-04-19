import React from "react";
import _ from 'lodash';
import userActions from "../../actions/UserActions";
import userService from "../../services/UserService";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

class UserComponent extends React.Component {

  state = {
    profile: {}
  }

  componentDidMount() {
    this.props.findUser(this.props.username);
  }

  componentDidUpdate() {

  }

  render() {
    return(
        <div>
          <h1>Profile</h1>
        </div>
          )
  }
}
