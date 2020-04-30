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
  tasks: [],
  eventTasks: []
}

const tasksReducer = (state = initialState, action) => {
  let tasks, eventTasks;
  switch (action.type) {

    case CREATE_TASK:
      eventTasks = [...state.eventTasks];
      eventTasks.push(action.task);

      return {
        eventTasks: eventTasks
      }

    case FIND_ALL_TASKS:
      tasks = _.sortBy(action.tasks, 'type')
      return {
        tasks: tasks
      }

    case FIND_ALL_TASKS_FOR_EVENT:
      eventTasks = _.sortBy(action.tasks, 'type')
      return {
        eventTasks: eventTasks
      }

    case UPDATE_TASK:
      tasks = [...state.tasks];
      const indexToUpdate = _.findIndex(tasks, {id: action.task.id});
      tasks.splice(indexToUpdate, 1, action.task);

      return {
        tasks: _.cloneDeep(tasks)
      }

    case UPDATE_TASK_FOR_EVENT:
      eventTasks = [...state.eventTasks];
      const indexInEventList = _.findIndex(eventTasks, {id: action.task.id});
      eventTasks.splice(indexInEventList, 1, action.task);

      return {
        eventTasks: _.cloneDeep(eventTasks)
      }

    case DELETE_TASK_FOR_EVENT:
      eventTasks = [...state.eventTasks];
      _.remove(eventTasks, {id: action.taskId})

      return {
        eventTasks: eventTasks
      }

    default:
      return state
  }
}

export default tasksReducer;


