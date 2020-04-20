import { CREATE_INVITE, FIND_ALL_INVITES } from "../common/InvitesConstants";


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

export default {
  createInvite,
  findAllInvites
}
