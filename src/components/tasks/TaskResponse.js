import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPaper, faLink, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import {TASK_TYPES} from "../../common/TasksConstants"
import ModalConfirm from "../structural/ModalConfirm"
import TaskEditor from "./TaskEditor"
import TaskResponseEditor from "./TaskResponseEditor"

class TaskResponse extends React.Component {

  state = {
    isEditingTask: false,
    isEditingResponse: false
  }

  toggleSignUpForTask(e) {
    e.preventDefault();
    const newStatus = this.props.task.status === "Assigned" ? "Unassigned" : "Assigned";
    this.updateSignupStatus(newStatus);
    if (newStatus === "Assigned") {
      this.setState({isEditingResponse: true})
    }
  }

  updateSignupStatus(newStatus) {
    let updatedTask = {...this.props.task};
    if (newStatus === "Assigned") {
      updatedTask.status = "Assigned";
      updatedTask.assigneeUserId = this.props.user.id;
      updatedTask.assigneeFirstName = this.props.user.profile.firstName;
      updatedTask.assigneeLastName = this.props.user.profile.lastName;
      updatedTask.assigneeEmail = this.props.user.profile.email;
      updatedTask.dateOfResponse = new Date();
      updatedTask.assigneeComments = "";
    } else {
      updatedTask.status = "Unassigned";
      updatedTask.assigneeUserId = "";
      updatedTask.assigneeFirstName = "";
      updatedTask.assigneeLastName = "";
      updatedTask.assigneeEmail = "";
      updatedTask.dateOfResponse = "";
      updatedTask.assigneeComments = "";
      updatedTask.glutenFree = 0;
      updatedTask.vegan = 0;
      updatedTask.vegetarian = 0;
      updatedTask.nutFree = 0;
      updatedTask.otherDietaryNotes = "";
      updatedTask.recipeLink = "";
    }
    this.props.updateTask(updatedTask.id, updatedTask);
  }

  toggleState(property) {
    this.setState({
      [property]: !this.state[property]
    })
  }

  confirmDeleteEvent(e) {
    e.preventDefault();
    if (this.props.task.status === 'Assigned') {
      this.setState({showConfirm: true});
    } else {
      this.props.deleteTask(this.props.task.id);
    }
  }

  stopShowConfirm() {
    this.setState({showConfirm: false});
  }

  render() {
    const task = this.props.task;
    const user = this.props.user;

    return (
        <div className='task list-group-item'>
          <div className="task-body pt-2 pb-2">
            <div className="d-flex">
              <div className="col pl-0 pr-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-1">{task.title}</h5>
                    <div>
                      <span className="btn badge border border-yellow bg-yellow ml-1" onClick={() => this.toggleState('isEditingTask')}><FontAwesomeIcon icon={faPencilAlt}/> Edit</span>
                      <span className="btn badge border border-pink bg-pink ml-1" onClick={(e) => this.confirmDeleteEvent(e)}><FontAwesomeIcon icon={faTimes}/> Delete</span>
                    </div>
                  </div>
                  <div>{task.description}</div>
                    {task.type === TASK_TYPES.FOOD && <>
                    <div className="d-flex align-items-center mt-2">
                      {task.dishCat && <span className="badge bg-blue mr-1">{task.dishCat}</span> }
                      {task.vegan === 1 && <span className="badge badge-light mr-1">Vegan</span> }
                      {task.vegetarian === 1 && <span className="badge badge-light mr-1">Vegetarian</span> }
                      {task.glutenFree === 1 && <span className="badge badge-light mr-1">Gluten Free</span> }
                      {task.nutFree === 1 && <span className="badge badge-light mr-1">Nut Free</span> }
                      {task.type === 'Food/Drink' && task.recipeLink && <small className="ml-2"><a href={`${task.recipeLink}`} className="text-info">Recipe <FontAwesomeIcon icon={faLink} /></a></small>}
                      </div>
                      {task.otherDietaryNotes && <small className="mt-1 pl-1">Dietary Notes: {task.otherDietaryNotes}</small> }

                    </>}
              </div>
              </div>
            </div>

          <div className="d-flex align-items-center justify-content-between col-auto pl-0 pr-0 task-edit-wrap border-top mt-2 pt-2">

            {/* If assigned to user */}
            {(task.status === "Assigned" && task.assigneeUserId === user.id) && <>
              <span><span className="badge badge-pill border border-purple bg-purple mr-1">{task.status} to you</span>
              {task.assigneeComments && task.assigneeComments.length > 0 && <small className="text-muted"> Comment: {task.assigneeComments}</small>}</span>
              <div>
                <span className={`btn btn-sm small ` +  (this.state.isEditingResponse ? "text-yellow" : "")} onClick={() => this.toggleState('isEditingResponse')}>
                  <FontAwesomeIcon icon={faPencilAlt} className="text-yellow"/> Edit response
                </span>
                <span className="btn btn-sm small" onClick={(e) => this.toggleSignUpForTask(e)}>
                  <FontAwesomeIcon icon={faTimes} className="text-pink"/>  Cancel sign-up
                </span>
              </div>
            </>}

            {/* If unassigned */}
            {task.status === "Unassigned" && <>
              <span className="badge badge-pill bg-yellow border border-yellow">{task.status}</span>
              <button className="btn btn-sm small" onClick={(e) => this.toggleSignUpForTask(e)}>
                <FontAwesomeIcon icon={faHandPaper} className="text-blue"/> Sign-up for this task
              </button>
            </>}


            {/* If assigned to other user */}
            {task.status === "Assigned" && task.assigneeUserId !== user.id  && <div>
              <small className="small text-muted">Assigned to: {task.assigneeFirstName} {task.assigneeLastName && task.assigneeLastName[0] + '.'}
                {task.assigneeComments && task.assigneeComments.length > 0 && <> | Comment: {task.assigneeComments}</>}</small>
            </div>}

          </div>

          {this.state.isEditingTask && <div className="mt-2 mb-2">
           <TaskEditor
               headerText="Edit Task"
               task={task}
               toggleEditor={() => this.toggleState('isEditingTask')}
               submitId={task.id}
               submitHandler={this.props.updateTask} />
          </div>
          }

          {this.state.isEditingResponse && <div className="mt-2 mb-2">
            <TaskResponseEditor
                headerText="Edit Task Sign-Up Details"
                task={task}
                toggleEditor={() => this.toggleState('isEditingResponse')}
                submitId={task.id}
                submitHandler={this.props.updateTask}
                user={this.props.user}
            />
          </div>
          }
          <ModalConfirm
              show={this.state.showConfirm}
              headerText="Delete this task?"
              bodyText="Are you sure you want to delete this assigned task and all of its data? This action cannot be undone."
              yesText="Delete Event"
              noText="Cancel"
              yesBtnClass="btn btn-danger"
              noBtnClass="btn btn-secondary"
              handleClose={() => this.stopShowConfirm()}
              yesFunction={() => this.props.deleteTask(task.id)}
          />
        </div>
    );
  }

}

export default TaskResponse;
