import React from "react";
import { connect } from "react-redux";
import InviteResponse from "../invites/InviteResponse";
import AssignmentResponse from "../assignments/AssignmentResponse";
import Assignment from "../assignments/Assignment";
import CreateInvite from "../invites/CreateInvite";
import invitesActions from "../../actions/InvitesActions";
import invitesService from "../../services/InvitesService";
import CreateAssignment from "../assignments/CreateAssignment";
import assignmentsActions from "../../actions/AssignmentsActions";
import assignmentsService from "../../services/AssignmentsService";
import eventsService from "../../services/EventsService";
import Invite from "../invites/Invite";

class Event extends React.Component {

  state = { }

  componentDidMount() {
    if (!this.props.event) {
      eventsService.findEventById(this.props.eventId).then((event) => {
        this.setState({event: event});
        this.props.loadAllEventData(this.props.eventId);
      });
    } else {
      this.setState({event: this.props.event});
      this.props.loadAllEventData(this.props.eventId);

    }
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.event[attribute] = newContent;
    this.setState(newState);
  }

  handleCreateAssignment(eventId, assignment) {
    this.stopShowCreateAssignment();
    this.props.createAssignment(eventId, assignment);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && (prevProps.eventInvites !== this.props.eventInvites)) {
      const invite = this.props.eventInvites.find(invite => invite.guestId === this.props.user.id);
      this.setState({
        userInvite: invite
      });
    }
    if (prevProps.eventAssignments && (this.props.eventAssignments.length !== prevProps.eventAssignments.length)) {
      this.stopShowCreateAssignment();
    }
    if (prevProps.eventInvites && (this.props.eventInvites.length !== prevProps.eventInvites.length)) {
      this.stopShowCreateInvite();
    }
    console.log('this state', this.state);
    console.log('this props', this.props);
  }

  showUpdateSuccess() {
    this.setState({
      isUpdating: false,
      showSuccess: true
    });
    return setTimeout(() => {
      this.setState({showSuccess: false})
    }, 1000);
  }

  handleUpdateEvent(e) {
    e.preventDefault();
    this.setState({ isUpdating: true});
    eventsService.updateEvent(this.state.event.id, this.state.event)
    .then(success => this.showUpdateSuccess());
  }

  doShowCreateAssignment() {
    this.setState({
      showCreateAssignment: true
    })
  }

  stopShowCreateAssignment() {
    this.setState({
      showCreateAssignment: false
    })
  }

  doShowCreateInvite() {
    this.setState({
      showCreateInvite: true
    })
  }


  stopShowCreateInvite() {
    this.setState({
      showCreateInvite: false
    })
  }


  getUserInvite(userId) {
    return this.props.eventInvites.find(invite => invite.guestId === userId);
  }


  render() {
    return (
          <div className="row pb-4">
            {this.state.event && <>
              <div className="col-12 bg-white p-3">
                <h3>Event: {this.state.event.name} </h3>
                <h4>{this.state.event.description} </h4>
                <p>{this.state.event.date} </p>
              </div>

              <div className="col-12 bg-white p-3">
                <h3>Assignments</h3>
                 {!this.state.event.privateEvent && this.props.eventAssignments && <>
                      <div className="mb-3">
                      {this.props.eventAssignments.map((assignment, index) => (
                          <AssignmentResponse
                              key={index}
                              assignment={assignment}
                              isHost={this.state.event.id === this.props.user.id}
                              user={this.props.user}
                              updateAssignment={this.props.updateAssignment}
                              deleteAssignment={this.props.deleteAssignment}
                          />
                      ))}
                      </div>
                     </> }
                    {this.state.event.hostId === this.props.user.id && <>
                      {!this.state.showCreateAssignment &&
                        <button
                          onClick={() => this.doShowCreateAssignment()}
                          className="btn btn-primary">
                          Add New Assignment
                          </button>
                      }
                      {this.state.showCreateAssignment &&
                          <CreateAssignment
                              createAssignment={this.props.createAssignment}
                              user={this.props.user}
                              eventId={this.state.event.id}
                          />
                      }
                      </>}
                  {!this.state.isEventGuest && this.state.event.privateEvent &&
                  <p>For privacy reasons, only event guests can see the invite list. <br/>
                    If you are on the invite list, please sign in to view the full event details.</p>}
                </div>

              <hr/>
              {this.state.event.hostId === this.props.user.id &&
              <div className="col-12 bg-white p-3">
                <h3>Invites</h3>
                    {this.props.eventInvites && <>
                    <ul className="list-group mb-3">
                      {this.props.eventInvites.map((invite, index) => (
                          <InviteResponse
                              key={index}
                              invite={invite}
                              event={this.state.event}
                              deleteInvite={this.props.deleteInvite}
                          />
                      ))}
                    </ul>
                    </>}
                    {!this.state.showCreateInvite &&
                      <button
                          onClick={() => this.doShowCreateInvite()}
                          className="btn btn-primary">
                        Add New Invitation
                      </button>
                    }
                    {this.state.showCreateInvite &&
                    <CreateInvite
                        createInvite={this.props.createInvite}
                        user={this.props.user}
                        eventId={this.state.event.id}
                    /> }
                </div>
                }
                {this.state.userInvite &&
                  <div className="col-12 bg-white p-3">
                  <h3>Your RSVP</h3>
                      <Invite
                         invite={this.state.userInvite}
                         event={this.state.event}
                         userId={this.props.user.id}
                         hideEventDetails={true}
                     />
                  </div>
                  }
                </>}
          </div>
      );

    }

}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    eventAssignments: state.assignments.eventAssignments,
    eventInvites: state.invites.eventInvites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    loadAllEventData: (eventId) => {
      invitesService.findAllInvitesForEvent(eventId).then(invites => {
        dispatch(invitesActions.findAllInvitesForEvent(invites));
      });
      assignmentsService.findAllAssignmentsForEvent(eventId).then(assignments => {
        dispatch(assignmentsActions.findAllAssignmentsForEvent(assignments));
      });
    },
    createInvite: (eventId, invite) => {
      invitesService.createInvite(eventId, invite).then(invite => {
        dispatch(invitesActions.createInvite(invite));
      });
    },
    deleteInvite: (inviteId) => {
      invitesService.deleteInvite(inviteId).then(response => {
        dispatch(invitesActions.deleteInviteForEvent(inviteId));
      });
    },
    createAssignment: (eventId, assignment) => {
      assignmentsService.createAssignment(eventId, assignment).then(assignment => {
        dispatch(assignmentsActions.createAssignment(assignment));
      });
    },
    deleteAssignment: (assignmentId) => {
      assignmentsService.deleteAssignment(assignmentId).then(response => {
        dispatch(assignmentsActions.deleteAssignmentForEvent(assignmentId));
      });
    },
    updateAssignment: (assignmentId, assignment) => {
      assignmentsService.updateAssignment(assignmentId, assignment).then(response => {
        dispatch(assignmentsActions.updateAssignmentForEvent(assignment));
      });
    },
  };
};


export default connect(
    stateToPropertyMapper,
  dispatchToPropertyMapper
)(Event);

