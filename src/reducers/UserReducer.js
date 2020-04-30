import _ from 'lodash';
import { REGISTER, LOGIN, FIND_CURRENT_USER, FIND_CURRENT_USER_DATA, UPDATE_USER_RSVP, LOGOUT, DELETE_USER, UPDATE_USER } from "../common/UserConstants";

const initialState = {
  user: {
    profile: {}
  }
}

const userReducer = (state = initialState, action) => {
  let user;
  switch (action.type) {

    case REGISTER:
      user = {};
      user.profile = _.cloneDeep(action.newUser)
      return {
        user: user
      }

    case LOGIN:
      user = {};
      user.profile = _.cloneDeep(action.user)

      return {
        user: user
      }

    case FIND_CURRENT_USER:
      user = {};
      user.profile = _.cloneDeep(action.user);

      return {
        user: user
      }

    case UPDATE_USER_RSVP:
      user = _.cloneDeep(action.user);
      const newRsvps = _.cloneDeep(action.user.rsvps);
      newRsvps[action.rsvpIndex].invite = _.cloneDeep(action.invite);

      user.rsvps = newRsvps;

      return {
        user: user
      }

    case FIND_CURRENT_USER_DATA:
      user = {};
      user.profile = _.cloneDeep(action.user.profile);
      user.hostedEvents = _.cloneDeep(action.user.events);
      user.rsvps = _.cloneDeep(action.user.rsvps);
      user.assignments = _.cloneDeep(action.user.assignments);
      user.reviews = _.cloneDeep(action.user.reviews);

      return {
        user: user
      }

    case DELETE_USER:
      return {
        user: {
          profile: {}
        }
      }

    default:
      return state

  }
}

  export default userReducer;
