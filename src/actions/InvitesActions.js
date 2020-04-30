import {
  CREATE_INVITE,
  FIND_ALL_INVITES,
  FIND_ALL_INVITES_FOR_EVENT,
  DELETE_INVITE_FOR_EVENT,
  UPDATE_INVITE_FOR_EVENT
} from "../common/InvitesConstants";

// CREATE
export const createInvite = (newInvite) => ({
  type: CREATE_INVITE,
  guest: newInvite.user,
  invite: newInvite.invite
})

// READ
export const findAllInvites = (invites) => ({
  type: FIND_ALL_INVITES,
  invites: invites
})

// READ
export const findAllInvitesForEvent = (guestList) => ({
  type: FIND_ALL_INVITES_FOR_EVENT,
  guests: guestList.users,
  invites: guestList.invites
})

// READ
export const updateInviteForEvent = (invite) => ({
  type: UPDATE_INVITE_FOR_EVENT,
  invite: invite
})


// READ
export const deleteInviteForEvent = (inviteId) => ({
  type: DELETE_INVITE_FOR_EVENT,
  inviteId: inviteId
})



export default {
  createInvite,
  findAllInvites,
  findAllInvitesForEvent,
  deleteInviteForEvent,
  updateInviteForEvent
}
