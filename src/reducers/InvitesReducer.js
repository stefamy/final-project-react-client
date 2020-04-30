import {
  CREATE_INVITE,
  DELETE_INVITE_FOR_EVENT,
  FIND_ALL_INVITES,
  FIND_ALL_INVITES_FOR_EVENT,
  UPDATE_INVITE_FOR_EVENT
} from "../common/InvitesConstants";
import _ from 'lodash';


const initialState = {
  invites: []
}

const invitesReducer = (state = initialState, action) => {
  let invites, eventInvites, guests;
  switch (action.type) {

    case CREATE_INVITE:
      invites = [...state.invites];
      const invite = _.cloneDeep(action.invite);
      invite["guest"] = _.cloneDeep(action.guest)
      invites.push(invite);

      return {
        invites: invites
      }

    case FIND_ALL_INVITES:
      invites = _.sortBy(action.invites, 'firstName')
      return {
        invites: invites
      }

    case FIND_ALL_INVITES_FOR_EVENT:
      guests = _.sortBy(action.guests, 'firstName');
      invites = _.sortBy(action.invites, 'firstName');
      invites.forEach(invite => {
        const guestIndex = _.findIndex(guests, {id: invite.guestId});
        invite.guest = _.cloneDeep(guests[guestIndex]);
      });

      return {
        invites: invites
      }

    case UPDATE_INVITE_FOR_EVENT:
      invites = [...state.invites];
      const indexInEventList = _.findIndex(invites, {id: action.invite.id});
      const originalInvite = invites[indexInEventList];

      invites.splice(indexInEventList, 1, action.invite);
      invites[indexInEventList].guest = _.cloneDeep(originalInvite.guest);

      return {
        invites: _.cloneDeep(invites)
      }


    case DELETE_INVITE_FOR_EVENT:
      invites = [...state.invites];
      _.remove(invites, {id: action.inviteId})

      return {
        invites: invites
      }


    default:
      return state
  }
}

export default invitesReducer;

