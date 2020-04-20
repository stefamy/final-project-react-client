import React, { Component } from "react";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import {connect} from "react-redux";
import assignmentsService from "../../services/AssignmentsService";
import assignmentsActions from "../../actions/AssignmentsActions";

class AssignmentList extends Component {

  state = {}

  componentDidMount() {
    if (this.props.user.id) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
    }
    console.log('this.state', this.state);
    console.log('this.props', this.props);
  }

  render() {
    return (
        <>
          {this.props.assignments &&
          <div>
            the assignment is for event ID# {this.props.assignments.id}
          </div>
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
