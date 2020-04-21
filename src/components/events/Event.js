import React from "react";
import { connect } from "react-redux";
import Invite from "../invites/Invite";
import CreateInvite from "../invites/CreateInvite";
import invitesActions from "../../actions/InvitesActions";
import invitesService from "../../services/InvitesService";
import Assignment from "../assignments/Assignment";
import CreateAssignment from "../assignments/CreateAssignment";
import assignmentsActions from "../../actions/AssignmentsActions";
import assignmentsService from "../../services/AssignmentsService";
import eventsService from "../../services/EventsService";
import CreateEvent from "./CreateEvent";

class Event extends React.Component {

  state = { }

  componentDidMount() {
    if (!this.props.event) {
      eventsService.findEventById(this.props.eventId).then((event) => {
        this.setState({event: event});
        this.props.loadAllEventData(this.state.event.id);
      });
    } else {
      this.setState({ event: this.props.event });
      this.props.loadAllEventData(this.state.event.id);
    }
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.event[attribute] = newContent;
    this.setState(newState);;
  }

  componentDidUpdate(prevProps) {
    console.log('this.props', this.props);
    console.log('this.state', this.state);
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
      showCreateAInvite: true
    })
  }

  render() {
    return (
        <>
          <div className="col pb-4">
            {this.state.event &&
            <>
              <h3>Event: {this.state.event.name} </h3>
              <h4>{this.state.event.description} </h4>
              <p>{this.state.event.date} </p>

              {this.props.eventAssignments && <>
                    <h3>Assignments</h3>
                    {this.props.eventAssignments.map((assignment, index) => (
                    <Assignment
                        key={index}
                        assignment={assignment}
                        event={this.state.event}
                        history={this.props.history}
                        userId={this.props.user.id}
                    />
                ))}
                </>}
              <button
                  onClick={() => this.doShowCreateAssignment()}
                  className="btn btn-primary">
                Add New Assignment
              </button>
              {/*{this.state.showCreateAssignment &&*/}
                  <CreateAssignment
                      createAssignment={this.props.createAssignment}
                      user={this.props.user}
                      eventId={this.state.event.id}
                  />
              {/*}*/}
              <hr/>
              {this.props.eventInvites && <>
                  <h3>Invites</h3>
                  {this.props.eventInvites.map((invite, index) => (
                      <Invite
                          key={index}
                          invite={invite}
                          event={this.state.event}
                          history={this.props.history}
                          userId={this.props.user.id}
                      />
                  ))}
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
            </>
            }
          </div>
        </>
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
  };

};


export default connect(
    stateToPropertyMapper,
  dispatchToPropertyMapper
)(Event);

