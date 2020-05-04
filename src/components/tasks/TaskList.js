import React from "react";
import TaskEdit from "./TaskEdit";
import tasksService from "../../services/TasksService";
import tasksActions from "../../actions/TasksActions";
import {connect} from "react-redux";
import Task from "./Task";
import {TASK_TYPES, TASK_STATUS} from "../../common/TasksConstants"

function searchingFor(term) {
  return function (x) {
    return x.title.toLowerCase().includes(term.toLowerCase()) ||
        (x.description && x.description.toLowerCase().includes(term.toLowerCase())) ||!term;
  }
}

function filterOn(filterTerm) {
  return function (x) {
    return x.status.toUpperCase() === filterTerm || !filterTerm;
  }
}

class TaskList extends React.Component {

  state = {
    showCreateTask: false,
    term: '',
    filterTerm: ''
  }

  componentDidMount() {
    if (this.props.event && this.props.event.id) {
      this.props.findAllTasksForEvent(this.props.event.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevProps.event && prevProps.event.id !== this.props.event.id) || (prevProps.tasks && prevProps.tasks.length !== this.props.tasks.length)) {
      this.props.findAllTasksForEvent(this.props.event.id);
    }

    if (prevProps.eventTasks && (this.props.eventTasks.length
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
          {this.props.tasks && <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Task Assignments</h3>
              <form className="form-inline">
                <input className="ml-2 form-control" placeholder="Search..." type="text" onChange={(e) => this.searchHandler(e)} value={term}/>
                <select defaultValue="" className="ml-2 form-control"
                          id="filterSelect"
                          onChange={this.filterHandler.bind(this)}>
                    <option value="" disabled>Display only</option>
                  <option value="">All</option>
                  <option value={TASK_STATUS.ASSIGNED}>{TASK_STATUS.ASSIGNED}</option>
                    <option value={TASK_STATUS.UNASSIGNED}>{TASK_STATUS.UNASSIGNED}</option>
                  </select>
              </form>
            </div>


            <div className="task-list-body list-group mb-4">
            <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Event Preparation (Before event)</div>
              {this.props.tasks.filter(task => task.type === TASK_TYPES.PREP).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isHost={this.props.event.hostId === this.props.user.profile.id}
                      event={this.props.event}
                      user={this.props.user}
                      refresh={() => this.refresh()}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Food, Drink, and Supplies</div>
              {this.props.tasks.filter(task => task.type === TASK_TYPES.FOOD).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isHost={this.props.event.hostId === this.props.user.profile.id}
                      event={this.props.event}
                      user={this.props.user}
                      refresh={() => this.refresh()}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Event Set-up</div>
              {this.props.tasks.filter(
                task => task.type === TASK_TYPES.SETUP).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isHost={this.props.event.hostId === this.props.user.profile.id}
                      event={this.props.event}
                      user={this.props.user}
                      refresh={() => this.refresh()}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Event Clean-up</div>
              {this.props.tasks.filter(
                task => task.type === TASK_TYPES.CLEANUP).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isHost={this.props.event.hostId === this.props.user.profile.id}
                      event={this.props.event}
                      user={this.props.user}
                      refresh={() => this.refresh()}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

            <div className="task-list-body list-group mb-4">
              <div className="task-list-header pl-3 pr-3 pt-2 pb-2 bg-light  list-group-item">Other / Uncategorized</div>
              {this.props.tasks.filter(
                  task => task.type === TASK_TYPES.OTHER).filter(searchingFor(term)).filter(filterOn(filterTerm)).map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      isHost={this.props.event.hostId === this.props.user.profile.id}
                      event={this.props.event}
                      user={this.props.user}
                      refresh={() => this.refresh()}
                      updateTask={this.props.updateTask}
                      deleteTask={this.props.deleteTask}
                  />
              ))}
            </div>

          </>}

          {!this.state.showCreateTask &&
          <button
              onClick={() => this.doShowCreateTask()}
              className="btn btn-outline-info">
            Add New Task
          </button>
          }
          {this.state.showCreateTask &&
          <TaskEdit
              event={this.props.event}
              headerText="Create New Task"
              toggleEditor={() => this.stopShowCreateTask()}
              submitId={this.props.event.id}
              submitHandler={this.props.createTask}
          />}
        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    tasks: state.tasks.tasks,
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findAllTasksForEvent: (eventId) => {
      tasksService.findAllTasksForEvent(eventId).then(tasks => {
        dispatch(tasksActions.findAllTasksForEvent(tasks));
      });
    },
    createTask: (eventId, task) => {
      tasksService.createTask(eventId, task).then(task => {
        dispatch(tasksActions.createTask(task));
      });
    },
    updateTask: (taskId, task) => {
      tasksService.updateTask(taskId, task).then(response => {
        dispatch(tasksActions.updateTaskForEvent(task));
      });
    },
    deleteTask: (taskId) => {
      tasksService.deleteTask(taskId).then(response => {
        dispatch(tasksActions.deleteTaskForEvent(taskId));
      });
    }
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(TaskList);
