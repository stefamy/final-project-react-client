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
      this.props.findInvitesByGuestId(this.props.user.id);
    } else {
      this.setState({guestUser: true})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.findInvitesByGuestId(this.props.user.id);
      this.setState({guestUser: false})
    }
    console.log('this state', this.state);
    console.log('this props', this.props);
  }

  render() {
    return (
        <>
          {!this.state.guestUser && this.props.invites &&
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

          {this.state.guestUser && <>
          <h2 className="pb-2">Your Invites</h2>
          <p>Please log in to view your invites.</p>
          </> }

          {(!this.props.invites || !this.props.invites.length) &&  <>
          <div className="bg-white p-3 border">
            <h2 className="pb-2">Your Invites</h2>
            No invites yet...
          </div>
         </> }

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
