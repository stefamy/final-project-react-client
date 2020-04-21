import React from "react";

class AssignmentResponse extends React.Component {

  state = {
    updatedAssignment: {...this.props.assignment}
  }

  handleResponseChange(status) {
    let newState = Object.assign({}, this.state);
    if (status === "Assigned") {
      newState.updatedAssignment.status = "Assigned";
      newState.updatedAssignment.assigneeUserId = this.props.user.id;
      newState.updatedAssignment.assigneeFirstName = this.props.user.firstName;
      newState.updatedAssignment.assigneeLastName = this.props.user.lastName;
      newState.updatedAssignment.assigneeEmail = this.props.user.email;
      newState.updatedAssignment.dateOfResponse = new Date();
      newState.updatedAssignment.assigneeComments = "";
    } else {
      newState.updatedAssignment.status = "Unassigned";
      newState.updatedAssignment.assigneeUserId = "";
      newState.updatedAssignment.assigneeFirstName = "";
      newState.updatedAssignment.assigneeLastName = "";
      newState.updatedAssignment.assigneeEmail = "";
      newState.updatedAssignment.dateOfResponse = "";
      newState.updatedAssignment.assigneeComments = "";
    }
    this.setState(newState);
  }

  handleAssignmentInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.updatedAssignment[attribute] = newContent;
    this.setState(newState);
  }

  handleUpdateAssignment(e) {
    e.preventDefault();
    this.props.updateAssignment(this.state.updatedAssignment.id, this.state.updatedAssignment)
  }

  handleDeleteAssignment(e) {
    e.preventDefault();
    this.props.deleteAssignment(this.state.updatedAssignment.id);
  }


  render() {
    const assignment = this.props.assignment;
    const user = this.props.user;


    return (
        <div className="assignment border mb-3">
          <div className="assignment-header d-flex justify-content-between align-items-center pl-3 pr-3 pt-2 pb-2 bg-light border-bottom">
            {assignment.type}
            {this.props.isHost && <button className="btn" onClick={(e) => this.handleDeleteAssignment(e)}><i className="text-danger fa fa-close"></i></button>}
          </div>
          <div className="assignment-body d-flex">
          <div className="col-auto pl-0 pr-0 input-group-addon bg-light assignment-checkbox-wrap border-right">
            <label className="special-checkbox pl-3 pr-3 pt-2 pb-2">
              <input
                  disabled={assignment.status === "Assigned" && assignment.assigneeUserId !== user.id}
                  onChange={(e) => this.handleResponseChange(e.target.checked ? "Assigned" : "Unassigned")}
                  id={`assignmentCheckboxInput` + assignment.id}
                  type="checkbox"
                  checked={this.state.updatedAssignment.status === "Assigned" ? 1 : 0}
                  name="assignmentCheckbox"/>
            </label>
          </div>
          <div className="col d-flex justify-content-between align-items-center border-0">
            <span>{assignment.title} {assignment.description}</span>
            {(this.state.updatedAssignment.status === assignment.status) && <>
              {(assignment.status === "Assigned" && assignment.assigneeUserId !== user.id) &&
                <span className="badge badge-pill badge-light text-secondary border">{this.state.updatedAssignment.status}</span> }
              {(assignment.status === "Assigned" && assignment.assigneeUserId === user.id) &&
                <span className="badge badge-pill badge-success">{this.state.updatedAssignment.status} to you</span> }
              {assignment.status !== "Assigned" && <span className="badge badge-pill badge-warning">{this.state.updatedAssignment.status}</span>}
             </>}
          </div>
        </div>
          {(this.state.updatedAssignment.status !== assignment.status) &&
          <div className="col pl-0 pr-0 input-group border-top">
              <input id={`assigneeCommentsInput` + assignment.id}
                     name="assigneeComments"
                     type="text"
                     className="form-control border-0"
                     placeholder="Comments for event organizer"
                     onChange={(e) => this.handleAssignmentInput('assigneeComments', e.target.value)}
              />
              <div className="input-group-addon border-left bg-light"><button type="submit" onClick={(e) => this.handleUpdateAssignment(e)} className="btn btn-primary special-border-radius">Save</button></div>
          </div>
          }

        </div>
    );
  }

}

export default AssignmentResponse;
