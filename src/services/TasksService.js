import {API_URL} from '../common/ApiConstants';

// CREATE
export const createTask = (eventId, task) =>
    fetch(`${API_URL}/api/events/${eventId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

// READ
export const findTaskById = (taskId) =>
    fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'GET',
    })
    .then( res => res.json());


// READ
export const findTaskByAssigneeUserId = (userId) =>
    fetch(`${API_URL}/api/users/${userId}/tasks`, {
      method: 'GET'
    }).then(response => response.json());


// READ
export const findAllTasksForEvent = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}/tasks`, {
      method: 'GET',
    })
    .then( res => res.json());

// UPDATE
export const updateTask = (taskId, task) =>
    fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())


// DELETE
export const deleteTask = (taskId) =>
    fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE'
    }).then(response => response.json());



export default {
  createTask,
  findTaskById,
  findTaskByAssigneeUserId,
  findAllTasksForEvent,
  deleteTask,
  updateTask
}
