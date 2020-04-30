import React, {Component} from "react";


export default class CreateTask extends Component {


  state = {
    newTask: {
      eventId: this.props.eventId,
      status: "Unassigned"
    }
  }

  handleNewTaskInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newTask[attribute] = newContent;
    this.setState(newState);
  }

  handleNewTaskType(e) {
    this.handleNewTaskInput('type', e.target.value);
  }

  handleCreateTask(e) {
      e.preventDefault();
      this.props.createTask(this.state.newTask.eventId, this.state.newTask);
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
        <div className="new-task-form p-4 bg-light rounded border">
          <div className="row align-items-between justify-content-between mb-2 pb-2">
            <div className="col-auto">
              <h5>Create New Task</h5>
            </div>
            <div className="col-auto">
              <button
                  onClick={this.props.cancelCreateTask}
                  className="btn btn-sm btn-danger">
                Cancel
              </button>
            </div>
          </div>
          <form onSubmit={(e) => this.handleCreateTask(e)}>
              <div className="form-group">
                <label htmlFor="taskNameInput">Title</label>
                <input
                    id="taskNameInput"
                    onChange={(e) => this.handleNewTaskInput('title', e.target.value)}
                    className={`form-control`}
                    placeholder='Example: "Cold Appetizer Item"'
                    required/>
              </div>
            <div className="form-group">
              <label htmlFor="taskDescriptionInput">Description</label>
                <input
                    id="taskDescriptionInput"
                    onChange={(e) => this.handleNewTaskInput('description', e.target.value)}
                    className='form-control'
                    placeholder='Example: "Something easy to eat standing up, preferably!"'
                    />
            </div>
            <div className="form-group">
              <label htmlFor="taskTypeInput">Type Of Task</label>
                <select id="taskTypeInput" defaultValue="" className="form-control" value={this.state.value} onChange={this.handleNewTaskType.bind(this)}>
                  <option value="" disabled>Type of Task</option>
                  <option value="Food/Drink">Food/Drink</option>
                  <option value="Event Prep">Event Prep</option>
                  <option value="Set up (Day of)">Set up (Day of)</option>
                  <option value="Clean up (Day of)">Clean up (Day of)</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            {this.state.newTask.type === "Event Prep" && <>
            <div className="form-input">
              <label htmlFor="taskDateInput">Date Needed By</label>
              <input
                  id="taskDateInput"
                  type="date"
                  min="2020-01-01"
                  max="2040-01-01"
                  onChange={(e) => this.handleNewTaskInput('dueDate', e.target.value)}
                  className="form-control"
                  />
              </div>
            </>}

            <div className="form-group mt-3 mb-0">
              {!this.state.isSaving && <button type="submit" className="btn btn-info">Add Task</button> }
              {this.state.showSuccess && <span className="text-success success-saved"> Updated!</span> }
              {this.state.isSaving && <button type="submit" disabled className="btn btn-info">Update Response</button> }
            </div>
          </form>
        </div>
    );
  }
}

