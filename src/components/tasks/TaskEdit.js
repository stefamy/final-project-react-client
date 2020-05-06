import React, {Component} from "react";
import {TASK_TYPES, TASK_STATUS} from "../../common/TasksConstants"

export default class TaskEdit extends Component {


  state = {
    task: { }
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        task: {...this.props.task}
      })
    } else {
      this.setState({
        task: {
          eventId: this.props.eventLogistics.id,
          eventDate: this.props.eventLogistics.date,
          status: TASK_STATUS.UNASSIGNED
        }
      });
    }
  }

  handleTaskInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.task[attribute] = newContent;
    this.setState(newState);
  }

  handleNewTaskType(e) {
    this.handleTaskInput('type', e.target.value);
  }

  submit(e) {
    e.preventDefault();
    this.props.submitHandler(this.props.submitId, this.state.task);
    this.props.toggleEditor();
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
        <div className="task-form p-md-4 p-3 bg-light rounded border">
          <div className="row align-items-between justify-content-between mb-2 pb-2">
            <div className="col-auto"><h5>{this.props.headerText}</h5></div>
            <div className="col-auto">
              <button onClick={this.props.toggleEditor} className="btn btn-sm border-pink bg-pink">Cancel</button>
            </div>
          </div>
          <form onSubmit={(e) => this.submit(e)}>
            <div className="form-group">
              <label htmlFor="taskNameInput">Title</label>
              <input
                  id="taskNameInput"
                  onChange={(e) => this.handleTaskInput('title', e.target.value)}
                  className="form-control"
                  defaultValue={this.state.task.title}
                  placeholder='Example: "Cold Appetizer Item"'
                  required/>
            </div>
            <div className="form-group">
              <label htmlFor="taskDescriptionInput">Description</label>
              <input
                  id="taskDescriptionInput"
                  onChange={(e) => this.handleTaskInput('description', e.target.value)}
                  className='form-control'
                  defaultValue={this.state.task.description}
                  placeholder='Example: "Something easy to eat standing up, preferably!"'
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskTypeInput">Type Of Task</label>
              <select id="taskTypeInput" defaultValue={this.state.task.type || ""} className="form-control" value={this.state.value} onChange={this.handleNewTaskType.bind(this)}>
                <option value="" disabled>Type of Task</option>
                <option value={TASK_TYPES.PREP}>Event Prep</option>
                <option value={TASK_TYPES.FOOD}>Food, Drink or Supplies</option>
                <option value={TASK_TYPES.SETUP}>Set up (Day of)</option>
                <option value={TASK_TYPES.CLEANUP}>Clean up (Day of)</option>
                <option value={TASK_TYPES.OTHER}>Other</option>
              </select>
            </div>
            {this.state.task.type === TASK_TYPES.PREP && <>
              <div className="form-input">
                <label htmlFor="taskDateInput">Date Needed By</label>
                <input
                    id="taskDateInput"
                    type="date"
                    min="2020-01-01"
                    defaultValue={this.state.task.dueDate}
                    onChange={(e) => this.handleTaskInput('dueDate', e.target.value)}
                    className="form-control"
                />
              </div>
            </>}

            <div className="form-group mt-3 mb-0">
              {!this.state.isSaving && !this.state.showSuccess && <button type="submit" className="btn btn-info">Save Task</button> }
              {this.state.isSaving && !this.state.showSuccess && <button type="submit" disabled className="btn btn-info">Save Task</button> }
              {this.state.showSuccess && <span className="text-success success-saved">Saved!</span> }
            </div>
          </form>
        </div>
    );
  }
}

