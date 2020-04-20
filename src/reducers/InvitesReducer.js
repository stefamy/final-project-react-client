import { CREATE_INVITE, FIND_ALL_INVITES, UPDATE_INVITE } from "../common/InvitesConstants";
import _ from 'lodash';

const initialState = {
  invites: []
}

const invitesReducer = (state = initialState, action) => {
  let invites;
  switch (action.type) {

    case CREATE_INVITE:
      invites = [...state.invites];
      invites.push(action.invites);

      return {
        invites: invites
      }

    case FIND_ALL_INVITES:
      invites = _.sortBy(action.invites, 'date')
      return {
        invites: invites
      }

    case UPDATE_INVITE:
      invites = [...state.invites];
      const indexToUpdate = _.findIndex(invites, {id: action.invite.id});
      invites.splice(indexToUpdate, 1, action.invite);

      return {
        invites: _.cloneDeep(invites)
      }

    default:
      return state
  }
}

export default invitesReducer;

