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

class Event extends React.Component {

  state = {
    statusUnknown: true
  }

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.state.event && this.state.statusUnknown) {
    //   this.setState({
    //     isEventHost: this.props.user.id === this.state.event.hostId,
    //     isEventGuest: this.props.eventInvites.some(invite => invite.guestId === this.props.user.id),
    //     statusUnknown: false
    //   })
    // }
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

  doShowCreateInvite() {
    this.setState({
      showCreateInvite: true
    })
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
                      <ul className="list-group mb-3">
                      {this.props.eventAssignments.map((assignment, index) => (
                          <AssignmentResponse
                              key={index}
                              assignment={assignment}
                              event={this.props.event}
                              user={this.props.user}
                              updateAssignment={this.props.updateAssignment}
                          />
                      ))}
                      </ul>
                     </> }
                    {this.state.isEventHost && <>
                      <button
                          onClick={() => this.doShowCreateAssignment()}
                          className="btn btn-primary">
                        Add New Assignment
                      </button>
                      {this.state.showCreateAssignment &&
                          <CreateAssignment
                              createAssignment={this.props.createAssignment}
                              user={this.props.user}
                              eventId={this.state.event.id}
                          />
                      }
                      </>}
                  {!this.state.isEventGuest && this.state.event.privateEvent &&
                  <p>For privacy reasons, only guests on the invite list can see event details. <br/>
                    If you are on the invite list, please sign in to view more about this event.</p>}
                </div>

              <hr/>
              <div className="col-12 bg-white p-3">
                    <h3>Invites</h3>
                {!this.state.isEventHost && <>
                    {this.props.eventInvites && <>
                    <ul className="list-group mb-3">
                      {this.props.eventInvites.map((invite, index) => (
                          <InviteResponse
                              key={index}
                              invite={invite}
                              event={this.state.event}
                          />
                      ))}
                    </ul>
                    </>}
                  <button
                      onClick={() => this.doShowCreateInvite()}
                      className="btn btn-primary">
                    Add New Invitation
                  </button>
                  {this.state.showCreateInvite &&
                  <CreateInvite
                      createInvite={this.props.createInvite}
                      user={this.props.user}
                      eventId={this.state.event.id}
                  /> }
                  </>}

                {!this.state.isEventGuest && !this.state.isEventHost &&
                <p>For privacy reasons, only guests on the invite list can see event details. <br/>
                  If you are on the invite list, please sign in to view more about this event.</p>
                }
              </div>

            </>
            }
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
    createAssignment: (eventId, assignment) => {
      assignmentsService.createAssignment(eventId, assignment).then(assignment => {
        dispatch(assignmentsActions.createAssignment(assignment));
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

