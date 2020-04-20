import { CREATE_INVITE, FIND_ALL_INVITES, UPDATE_INVITE } from "../common/InvitesConstants";


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
export const updateInvite = (invite) => ({
  type: UPDATE_INVITE,
  invite: invite
})


export default {
  createInvite,
  findAllInvites,
  updateInvite
}
