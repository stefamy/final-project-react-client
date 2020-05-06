import {
  CREATE_INVITE,
  UPDATE_INVITE_FOR_EVENT,
  DELETE_INVITE_FOR_EVENT
} from "../common/InvitesConstants";

// CREATE
export const createInvite = (newInvite) => ({
  type: CREATE_INVITE,
  guest: newInvite.user,
  invite: newInvite.invite
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
  deleteInviteForEvent,
  updateInviteForEvent
}
