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
    console.log('assignment to be updated to:', this.state);
    e.preventDefault();
    this.props.updateAssignment(this.state.updatedAssignment.id, this.state.updatedAssignment)
  }


  render() {
    const assignment = this.props.assignment;
    const event = this.props.event;

    return (
        <div className="row border mb-3">
          <div className="col-auto pl-0 pr-0 input-group-addon bg-light assignment-checkbox-wrap border-right">
            <label className="special-checkbox pt-3 pb-3">
              <input
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
              {this.state.updatedAssignment.status === "Assigned" ? <span className="badge badge-pill badge-success">{this.state.updatedAssignment.status}</span>
                : <span className="badge badge-pill badge-warning">{this.state.updatedAssignment.status}</span>}
             </>}
          </div>
          {(this.state.updatedAssignment.status !== assignment.status) &&
          <div className="col-12 pl-0 pr-0 input-group border-top">
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
