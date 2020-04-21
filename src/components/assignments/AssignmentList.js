import React, { Component } from "react";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import {connect} from "react-redux";
import assignmentsService from "../../services/AssignmentsService";
import assignmentsActions from "../../actions/AssignmentsActions";
import Assignment from "./Assignment";

class AssignmentList extends Component {

  state = {}

  componentDidMount() {
    if (this.props.user.id) {
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
          {!this.state.guestUser && this.props.assignments &&
          <div>
            {this.props.assignments.map((assignment, index) => (
                <Assignment
                    key={index}
                    assignment={assignment}
                    history={this.props.history}
                    userId={this.props.user.id}
                    event={this.props.event}
                />
            ))}
          </div>
          }
          {this.state.guestUser &&
          <p>Please log in to view your assignments.</p>
          }
          {!this.props.assignments &&
          <div>
            No assignments yet...
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
  )(AssignmentList);
