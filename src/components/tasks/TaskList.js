import {Link} from "react-router-dom";
import React from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
import tasksService from "../../services/TasksService";
import tasksActions from "../../actions/TasksActions";
import {connect} from "react-redux";
import eventsService from "../../services/EventsService";
import TaskResponse from "./TaskResponse";

class TaskList extends React.Component {

  state = {
    showCreateTask: false
  }

  componentDidMount() {
    if (this.props.event && this.props.event.id) {
      this.props.findAllTasksForEvent(this.props.event.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.event && prevProps.event.id !== this.props.event.id) {
      this.props.findAllTasksForEvent(this.props.event.id);
    }
    if (prevProps.eventTasks && (this.props.eventTasks.length !== prevProps.eventTasks.length)) {
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

  render() {
    return (
        <>
          <h3>Tasks</h3>
          {this.props.tasks &&
          <div className="mt-3 mb-3">
            {this.props.tasks.map((task, index) => (
                <TaskResponse
                    key={index}
                    task={task}
                    isHost={this.props.event.hostId === this.props.user.profile.id}
                    event={this.props.event}
                    user={this.props.user}
                    updateTask={this.props.updateTask}
                    deleteTask={this.props.deleteTask}
                />
            ))}
          </div>}

          {!this.state.showCreateTask &&
          <button
              onClick={() => this.doShowCreateTask()}
              className="btn btn-outline-info">
            Add New Task
          </button>
          }
          {this.state.showCreateTask &&
          <CreateTask
              createTask={this.props.createTask}
              cancelCreateTask={() => this.stopShowCreateTask()}
              user={this.props.user}
              eventId={this.props.event.id}
              eventDate={this.props.event.date}
          /> }
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
