import React, {Component} from "react";
import {connect} from "react-redux";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import Invite from "./Invite";

class InviteList extends Component {

  state = {}

  componentDidMount() {
    if (this.props.user.id) {
      this.props.findInviteByGuestId(this.props.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.findInvitesByGuestId(this.props.user.id);
    }
  }

  render() {
    return (
        <>
          {this.props.invites &&
              <div>
                {this.props.invites.map((invite, index) => (
                <Invite
                    key={index}
                    invite={invite}
                    history={this.props.history}
                    userId={this.props.user.id}
                />
                ))}
              </div>
          }
          {!this.props.invites &&
          <div>
            No invites yet...
          </div>
          }
        </>
    );
  }
}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    invites: state.invites.invites
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    findInvitesByGuestId: userId => {
      invitesService.findInvitesByGuestId(userId).then(invites => {
        dispatch(invitesActions.findAllInvites(invites));
      });
    }

  }

};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(InviteList);
