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
export const findEventByEventId = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'GET',
    })
    .then( response => response.json())
    .catch(res => console.log(res, eventId));


// READ
export const findEventsByHostId = (hostId) =>
    fetch(`${API_URL}/api/events/host/${hostId}`, {
      method: 'GET',
    })
    .then( response => response.json());


// READ
export const findEventsByGuestId = (guestId) =>
    fetch(`${API_URL}/api/events/guest/${guestId}`, {
      method: 'GET',
    })
    .then( response => response.json());


// READ - All event data
export const findEventDataStore = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}/data`, {
      method: 'GET',
      credentials: "include"
    })
    .then( response => response.json())
    .catch(res => '');

// UPDATE
export const updateEvent = (eventId, event) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())

// DELETE
export const deleteEvent = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'DELETE'
    }).then(response => response.json());



export default {
  createEvent,
  findEventByEventId,
  findEventsByHostId,
  findEventsByGuestId,
  findEventDataStore,
  updateEvent,
  deleteEvent
}
