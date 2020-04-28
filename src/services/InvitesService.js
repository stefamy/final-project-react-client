import {API_URL} from '../common/ApiConstants';

// CREATE
export const createInvite = (eventId, invite) =>
    fetch(`${API_URL}/api/events/${eventId}/invites`, {
      method: 'POST',
      body: JSON.stringify(invite),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

// READ
export const findInviteById = (inviteId) =>
    fetch(`${API_URL}/api/invites/${inviteId}`, {
      method: 'GET',
    })
    .then( res => res.json());

// READ
export const findAllInvitesForEvent = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}/invites`, {
      method: 'GET',
    })
    .then( res => res.json());


// READ
export const findInvitesByGuestId = (userId) =>
    fetch(`${API_URL}/api/users/${userId}/invites`, {
      method: 'GET'
    }).then(response => response.json());


// UPDATE
export const updateInvite = (inviteId, invite) =>
    fetch(`${API_URL}/api/invites/${inviteId}`, {
      method: 'PUT',
      body: JSON.stringify(invite),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())


// DELETE
export const deleteInvite = (inviteId) =>
    fetch(`${API_URL}/api/invites/${inviteId}`, {
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
