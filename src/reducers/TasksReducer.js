import {
  CREATE_TASK,
  FIND_ALL_TASKS,
  FIND_ALL_TASKS_FOR_EVENT,
  UPDATE_TASK,
  UPDATE_TASK_FOR_EVENT,
  DELETE_TASK_FOR_EVENT
} from "../common/TasksConstants";
import _ from 'lodash';

const initialState = {
  tasks: []
}

const tasksReducer = (state = initialState, action) => {
  let tasks;
  switch (action.type) {

    case CREATE_TASK:
      tasks = [...state.tasks];
      tasks.push(action.task);

      return {
        tasks: tasks
      }

    case FIND_ALL_TASKS:
      tasks = _.sortBy(action.tasks, 'type')
      return {
        tasks: tasks
      }

    case FIND_ALL_TASKS_FOR_EVENT:
      tasks = _.sortBy(action.tasks, 'type')
      return {
        tasks: tasks
      }

    case UPDATE_TASK:
      tasks = [...state.tasks];
      const indexToUpdate = _.findIndex(tasks, {id: action.task.id});
      tasks.splice(indexToUpdate, 1, action.task);

      return {
        tasks: _.cloneDeep(tasks)
      }

    case UPDATE_TASK_FOR_EVENT:
      tasks = [...state.tasks];
      const indexInEventList = _.findIndex(tasks, {id: action.task.id});
      tasks.splice(indexInEventList, 1, action.task);

      return {
        tasks: _.cloneDeep(tasks)
      }

    case DELETE_TASK_FOR_EVENT:
      tasks = [...state.tasks];
      _.remove(tasks, {id: action.taskId})

      return {
        tasks: tasks
      }

    default:
      return state
  }
}

export default tasksReducer;


