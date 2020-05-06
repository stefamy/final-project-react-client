import {Link} from "react-router-dom";
import React from "react";
import Invite from "./Invite";
import CreateInvite from "./CreateInvite";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import eventActions from "../../actions/EventActions";
import {connect} from "react-redux";
import Rsvp from "../rsvps/Rsvp";

class InviteList extends React.Component {

  state = {
    showCreateInvite: false
  }

  componentDidMount() {
    // if (this.props.eventId) {
    //   this.props.findAllInvitesForEvent(this.props.eventId);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.eventId && prevProps.eventId !== this.props.eventId) {
    //   this.props.findAllInvitesForEvent(this.props.eventId);
    // }
    if (prevProps.event.guestList && (this.props.event.guestList.length !== prevProps.event.guestList.length)) {
      this.stopShowCreateInvite();
    }
  }

  doShowCreateInvite() {
    this.setState({
      showCreateInvite: true
     });
  }

  stopShowCreateInvite() {
    this.setState({
      showCreateInvite: false
    });
  }

  render() {
    return (
        <>
          {!this.props.isEventHost &&
          <div className="mb-4">
            <h3>Your RSVP</h3>
            <Rsvp
                event={this.props.event}
                updateInvite={this.props.updateInvite}
                invite={this.props.guestList.find(
                    invite => invite.guestId === this.props.user.id)}
                hideEventDetails={true}
            />
          </div>}

          <div className="invite-list-wrap mb-5">
            <h3>Guest List</h3>
            {this.props.event.guestList &&
            <div className="list-group list-group-flush mt-3 border-top">
              {this.props.event.guestList.map((invite, index) => (
                  <Invite
                      key={index}
                      invite={invite}
                      event={this.props.event}
                      updateInvite={this.props.updateInvite}
                      deleteInvite={this.props.deleteInvite}
                      isEventHost={this.props.isEventHost}
                  />
              ))}
            </div>}

            {this.props.isEventHost &&
              (!this.state.showCreateInvite &&
                  <button
                      onClick={() => this.doShowCreateInvite()}
                      className="btn btn-outline-info mt-3">
                    Add New Invite
                  </button>
              ) ||
              (this.state.showCreateInvite &&
                  <CreateInvite
                      createInvite={this.props.createInvite}
                      cancelCreateInvite={() => this.stopShowCreateInvite()}
                      eventId={this.props.eventId}
                      eventDate={this.props.event.date}
                  />)
            }
          </div>

        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    userId: state.user.userId,
    invites: state.user.invites,
    event: {
      guestList: state.event.guestList,
    },
  }
};


const dispatchToPropertyMapper = dispatch => {
  return {
    createInvite: (eventId, invite) => {
      invitesService.createInvite(eventId, invite).then(newInvite => {
        dispatch(eventActions.createGuestInvite(newInvite));
      });
    },
    updateInvite: (inviteId, invite) => {
      invitesService.updateInvite(inviteId, invite).then(response => {
        dispatch(eventActions.updateGuestInvite(invite));
      });
    },
    deleteInvite: (inviteId) => {
      invitesService.deleteInvite(inviteId).then(response => {
        dispatch(eventActions.deleteGuestInvite(inviteId));
      });
    },
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(InviteList);
