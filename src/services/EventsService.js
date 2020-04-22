import {API_URL} from '../common/ApiConstants';

// CREATE
export const createEvent = (userId, event) =>
    fetch(`${API_URL}/api/events/${userId}`, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())

// READ
export const findEventById = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'GET',
    })
    .then( response => response.json())
    .catch(res => console.log(res, eventId));


// READ
export const findHostEventsForUser = (userId) =>
    fetch(`${API_URL}/api/events/host/${userId}`, {
      method: 'GET',
    })
    .then( response => response.json());


// READ
export const findGuestEventsForUser = (userId) =>
    fetch(`${API_URL}/api/events/guest/${userId}`, {
      method: 'GET',
    })
    .then( response => response.json());



// DELETE
export const deleteEvent = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'DELETE'
    }).then(response => response.json());


// UPDATE
export const updateEvent = (eventId, event) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())



export default {
  createEvent,
  findEventById,
  findHostEventsForUser,
  findGuestEventsForUser,
  deleteEvent,
  updateEvent

}
