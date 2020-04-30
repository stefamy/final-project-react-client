import {
  CREATE_INVITE,
  DELETE_INVITE_FOR_EVENT,
  FIND_ALL_INVITES,
  FIND_ALL_INVITES_FOR_EVENT,
  UPDATE_INVITE_FOR_EVENT
} from "../common/InvitesConstants";
import _ from 'lodash';


const initialState = {
  eventInvites: []
}

const invitesReducer = (state = initialState, action) => {
  let invites, eventInvites, guests;
  switch (action.type) {

    case CREATE_INVITE:
      eventInvites = [...state.eventInvites];
      const invite = _.cloneDeep(action.invite);
      invite["guest"] = _.cloneDeep(action.guest)
      eventInvites.push(invite);

      return {
        eventInvites: eventInvites
      }

    case FIND_ALL_INVITES:
      invites = _.sortBy(action.invites, 'firstName')
      return {
        invites: invites
      }

    case FIND_ALL_INVITES_FOR_EVENT:
      guests = _.sortBy(action.guests, 'firstName');
      eventInvites = _.sortBy(action.invites, 'firstName');
      eventInvites.forEach(invite => {
        const guestIndex = _.findIndex(guests, {id: invite.guestId});
        invite.guest = _.cloneDeep(guests[guestIndex]);
      });

      return {
        eventInvites: eventInvites
      }

    case UPDATE_INVITE_FOR_EVENT:
      eventInvites = [...state.eventInvites];
      const indexInEventList = _.findIndex(eventInvites, {id: action.invite.id});
      const originalInvite = eventInvites[indexInEventList];

      eventInvites.splice(indexInEventList, 1, action.invite);
      eventInvites[indexInEventList].guest = _.cloneDeep(originalInvite.guest);

      return {
        eventInvites: _.cloneDeep(eventInvites)
      }


    case DELETE_INVITE_FOR_EVENT:
      eventInvites = [...state.eventInvites];
      _.remove(eventInvites, {id: action.inviteId})

      return {
        eventInvites: eventInvites
      }


    default:
      return state
  }
}

export default invitesReducer;

