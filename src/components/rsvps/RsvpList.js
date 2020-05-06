import React, {Component} from "react";
import {connect} from "react-redux";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import Rsvp from "./Rsvp";

class RsvpList extends Component {

  state = {
  }

  componentDidMount() {
    // if (this.props.user.id) {
    //   this.props.findInvitesByGuestId(this.props.user.id);
    //   this.setState({guestUser: false})
    // }
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.user !== this.props.user) {
    //   this.props.findInvitesByGuestId(this.props.user.id);
    //   this.setState({guestUser: false})
    // }
  }

  handleRsvpResponse(rsvpIndex, updatedRsvp) {
    console.log(rsvpIndex, updatedRsvp);
    // this.props.updateInvite(this.props.user, updatedRsvp, rsvpIndex);
  }

  render() {
    const rsvps = (this.props.user.rsvps ? this.props.user.rsvps : null);
    return (
        <div className="border bg-white rounded p-lg-4 p-3">
          <h1>Your Invites</h1>
          {this.props.user.id && rsvps &&
              <div>
                {rsvps.map((rsvp, index) => (
                <Rsvp
                    key={index}
                    history={this.props.history}
                    invite={rsvp.invite}
                    event={rsvp.event}
                    updateInvite={this.props.updateInvite}
                    hideEventDetails={false}
                />
                ))}
              </div>
          }

          {!this.props.user.id &&
          <p>Please log in to view your invites.</p>}

          {this.props.user.id && (!rsvps || !rsvps.length > 0) &&
            <p>No invites yet.</p> }

        </div>
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
    updateInvite: (rsvpIndex, inviteId, invite) => {
      invitesService.updateInvite(inviteId, invite).then(response => {
        dispatch(userActions.updateCurrentUserRsvp(rsvpIndex, invite));
      });
    },
  }

};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(RsvpList);
