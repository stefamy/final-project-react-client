// import {API_URL} from '../common/constants';

// CREATE
export const createAssignment = (eventId, assignment) =>
    fetch(`http://localhost:8080/api/events/${eventId}/assignments`, {
      method: 'POST',
      body: JSON.stringify(assignment),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

// READ
export const findAssignmentById = (assignmentId) =>
    fetch(`http://localhost:8080/api/assignments/${assignmentId}`, {
      method: 'GET',
    })
    .then( res => res.json());


// READ
export const findAssignmentByAssigneeUserId = (userId) =>
    fetch(`http://localhost:8080/api/user/${userId}/assignments`, {
      method: 'GET'
    }).then(response => response.json());


// READ
export const findAllAssignmentsForEvent = (eventId) =>
    fetch(`http://localhost:8080/api/events/${eventId}/assignments`, {
      method: 'GET',
    })
    .then( res => res.json());

// UPDATE
export const updateAssignment = (assignmentId, assignment) =>
    fetch(`http://localhost:8080/api/assignments/${assignmentId}`, {
      method: 'PUT',
      body: JSON.stringify(assignment),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())



// DELETE
export const deleteAssignment = (assignmentId) =>
    fetch(`http://localhost:8080/api/assignments/${assignmentId}`, {
      method: 'DELETE'
    }).then(response => response.json());



export default {
  createAssignment,
  findAssignmentById,
  findAssignmentByAssigneeUserId,
  findAllAssignmentsForEvent,
  deleteAssignment,
  updateAssignment
}