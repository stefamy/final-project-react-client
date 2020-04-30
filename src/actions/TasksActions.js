import {
  CREATE_TASK,
  FIND_ALL_TASKS,
  FIND_ALL_TASKS_FOR_EVENT,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TASK_FOR_EVENT, DELETE_TASK_FOR_EVENT
} from "../common/TasksConstants";


// CREATE
export const createTask = (task) => ({
  type: CREATE_TASK,
  task: task
})

// READ
export const findAllTasks = (tasks) => ({
  type: FIND_ALL_TASKS,
  tasks: tasks
})


// READ
export const findAllTasksForEvent = (tasks) => ({
  type: FIND_ALL_TASKS_FOR_EVENT,
  tasks: tasks
})

// READ
export const updateTask = (task) => ({
  type: UPDATE_TASK,
  task: task
})


// READ
export const updateTaskForEvent = (task) => ({
  type: UPDATE_TASK_FOR_EVENT,
  task: task
})



// READ
export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId: taskId
})


// READ
export const deleteTaskForEvent = (taskId) => ({
  type: DELETE_TASK_FOR_EVENT,
  taskId: taskId
})



export default {
  createTask,
  findAllTasks,
  findAllTasksForEvent,
  updateTask,
  updateTaskForEvent,
  deleteTask,
  deleteTaskForEvent
}
