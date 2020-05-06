import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPaper, faLink, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import {TASK_TYPES, TASK_STATUS} from "../../common/TasksConstants"
import ModalConfirm from "../structural/ModalConfirm"
import {assignResponses, clearResponses} from "./helpers"
import TaskEdit from "./TaskEdit"
import TaskEditResponse from "./TaskEditResponse"
import tasksService from "../../services/TasksService";
import eventActions from "../../actions/EventActions";
import {connect} from "react-redux";

class Task extends React.Component {

  state = {
    isEditingTask: false,
    isEditingResponse: false
  }

  toggleSignUpForTask(e) {
    e.preventDefault();
    const newStatus = this.props.task.status === TASK_STATUS.ASSIGNED ? TASK_STATUS.UNASSIGNED : TASK_STATUS.ASSIGNED;
    this.updateSignupStatus(newStatus);
  }

  updateSignupStatus(newStatus) {
    let updatedTask = {...this.props.task};
    if (newStatus === TASK_STATUS.ASSIGNED) {
      updatedTask = assignResponses(updatedTask, this.props.profile);
    } else {
      updatedTask = clearResponses(updatedTask);
    }
    this.props.updateTask(updatedTask.id, updatedTask);
  }

  toggleState(property) {
    this.setState({
      [property]: !this.state[property]
    })
  }

  confirmDeleteTask(e) {
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
    const userId = this.props.userId;

    return (
        <div className='task list-group-item'>
          <div className="task-body pt-2 pb-2">
                  <div className="row justify-content-between">
                    <div className={`mb-1` +  (this.props.isEventHost ? " col-10" : " col-12")}>
                      <h5>{task.title}</h5>
                      {task.description}
                    </div>
                    {this.props.isEventHost &&  <div className="col-2 pl-0 text-right">
                      <span className={`btn ml-1` + (this.state.isEditingTask ? " border border-warning" : "")} onClick={() => this.toggleState('isEditingTask')}><FontAwesomeIcon icon={faPencilAlt} className="text-warning"/></span>
                      <span className="btn ml-1" onClick={(e) => this.confirmDeleteTask(e)}><FontAwesomeIcon icon={faTimes} className="text-danger"/></span>
                    </div> }
                  </div>
                    {task.type === TASK_TYPES.FOOD && <>
                    <div className="d-flex flex-wrap align-items-center mt-2">
                      {task.dishCat && <span className="badge bg-blue m-1">{task.dishCat}</span> }
                      {task.vegan === 1 && <span className="badge badge-light m-1">Vegan</span> }
                      {task.vegetarian === 1 && <span className="badge badge-light m-1">Vegetarian</span> }
                      {task.glutenFree === 1 && <span className="badge badge-light m-1">Gluten Free</span> }
                      {task.nutFree === 1 && <span className="badge badge-light m-1">Nut Free</span> }
                      {task.type === TASK_TYPES.FOOD && task.recipeLink && <small className="m-1"><a href={`${task.recipeLink}`} className="text-info">Recipe <FontAwesomeIcon icon={faLink} /></a></small>}
                      </div>
                      {task.otherDietaryNotes && <small className="mt-1 pl-1">Dietary Notes: {task.otherDietaryNotes}</small> }
                    </>}
            </div>

          <div className="task-edit-wrap row align-items-center justify-content-between border-top mt-2">

            {/* If assigned to user */}
            {(task.status === TASK_STATUS.ASSIGNED && task.assigneeUserId === userId) && <>
              <div className="col-12 col-md pt-2">
                <span className="badge badge-pill border border-purple bg-purple mr-1">{task.status} to you</span>
                {task.assigneeComments && task.assigneeComments.length > 0 && <small className="text-muted"> Comment: {task.assigneeComments}</small>}
              </div>
              <div className="col-auto pt-2">
                <span className={`btn btn-sm small ` +  (this.state.isEditingResponse ? " border border-warning" : "")} onClick={() => this.toggleState('isEditingResponse')}>
                  <FontAwesomeIcon icon={faPencilAlt} className="text-warning"/> Edit response
                </span>
                <span className="btn btn-sm small ml-2" onClick={(e) => this.toggleSignUpForTask(e)}>
                  <FontAwesomeIcon icon={faTimes} className="text-danger"/>  Cancel sign-up
                </span>
              </div>
            </>}

            {/* If unassigned */}
            {task.status === TASK_STATUS.UNASSIGNED && <>
              <div className="col-12 col-md pt-2">
                <span className="badge badge-pill bg-yellow border border-yellow">{task.status}</span>
              </div>
              <div className="col-12 col-md-auto pt-2">
                <button className="btn btn-sm small p-0" onClick={(e) => this.toggleSignUpForTask(e)}>
                <FontAwesomeIcon icon={faHandPaper} className="text-blue"/> Sign-up for this task
              </button>
              </div>
            </>}


            {/* If assigned to other user */}
            {task.status === TASK_STATUS.ASSIGNED && task.assigneeUserId !== userId  &&  <div className="col-12 col-md pt-2">
              <small className="small text-muted">Assigned to: {task.assigneeFirstName} {task.assigneeLastName && task.assigneeLastName[0] + '.'}
                {task.assigneeComments && task.assigneeComments.length > 0 && <> | Comment: {task.assigneeComments}</>}</small>
            </div>}

          </div>

          {this.state.isEditingTask && <div className="mt-2 mb-2">
           <TaskEdit
               headerText="Edit Task"
               task={task}
               toggleEditor={() => this.toggleState('isEditingTask')}
               submitId={task.id}
               submitHandler={this.props.updateTask} />
          </div>
          }

          {this.state.isEditingResponse && <div className="mt-2 mb-2">
            <TaskEditResponse
                headerText="Edit Sign-Up Details"
                task={task}
                toggleEditor={() => this.toggleState('isEditingResponse')}
                submitId={task.id}
                submitHandler={this.props.updateTask}
            />
          </div>
          }
          <ModalConfirm
              show={this.state.showConfirm}
              headerText="Delete this task?"
              bodyText="Are you sure you want to delete this assigned task and all of its data? This action cannot be undone."
              yesText="Delete Task"
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

const stateToPropertyMapper = state => {
  return {
    userId: state.user.userId,
    profile: state.user.profile
  }
};


export default connect(
    stateToPropertyMapper
)(Task);
