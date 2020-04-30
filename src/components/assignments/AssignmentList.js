import {Link} from "react-router-dom";
import React from "react";
import Assignment from "./Assignment";
import CreateAssignment from "./CreateAssignment";
import assignmentsService from "../../services/AssignmentsService";
import assignmentsActions from "../../actions/AssignmentsActions";
import {connect} from "react-redux";
import eventsService from "../../services/EventsService";
import AssignmentResponse from "./AssignmentResponse";

class AssignmentList extends React.Component {

  state = {
    showCreateAssignment: false
  }

  componentDidMount() {
    if (this.props.event && this.props.event.id) {
      this.props.findAllAssignmentsForEvent(this.props.event.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.event && prevProps.event.id !== this.props.event.id) {
      this.props.findAllAssignmentsForEvent(this.props.event.id);
    }
    if (prevProps.eventAssignments && (this.props.eventAssignments.length !== prevProps.eventAssignments.length)) {
      this.stopShowCreateAssignment();
    }
  }

  doShowCreateAssignment() {
    this.setState({
      showCreateAssignment: true
    });
  }

  stopShowCreateAssignment() {
    this.setState({
      showCreateAssignment: false
    });
  }

  render() {
    return (
        <>
          <h3>Assignments</h3>
          {this.props.eventAssignments &&
          <div className="mt-3 mb-3">
            {this.props.eventAssignments.map((assignment, index) => (
                <AssignmentResponse
                    key={index}
                    assignment={assignment}
                    isHost={this.props.event.hostId === this.props.user.profile.id}
                    event={this.props.event}
                    user={this.props.user}
                    updateAssignment={this.props.updateAssignment}
                    deleteAssignment={this.props.deleteAssignment}
                />
            ))}
          </div>}

          {!this.state.showCreateAssignment &&
          <button
              onClick={() => this.doShowCreateAssignment()}
              className="btn btn-outline-info">
            Add New Assignment
          </button>
          }
          {this.state.showCreateAssignment &&
          <CreateAssignment
              createAssignment={this.props.createAssignment}
              cancelCreateAssignment={() => this.stopShowCreateAssignment()}
              user={this.props.user}
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
    eventAssignments: state.assignments.eventAssignments,
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findAllAssignmentsForEvent: (eventId) => {
      assignmentsService.findAllAssignmentsForEvent(eventId).then(assignments => {
        dispatch(assignmentsActions.findAllAssignmentsForEvent(assignments));
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
    deleteAssignment: (assignmentId) => {
      assignmentsService.deleteAssignment(assignmentId).then(response => {
        dispatch(assignmentsActions.deleteAssignmentForEvent(assignmentId));
      });
    }
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(AssignmentList);
