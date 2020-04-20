// import {API_URL} from '../common/constants';

// CREATE
export const createInvite = (eventId, invite) =>
    fetch(`http://localhost:8080/api/events/${eventId}/invites`, {
      method: 'POST',
      body: JSON.stringify(invite),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

// READ
export const findInviteById = (inviteId) =>
    fetch(`http://localhost:8080/api/invites/${inviteId}`, {
      method: 'GET',
    })
    .then( res => res.json());

// READ
export const findAllInvitesForEvent = (eventId) =>
    fetch(`http://localhost:8080/api/events/${eventId}/invites`, {
      method: 'GET',
    })
    .then( res => res.json());


// READ
export const findInvitesByGuestId = (userId) =>
    fetch(`http://localhost:8080/api/user/${userId}/invites`, {
      method: 'GET'
    }).then(response => response.json());


// UPDATE
export const updateInvite = (inviteId, invite) =>
    fetch(`http://localhost:8080/api/invites/${inviteId}`, {
      method: 'PUT',
      body: JSON.stringify(invite),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())



// DELETE
export const deleteInvite = (inviteId) =>
    fetch(`http://localhost:8080/api/invites/${inviteId}`, {
      method: 'DELETE'
    }).then(response => response.json());



export default {
  createInvite,
  findInviteById,
  findInvitesByGuestId,
  findAllInvitesForEvent,
  deleteInvite,
  updateInvite
}
