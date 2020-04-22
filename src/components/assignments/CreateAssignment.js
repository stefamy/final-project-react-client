import React, {Component} from "react";


export default class CreateAssignment extends Component {


  state = {
    newAssignment: {
      eventId: this.props.eventId,
      status: "Unassigned"
    }
  }

  handleNewAssignmentInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newAssignment[attribute] = newContent;
    this.setState(newState);
  }

  handleNewTaskType(e) {
    this.handleNewAssignmentInput('type', e.target.value);
  }

  handleNewDishCategory(e) {
    this.handleNewAssignmentInput('dishCat', e.target.value);
  }

  handleCreateAssignment(e) {
      e.preventDefault();
      this.props.createAssignment(this.state.newAssignment.eventId, this.state.newAssignment);
  }

  showSaveSuccess() {
    this.setState({
      isSaving: false,
      showSuccess: true
    });
    return setTimeout(() => {
      this.setState({showSuccess: false})
    }, 1000);
  }


  render() {
    return (
        <div className="new-assignment-form mt-5 mb-5">
          <h3>Create New Assignment</h3>
          <form onSubmit={(e) => this.handleCreateAssignment(e)}>
              <div className="form-group">
                <label htmlFor="taskNameInput">Assignment Name</label>
                <input
                    id="taskNameInput"
                    onChange={(e) => this.handleNewAssignmentInput('title', e.target.value)}
                    className={`form-control`}
                    placeholder='Example: "Cold Appetizer Item"'
                    required/>
              </div>
            <div className="form-group">
              <label htmlFor="taskDescriptionInput">Description</label>
                <input
                    id="taskDescriptionInput"
                    onChange={(e) => this.handleNewAssignmentInput('description', e.target.value)}
                    className='form-control'
                    placeholder='Example: "Something easy to eat standing up, preferably!"'
                    />
            </div>
            <div className="form-group">
              <label htmlFor="taskTypeInput">Type Of Assignment</label>
                <select id="taskTypeInput" defaultValue="" className="form-control" value={this.state.value} onChange={this.handleNewTaskType.bind(this)}>
                  <option value="" disabled>Type of Assignment</option>
                  <option value="Food/Drink">Food/Drink</option>
                  <option value="Event Prep">Event Prep</option>
                  <option value="Set up (Day of)">Set up (Day of)</option>
                  <option value="Clean up (Day of)">Clean up (Day of)</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            {this.state.newAssignment.type === "Event Prep" && <>
            <div className="form-input">
              <label htmlFor="assignmentDateInput">Date Needed By</label>
              <input
                  id="assignmentDateInput"
                  type="date"
                  min="2020-01-01"
                  max="2040-01-01"
                  onChange={(e) => this.handleNewAssignmentInput('dueDate', e.target.value)}
                  className="form-control"
                  />
              </div>
            </>}

            <div className="form-group mt-3">
              {!this.state.isSaving && <button type="submit" className="btn btn-info">Add Assignment</button> }
              {this.state.showSuccess && <span className="text-success success-saved"> Updated!</span> }
              {this.state.isSaving && <button type="submit" disabled className="btn btn-info">Update Response</button> }
            </div>
          </form>
        </div>
    );
  }
}

