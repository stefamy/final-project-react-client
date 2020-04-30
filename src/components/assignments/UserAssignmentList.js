import React, { Component } from "react";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import {connect} from "react-redux";
import assignmentsService from "../../services/AssignmentsService";
import assignmentsActions from "../../actions/AssignmentsActions";
import Assignment from "./Assignment";

class UserAssignmentList extends Component {

  state = {}

  componentDidMount() {
    if (this.props.viewingProfile && this.props.userId) {
        this.props.findAssignmentByAssigneeUserId(this.props.userId);
    }
    else if (this.props.user.id) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
    } else {
      this.setState({guestUser: true})
    }

  }

  componentDidUpdate(prevProps) {
    if (this.props.findByUser && (prevProps.user !== this.props.user)) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
      this.setState({guestUser: false})
    }

  }

  render() {
    return (
        <>
          {!this.props.hideForm  && <h2 className="pb-2">Your Assignments</h2> }
            {!this.state.guestUser && this.props.assignments &&
              <div>
                {this.props.assignments.map((assignment, index) => (
                    <Assignment
                        key={index}
                        assignment={assignment}
                        history={this.props.history}
                        userId={this.props.userId}
                        event={this.props.event}
                        hideForm={this.props.hideForm}
                        updateAssignment={this.props.updateAssignment}
                    />
                ))}
              </div>
              }
              {this.state.guestUser &&
              <div className="bg-white p-3 border">
                <h2 className="pb-2">Your Assignments</h2>
                Please log in to view your assignments.
              </div>
              }
              {(!this.props.assignments || !this.props.assignments.length) &&
              <div className="bg-white p-3 border">
                No assignments found.<br/>
              </div>
              }
            </>
    );
  }
}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    assignments: state.assignments.assignments
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    updateAssignment: (assignmentId, assignment) => {
      assignmentsService.updateAssignment(assignmentId, assignment).then(assignment => {
        dispatch(assignmentsActions.updateAssignment(assignment));
      });
    },
    findAssignmentByAssigneeUserId: userId => {
      assignmentsService.findAssignmentByAssigneeUserId(userId).then(assignments => {
        dispatch(assignmentsActions.findAllAssignments(assignments));
      });
    }
  };
};


  export default connect(
      stateToPropertyMapper,
      dispatchToPropertyMapper
  )(UserAssignmentList);
