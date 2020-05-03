import React, { Component } from "react";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import {connect} from "react-redux";
import tasksService from "../../services/TasksService";
import tasksActions from "../../actions/TasksActions";
import TaskPreview from "./TaskPreview";

class UserTaskList extends Component {

  state = {}

  componentDidMount() {
    if (this.props.viewingProfile && this.props.userId) {
        this.props.findTaskByAssigneeUserId(this.props.userId);
    }
    else if (this.props.user.id) {
      this.props.findTaskByAssigneeUserId(this.props.user.id);
    } else {
      this.setState({guestUser: true})
    }

  }

  componentDidUpdate(prevProps) {
    if (this.props.findByUser && (prevProps.user !== this.props.user)) {
      this.props.findTaskByAssigneeUserId(this.props.user.id);
      this.setState({guestUser: false})
    }

  }

  render() {
    return (
        <>
          {!this.props.hideForm  && <h2 className="pb-2">Your Tasks</h2> }
            {!this.state.guestUser && this.props.tasks &&
              <div>
                {this.props.tasks.map((task, index) => (
                    <TaskPreview
                        key={index}
                        task={task}
                        // history={this.props.history}
                        // userId={this.props.userId}
                        // event={this.props.event}
                        // hideForm={this.props.hideForm}
                        // updateTask={this.props.updateTask}
                    />
                ))}
              </div>
              }
              {this.state.guestUser &&
              <div className="bg-white p-3 border">
                <h2 className="pb-2">Your Tasks</h2>
                Please log in to view your tasks.
              </div>
              }
              {(!this.props.tasks || !this.props.tasks.length) &&
              <div className="bg-white p-3 border">
                No tasks found.<br/>
              </div>
              }
            </>
    );
  }
}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    tasks: state.tasks.tasks
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    updateTask: (taskId, task) => {
      tasksService.updateTask(taskId, task).then(task => {
        dispatch(tasksActions.updateTask(task));
      });
    },
    findTaskByAssigneeUserId: userId => {
      tasksService.findTaskByAssigneeUserId(userId).then(tasks => {
        dispatch(tasksActions.findAllTasks(tasks));
      });
    }
  };
};


  export default connect(
      stateToPropertyMapper,
      dispatchToPropertyMapper
  )(UserTaskList);
