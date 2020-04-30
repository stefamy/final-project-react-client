import {Link} from "react-router-dom";
import React from "react";
import Invite from "./Invite";
import CreateInvite from "./CreateInvite";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import {connect} from "react-redux";
import eventsService from "../../services/EventsService";

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
    if (prevProps.eventInvites && (this.props.eventInvites.length !== prevProps.eventInvites.length)) {
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
          <h3>Invites</h3>
          {this.props.eventInvites &&
          <div className="list-group list-group-flush mt-3 mb-4 border-top">
            {this.props.eventInvites.map((invite, index) => (
                <Invite
                    key={index}
                    invite={invite}
                    event={this.props.event}
                    updateInvite={this.props.updateInvite}
                    deleteInvite={this.props.deleteInvite}
                />
            ))}
          </div>}

          {!this.state.showCreateInvite &&
          <button
              onClick={() => this.doShowCreateInvite()}
              className="btn btn-outline-info">
            Add New Invite
          </button>
          }
          {this.state.showCreateInvite &&
          <CreateInvite
              createInvite={this.props.createInvite}
              cancelCreateInvite={() => this.stopShowCreateInvite()}
              eventId={this.props.event.id}
              eventDate={this.props.event.date}
          /> }

        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    eventInvites: state.invites.eventInvites
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
