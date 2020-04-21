import {
  CREATE_INVITE,
  FIND_ALL_INVITES,
  FIND_ALL_INVITES_FOR_EVENT,
  UPDATE_INVITE
} from "../common/InvitesConstants";


// CREATE
export const createInvite = (invite) => ({
  type: CREATE_INVITE,
  invite: invite
})

// READ
export const findAllInvites = (invites) => ({
  type: FIND_ALL_INVITES,
  invites: invites
})

// READ
export const findAllInvitesForEvent = (invites) => ({
  type: FIND_ALL_INVITES_FOR_EVENT,
  invites: invites
})


// READ
export const updateInvite = (invite) => ({
  type: UPDATE_INVITE,
  invite: invite
})


export default {
  createInvite,
  findAllInvites,
  findAllInvitesForEvent,
  updateInvite
}
