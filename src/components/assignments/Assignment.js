import React from "react";
import eventsService from "../../services/EventsService";
import {Link} from "react-router-dom";
import assignmentsService from "../../services/AssignmentsService";

class Assignment extends React.Component {

  state = {
    assignment: {...this.props.assignment}
  }

  componentDidMount() {
    if (this.props.event) {
      this.setState({event: this.props.event});
    } else {
      eventsService.findEventById(this.props.assignment.eventId)
      .then((event) => this.setState({event: event}));
    }
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.assignment[attribute] = newContent;
    this.setState(newState);
  }

  componentDidUpdate(prevProps) {

  }

  updateResponseChoice(value) {
    let newState = Object.assign({}, this.state);
    if (value === "Unassigned") {
        newState.assignment.status = "Unassigned";
        newState.assignment.assigneeUserId = "";
        newState.assignment.assigneeFirstName = "";
        newState.assignment.assigneeLastName = "";
        newState.assignment.assigneeEmail = "";
        newState.assignment.dateOfResponse = "";
        newState.assignment.assigneeComments = "";
    }
    this.setState(newState);
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

  handleUpdateAssignment(e) {
    e.preventDefault();
    this.setState({isUpdating: true});
    if (this.props.updateAssignment) {
      this.props.updateAssignment(this.state.assignment.id,
          this.state.assignment);
      this.showUpdateSuccess();
      } else {
        assignmentsService.updateAssignment(this.state.assignment.id,
            this.state.assignment).then(response => this.showUpdateSuccess());
      }
    }

  render() {
    return (
            <>
              {this.state.event &&
              <div className="card mb-3">
                <h5 className="card-header">Event: {this.state.event.name} <Link to={`/events/${this.state.event.id}`}><i className="ml-2 fa fa-link"></i></Link></h5>
                <div className="card-body">
                  <div className="card-text">
                  {this.props.assignment.type || 'Task'}: {this.props.assignment.title}<br/>
                  {this.props.assignment.description}</div>
                </div>
                {!this.props.hideForm &&
                <form className="d-flex">
                  <div className=" col-auto pl-0 pr-0 input-group-addon bg-light assignment-checkbox-wrap border-right border-top">
                    <label className="special-checkbox pl-3 pr-3 pt-2 pb-2">
                      <input
                          onChange={(e) => this.updateResponseChoice(e.target.checked ? "Assigned" : "Unassigned")}
                          id={`assignmentCheckboxInput` + this.props.assignment.id}
                          type="checkbox"
                          checked={this.state.assignment.status === "Assigned" ? 1 : 0}
                          name="assignmentCheckbox"/>
                    </label>
                  </div>
                    <div className="col pl-0 pr-0 input-group border-top">
                      <input id={`assigneeCommentsInput` + this.props.assignment.id}
                             name="assigneeComments"
                             type="text"
                             className="form-control border-0"
                             placeholder="Comments for event organizer"
                             onChange={(e) => this.handleResponseChange('assigneeComments', e.target.value)}
                      />
                      <div className="input-group-addon border-left bg-light">
                        {!this.state.isUpdating && !this.state.showSuccess && <button type="submit" onClick={(e) => this.handleUpdateAssignment(e)} className="btn btn-primary special-border-radius">Save</button>}
                        {this.state.showSuccess && !this.state.isUpdating && <button type="submit" className="btn btn-success success-saved special-border-radius"> Updated!</button>}
                        {this.state.isUpdating && !this.state.showSuccess && <button type="submit" disabled className="btn btn-primary special-border-radius">Saving</button>}
                      </div>
                    </div>

                </form>
                }
              </div>
              }
            </>

    );
  }

}

export default Assignment;
