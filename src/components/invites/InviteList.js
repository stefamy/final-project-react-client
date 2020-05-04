import {Link} from "react-router-dom";
import React from "react";
import Invite from "./Invite";
import CreateInvite from "./CreateInvite";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import {connect} from "react-redux";
import eventsService from "../../services/EventsService";
import InviteRsvp from "./InviteRsvp";

class InviteList extends React.Component {

  state = {
    showCreateInvite: false
  }

  componentDidMount() {
    if (this.props.event && this.props.event.id) {
      this.props.findAllInvitesForEvent(this.props.event.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.event && prevProps.event.id !== this.props.event.id) {
      this.props.findAllInvitesForEvent(this.props.event.id);
    }
    if (prevProps.invites && (this.props.invites.length !== prevProps.invites.length)) {
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
            <InviteRsvp
                event={this.props.event}
                updateInvite={this.props.updateInvite}
                invite={this.props.invites.find(
                    invite => invite.guestId === this.props.user.id)}
                hideEventDetails={true}
            />
          </div>}

          <div className="invite-list-wrap mb-5">
            <h3>Guest List</h3>
            {this.props.invites &&
            <div className="list-group list-group-flush mt-3 border-top">
              {this.props.invites.map((invite, index) => (
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
                      eventId={this.props.event.id}
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
    user: state.user.user,
    invites: state.invites.invites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findAllInvitesForEvent: (eventId) => {
      invitesService.findAllInvitesForEvent(eventId).then(invites => {
        dispatch(invitesActions.findAllInvitesForEvent(invites));
      });
    },
    createInvite: (eventId, invite) => {
      invitesService.createInvite(eventId, invite).then(newInvite => {
        dispatch(invitesActions.createInvite(newInvite));
      });
    },
    updateInvite: (inviteId, invite) => {
      invitesService.updateInvite(inviteId, invite).then(response => {
        dispatch(invitesActions.updateInviteForEvent(invite));
      });
    },
    deleteInvite: (inviteId) => {
      invitesService.deleteInvite(inviteId).then(response => {
        dispatch(invitesActions.deleteInviteForEvent(inviteId));
      });
    },
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(InviteList);
