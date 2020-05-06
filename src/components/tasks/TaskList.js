import React from "react";
import TaskEdit from "./TaskEdit";
import tasksService from "../../services/TasksService";
import tasksActions from "../../actions/TasksActions";
import {connect} from "react-redux";
import Task from "./Task";
import {TASK_TYPES, TASK_STATUS} from "../../common/TasksConstants"
import eventActions from "../../actions/EventActions";

function searchingFor(term) {
  return function (x) {
    return x.title.toLowerCase().includes(term.toLowerCase()) ||
        (x.description && x.description.toLowerCase().includes(term.toLowerCase())) ||!term;
  }
}

function filterOn(filterTerm) {
  return function (x) {
    return x.status.toLowerCase() === filterTerm.toLowerCase() || !filterTerm;
  }
}

class TaskList extends React.Component {

  state = {
    showCreateTask: false,
    term: '',
    filterTerm: ''
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if ((prevProps.event && prevProps.event.eventId !== this.props.eventId) || (prevProps.eventTasks && prevProps.eventTasks.length !== this.props.event.taskList.length)) {
    //   this.props.findAllTasksForEvent(this.props.event.id);
    // }

    if (prevProps.eventTasks && (this.props.event.taskList.length
        !== prevProps.eventTasks.length)) {
      this.stopShowCreateTask();
    }
  }


  doShowCreateTask() {
    this.setState({
      showCreateTask: true
    });
  }

  stopShowCreateTask() {
    this.setState({
      showCreateTask: false
    });
  }

  searchHandler(event) {
    this.setState({term: event.target.value})
  }

  filterHandler(event) {
    event.preventDefault();
    this.setState({filterTerm: event.target.value})
  }

  render() {
    const {term, filterTerm} = this.state;

    return (
        <>
          {this.props.event.taskList && <>
            <div className="row justify-content-between align-items-center mb-3">
              <h3 className="col-12 col-md-6 mb-2 mb-lg-0">Task Assignments</h3>
              <form className="col-12 col-md-6 form-inline justify-content-lg-end">
                <input className="form-control mb-md-1 mb-2" placeholder="Search..." type="text" onChange={(e) => this.searchHandler(e)} value={term}/>
                <select defaultValue="" className="form-control mb-md-1 ml-md-2"
                          id="filterSelect"
                          onChange={this.filterHandler.bind(this)}>
                    <option value="" disabled>Display only</option>
                  <option value="">All</option>
                    <option value={TASK_STATUS.ASSIGNED}>{TASK_STATUS.ASSIGNED}</option>
                    <option value={TASK_STATUS.UNASSIGNED}>{TASK_STATUS.UNASSIGNED}</option>
                  </select>
              </form>
            </div>


            <div className="task-list-body list-group mb-2 mb-lg-4">
            <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Event Preparation (Before event)</div>
              {this.props.event.taskList.filter(task => task.type === TASK_TYPES.PREP).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isEventHost={this.props.event.logistics.hostId === this.props.userId}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-2 mb-lg-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Food, Drink, and Supplies</div>
              {this.props.event.taskList.filter(task => task.type === TASK_TYPES.FOOD).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isEventHost={this.props.event.logistics.hostId === this.props.userId}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-2 mb-lg-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Event Set-up</div>
              {this.props.event.taskList.filter(
                task => task.type === TASK_TYPES.SETUP).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isEventHost={this.props.event.logistics.hostId === this.props.userId}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-2 mb-lg-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Event Clean-up</div>
              {this.props.event.taskList.filter(
                task => task.type === TASK_TYPES.CLEANUP).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isEventHost={this.props.event.logistics.hostId === this.props.userId}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-2 mb-lg-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Other / Uncategorized</div>
              {this.props.event.taskList.filter(
                  task => task.type === TASK_TYPES.OTHER).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isEventHost={this.props.event.logistics.hostId === this.props.userId}
                      userId={this.props.userId}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

          </>}

          {!this.state.showCreateTask && (this.props.event.logistics.hostId === this.props.userId) &&
          <button
              onClick={() => this.doShowCreateTask()}
              className="btn btn-outline-info">
            Add New Task
          </button>
          }
          {this.state.showCreateTask &&
          <TaskEdit
              eventLogistics={this.props.event.logistics}
              headerText="Create New Task"
              toggleEditor={() => this.stopShowCreateTask()}
              submitId={this.props.eventId}
              submitHandler={this.props.createTask}
          />}
        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    userId: state.user.userId,
    tasks: state.user.tasks,
    event: {
      eventId: state.event.eventId,
      logistics: state.event.logistics,
      taskList: state.event.taskList,
    },
  }
};

const dispatchToPropertyMapper = dispatch => {
  return {
    createTask: (eventId, task) => {
      tasksService.createTask(eventId, task).then(newTask => {
        dispatch(eventActions.createEventTask(newTask));
      });
    },
    updateTask: (taskId, task) => {
      tasksService.updateTask(taskId, task).then(response => {
        dispatch(eventActions.updateEventTask(task));
      });
    },
    deleteTask: (taskId) => {
      tasksService.deleteTask(taskId).then(response => {
        dispatch(eventActions.deleteEventTask(taskId));
      });
    }
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(TaskList);
