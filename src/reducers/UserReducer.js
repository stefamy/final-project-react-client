import _ from 'lodash';
import { REGISTER, LOGIN, FIND_CURRENT_USER, FIND_CURRENT_USER_DATA_STORE, UPDATE_USER_RSVP, LOGOUT, DELETE_USER, UPDATE_USER } from "../common/UserConstants";

const initialState = {
  user: {
    id: '',
    profile: {},
    tasks: [],
    rsvps: [],
    hostedEvents: [],
    reviews: []
  }
}

const userReducer = (state = initialState, action) => {
  let user;
  switch (action.type) {

    case REGISTER:
      user = {};
      user.id = action.newUser.id;
      user.profile = _.cloneDeep(action.newUser)

      return {
        user: user
      }

    case LOGIN:
      user = {};
      user.id = action.user.id;
      user.profile = _.cloneDeep(action.user)

      return {
        user: user
      }

    case FIND_CURRENT_USER:
      user = {};
      user.id = action.user.id;
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

    case FIND_CURRENT_USER_DATA_STORE:
      user = {};
      user.id = action.userData.id;
      user.profile = _.cloneDeep(action.userData.profile);
      user.hostedEvents = _.cloneDeep(action.userData.hostedEvents);
      user.rsvps = _.cloneDeep(action.userData.rsvps);
      user.tasks = _.cloneDeep(action.userData.tasks);
      user.reviews = _.cloneDeep(action.userData.reviews);

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
