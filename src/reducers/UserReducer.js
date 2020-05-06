import _ from 'lodash';
import { REGISTER, LOGIN, FIND_CURRENT_USER, FIND_CURRENT_USER_DATA_STORE, UPDATE_USER_PROFILE, UPDATE_USER_INVITE, CREATE_USER_HOSTED_EVENT, DELETE_USER_HOSTED_EVENT, LOGOUT, DELETE_USER, UPDATE_USER } from "../common/UserConstants";

const initialState = {
  userId: '',
  profile: {},
  invites: [],
  events: [],
  reviews: [],
  tasks: []
}

const userReducer = (state = initialState, action) => {
  let user, userId, profile, invites, events, reviews, tasks;
  switch (action.type) {


    case REGISTER:
      userId = action.newUser.id;
      profile = _.cloneDeep(action.newUser)

      return {
        userId: userId,
        profile: profile
      }

    case LOGIN:
      userId = action.user.id;
      profile = _.cloneDeep(action.user)

      return {
        userId: userId,
        profile: profile
      }

    case FIND_CURRENT_USER:
      userId = action.user.id;
      profile = _.cloneDeep(action.user.profile);

      return {
        userId: userId,
        profile: profile
      }

    case FIND_CURRENT_USER_DATA_STORE:
      userId = action.userData.id;
      profile = _.cloneDeep(action.userData.profile);
      invites = _.cloneDeep(action.userData.invites);
      events = _.cloneDeep(action.userData.events);
      reviews = _.cloneDeep(action.userData.reviews);
      tasks = _.cloneDeep(action.userData.tasks);

      return {
        userId: userId,
        profile: profile,
        invites: invites,
        events: events,
        reviews: reviews,
        tasks: tasks
      }

    case UPDATE_USER_INVITE:
      user = state;

      invites = _.cloneDeep(action.invites);
      user.invites = invites;

      return {...user}

    case UPDATE_USER_PROFILE:
      user = state;

      profile = _.cloneDeep(action.newProfile);
      user.profile = profile;

      return {...user}


    case CREATE_USER_HOSTED_EVENT:
      user = state;

      events = _.cloneDeep(state.events);
      events.push(action.event);

      user.events = events;

      return {...user}

    case DELETE_USER_HOSTED_EVENT:
      user = state;

      events = _.cloneDeep(state.events);
      _.remove(events, {id: action.eventId})

      user.events = events;

      return {...user}

    case DELETE_USER:
      return {...initialState}

    case LOGOUT:
      return {...initialState}


    default:
      return state

  }
}

  export default userReducer;
